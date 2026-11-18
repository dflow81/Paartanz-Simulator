/* Starttest im echten Browser: öffnet tanzsimulator.html in Chromium ohne Fenster, wartet, bis alles geladen ist,
   probiert Filter, Infokarte und Folgen-Generator aus und meldet jeden Skriptfehler.
   Aufruf:  node tests/start.mjs        (braucht Node ab 22 und Chromium; das Testprofil wird danach gelöscht) */
import {spawn} from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const ROOT=path.join(path.dirname(fileURLToPath(import.meta.url)),'..'), PORT=9339;
const profil=fs.mkdtempSync(path.join(os.tmpdir(),'tanzsim-test-'));
const exe=['chromium','chromium-browser','google-chrome'].find(e=>{ try{ return !!fs.statSync('/usr/bin/'+e); }catch(_){ return false; } });
if(!exe){ console.log('Chromium nicht gefunden – Starttest übersprungen'); process.exit(0); }
const ch=spawn(exe,['--headless=new','--remote-debugging-port='+PORT,'--user-data-dir='+profil,'--use-angle=swiftshader','--enable-unsafe-swiftshader','--window-size=900,600','--allow-file-access-from-files','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms)); const fehler=[], pend=new Map(); let ws, id=0, ok=true;
try{
  let tgt; for(let i=0;i<50&&!tgt;i++){ await sleep(300); try{ tgt=(await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find(t=>t.type==='page'); }catch(e){} }
  ws=new WebSocket(tgt.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
  ws.onmessage=e=>{ const m=JSON.parse(e.data); if(m.id&&pend.has(m.id)){ pend.get(m.id)(m.result||m); pend.delete(m.id); }
    if(m.method==='Runtime.exceptionThrown') fehler.push('Ausnahme: '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text).slice(0,300));
    if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error') fehler.push('Konsole: '+m.params.args.map(a=>a.value||a.description).join(' ').slice(0,300)); };
  const send=(method,params={})=>new Promise(r=>{ pend.set(++id,r); ws.send(JSON.stringify({id,method,params})); });
  const ev=async x=>(await send('Runtime.evaluate',{expression:x,awaitPromise:true,returnByValue:true,timeout:20000})).result?.value;
  await send('Runtime.enable'); await send('Page.enable');
  await send('Page.navigate',{url:'file://'+path.join(ROOT,'tanzsimulator.html')});
  for(let i=0;i<60;i++){ await sleep(500); if(await ev(`document.querySelectorAll('#source option').length`)>0) break; }   // warten, bis die Seite fertig ist
  const pruef=async(name,js)=>{ const r=await ev(js); const g=r&&r.ok; if(!g) ok=false; console.log((g?'✔ ':'✖ ')+name+(r&&r.info?' – '+r.info:'')); };
  await pruef('Seite geladen, Figurenliste gefüllt',`(()=>{ const n=document.querySelectorAll('#source option').length; return {ok:n>100,info:n+' Einträge'}; })()`);
  await pruef('Infokarte zur Figur',`(()=>{ const s=document.getElementById('source'); s.value='fig:b_d_brezel'; s.dispatchEvent(new Event('change'));
    return new Promise(r=>setTimeout(()=>{ const t=document.querySelector('#figInfo summary').textContent; r({ok:/Brezel/.test(t)&&/Gold/.test(t),info:t}); },1500)); })()`);
  await pruef('Filter Kursstufe',`(()=>{ const s=document.getElementById('stufeSel'), n=()=>document.querySelectorAll('#source optgroup[data-f] option').length, a=n();
    s.value='1'; s.dispatchEvent(new Event('change')); const b=n(); s.value='5'; s.dispatchEvent(new Event('change')); return {ok:b>0&&b<a,info:a+' → '+b+' Figuren'}; })()`);
  await pruef('Folgen-Generator',`(()=>{ document.getElementById('randBtn').click(); const t=document.getElementById('genOut').textContent; return {ok:/✔/.test(t),info:t.slice(0,80)}; })()`);
  await pruef('Technikdaten',`(()=>{ document.getElementById('techOn').checked=true; return new Promise(r=>setTimeout(()=>{ document.getElementById('techOn').onchange(); const n=document.querySelectorAll('#techBox table.tech tr').length; r({ok:n>2,info:n+' Zeilen'}); },4000)); })()`);
  await pruef('Tanzlehrer-Ansicht',`(()=>{ document.getElementById('lehrerBtn').click(); const t=document.getElementById('lehrerInhalt').textContent, v=!document.getElementById('lehrer').hidden; document.getElementById('lehrerZu').click(); return {ok:v&&/Typische Fehler/.test(t)&&/Hinweise für Damen/.test(t)}; })()`);
  await pruef('Profi-Lernmodus: Stopp nach dem Schritt',`(()=>{ document.getElementById('profiBtn').click(); const b0=beat; document.getElementById('proWeiter').click(); return new Promise(r=>setTimeout(()=>{ const t=document.getElementById('proSchritt').textContent, st=!playing, m=mGewicht.visible; const b1=beat; document.getElementById('proZu').click(); r({ok:st&&m&&b1>b0&&t.length>2,info:t+' (Schlag '+b0.toFixed(1)+' → '+b1.toFixed(1)+')'}); },5000)); })()`);
  await pruef('Turniermodus',`(()=>{ const c=document.getElementById('turnierOn'); c.checked=true; c.onchange(); return new Promise(r=>setTimeout(()=>{ const t=document.getElementById('turnierInfo').textContent, n=turnierG.children.length; c.checked=false; c.onchange(); r({ok:/Blick/.test(t)&&n>8,info:t.slice(0,70)}); },900)); })()`);
  await pruef('Figuren-Qualitätsprüfung',`(()=>{ document.getElementById('qualBtn').click(); return new Promise(r=>setTimeout(()=>{ const t=document.getElementById('qualOut').textContent; r({ok:/geprüft/.test(t),info:t.slice(0,70)}); },4000)); })()`);
  await pruef('Goldfolge per Knopf',`(()=>{ document.querySelector('.genSt[data-st="4"]').click(); const t=document.getElementById('genOut').textContent; return {ok:/✔/.test(t),info:t.slice(0,60)}; })()`);
}catch(e){ ok=false; console.log('✖ Starttest abgebrochen: '+e.message); }
finally{ try{ ws&&ws.close(); }catch(e){} ch.kill(); await sleep(800); fs.rmSync(profil,{recursive:true,force:true}); }
for(const f of fehler) console.log('✖ '+f);
console.log(ok&&!fehler.length?'Starttest bestanden':'Starttest fehlgeschlagen');
process.exit(ok&&!fehler.length?0:1);
