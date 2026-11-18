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
const taktOf=d=>/walzer|waltz|musette/i.test(d||'')?3:4;

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
  m.vereinfacht=inf[3]==='v'; m.schematisch=inf[3]==='s';
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
   – die Haltung passt: gleich, oder ein üblicher Haltungswechsel (z. B. geschlossen → Promenade, beide Hände → eine Hand).
     In den Fächer und aus dem Fächer geht es nur mit Figuren, die genau dort enden bzw. beginnen.
   Die Richtung im Raum ist kein Hindernis: Alle Figuren sind relativ zur Blickrichtung beschrieben, und die
   Engine lenkt das Paar beim Tanzen so, dass es auf der Fläche bleibt. Ob das gelingt, prüft folgePruefen(). */
const HALT_ART={zu:'eng',prom:'eng',offen:'hand',LR:'hand',RL:'hand',hoch:'hand',kreuz:'hand',frei:'hand',korb:'seite',schatten:'seite',faecher:'faecher'};
function uebergang(A,B){
  const g=[]; let ok=true, wechsel=false;
  if(A.tanz!==B.tanz){ ok=false; g.push('anderer Tanz ('+A.tanz+' / '+B.tanz+')'); }
  const fuss=(wer,e,b)=>{ if(e&&b.start&&!b.frei&&b.start===e){ ok=false; g.push(`${wer} beginnt ${fussName(b.start)}, steht aber am Ende von „${A.name}“ auf diesem Fuß`); } };
  fuss('Herr',A.herr.ende,B.herr); fuss('Dame',A.dame.ende,B.dame);
  const a=A.haltEnde, b=B.haltStart;
  if(a!==b){
    if(HALT_ART[a]==='faecher'){ ok=false; g.push('aus dem Fächer geht es nur mit einer Figur weiter, die im Fächer beginnt (Hockeystick, Alemana …)'); }
    else if(HALT_ART[b]==='faecher'){ ok=false; g.push('in den Fächer führt nur eine Fächer-Figur'); }
    else { wechsel=true; g.push('Haltungswechsel: '+HOLDS[a][0]+' → '+HOLDS[b][0]); }
  }
  return {ok,wechsel,gruende:g};
}
/* Mögliche Anschlussfiguren (gleiche Haltung zuerst) */
function anschluesse(id,figs=allFigs(),mf=(k,F)=>figMeta(F,k)){
  const A=mf(id,figs[id]), out=[];
  for(const [k,F] of Object.entries(figs)) if((F.dance||'Sonstige')===A.tanz&&F.steps&&F.steps.length){ const u=uebergang(A,mf(k,F)); if(u.ok) out.push([k,u.wechsel]); }
  return out.sort((x,y)=>x[1]-y[1]).map(x=>x[0]);
}

/* Prüft eine ganze Folge: jeden Übergang, die Kursstufe, Wiederholungen und – durch Simulation – Fußarbeit und Raum.
   opt = {tanz, bisStufe, wdh, schnell}. Gibt {fehler:[], warnungen:[], hinweise:[]} zurück; fehler leer = gültig. */
function folgePruefen(items,opt={},figs=allFigs()){
  const fehler=[],warnungen=[],hinweise=[], M=items.map(it=>figs[it.fig]?figMeta(figs[it.fig],it.fig):null);
  items.forEach((it,i)=>{ if(!M[i]) fehler.push(`Figur ${i+1} („${it.fig}“) gibt es nicht`); });
  if(fehler.length) return {fehler,warnungen,hinweise};
  const tanz=opt.tanz||M[0].tanz;
  M.forEach((m,i)=>{
    if(m.tanz!==tanz) fehler.push(`„${m.name}“ gehört zu ${m.tanz}, nicht zu ${tanz}`);
    if(opt.bisStufe&&m.stufe>opt.bisStufe) warnungen.push(`„${m.name}“ ist ${STUFEN[m.stufe]}, also über der gewählten Stufe`);
    if(m.eigen) hinweise.push(`„${m.name}“ ist eine eigene Figur – Kursstufe und Haltung sind nur geschätzt`);
    // innerhalb einer Wiederholung (Figur × n) und zur nächsten Figur
    const nachfolger=[]; if((items[i].rep||1)>1) nachfolger.push(m); if(i+1<M.length) nachfolger.push(M[i+1]);
    for(const n of nachfolger){ const u=uebergang(m,n); if(!u.ok) fehler.push(`${i+1}. „${m.name}“ → „${n.name}“: `+u.gruende.join('; ')); else if(u.wechsel) hinweise.push(`${i+1}. „${m.name}“ → „${n.name}“: `+u.gruende.join('; ')); }
    if(i+1<M.length&&items[i+1].fig===items[i].fig&&!opt.wdh) warnungen.push(`„${m.name}“ steht zweimal hintereinander – besser „× 2“ eintragen`);
  });
  // Simulation: gleiche Prüfung, die beim Abspielen das ⚠ zeigt, und Raum
  try{
    const tl=simulate(flatten({items}),{H:startH(),noSteer:!!opt.schnell}); let out=0;   // schnell: ohne Raumlenkung und ohne Raumprüfung
    if(tl.H.concat(tl.D).some(r=>r.warn)) fehler.push('Beim Durchtanzen wird ein Schritt mit dem belasteten Fuß verlangt');
    if(!opt.schnell) for(let t=0;t<tl.total;t+=1){ const a=evalRaw(tl.H,t),b=evalRaw(tl.D,t); out=Math.max(out,outside([(a.sup[0]+b.sup[0])/2,(a.sup[1]+b.sup[1])/2])); }
    if(out>.3) warnungen.push(`Die Folge führt bis ${out.toFixed(1)} m über den Rand der Tanzfläche hinaus`);
  }catch(e){ warnungen.push('Die Folge konnte nicht vollständig simuliert werden: '+e.message); }
  return {fehler,warnungen,hinweise};
}

/* ---------- Folgen-Generator ----------
   o = {tanz, bisStufe (1–7), laenge (Anzahl Figuren), start (Figur), ende (Figur), zurueck (in der Grundhaltung enden),
        wdh (gleiche Figur direkt hintereinander erlaubt), technik (Promenaden sauber verbinden),
        richtung (Folge kommt entlang der Tanzrichtung voran), zufall (Funktion 0..1)}
   Reiht nur Figuren aneinander, deren Übergang laut uebergang() zulässig ist; Haltungswechsel werden seltener gewählt
   als Anschlüsse in derselben Haltung. Mit Rücksprung (Backtracking), damit Start-, Endfigur und Grundhaltung erreicht werden. */
function folgeErzeugen(o){
  const figs=o.figs||allFigs(), rnd=o.zufall||Math.random, L=Math.max(1,o.laenge||8), bis=o.bisStufe||STUFE_MAX;
  const M={}; for(const [k,F] of Object.entries(figs)) if((F.dance||'Sonstige')===o.tanz&&F.steps&&F.steps.length) M[k]=figMeta(F,k);
  const pool=Object.keys(M).filter(k=>M[k].stufe<=bis), warnungen=[];
  if(o.start&&!M[o.start]) return {items:[],fehler:['Die Startfigur gehört nicht zu '+o.tanz],warnungen,hinweise:[]};
  if(o.ende&&!M[o.ende]) return {items:[],fehler:['Die Endfigur gehört nicht zu '+o.tanz],warnungen,hinweise:[]};
  if(!pool.length&&!o.start) return {items:[],fehler:['Für '+o.tanz+' gibt es keine Figuren bis zur Stufe '+STUFEN[bis]],warnungen,hinweise:[]};
  const grund=grundHaltung(o.tanz), used={}; let schritte=0;
  // Kandidaten nach Gewicht mischen: gleiche Haltung ×3, selten benutzte Figuren bevorzugt
  // Abwechslung: nicht zwei Grundschritt-Varianten hintereinander, Figuren der gewählten Stufe etwas bevorzugt
  const mische=(prev,list)=>list.map(k=>{ const u=prev?uebergang(M[prev],M[k]):{ok:true,wechsel:M[k].haltStart!==grund}, m=M[k];
      // Technik: In den Standardtänzen soll eine Promenade mit einer Figur weitergehen, die in der Promenade beginnt
      const tech=o.technik&&prev&&styleOf(o.tanz).std&&(M[prev].haltEnde==='prom')!==(m.haltStart==='prom')?.15:1;
      const w=tech*(u.wechsel?1.5:3)/(1+2*(used[k]||0))*(prev&&m.art==='gs'&&M[prev].art==='gs'?.3:1)*(m.art!=='gs'&&m.stufe>=Math.min(bis,4)-1?1.6:1);
      return u.ok&&(o.wdh||k!==prev)?[k,w*(.25+rnd())]:null; })
    .filter(Boolean).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  const fertig=seq=>{ const z=M[seq.at(-1)]; return o.ende?seq.at(-1)===o.ende:!o.zurueck||z.haltEnde===grund; };
  function dfs(seq){
    if(++schritte>4000) return null;
    const n=seq.length;
    if(n>=L&&fertig(seq)) return seq;
    if(n>=L+3) return null;   // höchstens drei Figuren mehr, um Endfigur oder Grundhaltung zu erreichen
    let c=n===0&&o.start?[o.start]:mische(seq.at(-1),pool);
    if(o.ende&&n>=L-1){ const p=seq.at(-1); if(!p||uebergang(M[p],M[o.ende]).ok) c=[o.ende,...c.filter(k=>k!==o.ende)]; }
    for(const k of c.slice(0,12)){ used[k]=(used[k]||0)+1; const r=dfs([...seq,k]); if(r) return r; used[k]--; }
    return null;
  }
  /* Tanzrichtung: In den fortschreitenden Tänzen werden mehrere Entwürfe verglichen; genommen wird der, der am meisten vorankommt */
  const vorankommen=q=>{ try{ const t=simulate(flatten({items:q.map(fig=>({fig,rep:1}))}),{H:startH(),noSteer:true}), H=t.end.H; return (H.sup[1]-startH().sup[1])/t.total; }catch(e){ return -9; } };
  let seq=dfs([]);
  if(seq&&o.richtung&&styleOf(o.tanz).std){ let best=vorankommen(seq); for(let i=0;i<4;i++){ schritte=0; for(const k in used) delete used[k]; const q=dfs([]); if(q){ const v=vorankommen(q); if(v>best){ best=v; seq=q; } } } }
  if(!seq) return {items:[],fehler:['Es ließ sich keine gültige Folge finden – andere Start-/Endfigur oder höhere Stufe wählen'],warnungen,hinweise:[]};
  const items=seq.map(fig=>({fig,rep:1}));
  if(seq.length>L) warnungen.push(`${seq.length-L} Figur(en) mehr als gewünscht, damit die Folge ${o.ende?'mit der Endfigur':'in der Grundhaltung'} endet`);
  const p=folgePruefen(items,{tanz:o.tanz,bisStufe:bis,wdh:o.wdh},figs);
  if(o.start&&M[o.start].stufe>bis) p.hinweise.push('Die Startfigur liegt über der gewählten Stufe');
  return {items,fehler:p.fehler,warnungen:warnungen.concat(p.warnungen),hinweise:p.hinweise};
}
/* Fertige Folge für eine Medaillenstufe: Länge und Regeln passen zur Stufe (Bronze 6, Silber 8, Gold 10, Goldstar 12 Figuren) */
const STUFEN_FOLGE={2:6,3:8,4:10,5:12};
const folgeFuerStufe=(tanz,stufe,zufall)=>folgeErzeugen({tanz,bisStufe:stufe,laenge:STUFEN_FOLGE[stufe]||8,zurueck:true,technik:true,richtung:true,zufall});
