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
test('mindestens 450 Figuren in 31 Tänzen geladen',()=>R(`Object.keys(BUILTIN).length>=450&&DANCES.length===31`)||R(`Object.keys(BUILTIN).length+' Figuren, '+DANCES.length+' Tänze'`));
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
test('Kursstufe 1–7, Typ und Schwierigkeit 1–5 für jede Figur',()=>liste(R(`Object.entries(BUILTIN).filter(([k,F])=>{ const m=figMeta(F,k); return !(m.stufe>=1&&m.stufe<=7)||!ARTEN[m.art]||!(m.schwer>=1&&m.schwer<=5)||!m.text; }).map(([k])=>k)`)));
test('Einträge in figuren/info.js gehören zu vorhandenen Figuren und haben gültige Werte',()=>liste(R(`Object.entries(INFO).filter(([k,v])=>!BUILTIN[k]||!(v[0]>=1&&v[0]<=7)||(v[1]&&!ARTEN[v[1]])).map(([k])=>k)`)));
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
  for(const d of ${JSON.stringify(TAENZE)}) for(let n=0;n<4;n++){ const r=folgeErzeugen({tanz:d,laenge:6,bisStufe:7,zurueck:true,zufall:rnd});
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

/* ---------- Abgleichliste, Technik, Lehrer, Qualität ---------- */
test('Abgleichliste verweist nur auf vorhandene Figuren',()=>liste(R(`Object.values(SYLLABUS).flatMap(s=>Object.values(s).flat()).filter(e=>e.includes('=')&&!BUILTIN['b_'+e.split('=')[1]])`)));
test('Abgleichliste: Figur gehört zum genannten Tanz',()=>liste(R(`Object.entries(SYLLABUS).flatMap(([d,s])=>Object.values(s).flat().filter(e=>e.includes('=')&&BUILTIN['b_'+e.split('=')[1]].dance!==d))`)));
test('die gewünschten Figuren sind vorhanden',()=>liste(R(`['sf_oimp','sf_ffinish','sf_cfeder','sf_hfeder','sf_tumble','sf_bounce','sf_nweave','q_fishtail','q_v6','q_6run','q_rrturn','q_tipple','w_telemark','w_otelemark','w_wing','w_contra','w_hcorte','t_fallaway','t_vier','t_fuenf','t_drag','w_oversway','w_throw','w_lunge','w_chair'].filter(k=>!BUILTIN['b_'+k])`)));
test('Technikdaten für jeden Schritt jeder Figur vollständig',()=>liste(R(`Object.entries(BUILTIN).flatMap(([k,F])=>{ const t=technikVon(F.steps,styleOf(F.dance)); return t.length===F.steps.length&&t.every(x=>/^[LR]$/.test(x.belastet)&&x.frei!==x.belastet&&x.technik&&x.rise&&x.sway&&typeof x.cbm==='boolean'&&typeof x.cbmp==='boolean')?[]:[k]; })`)));
test('Technik: Rechtsdrehung im Walzer beginnt mit Ferse-Spitze und CBM',()=>{ const t=R(`technikVon(BUILTIN.b_w_nat.steps,styleOf('Langsamer Walzer'))[0]`); return t.technik==='HT'&&t.cbm&&t.belastet==='R'&&t.frei==='L'||JSON.stringify(t); });
test('Technik: Tap verlagert kein Gewicht',()=>{ const t=R(`technikVon(BUILTIN.b_d_gs.steps,styleOf('Discofox'))[2]`); return t.belastet==='R'&&t.frei==='L'||JSON.stringify(t); });
test('Ausrichtung: an der unteren Seite nach +x = Tanzrichtung, nach +z = Wand',()=>{ const r=R(`[ausrichtung([0,2.5],Math.PI/2).kurz,ausrichtung([0,2.5],0).kurz,ausrichtung([0,2.5],Math.PI).kurz,ausrichtung([0,2.5],Math.PI/4).kurz]`); return r.join()==='LOD,W,C,DW'||r.join(); });
test('Ausrichtung: Ecke wird erkannt',()=>R(`ausrichtung([3.5,2.5],0).ecke&&!ausrichtung([0,2.5],0).ecke`)||'nicht erkannt');
test('Tanzlehrer-Texte für jede Figur vorhanden',()=>liste(R(`Object.entries(BUILTIN).filter(([k,F])=>{ const d=lehrerDaten(F,k); return !d.beschreibung||!d.technik.length||!d.fehler.length||!d.herr.length||!d.dame.length; }).map(([k])=>k)`)));
test('Qualitätsprüfung: Bibliothek ohne Fehler',()=>liste(R(`qualitaetAlle().liste.filter(x=>x.q.some(q=>q.art==='fehler')).map(x=>x.id)`)));
test('Qualitätsprüfung erkennt zweimal denselben Fuß',()=>R(`qualitaetFigur({name:'x',dance:'Tango',steps:[S('L','vor',30,1,'1'),S('L','vor',30,1,'2')]},'x').some(q=>q.art==='fehler'&&/Gewichtswechsel/.test(q.text))`)||'nicht erkannt');
test('Qualitätsprüfung erkennt falschen Takt',()=>R(`qualitaetFigur({name:'x',dance:'Langsamer Walzer',steps:[S('L','vor',30,1,'1'),S('R','vor',30,1,'2')]},'x').some(q=>/Phrase von 3/.test(q.text))`)||'nicht erkannt');
test('Qualitätsprüfung erkennt ungleich lange Herr-/Damenschritte',()=>R(`qualitaetFigur({name:'x',dance:'Tango',steps:[S('L','vor',30,2,'S')],dame:[S('R','rueck',30,1,'Q')]},'x').some(q=>/gleiche Länge/.test(q.text))`)||'nicht erkannt');
test('Medaillenfolgen: gültig und innerhalb der Stufe',()=>liste(R(`(()=>{ let seed=11; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647, bad=[];
  for(const d of ['Slowfox','Quickstep','Tango','Langsamer Walzer','Cha-Cha-Cha','Rumba','Salsa','Discofox']) for(const st of [2,3,4,5]){ const r=folgeFuerStufe(d,st,rnd); if(r.fehler.length){ bad.push(d+' '+st+': '+r.fehler[0]); continue; }
    r.items.forEach(i=>{ if(figMeta(BUILTIN[i.fig],i.fig).stufe>st) bad.push(d+' '+st+': '+i.fig); }); if(r.items.length<STUFEN_FOLGE[st]) bad.push(d+' '+st+': zu kurz'); }
  return bad; })()`)));

/* ---------- Regressionstests: Folgenprüfung und Generator ---------- */
test('Generator: Endfigur und „zurück in die Grundhaltung“ gelten gemeinsam (Discofox, Körbchen endet in L–R)',()=>{ const r=R(`folgeErzeugen({tanz:'Discofox',laenge:6,start:'b_d_solo',ende:'b_d_korb',zurueck:true,zufall:()=>0.5})`);
  return !r.items.length&&r.fehler.length&&/Grundhaltung/.test(r.fehler[0])||JSON.stringify(r).slice(0,200); });
test('Generator: ohne „zurück“ endet die Folge mit der Endfigur und beginnt mit der Startfigur',()=>{ const r=R(`folgeErzeugen({tanz:'Discofox',laenge:6,start:'b_d_solo',ende:'b_d_korb',zurueck:false,zufall:()=>0.5})`);
  return !r.fehler.length&&r.items[0].fig==='b_d_solo'&&r.items.at(-1).fig==='b_d_korb'||JSON.stringify(r).slice(0,200); });
test('Generator: erzwungene Endfigur hält die Wiederholungsregel ein (Tango, Pool nur Grundschritt)',()=>{ const r=R(`folgeErzeugen({tanz:'Tango',laenge:2,start:'b_t_gs',ende:'b_t_gs',wdh:false,figs:{b_t_gs:BUILTIN.b_t_gs},zufall:()=>0.5})`);
  return !r.items.length&&r.fehler.length>0||JSON.stringify(r.items); });
test('Generator: mit erlaubter Wiederholung entsteht die Folge',()=>{ const r=R(`folgeErzeugen({tanz:'Tango',laenge:2,start:'b_t_gs',ende:'b_t_gs',wdh:true,figs:{b_t_gs:BUILTIN.b_t_gs},zufall:()=>0.5})`);
  return !r.fehler.length&&r.items.length===2||JSON.stringify(r).slice(0,200); });
test('Generator: Start- oder Endfigur über der Höchststufe wird abgelehnt',()=>{ const r=R(`[folgeErzeugen({tanz:'Discofox',laenge:4,bisStufe:2,start:'b_d_brezel'}),folgeErzeugen({tanz:'Discofox',laenge:4,bisStufe:2,ende:'b_d_brezel'})]`);
  return r.every(x=>!x.items.length&&/Höchststufe/.test(x.fehler[0]))||JSON.stringify(r).slice(0,200); });
test('Generator: erzeugte Folgen lassen sich als Schleife tanzen',()=>liste(R(`(()=>{ let seed=5; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647, bad=[];
  for(const d of ['Discofox','Langsamer Walzer','Cha-Cha-Cha','Slowfox','Salsa']) for(let i=0;i<3;i++){ const r=folgeErzeugen({tanz:d,laenge:6,zurueck:true,zufall:rnd}); if(r.fehler.length){ bad.push(d+': '+r.fehler[0]); continue; } const s=schleifePruefen(r.items); if(!s.ok) bad.push(d+': '+s.gruende.join(';')); }
  return bad; })()`)));
test('folgePruefen([]) meldet eine leere Folge',()=>{ const r=R(`folgePruefen([])`); return r.fehler.length===1&&/leer/.test(r.fehler[0])||JSON.stringify(r); });
test('folgePruefen nutzt die übergebene Figurenbibliothek auch für die Simulation',()=>{ const r=R(`folgePruefen([{fig:'x_test',rep:1}],{},{...BUILTIN,x_test:{name:'Test',dance:'Tango',bpm:120,steps:[S('L','vor',30,2,'S'),S('R','vor',30,2,'S')]}})`); return !r.fehler.length||r.fehler.join(' | '); });
test('folgePruefen: fehlgeschlagene Simulation ist ein Fehler, kein grünes Ergebnis',()=>{ const r=R(`(()=>{ const alt=simulate; simulate=()=>{ throw new Error('Testfehler'); }; try{ return folgePruefen([{fig:'b_t_gs',rep:1}]); } finally{ simulate=alt; } })()`); return r.fehler.some(f=>/simuliert/.test(f))||JSON.stringify(r); });
test('Schleifenprüfung: gültige Schleife und bewusst ungültiger Anschluss',()=>{ const r=R(`[schleifePruefen([{fig:'b_w_box'},{fig:'b_w_vw'},{fig:'b_w_nat'},{fig:'b_w_rw'},{fig:'b_w_rev'}]).ok, schleifePruefen([{fig:'b_w_vw'},{fig:'b_w_nat'}]).ok, folgePruefen([{fig:'b_w_vw'},{fig:'b_w_nat'}],{schleife:true,schnell:true}).fehler.some(f=>/Schleife/.test(f))]`); return r.join()==='true,false,true'||r.join(); });
test('Schleifenprüfung erkennt einen falschen Fuß nur der Dame',()=>{ const r=R(`(()=>{ const figs={...BUILTIN,x_d:{name:'Damenfehler',dance:'Discofox',bpm:120,steps:[S('L','platz',0,1,'1'),S('R','platz',0,1,'2'),S('L','tap',0,1,'3')],dame:[S('R','vor',15,1,'1'),S('L','vor',15,1,'2'),S('R','vor',15,1,'3')]}};
  return schleifePruefen([{fig:'x_d'}],figs); })()`); return !r.ok&&r.gruende.some(g=>/^Dame/.test(g))&&!r.gruende.some(g=>/^Herr/.test(g))||JSON.stringify(r); });
test('Wiederholung (rep > 1) wird weiterhin geprüft',()=>R(`folgePruefen([{fig:'b_w_vw',rep:2}],{schnell:true}).fehler.some(f=>/Wiederholung/.test(f))`)||'nicht erkannt');
test('Haltung: Promenade im Standardtanz muss in der Promenade weitergehen',()=>{ const r=R(`[uebergang(figMeta(BUILTIN.b_w_wisch,'b_w_wisch'),figMeta(BUILTIN.b_w_rev,'b_w_rev')).ok, uebergang(figMeta(BUILTIN.b_w_wisch,'b_w_wisch'),figMeta(BUILTIN.b_w_chasse,'b_w_chasse')).ok]`); return r.join()==='false,true'||r.join(); });
test('Haltung: Wechsel in die Promenade im Standard ist erlaubt, aber als vereinfacht markiert',()=>{ const u=R(`uebergang(figMeta(BUILTIN.b_t_wiege,'b_t_wiege'),figMeta(BUILTIN.b_t_prom,'b_t_prom'))`); return u.ok&&u.vereinfacht||JSON.stringify(u); });
test('Haltung: aus einer Seitenposition nur in dieselbe Position',()=>{ const u=R(`(()=>{ const A={...figMeta(BUILTIN.b_d_gs,'b_d_gs'),haltEnde:'korb'}; return [uebergang(A,figMeta(BUILTIN.b_d_gs,'b_d_gs')).ok,uebergang(A,figMeta(BUILTIN.b_d_korb,'b_d_korb')).ok]; })()`); return u.join()==='false,true'||u.join(); });

/* ---------- Stil, Takt, Daten ---------- */
test('Stil: Tango Argentino und Tangowalzer werden richtig eingeordnet',()=>{ const r=R(`[styleOf('Tango Argentino')===STYLES.argentino, styleOf('Tangowalzer')===STYLES.tango, taktVon('Tangowalzer'), taktVon('Tango Argentino'), styleOf('Mein Tango Argentino')===STYLES.argentino, styleOf('Disco-Samba')===STYLES.bounce, phraseVon('Disco-Samba'), phraseVon('Discofox')]`); return r.join()==='true,true,3,4,true,true,2,3'||r.join(); });
test('eine Taktquelle: Engine-Meter und Metadaten stimmen überein',()=>liste(R(`DANCES.filter(d=>{ const k=Object.keys(BUILTIN).find(k=>BUILTIN[k].dance===d); return simulate(flatten({items:[{fig:k}]}),{H:startH(),noSteer:true}).H[0].meter!==taktOf(d); })`)));
test('Qualitätsprüfung: keine Warnungen mehr in der Bibliothek',()=>liste(R(`qualitaetAlle().liste.map(x=>x.id+': '+x.q.map(q=>q.text).join('; '))`)));
test('Tipple-Chassé hat 8 Schläge',()=>R(`figMeta(BUILTIN.b_q_tipple,'b_q_tipple').schlaege`)===8||'falsch');
test('Aliasse haben wirklich dieselben Schritte',()=>liste(R(`Object.entries(ALIAS).filter(([a,[b]])=>JSON.stringify(BUILTIN[a].steps)!==JSON.stringify(BUILTIN[b].steps)).map(([a])=>a)`)));
test('Abgleichliste: jede Figur nur einmal zugeordnet',()=>liste(R(`(()=>{ const n={}; for(const s of Object.values(SYLLABUS)) for(const l of Object.values(s)) for(const e of l){ const id=e.split('=')[1]; if(id) n[id]=(n[id]||0)+1; } return Object.entries(n).filter(([k,v])=>v>1).map(([k])=>k); })()`)));
test('Figuren mit Quelle: Quelle und Fußarbeit für jeden Schritt beider Rollen',()=>liste(R(`Object.keys(QUELLEN).filter(k=>!BUILTIN[k]||!/^http/.test(QUELLEN[k])||(TECHNIK_DATEN[k]&&(TECHNIK_DATEN[k].H.fuss.length!==BUILTIN[k].steps.length||TECHNIK_DATEN[k].D.fuss.length!==BUILTIN[k].steps.length)))`)));

/* ---------- Neue feste Kursfolgen ---------- */
test('neue Kursfolgen: Stufe, Übergänge, Wiederholung, Schleife und Laufweg',()=>liste(R(`['k_slowfox1','k_slowfox2','k_quick1','k_quick2','k_salsa1','k_salsa2','k_chacha3','k_chacha4','k_rumba3','k_rumba4','k_tango4','k_walzer4','k_jive4','k_samba3','k_quick3','k_slowfox3','k_salsa3','k_paso1','k_paso2','k_paso3','k_wwalzer1','k_wwalzer2'].flatMap(k=>{ const s=DEFAULT_SEQS[k]; if(!s) return [k+' fehlt']; const st={Bronze:2,Silber:3,Gold:4}[s.name.split('– ').pop()], p=folgePruefen(s.items,{schleife:true,bisStufe:st});
  return p.fehler.concat(p.warnungen).map(x=>k+': '+x); })`)));
test('Double Reverse Spin zweimal hintereinander: Partner mindestens 20 cm auseinander',()=>{ const mn=R(`(()=>{ const t=simulate(flatten({items:[{fig:'b_w_dbl',rep:2}]}),{H:startH()}); let mn=9; for(let b=0;b<t.total;b+=.05){ const a=evalRaw(t.H,b),d=evalRaw(t.D,b); mn=Math.min(mn,Math.hypot(a.sup[0]-d.sup[0],a.sup[1]-d.sup[1])); } return mn; })()`); return mn>=.2||'nur '+mn.toFixed(2)+' m'; });
test('Salsa-Kursfolgen bleiben im kubanischen Stil',()=>liste(R(`['k_salsa1','k_salsa2','k_salsa3'].flatMap(k=>DEFAULT_SEQS[k].items.filter(i=>!['b_s_rueckb','b_s_dile','b_s_ench','b_s_vacilala','b_s_sombrero','b_s_kreuzgs','b_s_setenta','b_s_kentucky','b_s_adios','b_s_tumba','b_s_montana'].includes(i.fig)).map(i=>k+': '+i.fig))`)));
test('bestehendes Profil mit eigener Folge bekommt die neuen Vorlagen dazu',()=>{ const alt={figures:{},seqs:{s_eigen:{name:'Meine',bpm:100,items:[{fig:'b_d_gs',rep:1}]},s_walzer:{name:'geändert',bpm:90,items:[{fig:'b_w_box',rep:3}]}},seen:['s_walzer','s_eigen']};
  const c2=ladeAlles(alt), r=lauf(c2,`[!!user.seqs.s_eigen, user.seqs.s_walzer.name, !!user.seqs.k_slowfox1, !!user.seqs.k_salsa2, user.seen.includes('k_quick1')]`); return r.join()==='true,geändert,true,true,true'||r.join(); });

/* ---------- Offline-Speicher (sw.js) ---------- */
test('Offline: der Service Worker findet alle Dateien der Seite',()=>{ const c3={self:{addEventListener(){}},caches:{},fetch:()=>{}}; vm.createContext(c3); vm.runInContext(fs.readFileSync(path.join(ROOT,'sw.js'),'utf8')+';this.D=dateienAus;',c3);
  const html=fs.readFileSync(path.join(ROOT,'tanzsimulator.html'),'utf8'), l=c3.D(html), fehlt=skripte().filter(f=>!l.some(u=>u.startsWith(f+'?')||u===f));
  return !fehlt.length&&l.some(u=>/tanzsimulator\.css/.test(u))&&l.some(u=>/icon-192/.test(u))||'fehlt: '+fehlt.join(', '); });

/* ---------- Import und geteilte Links ---------- */
test('Import: gültige Figur und Folge werden übernommen',()=>{ const r=R(`importPruefen({figures:{u_test:{name:'Meine',dance:'Tango',bpm:120,steps:[S('L','vor',30,2,'S'),S('R','vor',30,2,'S')]}},seqs:{s_test:{name:'F',bpm:120,items:[{fig:'u_test',rep:2},{fig:'b_t_gs',rep:1}]}}})`);
  return Object.keys(r.figures).length===1&&r.seqs.s_test.items.length===2&&!r.fehler.length||JSON.stringify(r).slice(0,300); });
test('Import: kaputte Schritte, unbekannte Figuren und vorgegebene IDs werden abgewiesen',()=>{ const r=R(`importPruefen({figures:{u_a:{name:'A',steps:[{f:'X',dir:'vor',len:30,d:1,c:'1'}]},u_b:{name:'B',steps:[{f:'L',dir:'fliegen',len:30,d:1,c:'1'}]},b_w_box:{name:'Überschreiben',steps:[S('L','vor',30,1,'1')]},'<bad>':{name:'X',steps:[]},u_c:{name:'C',steps:[S('L','vor',30,1,'1')],dame:[S('R','rueck',30,2,'1')]}},seqs:{s_x:{name:'X',items:[{fig:'gibtsnicht'}]},s_y:{name:'Y',items:[{fig:'b_w_box'},{fig:'gibtsnicht'}]}}})`);
  return !Object.keys(r.figures).length&&!r.seqs.s_x&&r.seqs.s_y.items.length===1&&r.fehler.length>=5&&r.warnungen.length>=2||JSON.stringify(r).slice(0,400); });
test('Import: Werte werden begrenzt (Wiederholungen, Tempo, Textlänge)',()=>{ const r=R(`importPruefen({figures:{},seqs:{s_z:{name:'x'.repeat(500),bpm:9999,items:[{fig:'b_w_box',rep:999}]}}})`); return r.seqs.s_z.name.length===80&&r.seqs.s_z.bpm===260&&r.seqs.s_z.items[0].rep===32||JSON.stringify(r).slice(0,200); });

/* ---------- Abstand, Schrittweite, Haltungen ---------- */
test('Right Side Pass: keine Riesenschritte mehr (unter 0,6 m)',()=>{ const m=R(`(()=>{ const t=simulate(flatten({items:[{fig:'b_wc_passR',rep:2}]}),{H:startH(),noSteer:true}); let mx=0; for(const r of t.H.concat(t.D)) if(r.kind==='step') mx=Math.max(mx,Math.hypot(r.to[0]-r.other[0],r.to[1]-r.other[1])); return mx; })()`); return m<.6||m.toFixed(2); });
test('Abstandsausgleich: in keiner Beispiel- oder Kursfolge kommen sich die Partner näher als 18 cm',()=>liste(R(`Object.entries(DEFAULT_SEQS).filter(([k,s])=>{ const t=simulate(flatten({items:s.items.concat(s.items)}),{H:startH()}); for(let b=0;b<t.total;b+=.1){ const a=evalRaw(t.H,b),d=evalRaw(t.D,b); if(Math.hypot(a.sup[0]-d.sup[0],a.sup[1]-d.sup[1])<.18) return true; } return false; }).map(([k])=>k)`)));
test('Lehrplan-Ergänzung: 73 Figuren vorhanden',()=>R(`LEHRPLAN_NEU.length===73&&LEHRPLAN_NEU.every(k=>BUILTIN[k])`)||R(`LEHRPLAN_NEU.length`));
test('Lehrplan-Ergänzung: jede neue Figur ohne Zusammenstoß (Abstand mindestens 20 cm)',()=>liste(R(`LEHRPLAN_NEU.filter(k=>{ const m=figMeta(BUILTIN[k],k), t=simulate(flatten({items:[{fig:k,rep:uebergang(m,m).ok?2:1}]}),{H:startH()}); for(let b=0;b<t.total;b+=.1){ const a=evalRaw(t.H,b),d=evalRaw(t.D,b); if(Math.hypot(a.sup[0]-d.sup[0],a.sup[1]-d.sup[1])<.2) return true; } return false; })`)));
test('Abgleichliste: jede Figur ohne offenen Grund ist umgesetzt',()=>liste(R(`Object.entries(SYLLABUS).flatMap(([d,s])=>Object.values(s).flat().filter(e=>!e.includes('=')&&!OFFEN_GRUND[d+'|'+e]).map(e=>d+': '+e))`)));
test('Armführung: jedes „arm“-Feld ist gültig, New Yorker und Hockeystick haben ihre Armaktion',()=>{ const r=R(`[Object.entries(BUILTIN).flatMap(([k,F])=>F.steps.filter(s=>s.arm&&!ARME[s.arm]).map(()=>k)), BUILTIN.b_c_ny.steps[0].arm, BUILTIN.b_c_hockey.steps[0].arm]`); return r[0].length===0&&r[1]==='aus'&&r[2]==='zug'||JSON.stringify(r); });
test('Armführung: Zeitleiste trägt die Armaktion und blendet einen Hinweis ein',()=>{ const r=R(`(()=>{ const t=simulate(flatten({items:[{fig:'b_c_closedhip',rep:1}]}),{H:startH()}); return [t.H[5].arm,t.H[5].tip]; })()`); return r[0]==='zug'&&/heran/.test(r[1])||JSON.stringify(r); });
test('Import: gültige Armaktion bleibt, unbekannte wird verworfen',()=>{ const r=R(`importPruefen({figures:{u_a:{name:'A',dance:'Tango',bpm:120,steps:[{f:'L',dir:'vor',len:30,d:2,c:'S',turn:0,arm:'aus'},{f:'R',dir:'vor',len:30,d:2,c:'S',turn:0,arm:'boese'}]}},seqs:{}}).figures.u_a.steps.map(s=>s.arm||'-')`); return r.join()==='aus,-'||r.join(); });
test('neue Haltungen haben Namen, Hinweis und Geometrie',()=>liste(R(`['hochB','hammer','schal','brezel','schulter'].filter(h=>!HOLDS[h]||!HOLD_TIP[h]||!holdGeo(h,STYLES.social))`)));
test('Abgleichliste: offene Gründe gehören zu offenen Einträgen',()=>liste(R(`Object.keys(OFFEN_GRUND).filter(k=>{ const [d,n]=k.split('|'); return !SYLLABUS[d]||!Object.values(SYLLABUS[d]).flat().includes(n); })`)));

/* ---------- Technik je Figur vollständig ---------- */
test('jede Figur: alle Technikfelder für jeden Schritt beider Rollen, mit Ausrichtung',()=>liste(R(`Object.entries(BUILTIN).filter(([k,F])=>{ const t=technikFigur(F,k);
  return !t.H.length||!t.D.length||t.H.concat(t.D).some(x=>!/^[LR]$/.test(x.belastet)||!/^[LR]$/.test(x.frei)||!x.technik||typeof x.heel!=='boolean'||typeof x.toe!=='boolean'||typeof x.ball!=='boolean'||typeof x.flat!=='boolean'||!x.heben||!x.senken||typeof x.cbm!=='boolean'||typeof x.cbmp!=='boolean'||!x.ausrichtung||!x.sway); }).map(([k])=>k)`)));
test('Heben und Senken: Walzer-Grundschritt (am Ende von 1, hebt auf 2, senkt am Ende von 3)',()=>{ const t=R(`technikVon(BUILTIN.b_w_box.steps,styleOf('Langsamer Walzer')).slice(0,3).map(x=>x.heben+'/'+x.senken)`); return t.join()==='am Ende/–,hebt/–,oben/am Ende'||t.join(); });
test('Heben und Senken: Slowfox-Federschritt (S hebt am Ende, Q oben, letztes Q senkt)',()=>{ const t=R(`technikVon(BUILTIN.b_sf_feder.steps,styleOf('Slowfox')).map(x=>x.heben+'/'+x.senken)`); return t.join()==='am Ende/–,oben/–,oben/am Ende'||t.join(); });
test('Ausrichtung im Katalog: Walzer-Grundschritt beginnt in Tanzrichtung',()=>R(`technikFigur(BUILTIN.b_w_box,'b_w_box').H[0].ausrichtung`)==='LOD'||'falsch');

/* ---------- Ergebnis ---------- */
console.log(`${ok} Tests bestanden, ${fail} fehlgeschlagen`);
for(const f of fehler) console.log('  ✖ '+f);
process.exit(fail?1:0);
