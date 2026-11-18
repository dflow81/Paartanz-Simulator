/* ================= Technikdaten, Tanzlehrer-Texte und Figuren-Qualitätsprüfung =================
   Läuft ohne Fenster (auch in den Tests). Die Technikangaben werden nach festen Regeln aus den Schritten ABGELEITET
   (Richtung, Drehung, Zählzeit, Tanzstil). Sie sind eine Lernhilfe und ersetzen kein Technikbuch. */

/* Fußtechnik: H = Ferse, T = Spitze, B = Ballen, F = ganzer Fuß */
const FUSS_TEXT={H:'Ferse',T:'Spitze',B:'Ballen',F:'ganzer Fuß'};
function fussTechnik(dir,sty){
  if(dir==='halt') return '–';
  if(/^tap|^kick/.test(dir)) return 'T';
  if(dir==='ferse') return 'HT';
  if(dir==='platz') return 'BF';
  const vor=/^(vor|vorAussen|diagVor)$/.test(dir), rueck=/^(rueck|rueckAussen|diagRueck)$/.test(dir);
  if(sty.std&&sty.rise) return vor?'HT':rueck?'TH':dir==='schliessen'?'TH':'T';   // Schwungtänze
  if(sty.std) return vor?'HF':'BF';                                                // Tango, Paso Doble
  if(sty===STYLES.social) return vor?'HF':'BF';
  return 'BF';                                                                     // Latein und Swing: über den Ballen
}
const riseWert=c=>RISE[String(c??'').trim()]??.5;
/* Heben und Senken aus der Zählzeit: vergleicht den Schritt mit dem vorigen und dem nächsten */
function riseText(steps,i,sty){
  if(!sty.rise) return 'keine';
  const a=riseWert(steps[(i-1+steps.length)%steps.length].c), b=riseWert(steps[i].c), c=riseWert(steps[(i+1)%steps.length].c);
  if(b>=a+.3) return b>=.7&&c<.4?'hebt, senkt am Ende':'hebt';
  if(b>=.7) return c<.4?'oben, senkt am Ende':'oben';
  return a>=.6?'senkt':'unten';
}
/* Technik eines ganzen Ablaufs. steps = Schritte einer Figur oder Einträge der Zeitleiste; alle Angaben aus Sicht dieses Tänzers */
function technikVon(steps,sty){
  let last=null;
  return steps.map((s,i)=>{
    const dir=s.dir, gewicht=!OHNE_GEWICHT.has(dir), turn=+s.turn||0, code=fussTechnik(dir,sty);
    if(gewicht) last=s.f; const bel=last||(s.f==='L'?'R':'L');
    const prev=steps[i-1], dreht=turn!==0||(prev&&(+prev.turn||0)!==0);
    return {nr:i+1,c:s.c,fuss:s.f,belastet:bel,frei:bel==='L'?'R':'L',technik:code,
      heel:code.includes('H'),toe:code.includes('T'),ball:code.includes('B'),flat:code.includes('F'),
      rise:riseText(steps,i,sty),
      cbm:!!sty.std&&Math.abs(turn)>=30&&/^(vor|rueck|vorAussen|rueckAussen|diagVor)$/.test(dir),
      cbmp:/^kreuz|Aussen$/.test(dir),
      sway:sty.std&&sty.rise?(i>0&&dreht&&gewicht?(turn||(prev&&+prev.turn)||0)<0?'rechts':'links':'gerade'):'–'};
  });
}

/* ---------- Ausrichtung im Raum (Alignment) ----------
   Tanzrichtung (Line of Dance): gegen den Uhrzeigersinn, die Wand liegt rechts vom Herrn, wenn er in Tanzrichtung schaut. */
const SEITEN=[{n:'Seite A',v:[1,0],w:p=>ROOM.d/2-p[1]},{n:'Seite B',v:[0,-1],w:p=>ROOM.w/2-p[0]},{n:'Seite C',v:[-1,0],w:p=>p[1]+ROOM.d/2},{n:'Seite D',v:[0,1],w:p=>p[0]+ROOM.w/2}];
const ECKE=1.6;
function raumLage(p){
  const s=SEITEN.reduce((a,b)=>b.w(p)<a.w(p)?b:a), nah=SEITEN.filter(x=>x.w(p)<ECKE);
  return {seite:s.n,lod:s.v,langeSeite:Math.abs(s.v[0])>0?ROOM.w>=ROOM.d:ROOM.d>ROOM.w,ecke:nah.length>=2};
}
const AUSRICHT=[[0,'LOD','in Tanzrichtung'],[45,'DC','diagonal zur Mitte'],[90,'C','zur Mitte'],[135,'DC gegen LOD','diagonal zur Mitte, gegen die Tanzrichtung'],
  [180,'gegen LOD','gegen die Tanzrichtung'],[-135,'DW gegen LOD','diagonal zur Wand, gegen die Tanzrichtung'],[-90,'W','zur Wand'],[-45,'DW','diagonal zur Wand']];
function ausrichtung(p,h){
  const r=raumLage(p), lodH=Math.atan2(r.lod[0],r.lod[1]), a=wrap(h-lodH)/RAD;
  const t=AUSRICHT.reduce((x,y)=>Math.abs(wrap((a-y[0])*RAD))<Math.abs(wrap((a-x[0])*RAD))?y:x);
  return {...r,kurz:t[1],lang:t[2],grad:Math.round(a)};
}

/* ---------- Tanzlehrer: Hinweise nach Figurentyp und Tanzstil ---------- */
const LEHRER_ART={
  gs:{f:['Schritte zu groß: Gleichgewicht geht verloren','Gewicht wird nicht vollständig auf den neuen Fuß verlagert'],h:['Führe aus der Körpermitte, nicht aus den Armen'],d:['Warte auf die Führung und bleibe im eigenen Gleichgewicht']},
  dreh:{f:['Die Drehung kommt aus den Armen statt aus dem Körper','Zu früh zu weit gedreht: das Paar verliert die Richtung','Partner verlieren den Körperkontakt in der Drehung'],h:['Beginne die Drehung mit dem Körper, bevor der Fuß setzt'],d:['Bleibe in deinem Rahmen und lass dich mitnehmen, ohne vorauszudrehen']},
  solo:{f:['Der Arm wird gezogen statt geführt','Standbein ist nicht unter dem Körper: die Drehung kippt','Kopf bleibt nicht aufrecht, Schwindel und Unsicherheit'],h:['Hand locker über den Kopf der Dame führen, nicht festhalten','Bleib am Platz und gib ihr Raum'],d:['Drehe auf dem Ballen über der eigenen Achse','Halte Spannung im Arm, aber drücke nicht gegen die Hand']},
  pos:{f:['Die Laufwege kreuzen sich: Partner stoßen zusammen','Die Hände werden zu früh gelöst oder zu spät gewechselt'],h:['Mach den Weg frei und führe die Dame deutlich vor dem Schritt'],d:['Gehe den Weg bis zum Ende, kürze nicht ab']},
  prom:{f:['Oberkörper öffnen sich zu weit: die Haltung bricht auf','Herr und Dame laufen nicht parallel'],h:['Öffne die Dame mit dem Körper, die Hüften bleiben nah'],d:['Kopf nach rechts öffnen und den Weg des Herrn mitgehen']},
  verb:{f:['Schrittgröße passt nicht zum Partner','Der Wechsel wird gehetzt statt im Takt getanzt'],h:['Zeige die neue Richtung frühzeitig an'],d:['Schritte gleichmäßig lang halten']},
  eff:{f:['Der Effekt wird übertrieben und stört den Fluss','Timing weicht vom Takt ab'],h:['Effekt vorbereiten und klar führen'],d:['Nicht vorwegnehmen, sondern der Führung folgen']},
};
const LEHRER_STIL={
  swing:{t:['Heben und Senken gleichmäßig über den Takt verteilen','Schwung aus dem Vorwärtsschritt über die Ferse aufnehmen'],f:['Heben kommt zu früh oder ruckartig']},
  tango:{t:['Knie bleiben gebeugt, kein Heben und Senken','Schritte setzen scharf an und enden ruhig (Staccato)'],f:['Oberkörper wippt beim Gehen auf und ab']},
  latin:{t:['Schritt erst auf dem Ballen, dann Ferse absetzen, Knie strecken','Hüfte bewegt sich als Folge der Gewichtsverlagerung'],f:['Hüfte wird aktiv geschoben, das Gewicht folgt nicht']},
  bounce:{t:['Federn aus den Knien, Oberkörper bleibt ruhig','Füße nah am Boden halten'],f:['Sprünge werden zu hoch, das Tempo geht verloren']},
  social:{t:['Kleine, entspannte Schritte, gleichmäßiger Puls','Führung über eine lockere, klare Handverbindung'],f:['Schritte werden zu groß, die Partner entfernen sich']},
};
const stilKey=sty=>sty.std&&sty.rise?'swing':sty.std?'tango':sty===STYLES.latin?'latin':sty===STYLES.bounce?'bounce':'social';
function lehrerDaten(F,id){
  const m=figMeta(F,id), sty=styleOf(F.dance), a=LEHRER_ART[m.art]||LEHRER_ART.eff, s=LEHRER_STIL[stilKey(sty)], t=technikVon(F.steps,sty);
  const tech=[...s.t]; if(t.some(x=>x.cbm)) tech.push('Gegenbewegung (CBM) zu Beginn der Drehung: Körper dreht zum vorgehenden Fuß hin');
  if(t.some(x=>x.cbmp)) tech.push('Gekreuzte Schritte in Gegenbewegungsposition (CBMP) setzen'); if(m.haltStart!==m.haltEnde) tech.push(`Haltungswechsel: ${HOLDS[m.haltStart][0]} → ${HOLDS[m.haltEnde][0]}`);
  return {name:F.name,meta:m,beschreibung:m.text,technik:tech,fehler:[...a.f,...s.f],herr:a.h,dame:a.d,schritte:t};
}

/* ---------- Figuren-Qualitätsprüfung ----------
   Prüft eine Figur auf Startfuß, Endfuß, Gewichtswechsel, Takt und Anschlussfähigkeit. Ergebnis: Liste von {art:'fehler'|'warnung', text}. */
function gewichtsFehler(steps,wer){
  const out=[]; let g=null;
  steps.forEach((s,i)=>{ if(s.dir==='halt') return;
    if(OHNE_GEWICHT.has(s.dir)){ if(g===s.f) out.push(`${wer}, Schritt ${i+1}: ${s.f==='L'?'linker':'rechter'} Fuß trägt das Gewicht und kann nicht tippen`); return; }
    if(s.dir!=='platz'&&g===s.f) out.push(`${wer}, Schritt ${i+1}: zweimal hintereinander ${fussName(s.f)} ohne Gewichtswechsel`);
    g=s.f; });
  return out;
}
function qualitaetFigur(F,id,figs=allFigs()){
  const q=[], feh=t=>q.push({art:'fehler',text:t}), war=t=>q.push({art:'warnung',text:t});
  if(!F.steps||!F.steps.length){ feh('Die Figur hat keine Schritte'); return q; }
  const m=figMeta(F,id);
  if(!m.herr.start||!m.herr.ende) feh('Startfuß oder Endfuß des Herrn ist nicht bestimmbar');
  if(!m.dame.start||!m.dame.ende) feh('Startfuß oder Endfuß der Dame ist nicht bestimmbar');
  gewichtsFehler(F.steps,'Herr').forEach(feh); if(hatDame(F)) gewichtsFehler(F.dame,'Dame').forEach(feh);
  const beats=x=>x.reduce((a,s)=>a+Math.max(.25,+s.d||1),0);
  if(hatDame(F)&&Math.abs(beats(F.steps)-beats(F.dame))>1e-6) feh(`Herr ${beats(F.steps)} und Dame ${beats(F.dame)} Schläge: gleiche Länge nötig`);
  const einheit=/disco/i.test(F.dance||'')?3:taktOf(F.dance)===3?3:2, n=m.schlaege/einheit;
  if(Math.abs(n-Math.round(n))>1e-6) war(`${m.schlaege} Schläge passen nicht auf ${einheit===3?'Dreiergruppen':'halbe Takte'}`);
  if(F.steps.some(s=>s.c===undefined||s.c==='')) war('Mindestens ein Schritt hat keine Zählzeit');
  if(F.steps.concat(F.dame||[]).some(s=>(+s.len||0)>80)) war('Ein Schritt ist länger als 80 cm');
  const liste=Object.entries(figs).filter(([k,f])=>(f.dance||'Sonstige')===m.tanz&&f.steps&&f.steps.length).map(([k,f])=>figMeta(f,k));
  if(!liste.some(b=>uebergang(m,b).ok)) feh('Keine Figur dieses Tanzes kann auf diese Figur folgen');
  if(!liste.some(a=>uebergang(a,m).ok)) war('Keine Figur dieses Tanzes führt zu dieser Figur hin');
  return q;
}
/* Prüft alle Figuren (optional nur einen Tanz). Ergebnis: {geprueft, fehler, warnungen, liste:[{id,name,tanz,q}]} */
function qualitaetAlle(tanz,figs=allFigs()){
  const liste=[]; let f=0,w=0,n=0;
  for(const [k,F] of Object.entries(figs)){ if(tanz&&(F.dance||'Sonstige')!==tanz) continue; n++;
    const q=qualitaetFigur(F,k,figs); f+=q.filter(x=>x.art==='fehler').length; w+=q.filter(x=>x.art==='warnung').length;
    if(q.length) liste.push({id:k,name:F.name,tanz:F.dance,q}); }
  return {geprueft:n,fehler:f,warnungen:w,liste};
}
