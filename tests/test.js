/* Tests für Figuren, Übergangsprüfung und Folgen-Generator.  Aufruf:  node tests/test.js
   Braucht nur Node (ab Version 18), keine weiteren Pakete. Lädt die Dateien in derselben Reihenfolge wie die Seite. */
const fs=require('fs'), path=require('path'), vm=require('vm');
const {ROOT,skripte,ladeAlles,lauf}=require('./lade.js');
let ok=0, fail=0; const fehler=[];
const test=(name,fn)=>{ const t0=Date.now(); try{ const r=fn(); if(r===true||r===undefined){ ok++; } else { fail++; fehler.push(name+': '+r); } } catch(e){ fail++; fehler.push(name+': '+e.message); } if(process.env.ZEIT) console.log((Date.now()-t0+' ms').padStart(9),name); };
const liste=(arr,max=8)=>arr.length?arr.slice(0,max).join(' | ')+(arr.length>max?` … (${arr.length})`:''):true;

/* ---------- 11. „Bauen“: Es gibt keinen Build-Schritt. Geprüft wird, dass jede eingebundene Datei existiert und fehlerfrei übersetzt wird ---------- */
test('alle Skripte der Seite existieren und lassen sich übersetzen',()=>{ const bad=[];
  for(const f of skripte()){ const p=path.join(ROOT,f); if(!fs.existsSync(p)){ bad.push(f+' fehlt'); continue; }
    try{ new vm.Script(fs.readFileSync(p,'utf8'),{filename:f}); }catch(e){ bad.push(f+': '+e.message); } }
  return liste(bad); });
test('alle Skripte und das CSS tragen dieselbe ?v=-Nummer',()=>{ const html=fs.readFileSync(path.join(ROOT,'tanzsimulator.html'),'utf8');
  const v=new Set([...html.matchAll(/\?v=(\d+)/g)].map(m=>m[1])); return v.size===1||'verschiedene Nummern: '+[...v].join(', '); });

const c=ladeAlles();
const R=code=>lauf(c,code);

/* ---------- 1–3, 9, 12: Figuren laden, gültige Schritte, Start- und Endfuß ---------- */
test('mindestens 397 Figuren in 31 Tänzen geladen',()=>R(`Object.keys(BUILTIN).length>=397&&DANCES.length===31`)||R(`Object.keys(BUILTIN).length+' Figuren, '+DANCES.length+' Tänze'`));
test('jeder Schritt hat gültigen Fuß, Richtung, Länge, Dauer, Drehung, Haltung und Zählzeit',()=>liste(R(`(()=>{ const bad=[];
  for(const [k,F] of Object.entries(BUILTIN)) for(const [w,st] of [['H',F.steps],['D',F.dame||[]]]) st.forEach((s,i)=>{
    const p=k+'/'+w+(i+1);
    if(s.f!=='L'&&s.f!=='R') bad.push(p+' Fuß '+s.f);
    if(!DIRS[s.dir]) bad.push(p+' Richtung '+s.dir);
    if(!(+s.d>0)) bad.push(p+' Dauer '+s.d);
    if(!(+s.len>=0&&+s.len<=100)) bad.push(p+' Länge '+s.len);
    if(!Number.isFinite(+s.turn||0)) bad.push(p+' Drehung '+s.turn);
    if(s.hold!==undefined&&!HOLDS[s.hold]) bad.push(p+' Haltung '+s.hold);
    if(s.c===undefined) bad.push(p+' ohne Zählzeit'); });
  return bad; })()`)));
test('jede Figur hat Name, Tanz, Tempo und Schritte; eigene Damen-Schritte dauern gleich lang',()=>liste(R(`Object.entries(BUILTIN).flatMap(([k,F])=>{ const b=[];
  if(!F.name||!F.dance||!(F.bpm>0)||!F.steps.length) b.push(k+' unvollständig');
  if(F.dame){ const a=F.steps.reduce((s,x)=>s+x.d,0), d=F.dame.reduce((s,x)=>s+x.d,0); if(Math.abs(a-d)>1e-6) b.push(k+' Herr '+a+' / Dame '+d+' Schläge'); }
  return b; })`)));
test('Start- und Endfuß von Herr und Dame sind für jede Figur bestimmt',()=>liste(R(`Object.entries(BUILTIN).filter(([k,F])=>{ const m=figMeta(F,k); return !m.herr.start||!m.herr.ende||!m.dame.start||!m.dame.ende; }).map(([k])=>k)`)));
test('Dame gegengleich: beginnt und endet auf dem anderen Fuß als der Herr',()=>liste(R(`Object.entries(BUILTIN).filter(([k,F])=>!F.dame).filter(([k,F])=>{ const m=figMeta(F,k); return m.dame.start===m.herr.start||m.dame.ende===m.herr.ende; }).map(([k])=>k)`)));
test('jede Figur läuft ohne Fehler durch die Engine',()=>liste(R(`Object.keys(BUILTIN).filter(k=>{ try{ const t=simulate(flatten({items:[{fig:k,rep:1}]}),{H:startH(),noSteer:true}); return !(t.total>0); }catch(e){ return true; } })`)));
test('in keiner Figur wird mit dem belasteten Fuß geschritten (einmal getanzt)',()=>liste(R(`Object.keys(BUILTIN).filter(k=>(t=>t.H.concat(t.D).some(r=>r.warn))(simulate(flatten({items:[{fig:k,rep:1}]}),{H:startH(),noSteer:true})))`)));

/* ---------- Metadaten und Kursstufen ---------- */
test('Kursstufe 1–5, Typ und Schwierigkeit 1–5 für jede Figur',()=>liste(R(`Object.entries(BUILTIN).filter(([k,F])=>{ const m=figMeta(F,k); return !(m.stufe>=1&&m.stufe<=5)||!ARTEN[m.art]||!(m.schwer>=1&&m.schwer<=5)||!m.text; }).map(([k])=>k)`)));
test('Einträge in figuren/info.js gehören zu vorhandenen Figuren und haben gültige Werte',()=>liste(R(`Object.entries(INFO).filter(([k,v])=>!BUILTIN[k]||!(v[0]>=1&&v[0]<=5)||(v[1]&&!ARTEN[v[1]])).map(([k])=>k)`)));
test('neue Kursfiguren haben eine festgelegte Stufe und Beschreibung',()=>liste(R(`['b_d_pwr','b_d_hegoes','b_d_tunnel','b_d_hammer','b_d_schal','b_d_brezel','b_d_zu','b_w_impetus','b_w_kchasse','b_t_rechts','b_t_fuenf','b_t_aussen',
  'b_c_hip','b_c_open','b_r_hip','b_r_open','b_j_pwrl','b_j_amspin','b_j_stopgo','b_sa_pbota','b_sa_swalk'].filter(k=>{ const F=BUILTIN[k]; if(!F) return true; const m=figMeta(F,k); return !m.stufeFest||!INFO[k][2]; })`)));
test('Grundschritt jedes Tanzes der Schwerpunkte ist Einsteiger-Stufe',()=>liste(R(`['b_d_gs','b_w_box','b_t_gs','b_c_gs','b_r_box','b_j_gs','b_sa_gs'].filter(k=>figMeta(BUILTIN[k],k).stufe!==1)`)));

/* ---------- 4–5: Übergänge ---------- */
const U=(a,b)=>R(`uebergang(figMeta(BUILTIN.${a},'${a}'),figMeta(BUILTIN.${b},'${b}'))`);
test('gültig: Walzer Grundschritt → Vorwärts-Wechsel mit links',()=>U('b_w_box','b_w_vw').ok||'abgelehnt');
test('gültig: Rechtsdrehung → Rückwärts-Wechsel mit rechts',()=>U('b_w_nat','b_w_rw').ok||'abgelehnt');
test('gültig: Fächer → Hockeystick (Fächer zu Fächer)',()=>U('b_c_fan','b_c_hockey').ok||'abgelehnt');
test('gültig mit Haltungswechsel: Discofox Platzwechsel → Grundschritt (eine Hand → geschlossen)',()=>{ const u=U('b_d_pw','b_d_gs'); return u.ok&&u.wechsel||JSON.stringify(u); });
test('ungültig: Vorwärts-Wechsel mit links → Grundschritt (gleicher Fuß)',()=>!U('b_w_vw','b_w_box').ok||'nicht erkannt');
test('ungültig: Rechtsdrehung → Außenseitlicher Wechsel (beide auf dem linken Fuß)',()=>{ const u=U('b_w_nat','b_w_aussen'); return !u.ok||'nicht erkannt'; });
test('ungültig: Grundschritt → Hockeystick (nur aus dem Fächer)',()=>!U('b_c_gs','b_c_hockey').ok||'nicht erkannt');
test('ungültig: Fächer → Grundschritt (aus dem Fächer nur mit Fächer-Figur)',()=>!U('b_c_fan','b_c_gs').ok||'nicht erkannt');
test('ungültig: Figuren verschiedener Tänze',()=>!U('b_w_box','b_d_gs').ok||'nicht erkannt');
test('Übergangsprüfung stimmt mit der Simulation überein (Fußfehler)',()=>liste(R(`(()=>{ const ks=['b_w_box','b_w_vw','b_w_nat','b_w_rev','b_w_rw','b_d_gs','b_d_solo','b_d_pw','b_c_gs','b_c_fan','b_c_hockey','b_j_gs','b_j_pwrl','b_t_gs','b_t_fuenf'], bad=[];
  for(const a of ks) for(const b of ks){ if(BUILTIN[a].dance!==BUILTIN[b].dance) continue;
    const u=uebergang(figMeta(BUILTIN[a],a),figMeta(BUILTIN[b],b)), fussFehler=u.gruende.some(g=>/Fuß/.test(g));
    const sim=simulate(flatten({items:[{fig:a},{fig:b}]}),{H:startH(),noSteer:true}).H.concat(simulate(flatten({items:[{fig:a},{fig:b}]}),{H:startH(),noSteer:true}).D).some(r=>r.warn);
    if(fussFehler!==sim) bad.push(a+'→'+b+' Prüfung '+fussFehler+' / Simulation '+sim); }
  return bad; })()`)));
test('folgePruefen meldet einen Fehler bei falschem Fuß',()=>R(`folgePruefen([{fig:'b_w_vw'},{fig:'b_w_box'}]).fehler.length>0`)||'kein Fehler gemeldet');

/* ---------- Beispiel- und Kursfolgen bleiben gültig (12: Kompatibilität) ---------- */
test('alle Beispiel- und Kursfolgen: nur ein Tanz, gültige Übergänge, auch beim Wiederholen',()=>liste(R(`Object.entries(DEFAULT_SEQS).flatMap(([k,s])=>{ const p=folgePruefen(s.items.concat(s.items.slice(0,1)),{wdh:true,schnell:true}); return p.fehler.map(f=>k+': '+f); })`)));
test('Kursfolgen enthalten keine Figur über ihrer Stufe',()=>liste(R(`(()=>{ const st={Einsteiger:1,Bronze:2,Silber:3,Gold:4}; return Object.entries(DEFAULT_SEQS).filter(([k])=>/^k_/.test(k)).flatMap(([k,s])=>{ const n=st[s.name.split('– ').pop()]; return s.items.filter(i=>figMeta(BUILTIN[i.fig],i.fig).stufe>n).map(i=>k+': '+i.fig); }); })()`)));
test('gespeicherte Folgen im alten Format (ohne neue Felder) laufen weiter',()=>R(`(()=>{ const alt={name:'alt',bpm:120,items:[{fig:'b_d_gs',rep:2},{fig:'b_d_solo',rep:1}]}; return simulate(flatten(alt),{H:startH(),noSteer:true}).total===15; })()`)||'falsche Länge');

/* ---------- 6–8: Folgen-Generator ---------- */
const TAENZE=['Discofox','Langsamer Walzer','Tango','Cha-Cha-Cha','Rumba','Jive','Samba','Wiener Walzer','Salsa','Foxtrott'];
test('Generator: jede Folge besteht nur aus Figuren des Tanzes, ohne Fußfehler, ohne direkte Wiederholung',()=>liste(R(`(()=>{ let seed=7; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647; const bad=[];
  for(const d of ${JSON.stringify(TAENZE)}) for(let n=0;n<4;n++){ const r=folgeErzeugen({tanz:d,laenge:6,bisStufe:5,zurueck:true,zufall:rnd});
    if(r.fehler.length){ bad.push(d+': '+r.fehler[0]); continue; }
    if(r.items.some(i=>BUILTIN[i.fig].dance!==d)) bad.push(d+': fremde Figur');
    if(r.items.some((i,j)=>j&&i.fig===r.items[j-1].fig)) bad.push(d+': direkte Wiederholung');
    const t=simulate(flatten({items:r.items}),{H:startH(),noSteer:true}); if(t.H.concat(t.D).some(x=>x.warn)) bad.push(d+': Fußfehler in '+r.items.map(i=>i.fig).join(','));
    for(let j=1;j<r.items.length;j++){ const u=uebergang(figMeta(BUILTIN[r.items[j-1].fig],r.items[j-1].fig),figMeta(BUILTIN[r.items[j].fig],r.items[j].fig)); if(!u.ok) bad.push(d+': '+u.gruende.join(';')); } }
  return bad; })()`)));
test('Generator: respektiert die Kursstufe',()=>liste(R(`(()=>{ const bad=[]; for(const d of ${JSON.stringify(TAENZE)}) for(const b of [1,2,3]){ const r=folgeErzeugen({tanz:d,laenge:6,bisStufe:b});
  if(r.fehler.length){ if(b>1) bad.push(d+' bis '+b+': '+r.fehler[0]); continue; }
  r.items.forEach(i=>{ const s=figMeta(BUILTIN[i.fig],i.fig).stufe; if(s>b) bad.push(d+' bis '+b+': '+i.fig+' ist Stufe '+s); }); } return bad; })()`)));
test('Generator: endet in der Grundhaltung, wenn gewünscht',()=>liste(R(`(()=>{ const bad=[]; for(const d of ${JSON.stringify(TAENZE)}){ const r=folgeErzeugen({tanz:d,laenge:6,zurueck:true});
  if(r.fehler.length){ bad.push(d+': '+r.fehler[0]); continue; } const l=r.items.at(-1).fig; if(figMeta(BUILTIN[l],l).haltEnde!==grundHaltung(d)) bad.push(d+': endet in '+figMeta(BUILTIN[l],l).haltEnde); } return bad; })()`)));
test('Generator: Start- und Endfigur werden eingehalten',()=>{ const r=R(`folgeErzeugen({tanz:'Discofox',laenge:6,start:'b_d_solo',ende:'b_d_korb'})`); return !r.fehler.length&&r.items[0].fig==='b_d_solo'&&r.items.at(-1).fig==='b_d_korb'||JSON.stringify(r).slice(0,200); });
test('Generator: Länge wird eingehalten (höchstens drei Figuren mehr für die Rückkehr)',()=>{ const r=R(`[4,8,12].map(n=>[n,folgeErzeugen({tanz:'Cha-Cha-Cha',laenge:n}).items.length])`); return r.every(([n,l])=>l>=n&&l<=n+3)||JSON.stringify(r); });
test('Generator: meldet unmögliche Wünsche als Fehler statt einer ungültigen Folge',()=>{ const r=R(`folgeErzeugen({tanz:'Discofox',start:'b_w_box'})`); return r.fehler.length>0&&!r.items.length||'kein Fehler'; });

/* ---------- Ergebnis ---------- */
console.log(`${ok} Tests bestanden, ${fail} fehlgeschlagen`);
for(const f of fehler) console.log('  ✖ '+f);
process.exit(fail?1:0);
