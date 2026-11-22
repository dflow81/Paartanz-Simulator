/* ================= Figuren-Metadaten, Kursstufen, Übergangsprüfung und Folgen-Generator =================
   Die Figuren bleiben, wie sie sind: tanz(...) mit ihren Schritten. Alles, was sich aus den Schritten ablesen lässt –
   Start- und Endfuß von Herr und Dame, Haltung am Anfang und Ende, Drehung, Schläge, Rhythmus –, wird hier berechnet.
   So kann es nie von den Schritten abweichen. Was sich nicht ablesen lässt (Kursstufe, Figurentyp, Beschreibung),
   steht in figuren/info.js. Fehlt dort ein Eintrag, wird die Stufe aus dem Schwierigkeitsgrad geschätzt und als
   „geschätzt“ gekennzeichnet. Wird nach engine.js geladen; braucht kein Fenster (läuft auch in den Tests unter Node). */

/* Kursstufen: angelehnt an den Aufbau üblicher Tanzschulkurse (Welttanzprogramm, Bronze, Silber, Gold).
   Das ist eine Orientierung, keine offizielle Zuordnung eines Verbands. */
const STUFEN=['','Einsteiger (WTP 1)','Bronze','Silber','Gold','Goldstar','Turnier','Freies Tanzen'];
const STUFE_MAX=STUFEN.length-1;
const ARTEN={gs:'Grundschritt',dreh:'Drehung',solo:'Solo- und Unterarmdrehung',pos:'Platz- und Positionswechsel',
  prom:'Promenade und offene Figuren',verb:'Verbindung und Wechsel',eff:'Effekt und Variation'};
const OHNE_GEWICHT=new Set(['tap','tapSeit','tapRueck','kick','halt']);
const fussName=f=>f==='L'?'links':f==='R'?'rechts':'–';

/* Start und Ende einer Schrittreihe. start = erster Fuß, der sich bewegt; frei = beginnt mit „Platz“ (Gewicht verlagern,
   geht mit beiden Füßen); ende = Fuß, auf dem zuletzt das Gewicht landet. Ein Tap oder Kick braucht wie ein Schritt den freien Fuß. */
function fussVon(steps){
  const a=steps.find(s=>s.dir!=='halt'), w=steps.filter(s=>!OHNE_GEWICHT.has(s.dir));
  return {start:a?a.f:null, frei:!!a&&a.dir==='platz', ende:w.length?w.at(-1).f:null};
}
const hatDame=F=>Array.isArray(F.dame)&&F.dame.length>0;
const haltOf=s=>HOLDS[s.hold]?s.hold:'zu';
const taktOf=d=>taktVon(d);   // eine Taktquelle für Engine, Metadaten und Prüfung (TANZ_DATEN in engine.js)

/* Schwierigkeit 1–5: Anzahl der Schritte, Drehung, eigene Schritte der Dame, Haltungswechsel, Synkopen, Solodrehungen */
function schwierigkeit(F){
  const st=F.steps, own=hatDame(F), dr=x=>x.reduce((a,s)=>a+Math.abs(+s.turn||0),0);
  const holds=st.map(haltOf), wechsel=holds.filter((h,i)=>i&&h!==holds[i-1]).length;
  const solo=Math.max(0,...st.map(s=>Math.abs(+s.turn||0)),...(own?F.dame.map(s=>Math.abs(+s.turn||0)):[0]));
  let p=Math.min(1.2,st.length/10)+Math.min(1.3,(dr(st)+(own?dr(F.dame):0))/400)+(own?.5:0)+Math.min(.9,wechsel*.3)
    +(st.some(s=>(+s.d||1)<1)?.35:0)+(solo>=135?.5:0)+(solo>=300?.4:0);
  return clamp(Math.round(p*1.6+.3),1,5);
}
const GS_NAME=/Grundschritt|Basic|Gehschritte|Seitschritt|am Platz|Karree|Time Step|Sur Place|Wiegeschritt|Walks?\b/i;
function schaetzArt(F,meta){
  const n=F.name;
  if(/Platzwechsel|Körbchen|Schatten|Fächer|Wick|Hockey|Alemana|Brezel|Tunnel|Schal|Hammerlock|Wrap|Schulterfass|Handwechsel|Opening|Hip Twist|Towel|Windmill|Stop and Go|Goes/i.test(n)) return 'pos';
  if(hatDame(F)&&F.dame.some(s=>Math.abs(+s.turn||0)>=135)||/solo|Damendrehung|Unterarm|Spin/i.test(n)) return 'solo';
  if(GS_NAME.test(n)) return 'gs';
  if(/drehung|Kreisel|Volta|Rolle|Telemark|Impetus|Fleckerl|Turn|Top\b|Kehre/i.test(n)) return 'dreh';
  if(/Promenade|Fallaway|New Yorker|Hand to Hand|offen|Botafogo/i.test(n)||meta.halten.some(h=>h==='prom'||h==='offen')) return 'prom';
  if(/Wechsel|Chassé|Link|Lock|Kreuz|Corté|Corte/i.test(n)) return 'verb';
  return 'eff';
}
function schaetzStufe(F,art,schwer){
  if(art==='gs'&&schwer<=3) return 1;
  return schwer<=2?2:schwer===3?3:4;
}
const drehText=t=>{ if(!t) return ''; const a=Math.abs(t), q={45:'⅛',90:'¼',135:'⅜',180:'½',270:'¾',360:'ganze'}[a]; return (q?q+' ':a+'° ')+(t>0?'Linksdrehung':'Rechtsdrehung'); };
function autoText(F,m){
  const a=F.steps.find(s=>s.dir!=='halt'), n=F.steps.filter(s=>s.dir!=='halt').length;
  return `Herr beginnt ${fussName(a&&a.f)} ${DIRS[a&&a.dir]||''}; ${n} Schritte in ${m.schlaege} Schlägen`+(m.drehung?', '+drehText(m.drehung):'')
    +(m.haltStart!==m.haltEnde?`; von „${HOLDS[m.haltStart][0]}“ nach „${HOLDS[m.haltEnde][0]}“`:`; Haltung „${HOLDS[m.haltStart][0]}“`)
    +(hatDame(F)?'. Die Dame tanzt eigene Schritte.':'.');
}

/* Alle Angaben zu einer Figur. id ist der Schlüssel (für die Angaben aus figuren/info.js). */
function figMeta(F,id){
  const st=F.steps||[], own=hatDame(F), h=fussVon(st);
  const d=own?fussVon(F.dame):{start:h.start&&O(h.start),frei:h.frei,ende:h.ende&&O(h.ende)};
  const halten=st.map(haltOf), schlaege=st.reduce((a,s)=>a+Math.max(.25,+s.d||1),0);
  const m={id,tanz:F.dance||'Sonstige',name:F.name,eigen:!F.builtin,herr:h,dame:d,dameEigen:own,halten,
    haltStart:halten[0]||'zu',haltEnde:halten.at(-1)||'zu',schlaege,takte:+(schlaege/taktOf(F.dance)).toFixed(2),
    drehung:st.reduce((a,s)=>a+(+s.turn||0),0),rhythmus:st.filter(s=>s.dir!=='halt').map(s=>s.c).join(' ')};
  const inf=(typeof INFO!=='undefined'&&id&&INFO[id])||[];
  m.schwer=schwierigkeit(F);
  m.art=ARTEN[inf[1]]?inf[1]:schaetzArt(F,m);
  m.stufe=inf[0]||schaetzStufe(F,m.art,m.schwer);
  m.stufeFest=!!inf[0];
  m.text=inf[2]||autoText(F,m);
  const al=typeof ALIAS!=='undefined'&&id&&ALIAS[id];
  m.vereinfacht=inf[3]==='v'||!!(al&&al[2]==='v'); m.schematisch=inf[3]==='s';
  if(al) m.alias={ziel:al[0],text:al[1]};
  if(typeof QUELLEN!=='undefined'&&id&&QUELLEN[id]) m.quelle=QUELLEN[id];
  if(typeof RHYTHMUS_VARIANTE!=='undefined'&&id&&RHYTHMUS_VARIANTE[id]) m.rhythmusVariante=RHYTHMUS_VARIANTE[id];
  return m;
}
/* Grundhaltung eines Tanzes = Haltung, in der seine erste Figur (der Grundschritt) beginnt */
function grundHaltung(dance){
  const e=Object.entries(BUILTIN).find(([k,F])=>F.dance===dance);
  return e?haltOf(e[1].steps[0]):'zu';
}

/* ---------- Übergangsprüfung ----------
   Eine Figur B darf auf A folgen, wenn
   – beide zum selben Tanz gehören,
   – Herr und Dame B mit dem Fuß beginnen, der am Ende von A frei ist (oder B mit „Platz“ beginnt),
   – die Haltung passt. Feste Regeln (fachlich eindeutig):
       · In den Fächer und aus dem Fächer geht es nur mit Figuren, die genau dort enden bzw. beginnen.
       · Endet eine Figur in einer Seitenposition (Körbchen, Schatten), muss die nächste dort beginnen.
       · In den fünf Standardtänzen muss auf eine Figur, die in der Promenade endet, eine Figur folgen,
         die in der Promenade beginnt (z. B. Chassé aus der Promenade, Weave aus der Promenade).
     Alle anderen Haltungswechsel sind erlaubt und werden als Hinweis gemeldet. Beginnt eine Standardfigur in der
     Promenade, ohne dass die vorige dort endet, gilt der Wechsel als „vereinfacht“: Die Figur öffnet selbst in die
     Promenade, nach Technikbuch käme vorher eine Figur, die in der Promenade endet (z. B. Link).
   Die Richtung im Raum ist kein Hindernis: Alle Figuren sind relativ zur Blickrichtung beschrieben, und die
   Engine lenkt das Paar beim Tanzen so, dass es auf der Fläche bleibt. Ob das gelingt, prüft folgePruefen(). */
const HALT_ART={zu:'eng',prom:'eng',offen:'hand',LR:'hand',RL:'hand',hoch:'hand',kreuz:'hand',frei:'hand',korb:'seite',schatten:'seite',faecher:'faecher',hochB:'hand',hammer:'hand',schal:'hand',brezel:'hand',schulter:'eng'};
function uebergang(A,B){
  const g=[]; let ok=true, wechsel=false, vereinfacht=false;
  if(A.tanz!==B.tanz){ ok=false; g.push('anderer Tanz ('+A.tanz+' / '+B.tanz+')'); }
  const fuss=(wer,e,b)=>{ if(e&&b.start&&!b.frei&&b.start===e){ ok=false; g.push(`${wer} beginnt ${fussName(b.start)}, steht aber am Ende von „${A.name}“ auf diesem Fuß`); } };
  fuss('Herr',A.herr.ende,B.herr); fuss('Dame',A.dame.ende,B.dame);
  const a=A.haltEnde, b=B.haltStart;
  if(a!==b){
    if(HALT_ART[a]==='faecher'){ ok=false; g.push('aus dem Fächer geht es nur mit einer Figur weiter, die im Fächer beginnt (Hockeystick, Alemana …)'); }
    else if(HALT_ART[b]==='faecher'){ ok=false; g.push('in den Fächer führt nur eine Fächer-Figur'); }
    else if(HALT_ART[a]==='seite'){ ok=false; g.push(`„${A.name}“ endet in der Seitenposition „${HOLDS[a][0]}“ – die nächste Figur muss dort beginnen`); }
    else if(a==='prom'&&istStandard(A.tanz)){ ok=false; g.push(`„${A.name}“ endet in der Promenade – im Standardtanz folgt eine Figur, die in der Promenade beginnt`); }
    else { wechsel=true; vereinfacht=b==='prom'&&istStandard(B.tanz);
      g.push('Haltungswechsel: '+HOLDS[a][0]+' → '+HOLDS[b][0]+(vereinfacht?' (vereinfacht: die Figur öffnet selbst in die Promenade)':'')); }
  }
  return {ok,wechsel,vereinfacht,gruende:g};
}
/* Mögliche Anschlussfiguren (gleiche Haltung zuerst) */
function anschluesse(id,figs=allFigs(),mf=(k,F)=>figMeta(F,k)){
  const A=mf(id,figs[id]), out=[];
  for(const [k,F] of Object.entries(figs)) if((F.dance||'Sonstige')===A.tanz&&F.steps&&F.steps.length){ const u=uebergang(A,mf(k,F)); if(u.ok) out.push([k,u.wechsel]); }
  return out.sort((x,y)=>x[1]-y[1]).map(x=>x[0]);
}
/* Schleife: Passt die erste Figur wieder an die letzte? (Beim Abspielen beginnt die Folge von vorn.) */
function schleifePruefen(items,figs=allFigs()){
  if(!items.length) return {ok:false,gruende:['Die Folge ist leer']};
  const a=items.at(-1), b=items[0], A=figs[a.fig], B=figs[b.fig];
  if(!A||!B) return {ok:false,gruende:['Figur fehlt']};
  return uebergang(figMeta(A,a.fig),figMeta(B,b.fig));
}

/* Prüft eine ganze Folge: jeden Übergang, die Kursstufe, Wiederholungen und – durch Simulation – Fußarbeit und Raum.
   opt = {tanz, bisStufe, wdh, schnell, schleife}. schleife: auch den Übergang von der letzten zur ersten Figur prüfen.
   Gibt {fehler:[], warnungen:[], hinweise:[]} zurück; fehler leer = gültig. */
function folgePruefen(items,opt={},figs=allFigs()){
  const fehler=[],warnungen=[],hinweise=[];
  if(!Array.isArray(items)||!items.length) return {fehler:['Die Folge ist leer – mindestens eine Figur eintragen'],warnungen,hinweise};
  const M=items.map(it=>figs[it.fig]?figMeta(figs[it.fig],it.fig):null);
  items.forEach((it,i)=>{ if(!M[i]) fehler.push(`Figur ${i+1} („${it.fig}“) gibt es nicht`); });
  if(fehler.length) return {fehler,warnungen,hinweise};
  const tanz=opt.tanz||M[0].tanz;
  const meld=(txt,u)=>{ if(!u.ok) fehler.push(txt+u.gruende.join('; ')); else if(u.wechsel) hinweise.push(txt+u.gruende.join('; ')); };
  M.forEach((m,i)=>{
    if(m.tanz!==tanz) fehler.push(`„${m.name}“ gehört zu ${m.tanz}, nicht zu ${tanz}`);
    if(opt.bisStufe&&m.stufe>opt.bisStufe) warnungen.push(`„${m.name}“ ist ${STUFEN[m.stufe]}, also über der gewählten Stufe`);
    if(m.eigen) hinweise.push(`„${m.name}“ ist eine eigene Figur – Kursstufe und Haltung sind nur geschätzt`);
    if((items[i].rep||1)>1) meld(`${i+1}. „${m.name}“ × ${items[i].rep} (Wiederholung): `,uebergang(m,m));
    if(i+1<M.length) meld(`${i+1}. „${m.name}“ → „${M[i+1].name}“: `,uebergang(m,M[i+1]));
    if(i+1<M.length&&items[i+1].fig===items[i].fig&&!opt.wdh) warnungen.push(`„${m.name}“ steht zweimal hintereinander – besser „× 2“ eintragen`);
  });
  if(opt.schleife&&M.length) meld(`Schleife: „${M.at(-1).name}“ → „${M[0].name}“: `,uebergang(M.at(-1),M[0]));
  // Simulation mit derselben Figurenbibliothek: gleiche Prüfung, die beim Abspielen das ⚠ zeigt, und Raum
  try{
    const tl=simulate(flatten({items},figs),{H:startH(),noSteer:!!opt.schnell}); let out=0;   // schnell: ohne Raumlenkung und ohne Raumprüfung
    if(tl.H.concat(tl.D).some(r=>r.warn)) fehler.push('Beim Durchtanzen wird ein Schritt mit dem belasteten Fuß verlangt');
    if(!opt.schnell) for(let t=0;t<tl.total;t+=1){ const a=evalRaw(tl.H,t),b=evalRaw(tl.D,t); out=Math.max(out,outside([(a.sup[0]+b.sup[0])/2,(a.sup[1]+b.sup[1])/2])); }
    if(out>.3) warnungen.push(`Die Folge führt bis ${out.toFixed(1)} m über den Rand der Tanzfläche hinaus`);
  }catch(e){ fehler.push('Die Folge konnte nicht simuliert werden: '+e.message); }
  return {fehler,warnungen,hinweise};
}

/* ---------- Folgen-Generator ----------
   o = {tanz, bisStufe (1–7), laenge (Anzahl Figuren), start (Figur), ende (Figur), zurueck (in der Grundhaltung enden),
        wdh (gleiche Figur direkt hintereinander erlaubt), schleife (letzte Figur passt wieder zur ersten, Standard: ja),
        technik (Promenaden sauber verbinden), richtung (Folge kommt entlang der Tanzrichtung voran), zufall (Funktion 0..1), figs}
   Alle Vorgaben gelten gemeinsam: Start- und Endfigur müssen innerhalb der Höchststufe liegen, die Endfigur muss in der
   Grundhaltung enden, wenn „zurueck“ gewählt ist, und auch erzwungene Figuren halten die Wiederholungsregel ein.
   Reiht nur zulässige Übergänge aneinander (Rücksprung bei Sackgassen). Besteht ein Entwurf die abschließende Prüfung nicht,
   werden bis zu fünf weitere Entwürfe versucht; sonst wird der Konflikt gemeldet. */
function folgeErzeugen(o){
  const figs=o.figs||allFigs(), rnd0=o.zufall||Math.random, L=Math.max(1,o.laenge||8), bis=o.bisStufe||STUFE_MAX, schleife=o.schleife!==false;
  const raus=(f,w=[])=>({items:[],fehler:[].concat(f),warnungen:w,hinweise:[]});
  const M={}; for(const [k,F] of Object.entries(figs)) if((F.dance||'Sonstige')===o.tanz&&F.steps&&F.steps.length) M[k]=figMeta(F,k);
  const pool=Object.keys(M).filter(k=>M[k].stufe<=bis);
  const grund=grundHaltung(o.tanz), nm=k=>`„${M[k].name}“`;
  for(const [k,w] of [[o.start,'Startfigur'],[o.ende,'Endfigur']]) if(k){
    if(!M[k]) return raus(`Die ${w} gehört nicht zu ${o.tanz}`);
    if(M[k].stufe>bis) return raus(`Die ${w} ${nm(k)} ist ${STUFEN[M[k].stufe]} und liegt über der gewählten Höchststufe ${STUFEN[bis]}`); }
  if(o.ende&&o.zurueck&&M[o.ende].haltEnde!==grund) return raus(`Die Endfigur ${nm(o.ende)} endet in der Haltung „${HOLDS[M[o.ende].haltEnde][0]}“, die Grundhaltung ist „${HOLDS[grund][0]}“ – beides zugleich geht nicht. Andere Endfigur wählen oder „zurück in die Grundhaltung“ abwählen.`);
  if(o.start&&o.ende&&L===1&&o.start!==o.ende) return raus('Bei einer Figur können Start- und Endfigur nicht verschieden sein');
  if(!pool.length) return raus('Für '+o.tanz+' gibt es keine Figuren bis zur Stufe '+STUFEN[bis]);
  const darf=(prev,k)=>!prev||(uebergang(M[prev],M[k]).ok&&(o.wdh||k!==prev));
  function entwurf(rnd){
    const used={}; let schritte=0;
    // Kandidaten nach Gewicht mischen: gleiche Haltung ×3, selten benutzte Figuren bevorzugt, Abwechslung, Figuren der gewählten Stufe etwas bevorzugt
    const mische=(prev,list)=>list.map(k=>{ if(!darf(prev,k)) return null; const u=prev?uebergang(M[prev],M[k]):{wechsel:M[k].haltStart!==grund}, m=M[k];
        const tech=o.technik&&prev&&istStandard(o.tanz)&&m.haltStart==='prom'&&M[prev].haltEnde!=='prom'?.15:1;   // Technik: Promenade nur aus der Promenade
        const w=tech*(u.wechsel?1.5:3)/(1+2*(used[k]||0))*(prev&&m.art==='gs'&&M[prev].art==='gs'?.3:1)*(m.art!=='gs'&&m.stufe>=Math.min(bis,4)-1?1.6:1);
        return [k,w*(.25+rnd())]; }).filter(Boolean).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
    const fertig=seq=>{ const z=seq.at(-1); return (!o.ende||z===o.ende)&&(!o.zurueck||M[z].haltEnde===grund)&&(!schleife||uebergang(M[z],M[seq[0]]).ok); };
    function dfs(seq){
      if(++schritte>4000) return null;
      const n=seq.length;
      if(n>=L&&fertig(seq)) return seq;
      if(n>=L+3) return null;   // höchstens drei Figuren mehr, um Endfigur, Grundhaltung oder Schleife zu erreichen
      let c=n===0&&o.start?[o.start]:mische(seq.at(-1),pool);
      if(o.ende&&n>=L-1&&darf(seq.at(-1),o.ende)) c=[o.ende,...c.filter(k=>k!==o.ende)];   // erzwungen, aber nur wenn erlaubt
      else if(o.ende&&!(n===0&&o.start)) c=c.filter(k=>k!==o.ende);   // die Endfigur nicht vorzeitig verbrauchen (die Startfigur bleibt)
      for(const k of c.slice(0,12)){ used[k]=(used[k]||0)+1; const r=dfs([...seq,k]); if(r) return r; used[k]--; }
      return null;
    }
    return dfs([]);
  }
  /* Tanzrichtung: In den fortschreitenden Tänzen werden mehrere Entwürfe verglichen; genommen wird der, der am meisten vorankommt */
  const vorankommen=q=>{ try{ const t=simulate(flatten({items:q.map(fig=>({fig,rep:1}))},figs),{H:startH(),noSteer:true}), H=t.end.H; return (H.sup[1]-startH().sup[1])/t.total; }catch(e){ return -9; } };
  let letzte=null;
  for(let versuch=0;versuch<6;versuch++){
    const rnd=versuch?(()=>{ const r=rnd0(); return (r+versuch*.618)%1; }):rnd0;   // jeder weitere Versuch mischt anders
    let seq=entwurf(rnd);
    if(!seq) break;
    if(o.richtung&&styleOf(o.tanz).std){ let best=vorankommen(seq); for(let i=0;i<4;i++){ const q=entwurf(()=>(rnd()+i*.37)%1); if(q){ const v=vorankommen(q); if(v>best){ best=v; seq=q; } } } }
    const items=seq.map(fig=>({fig,rep:1})), p=folgePruefen(items,{tanz:o.tanz,bisStufe:bis,wdh:o.wdh,schleife},figs);
    const warnungen=seq.length>L?[`${seq.length-L} Figur(en) mehr als gewünscht, damit ${o.ende?'die Endfigur, ':''}${o.zurueck?'die Grundhaltung, ':''}${schleife?'der Anschluss an den Anfang ':''}erreicht wird`.replace(/, (erreicht)/,' $1')]:[];
    if(!p.fehler.length) return {items,fehler:[],warnungen:warnungen.concat(p.warnungen),hinweise:p.hinweise};
    letzte=p;
  }
  return raus(letzte?['Kein Entwurf hat die Prüfung bestanden:',...letzte.fehler]:['Es ließ sich keine gültige Folge finden – andere Start-/Endfigur, höhere Stufe oder ohne „zurück in die Grundhaltung“ versuchen']);
}
/* Fertige Folge für eine Medaillenstufe: Länge und Regeln passen zur Stufe (Bronze 6, Silber 8, Gold 10, Goldstar 12 Figuren) */
const STUFEN_FOLGE={2:6,3:8,4:10,5:12};
const folgeFuerStufe=(tanz,stufe,zufall)=>folgeErzeugen({tanz,bisStufe:stufe,laenge:STUFEN_FOLGE[stufe]||8,zurueck:true,technik:true,richtung:true,zufall});

/* ---------- Import und geteilte Links prüfen ----------
   Übernimmt nur gültige eigene Figuren und Folgen. Ungültige Schritte, unbekannte Figuren in Folgen, zu große oder
   kaputte Daten werden verworfen und gemeldet; vorgegebene Figuren (BUILTIN) können nicht überschrieben werden.
   Ergebnis: {figures, seqs, fehler:[], warnungen:[]} */
const IMPORT_MAX={figuren:500,folgen:500,schritte:64,eintraege:200};
const sauberKey=k=>/^[\w-]{1,40}$/.test(k)?k:null;
function schrittePruefen(st,wo,fehler){
  if(!Array.isArray(st)||!st.length||st.length>IMPORT_MAX.schritte){ fehler.push(`${wo}: keine oder zu viele Schritte`); return null; }
  const out=[];
  for(let i=0;i<st.length;i++){ const s=st[i]||{}, p=`${wo}, Schritt ${i+1}`;
    if(s.f!=='L'&&s.f!=='R'){ fehler.push(p+': Fuß fehlt'); return null; }
    if(!DIRS[s.dir]){ fehler.push(p+': unbekannte Richtung „'+String(s.dir).slice(0,20)+'“'); return null; }
    const d=+s.d, len=+s.len||0, turn=+s.turn||0;
    if(!(d>0&&d<=8)){ fehler.push(p+': Dauer ungültig'); return null; }
    if(!(len>=0&&len<=100)||!Number.isFinite(turn)||Math.abs(turn)>1080){ fehler.push(p+': Länge oder Drehung ungültig'); return null; }
    if(s.hold!==undefined&&!HOLDS[s.hold]){ fehler.push(p+': unbekannte Haltung'); return null; }
    const n={f:s.f,dir:s.dir,len,d,c:String(s.c??'').slice(0,6),turn};
    if(s.hold!==undefined) n.hold=s.hold; if(typeof s.tip==='string') n.tip=s.tip.slice(0,200); if(s.df==='ferse'||s.df==='seit') n.df=s.df;
    out.push(n); }
  return out;
}
function importPruefen(d,bekannt=BUILTIN){
  const fehler=[],warnungen=[],figures={},seqs={};
  if(!d||typeof d!=='object') return {figures,seqs,fehler:['Keine gültigen Daten'],warnungen};
  const fe=Object.entries(d.figures||{}), se=Object.entries(d.seqs||{});
  if(fe.length>IMPORT_MAX.figuren||se.length>IMPORT_MAX.folgen) return {figures,seqs,fehler:['Zu viele Einträge'],warnungen};
  for(const [k0,F] of fe){ const k=sauberKey(k0), wo=`Figur „${String(F&&F.name||k0).slice(0,40)}“`;
    if(!k){ fehler.push(wo+': ungültiger Schlüssel'); continue; }
    if(bekannt[k]){ warnungen.push(wo+': vorgegebene Figur, wird nicht überschrieben'); continue; }
    if(!F||typeof F.name!=='string'||!F.name.trim()){ fehler.push(wo+': Name fehlt'); continue; }
    const steps=schrittePruefen(F.steps,wo,fehler); if(!steps) continue;
    const n={name:F.name.slice(0,80),dance:typeof F.dance==='string'&&F.dance.trim()?F.dance.slice(0,40):'Sonstige',bpm:Math.min(260,Math.max(30,+F.bpm||100)),steps};
    if(F.dame!==undefined&&F.dame!==null&&!(Array.isArray(F.dame)&&!F.dame.length)){ const dame=schrittePruefen(F.dame,wo+' (Dame)',fehler); if(!dame) continue;
      const lang=x=>x.reduce((a,s)=>a+s.d,0); if(Math.abs(lang(dame)-lang(steps))>1e-6){ fehler.push(wo+': Herr und Dame unterschiedlich lang'); continue; } n.dame=dame; }
    const q=gewichtsFehlerKurz(n); if(q) warnungen.push(wo+': '+q);
    figures[k]=n; }
  for(const [k0,S0] of se){ const k=sauberKey(k0), wo=`Folge „${String(S0&&S0.name||k0).slice(0,40)}“`;
    if(!k||!S0||!Array.isArray(S0.items)){ fehler.push(wo+': ungültig'); continue; }
    const items=[]; for(const it of S0.items.slice(0,IMPORT_MAX.eintraege)){ const fig=String(it&&it.fig||'');
      if(bekannt[fig]||figures[fig]||(typeof user!=='undefined'&&user.figures[fig])) items.push({fig,rep:Math.min(32,Math.max(1,Math.round(+it.rep||1)))});
      else warnungen.push(wo+': unbekannte Figur „'+fig.slice(0,40)+'“ weggelassen'); }
    if(!items.length){ fehler.push(wo+': keine gültige Figur'); continue; }
    seqs[k]={name:String(S0.name||'Ohne Namen').slice(0,80),bpm:Math.min(260,Math.max(30,+S0.bpm||100)),items,...(S0.auto?{auto:true}:{})}; }
  return {figures,seqs,fehler,warnungen};
}
/* Fußfehler einer Figur in einem Satz (Import: nur Warnung – der Editor zeigt ⚠ an derselben Stelle) */
function gewichtsFehlerKurz(F){ let g=null; for(const s of F.steps){ if(s.dir==='halt') continue; if(OHNE_GEWICHT.has(s.dir)) continue; if(s.dir!=='platz'&&g===s.f) return 'zweimal hintereinander derselbe Fuß'; g=s.f; } return ''; }
