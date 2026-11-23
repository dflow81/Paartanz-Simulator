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
  /* Abspielen neuer Kursfolgen: Wiedergabe läuft, Schleife (Neubeginn) ohne Fehler, Schrittansicht gefüllt */
  const spiel=key=>`(()=>{ const s=document.getElementById('source'); s.value='seq:${key}'; s.dispatchEvent(new Event('change')); speedEl.value=150; setPlaying(true);
    const t0=tl.total; beat=t0-.3; return new Promise(r=>setTimeout(()=>{ const ex=document.getElementById('explain').textContent; r({ok:taktBasis>=t0&&beat<t0&&!!document.querySelector('#seqlist .cur')&&ex.length>20&&!document.querySelector('#seqlist .loopbad'),
      info:'Durchlauf '+t0+' Schläge, nach Neubeginn bei Schlag '+beat.toFixed(1)+', Takt '+taktZaehl(Math.floor(beat))}); },6000)); })()`;
  await pruef('Kursfolge Slowfox Bronze abspielen und neu beginnen',spiel('k_slowfox1'));
  await pruef('Kursfolge Salsa Bronze abspielen und neu beginnen',spiel('k_salsa1'));
  /* Armführung: Figuren mit Linie, Zug und kreisender Hand abspielen – die Hände müssen sich bewegen, ohne Skriptfehler */
  const arme=fig=>`(()=>{ const s=document.getElementById('source'); s.value='fig:${fig}'; s.dispatchEvent(new Event('change')); speedEl.value=150; setPlaying(true); beat=0;
    const p0=herr.j.haL.position.clone(); return new Promise(r=>setTimeout(()=>{ const d=herr.j.haL.position.distanceTo(p0); r({ok:d>.01&&isFinite(d),info:'linke Hand des Herrn bewegt sich '+d.toFixed(2)+' m'}); },4000)); })()`;
  await pruef('Armführung: New Yorker (Linie)',arme('b_c_ny'));
  await pruef('Armführung: Rope Spinning (Hand kreist über dem Kopf)',arme('b_c_rope'));
  await pruef('Einwickeln: ins Körbchen führt ein Händepaar über den Kopf, normaler Wechsel nur kleiner Bogen',`(()=>{ const sty=Object.values(STYLES)[0]; 
    const a=handTargets('zu',sty,herr,dame), e=handTargets('korb',sty,herr,dame), w=wickelWeg(handTargets('korb',sty,herr,dame),a,.5,'zu','korb',herr,dame);
    const n=wickelWeg(handTargets('offen',sty,herr,dame),handTargets('zu',sty,herr,dame),.5,'zu','offen',herr,dame);
    const kopf=Math.min(herr.headPos.y,dame.headPos.y), hoch=Math.max(...Object.values(w).map(v=>v.y)), nh=Math.max(...Object.values(n).map(v=>v.y));
    return {ok:hoch>kopf&&nh<kopf,info:'Körbchen '+hoch.toFixed(2)+' m, offen '+nh.toFixed(2)+' m, Kopf '+kopf.toFixed(2)+' m'}; })()`);
  const durch=fig=>`new Promise(res=>{ const s=document.getElementById('source'); s.value='fig:${fig}'; s.dispatchEvent(new Event('change')); speedEl.value=150; setPlaying(true); beat=0;
    const segD=(p,a,b)=>{ const ab=b.clone().sub(a), t=Math.max(0,Math.min(1,p.clone().sub(a).dot(ab)/Math.max(ab.lengthSq(),1e-9))); return a.clone().addScaledVector(ab,t).distanceTo(p); };
    const segSeg=(a,b,c,d)=>{ let m=9; for(let i=0;i<=8;i++) m=Math.min(m,segD(a.clone().lerp(b,i/8),c,d)); return m; };
    let w=9; const t0=performance.now(); const iv=setInterval(()=>{ for(const [A,B] of [[herr,dame],[dame,herr]]){ const top=B.sh.L.clone().add(B.sh.R).multiplyScalar(.5), hip=top.clone(); hip.y-=.42*B.k;
      for(const q of 'LR') for(const [a,b] of [[A.sh[q],A.j['el'+q].position],[A.j['el'+q].position,A.j['ha'+q].position]]) w=Math.min(w,segSeg(a,b,hip,top)-(B.fem?.12:.14)*B.k,segSeg(a,b,B.headPos,B.headPos)-.1*B.k); }
      if(performance.now()-t0>6000){ clearInterval(iv); setPlaying(false); res({ok:w>-.05,info:'kleinster Abstand Arm–Partner '+(w*100).toFixed(0)+' cm (Kontakt bis −5 cm erlaubt)'}); } },40); })`;
  await pruef('Arme gehen nicht durch den Partner: Rope Spinning',durch('b_c_rope'));
  await pruef('Arme gehen nicht durch den Partner: Körbchen',durch('b_d_korb'));
  await pruef('Takt: Cha-Cha beginnt auf 2 – Einzählen endet auf der „1“',`(()=>{ const s=document.getElementById('source'); s.value='fig:b_c_gs'; s.dispatchEvent(new Event('change'));
    const r=[einzaehl(-5,true),einzaehl(-2,true),einzaehl(-1,true),taktZaehl(0),taktZaehl(3)].join(); return {ok:r==='5,8,1,2,1',info:r}; })()`);
  await pruef('Takt: betonte Eins läuft über Discofox-Figurenwechsel weiter',`(()=>{ const s=document.getElementById('source'); s.value='seq:k_disco1'; s.dispatchEvent(new Event('change'));
    const r=[taktZaehl(0),taktZaehl(4),taktZaehl(6),taktZaehl(8)].join(); return {ok:r==='1,1,3,1',info:r}; })()`);
  await pruef('Editor zeigt nicht schleifbare Folge an',`(()=>{ seqEdit={name:'x',bpm:90,items:[{fig:'b_w_vw',rep:1},{fig:'b_w_nat',rep:1}]}; renderSeqItems(); const t=document.querySelector('#seqItems .loopinfo').textContent; return {ok:/Keine Schleife/.test(t),info:t.slice(0,70)}; })()`);
  await pruef('Generator: Endfigur über der Höchststufe nicht wählbar',`(()=>{ document.querySelector('.tabs button[data-tab=seq]').click(); const d=document.getElementById('danceSel'); d.value='Discofox'; d.dispatchEvent(new Event('change'));
    document.querySelector('details.gen').open=true; fillGen(); const g=document.getElementById('genStufe'); g.value='2'; g.dispatchEvent(new Event('change')); const o=[...document.getElementById('genEnde').options].find(o=>o.value==='b_d_brezel');
    document.querySelector('.tabs button[data-tab=play]').click(); return {ok:!!o&&o.disabled,info:o?o.textContent:'fehlt'}; })()`);
  await pruef('Figuren-Editor prüft die bearbeitete Figur',`(()=>{ document.querySelector('.tabs button[data-tab=fig]').click(); figEdit={name:'Test',dance:'Langsamer Walzer',bpm:90,steps:[S('L','vor',30,1,'1'),S('L','vor',30,1,'2')]}; renderFigSteps();
    const t=document.getElementById('figQual').textContent; document.querySelector('.tabs button[data-tab=play]').click(); return {ok:/zweimal hintereinander/.test(t)&&/Phrase/.test(t),info:t.slice(0,90)}; })()`);
}catch(e){ ok=false; console.log('✖ Starttest abgebrochen: '+e.message); }
finally{ try{ ws&&ws.close(); }catch(e){} ch.kill(); await sleep(800); fs.rmSync(profil,{recursive:true,force:true}); }
for(const f of fehler) console.log('✖ '+f);
console.log(ok&&!fehler.length?'Starttest bestanden':'Starttest fehlgeschlagen');
process.exit(ok&&!fehler.length?0:1);
