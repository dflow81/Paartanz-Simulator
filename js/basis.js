/* ================= Grundlagen der Figuren-Bibliothek =================
   Wird vor den Dateien in figuren/ geladen. Dort werden Tänze mit tanz(...) und Beispielfolgen mit folge(...) angemeldet.

   Schritt: f = Fuß (L/R), dir = Richtung, len = cm, d = Schläge, c = Zählung, turn = Grad (+ links), hold = Tanzhaltung (nur Herr).
   Die Richtung gilt aus dem Blick VOR der Drehung; gedreht wird auf dem gesetzten Fuß.
   Eine Figur kann eigene Schritte der Dame haben. Fehlen sie, tanzt die Dame gegengleich und wird geführt. */
const DIRS={vor:'vor',rueck:'rück',vorAussen:'vor, außenseitlich',rueckAussen:'rück, außenseitlich',seit:'seit',diagVor:'diagonal vor',diagRueck:'diagonal rück',
  kreuz:'kreuzen vorn',kreuzHinter:'kreuzen hinten',kreuzSeit:'seitlich über Kreuz (vorn)',kreuzSeitHinter:'seitlich über Kreuz (hinten)',
  schliessen:'schließen',ferse:'schließen mit Fersendrehung',platz:'Platz (Gewicht)',tap:'Tap (ohne Gewicht)',tapSeit:'Tap seitlich',tapRueck:'Tap hinten',kick:'Kick',halt:'Pause (stehen)'};
const HOLDS={zu:['geschlossen','geschlossene Tanzhaltung'],prom:['Promenade','Promenadenposition: beide öffnen sich zur gefassten Hand'],
  offen:['beide Hände','offene Gegenüberstellung, beide Hände gefasst'],LR:['Hand L–R','nur Herr links / Dame rechts gefasst'],
  RL:['Hand R–L','nur Herr rechts / Dame links gefasst'],hoch:['Arm hoch','gefasste Hand über dem Kopf der Dame (für Drehungen)'],
  kreuz:['Kreuzhand','Kreuzhandfassung: rechts in rechts, links in links'],
  korb:['Körbchen','Dame eingedreht an der rechten Seite des Herrn, beide schauen in dieselbe Richtung'],
  schatten:['Schatten','Schattenposition: Dame vor dem Herrn, beide schauen in dieselbe Richtung'],
  frei:['ohne','ohne Fassung']};
const MIRROR={vor:'rueck',rueck:'vor',vorAussen:'rueckAussen',rueckAussen:'vorAussen',diagVor:'diagRueck',diagRueck:'diagVor',kreuz:'kreuzHinter',kreuzHinter:'kreuz',tap:'tap',tapRueck:'tap'};

/* Führungshinweise, die beim Wechsel in eine Haltung automatisch eingeblendet werden (ein Schritt kann mit „tip“ einen eigenen haben) */
const HOLD_TIP={zu:'Zurück in die geschlossene Tanzhaltung',prom:'Zur Promenade öffnen – beide schauen zur gefassten Hand',
  offen:'Auf Abstand gehen, beide Hände fassen',LR:'Nur seine linke Hand hält ihre rechte',RL:'Nur seine rechte Hand hält ihre linke',
  hoch:'Herr hebt die linke Hand – die Dame dreht darunter',kreuz:'Kreuzhandfassung: rechts in rechts, links in links',
  korb:'Dame ins Körbchen eindrehen, an seine rechte Seite',schatten:'Dame vor den Herrn drehen (Schattenposition)',frei:'Hände lösen'};
const S=(f,dir,len,d,c,turn=0,hold)=>hold?{f,dir,len,d,c,turn,hold}:{f,dir,len,d,c,turn};
const O=f=>f==='L'?'R':'L';
/* Gegengleiche Schritte (für die Dame) */
const spiegel=st=>st.map(s=>({f:O(s.f),dir:MIRROR[s.dir]||s.dir,len:s.len,d:s.d,c:s.c,turn:s.turn}));
/* Haltung für eine Reihe von Schritten setzen */
const H=(st,hold)=>st.map(s=>({...s,hold}));

const BUILTIN={}, DEFAULT_SEQS={}, DANCES=[];
/* tanz('Name', Tempo, { id:['Figurenname', schritteHerr, schritteDame?], ... }) */
function tanz(dance,bpm,figs){
  if(!DANCES.includes(dance)) DANCES.push(dance);
  for(const [id,[name,steps,dame]] of Object.entries(figs)){
    BUILTIN[id]={name,dance,bpm,steps,builtin:true}; if(dame) BUILTIN[id].dame=dame; }
}
/* folge('id','Name', Tempo, [['figurId', Wiederholungen], ...]) */
function folge(id,name,bpm,items){ DEFAULT_SEQS[id]={name,bpm,items:items.map(([fig,rep=1])=>({fig,rep}))}; }
const figTitle=F=>F.builtin?F.dance+' – '+F.name:F.name;
