/* ================= Schritt-Engine =================
   Beide Tänzer werden einzeln simuliert (Füße, Blickrichtung, Gewicht). Tanzt die Dame gegengleich,
   wird ihr Schrittziel aus dem Schritt des Herrn und der Tanzhaltung abgeleitet. */
const RAD=Math.PI/180, W=0.2;
const dirv=h=>({fw:[Math.sin(h),Math.cos(h)],lf:[Math.cos(h),-Math.sin(h)]});
const add=(a,b,s=1)=>[a[0]+b[0]*s,a[1]+b[1]*s];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1];
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const mix=(a,b,t)=>a+(b-a)*t;
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const sm=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const wrap=a=>{a=(a+Math.PI)%(2*Math.PI); if(a<0) a+=2*Math.PI; return a-Math.PI;};
const near=(a,ref)=>ref+wrap(a-ref);

/* Bewegungsstil je Tanz: gap/off = Abstand und seitlicher Versatz in geschlossener Haltung, rise = Heben/Senken,
   bounce = Federn, hip = Hüftbewegung, fe = Anteil des Schlags für den Fußweg, heel = Fersenschritt vorwärts,
   flow = Zeitfenster (Schläge), über das das Paar gleichmäßig durch den Raum gleitet,
   drop = tiefere Knie, mid = Becken zwischen den Füßen, std = Standardhaltung, turnout = Fußöffnung */
const STYLES={
  swing:{flow:1,gap:.38,off:.07,rise:1,bounce:0,hip:0,fe:.8,lift:.03,heel:true,drop:0,mid:.3,std:true,turnout:.1},
  wiener:{flow:1.5,gap:.38,off:.07,rise:.55,bounce:0,hip:0,fe:.95,lift:.03,heel:true,drop:0,mid:.3,std:true,turnout:.1},
  tango:{gap:.36,off:.09,rise:0,bounce:0,hip:0,fe:.5,lift:.025,heel:true,drop:.05,mid:.3,std:true,turnout:.05},
  argentino:{gap:.34,off:.05,rise:0,bounce:0,hip:0,fe:.8,lift:.02,heel:true,drop:.03,mid:.3,std:true,turnout:.08,flow:.7},
  paso:{gap:.38,off:.05,rise:0,bounce:0,hip:0,fe:.6,lift:.03,heel:true,drop:0,mid:.3,std:true,turnout:.08},
  latin:{gap:.5,off:0,rise:0,bounce:0,hip:1,fe:.6,lift:.018,heel:false,drop:0,mid:.1,std:false,turnout:.22},
  bounce:{gap:.5,off:0,rise:0,bounce:.03,hip:.5,fe:.7,lift:.05,heel:false,drop:.02,mid:.15,std:false,turnout:.15},
  social:{gap:.5,off:.04,rise:0,bounce:.014,hip:.25,fe:.7,lift:.03,heel:true,drop:.01,mid:.25,std:false,turnout:.1},
};
/* Feste Angaben je Tanz. stil = Bewegungsstil (STYLES), takt = Schläge pro Takt, zaehl = übliches Zählschema,
   phrase = Schläge, in deren Vielfachen eine Figur aufgehen sollte (z. B. Discofox: Dreiergruppen „Schritt, Schritt, Tap“),
   standard = einer der fünf Standardtänze (strengere Regeln für die Promenade). Tänze, die hier fehlen (eigene Tanznamen),
   werden über den Namen eingeordnet (siehe styleOf). */
const TANZ_DATEN={
  'Langsamer Walzer':{stil:'swing',takt:3,zaehl:'1 2 3',phrase:3,standard:true},
  'Wiener Walzer':{stil:'wiener',takt:3,zaehl:'1 2 3',phrase:3,standard:true},
  'Tango':{stil:'tango',takt:4,zaehl:'S Q',phrase:2,standard:true},
  'Slowfox':{stil:'swing',takt:4,zaehl:'S Q',phrase:2,standard:true},
  'Quickstep':{stil:'swing',takt:4,zaehl:'S Q',phrase:2,standard:true},
  'Cha-Cha-Cha':{stil:'latin',takt:4,zaehl:'2 3 4 & 1',phrase:4},
  'Rumba':{stil:'latin',takt:4,zaehl:'2 3 4-1',phrase:4},
  'Samba':{stil:'bounce',takt:4,zaehl:'1 a 2',phrase:2},
  'Jive':{stil:'bounce',takt:4,zaehl:'1 2 3 a 4 5 a 6',phrase:2},
  'Paso Doble':{stil:'paso',takt:4,zaehl:'1–8',phrase:2},
  'Foxtrott':{stil:'swing',takt:4,zaehl:'S Q',phrase:2},
  'Discofox':{stil:'social',takt:4,zaehl:'1 2 3 (Schritt, Schritt, Tap)',phrase:3},
  'Blues':{stil:'social',takt:4,zaehl:'1–4',phrase:2},
  "Rock'n'Roll":{stil:'bounce',takt:4,zaehl:'1–6',phrase:2},
  'Polka':{stil:'bounce',takt:4,zaehl:'1 & 2',phrase:2},
  'Salsa':{stil:'latin',takt:4,zaehl:'1 2 3 – 5 6 7',phrase:4},
  'Bachata':{stil:'latin',takt:4,zaehl:'1 2 3 Tap',phrase:4},
  'Merengue':{stil:'latin',takt:4,zaehl:'1–8',phrase:2},
  'Boogie-Woogie':{stil:'bounce',takt:4,zaehl:'1–6',phrase:2},
  'Tango Argentino':{stil:'argentino',takt:4,zaehl:'frei, meist 1–8',phrase:2},
  'West Coast Swing':{stil:'social',takt:4,zaehl:'1–6',phrase:2},
  'Walzer-Musette':{stil:'swing',takt:3,zaehl:'1 2 3',phrase:3},
  'Tangowalzer':{stil:'tango',takt:3,zaehl:'1 2 3',phrase:3},
  'Disco-Samba':{stil:'bounce',takt:4,zaehl:'1 a 2',phrase:2},
  'Two Step':{stil:'social',takt:4,zaehl:'S S Q Q',phrase:2},
  'Bugg':{stil:'bounce',takt:4,zaehl:'1–4',phrase:2},
  'Cumbia':{stil:'latin',takt:4,zaehl:'1–8',phrase:4},
  'Tango Americano':{stil:'tango',takt:4,zaehl:'S Q',phrase:2},
  'Nordic Tango':{stil:'tango',takt:4,zaehl:'S Q',phrase:2},
  'Mambo':{stil:'latin',takt:4,zaehl:'1 2 3 – 5 6 7',phrase:4},
  'Marschfox':{stil:'swing',takt:4,zaehl:'S S',phrase:2},
};
const taktVon=d=>TANZ_DATEN[d]?TANZ_DATEN[d].takt:/walzer|waltz|musette/i.test(d||'')?3:4;
const phraseVon=d=>TANZ_DATEN[d]?TANZ_DATEN[d].phrase:taktVon(d)===3?3:/disco(?!-?samba)|discofox/i.test(d||'')?3:2;
const istStandard=d=>!!(TANZ_DATEN[d]&&TANZ_DATEN[d].standard);
function styleOf(d){ if(TANZ_DATEN[d]) return STYLES[TANZ_DATEN[d].stil]; d=(d||'').toLowerCase();
  if(/wiener/.test(d)) return STYLES.wiener;
  if(/argentin/.test(d)) return STYLES.argentino;   // vor der allgemeinen Tango-Regel
  if(/tango/.test(d)) return STYLES.tango;
  if(/paso/.test(d)) return STYLES.paso;
  if(/disco|hustle|west coast/.test(d)) return STYLES.social;
  if(/walzer|waltz|slow|fox|quick/.test(d)) return STYLES.swing;
  if(/jive|samba|boogie|rock|swing|lindy|charleston|polka|bugg/.test(d)) return STYLES.bounce;
  if(/cha|rumba|salsa|bachata|mambo|merengue|cumbia|latein|latin|kizomba/.test(d)) return STYLES.latin;
  return STYLES.social; }
/* Wo steht die Dame zum Herrn? gap = vor ihm, off = rechts von ihm, face = ihre Blickrichtung relativ zu seiner
   (π = gegenüber, 0 = gleiche Richtung), spin = Drehsinn, mit dem sie in diese Position eindreht */
const holdGeo=(hold,sty)=>hold==='zu'||hold==='prom'?{gap:sty.gap,off:sty.off,face:Math.PI}:hold==='hoch'?{gap:.62,off:0,face:Math.PI}:
  hold==='offen'||hold==='kreuz'?{gap:.8,off:0,face:Math.PI}:hold==='korb'?{gap:.1,off:.37,face:0,spin:1}:hold==='schatten'?{gap:.32,off:.12,face:0,spin:-1}:
  hold==='faecher'?{gap:.32,off:-.75,face:-Math.PI/2,exact:true}:hold==='hochB'?{gap:.62,off:0,face:Math.PI}:hold==='hammer'?{gap:.5,off:.08,face:Math.PI}:
  hold==='schulter'?{gap:.42,off:0,face:Math.PI}:hold==='schal'?{gap:-.3,off:0,face:Math.PI}:hold==='brezel'?{gap:.1,off:.37,face:0}:{gap:.85,off:0,face:Math.PI};
const RISE={'1':.15,'2':1,'3':0,'4':.15,'5':1,'6':0,S:.2,Q:.75,'&':1,a:1};

const startH=(x=0,z=0,h=0)=>{ const lf=dirv(h).lf; return {L:[x+lf[0]*.1,z+lf[1]*.1],R:[x-lf[0]*.1,z-lf[1]*.1],yL:h,yR:h,pL:0,pR:0,h,sup:[x,z],side:0,rise:0,hold:null}; };
function startD(H,sty,hold){
  const {fw,lf}=dirv(H.h), g=holdGeo(hold,sty), h=H.h+g.face, c=add(add(lerp(H.L,H.R,.5),fw,g.gap),lf,-g.off), l2=dirv(h).lf, L=add(c,l2,.1), R=add(c,l2,-.1);
  return {L,R,yL:h,yR:h,pL:0,pR:0,h,sup:lerp(L,R,.5),side:0,rise:0};
}
function flatten(src,figs=allFigs()){
  const out=[];
  src.items.forEach((it,i)=>{const F=figs[it.fig]; if(!F||!F.steps||!F.steps.length) return;
    const n=Math.max(1,it.rep||1); for(let r=0;r<n;r++) out.push({F,item:i,rep:r+1,reps:n});});
  return out;
}
/* Ein Schritt eines Tänzers. Die Richtung gilt aus der Blickrichtung VOR der Drehung; gedreht wird auf dem gesetzten Fuß.
   forced = {to,h2}: Ziel und Blickrichtung werden vom Partner vorgegeben (gegengleiche Dame).
   shift = kleine Verschiebung des Schrittziels (hält die Dame bei eigenen Schritten beim Herrn). */
function doStep(st,s,sty,start,d,forced,shift,piv){
  const f=s.f==='R'?'R':'L', o=f==='L'?'R':'L', side=f==='L'?1:-1;
  const h=st.h, h2=forced?forced.h2:h+(+s.turn||0)*RAD;
  const {fw,lf}=dirv(h), len=Math.max(0,+s.len||0)/100;
  const w=W*clamp(1.5-Math.abs(h2-h)/(60*RAD),0,1);   // bei großen Drehungen stehen die Füße auf einer Linie
  const oth=st[o], cur=st[f], neutral=add(oth,lf,w*side);
  let to=neutral, weight=true, kind='step', kickAt=null;
  switch(s.dir){
    case 'vor': case 'vorAussen': to=add(neutral,fw,len); break;
    case 'rueck': case 'rueckAussen': to=add(neutral,fw,-len); break;
    case 'ferse': break;   // schließen; die Füße drehen auf den Fersen (siehe unten)
    case 'seit': to=add(neutral,lf,side*len); break;
    case 'diagVor': to=add(add(neutral,fw,len*.7),lf,side*len*.7); break;
    case 'diagRueck': to=add(add(neutral,fw,-len*.7),lf,side*len*.7); break;
    case 'kreuz': to=add(add(oth,fw,Math.max(len,.12)),lf,-side*.04); break;
    case 'kreuzHinter': to=add(add(oth,fw,-Math.max(len,.12)),lf,-side*.04); break;
    // seitlich über Kreuz: nur 4 cm vor bzw. hinter dem Standfuß, damit das Paar dabei nicht aufeinander zuläuft
    case 'kreuzSeit': to=add(add(oth,lf,-side*Math.max(len,.15)),fw,.04); break;
    case 'kreuzSeitHinter': to=add(add(oth,lf,-side*Math.max(len,.15)),fw,-.04); break;
    case 'platz': to=[...cur]; kind='platz'; break;
    case 'halt': to=[...cur]; kind='halt'; weight=false; break;
    case 'tap': to=add(neutral,fw,len); kind='tap'; weight=false; break;
    case 'tapSeit': to=add(neutral,lf,side*len); kind='tap'; weight=false; break;
    case 'tapRueck': to=add(neutral,fw,-Math.max(len,.15)); kind='tap'; weight=false; break;
    case 'kick': kind='kick'; weight=false; break;
  }
  if(forced&&forced.to&&kind!=='halt') to=forced.to;
  else if(shift&&kind!=='halt'&&(kind!=='platz'||shift.platz)) to=add(to,shift);   // shift.platz: Anfangsausgleich verschiebt auch Platz-Schritte
  // Paardrehung: In enger Haltung dreht das Paar um seine gemeinsame Mitte, nicht um den Fuß des Herrn – er geht dabei ein Stück um die Dame herum
  if(piv&&!forced&&kind==='step'&&s.dir!=='schliessen'&&s.dir!=='ferse'&&h2!==h){ const f2=dirv(h2).fw; to=add(add(to,fw,piv),f2,-piv); }
  const mv=sub(to,cur), dist=Math.hypot(mv[0],mv[1]);
  if(kind==='platz'&&dist>.03) kind='step';
  if(kind==='kick') kickAt=add(add(to,fw,Math.max(len,.3)),lf,side*.05);
  const yc=st['y'+f], yo=st['y'+o], pc=st['p'+f], po=st['p'+o];
  // Fußabrollen: land = Neigung beim Aufsetzen (− Ferse zuerst, + Ballen zuerst), oEnd = Standfuß am Ende (+ Ferse hebt ab)
  const sepF=dot(sub(to,oth),fw), sepS=Math.abs(dot(sub(to,oth),lf));
  let land=0,endP=0,oEnd=0;
  if(kind==='step'){
    if(sepF>.1){ land=sty.heel?-.4*Math.min(1,dist/.3):.25; oEnd=.5*Math.min(1,sepF/.45); }
    else if(sepF<-.1){ land=.4; oEnd=-.2*Math.min(1,-sepF/.45); }
    else { land=dist>.03?.13:0; oEnd=sepS>.28?.2:0; }
  } else if(kind==='platz'){ const rel=dot(sub(oth,cur),fw); oEnd=rel<-.1?.35:rel>.1?-.15:0; }
  else if(kind==='tap') endP=.55;
  if(s.dir==='ferse'){ land=-.3; oEnd=-.22; }   // Fersendrehung: Fußspitzen heben ab
  else if(kind==='halt'){ endP=pc; oEnd=po; }
  let riseA=0, late=false;
  if(sty.rise){ const t=RISE[String(s.c??'').trim()]??.5; riseA=t*sty.rise; late=t===0&&st.rise>.3; }
  const yTo=kind==='halt'?yc:(Math.abs(h2-yc)<=Math.PI+.01?h2:yc+wrap(h2-yc));
  const dY=wrap(yo-h2), yoTo=yo+(clamp(dY,-.9,.9)-dY);
  const fe=kind==='platz'||kind==='halt'?.6:clamp(Math.min(d*sty.fe,.85)/d,.3,.85);
  const r={f,o,dir:s.dir,len:s.len,turn:s.turn,c:s.c,d,start,kind,weight,fe,dist,from:[...cur],to,kickAt,other:[...oth],
    yaw:[yc,yTo],oyaw:[yo,yoTo],pit:[pc,land,endP],opit:[po,oEnd],supB:st.sup,supA:weight?to:st.sup,
    sideB:st.side,sideA:weight?side:st.side,hB:h,hA:h2,rise:[st.rise,riseA],late,
    warn:!forced&&weight&&kind==='step'&&st.side===side&&!(shift&&shift.platz&&s.dir==='platz')};   // Nachrutschen beim Anfangsausgleich ist kein Fußfehler
  st[f]=to; st['y'+f]=yTo; st['y'+o]=yoTo; st['p'+f]=endP; st['p'+o]=oEnd; st.h=h2; st.rise=riseA;
  if(weight){ st.sup=to; st.side=side; }
  return r;
}
/* Raum: Das Paar bleibt auf der Tanzfläche. Vor jeder Figur wird geprüft, wohin sie (und die beiden folgenden) führen würde;
   droht das Paar die Fläche zu verlassen, wird jeder Schritt etwas mitgedreht – wie beim Tanzen entlang der Tanzrichtung. */
const ROOM={w:8,d:6,margin:1.25};
const STEER=[0,8,-8,16,-16,24,-24,32,-32,42,-42];
let lastSteer=0;
const pairCtr=(H,D)=>[(H.L[0]+H.R[0]+D.L[0]+D.R[0])/4,(H.L[1]+H.R[1]+D.L[1]+D.R[1])/4];
const outside=p=>Math.max(0,Math.abs(p[0])-(ROOM.w/2-ROOM.margin))+Math.max(0,Math.abs(p[1])-(ROOM.d/2-ROOM.margin));
function simBlock(b,H,D,beat,extra,hs,ds){
  const F=b.F, sty=styleOf(F.dance), c0=parseInt(F.steps[0].c);
  // Takt: Die Figur beginnt auf Zählzeit c0 (z. B. Cha-Cha auf „2“), betont wird die „1“ jedes Takts
  const meta={fig:figTitle(F),item:b.item,rep:b.rep,reps:b.reps,sty,name:F.name,blockStart:beat,meter:taktVon(F.dance),off:c0>0?c0-1:0};
  const own=Array.isArray(F.dame)&&F.dame.length>0, tw=s=>extra&&s.dir!=='halt'?{...s,turn:(+s.turn||0)+extra}:s;
  if(own){ // Figur beginnt in einer festen Stellung (z. B. aus dem Fächer): Steht die Dame ganz woanders, etwa beim Üben in Schleife, beginnt sie dort
    const h0=HOLDS[F.steps[0].hold]?F.steps[0].hold:'zu', g0=holdGeo(h0,sty);
    if(g0.exact||g0.face===0){ const want=startD(H,sty,h0), c=lerp(D.L,D.R,.5), w=lerp(want.L,want.R,.5); if(Math.hypot(c[0]-w[0],c[1]-w[1])>.4) Object.assign(D,want); }
    /* Beginnt die Figur in der Promenade, steht die Dame nicht frontal vor dem Herrn, sondern in der V-Stellung: Blick ¼ links von seinem
       (Herr Diagonale Wand, Dame Diagonale Mitte). Ihre Schritte aus der Quelle (vor und über Kreuz …) beziehen sich auf diese Blickrichtung. */
    if(h0==='prom') D.h=H.h+Math.PI/2; }
  let tH=beat,tD=beat,out=0;
  const anf=own?{c:lerp(H.L,H.R,.5),h:H.h,hold:HOLDS[F.steps[0].hold]?F.steps[0].hold:'zu'}:null;   // Stellung des Herrn am Anfang (Abstandsausgleich)
  /* Raumlenkung bei eigenen Damenschritten: Der Herr dreht zusätzlich um `extra` je Schritt. Die Dame tanzt ihre Schritte gedanklich ohne Lenkung
     (wie der Herr im Schatten), dann wird ihre Lage relativ zum Herrn mit seiner zusätzlichen Drehung mitgedreht – das Paar dreht gemeinsam,
     statt dass jeder um den eigenen Fuß dreht und sie seitlich wegdriftet. */
  const Hs=own&&extra?structuredClone(H):null, manC=[];
  for(const s of F.steps){
    const d=Math.max(.25,+s.d||1), hold=HOLDS[s.hold]?s.hold:'zu';
    // Führungshinweis: eigener Text des Schritts, sonst automatisch bei Haltungswechsel oder Solodrehung des Herrn
    const tip=s.tip||(hold!==(H.hold||'zu')?HOLD_TIP[hold]:'')||(ARM_TIP[s.arm]||'')||(own&&Math.abs(+s.turn||0)>=135?'Herr dreht '+(s.turn>0?'links':'rechts'):'');
    const r=Object.assign(doStep(H,tw(s),sty,tH,d,null,null,!own&&sty.std&&(hold==='zu'||hold==='prom')?sty.gap/2:0),meta,{hold,holdPrev:H.hold||hold,turn:s.turn,tip},s.arm?{arm:s.arm}:{}); H.hold=hold; hs.push(r);
    if(Hs){ doStep(Hs,s,sty,tH,d,null,null,0); manC.push({t:tH,real:lerp(H.L,H.R,.5),sh:lerp(Hs.L,Hs.R,.5),hr:H.h,hs:Hs.h}); }
    tH+=d;
    if(!own){
      const g=holdGeo(hold,sty), v=dirv(r.hA), aus=/Aussen$/.test(r.dir)?.16:0;   // außenseitlich: der Herr geht rechts an der Dame vorbei
      let to=add(add(r.to,v.fw,g.gap),v.lf,-g.off-aus);
      if(r.dir==='kreuzSeit') to=add(to,dirv(r.hB).fw,-.08);   // auch die Dame kreuzt vor dem Körper
      else if(r.dir==='kreuzSeitHinter') to=add(to,dirv(r.hB).fw,.08);
      // Blickrichtung der Dame; bei einer halben Drehung entscheidet die Haltung (ein-/ausdrehen) oder die Drehung des Herrn über den Drehsinn
      let dh=wrap(r.hA+g.face-D.h);
      if(Math.abs(Math.abs(dh)-Math.PI)<.5){ const sp=g.spin||-(D.spin||0)||Math.sign(r.hA-r.hB); if(sp) dh=sp*Math.abs(dh); }
      D.spin=g.spin||0;
      // dd: Schrittrichtung der Dame (nur Richtung, sie bleibt an ihrem Platz in der Haltung, z. B. rück beim Drehen im Körbchen)
      // df: besondere Fußarbeit der Dame bei diesem Schritt (z. B. 'ferse' = Fersendrehung: sie schließt, statt mitzugehen; der nächste Schritt holt sie wieder heran)
      ds.push(Object.assign(doStep(D,{f:r.o,dir:s.df||s.dd||(g.face===0?r.dir:(MIRROR[r.dir]||r.dir)),len:s.len,turn:s.turn,c:s.c},sty,r.start,d,{to:s.df?null:to,h2:D.h+dh}),meta));
      tD=tH; out=Math.max(out,outside(pairCtr(H,D)));
    }
  }
  if(own){
    const half=Math.floor(F.dame.length/2);   // nachgeführt wird erst in der zweiten Hälfte der Figur – der Anfang (z. B. Ausweichen) bleibt, wie er ist
    /* F.ganz: Figuren, die einen bestimmten Anfangsabstand brauchen (z. B. Stop and Go): Steht die Dame am Anfang näher oder weiter weg
       als in dieser Haltung üblich, gleicht sie das in der ersten Hälfte Schritt für Schritt aus */
    /* Abstandsausgleich für alle Figuren mit eigenen Damenschritten: Steht die Dame am Anfang deutlich näher oder weiter weg
       (mehr als 15 cm näher als in der Anfangshaltung üblich – etwa weil die vorige Figur eng endet), gleicht sie den Abstand in der
       ersten Hälfte Schritt für Schritt aus. Mit F.ganz wird immer ausgeglichen, auch seitlich und wenn sie zu weit weg steht. */
    /* Ausgleich am Anfang: der Gesamtversatz `pre` wird auf die ersten echten Schritte verteilt (mit F.ganz auf die ersten zwei, damit
       er vor engen Stellen wie dem Körbchen schon erreicht ist). Jeder Schritt setzt relativ zum anderen Fuß an und erbt so dessen Versatz;
       ein Platz-Schritt bezieht sich auf den eigenen Fuß und holt deshalb nur den Rückstand zum anderen Fuß auf. */
    let pre=null, preI=[];
    if(anf){ const v0=dirv(anf.h), g0=holdGeo(anf.hold,sty), rel=sub(lerp(D.L,D.R,.5),anf.c);
      preI=F.dame.map((s,i)=>i).filter(i=>i<half&&F.dame[i].dir!=='halt'&&F.dame[i].dir!=='platz'); if(F.ganz) preI=preI.slice(0,2);
      const dg=g0.gap-dot(rel,v0.fw), dl=-g0.off-dot(rel,v0.lf);
      if(F.ganz){ const l=Math.hypot(dg,dl), m=Math.min(1,.45/Math.max(l,1e-6)); pre=add(v0.fw.map(x=>x*dg*m),v0.lf,dl*m); }
      else if(dg>.06) pre=v0.fw.map(x=>x*Math.min(dg,.45));   // nur wenn sie zu nah steht: nach hinten ausgleichen (weiter weg ist ungefährlich)
      if(!preI.length) pre=null;
    }
    const mit=(Dsh,Dx,s,t,d,shift)=>{   // Damenschritt ohne Lenkung im Schatten, dann mit der Zusatzdrehung des Herrn um ihn herum mitgedreht
      const r0=doStep(Dsh,s,sty,t,d,null,shift), m=manC.findLast(q=>q.t<=t+1e-6)||manC[0], a=dirv(m.hs), b=dirv(m.hr), v=sub(r0.to,m.sh);
      const to=add(add(m.real,b.fw,dot(v,a.fw)),b.lf,dot(v,a.lf));
      return doStep(Dx,s,sty,t,d,s.dir==='halt'?null:{to,h2:Dsh.h+(m.hr-m.hs)}); };
    const run=(Dx,sh,rec)=>{ let t=beat; const Dsh=manC.length?structuredClone(Dx):null, off={L:[0,0],R:[0,0]}, teil=pre&&pre.map(x=>x/preI.length);
      F.dame.forEach((s,i)=>{ const d=Math.max(.25,+s.d||1); let sf=null;
        if(i>=half) sf=sh;
        else if(pre&&s.dir!=='halt'){ const f=s.f==='R'?'R':'L', o=f==='L'?'R':'L';
          if(s.dir==='platz'){ const c=sub(off[o],off[f]); if(Math.hypot(c[0],c[1])>1e-4){ sf=c; sf.platz=true; } off[f]=[...off[o]]; }
          else { sf=preI.includes(i)?teil:null; off[f]=sf?add(off[o],sf):[...off[o]]; } }
        const r=Dsh?mit(Dsh,Dx,s,t,d,sf):doStep(Dx,tw(s),sty,t,d,null,sf); if(rec) rec.push(Object.assign(r,meta,{turn:s.turn,tip:s.tip})); t+=d; }); return t; };
    // Probeläufe: Landet die Dame zu weit weg, zu nah oder seitlich versetzt, werden ihre Schritte ein wenig nachgeführt
    const v=dirv(H.h), g=holdGeo(H.hold,sty), near0=g.face===0||g.exact;   // nebeneinander (Körbchen, Schatten): genau an den Platz, sonst nur grob
    const n=Math.max(1,F.dame.filter((s,i)=>i>=half&&s.dir!=='halt'&&s.dir!=='platz').length-.5);
    let sh=[0,0];
    for(let it=0;it<3;it++){
      const trial=structuredClone(D); run(trial,sh);
      const rel=sub(lerp(trial.L,trial.R,.5),lerp(H.L,H.R,.5)), gap=dot(rel,v.fw), lat=dot(rel,v.lf);
      const open=H.hold!=='zu'&&H.hold!=='prom'&&H.hold!=='hoch';   // in offenen Haltungen etwas mehr Abstand
      sh=add(sh,v.fw,(clamp(gap,near0?g.gap-.08:open?.6:.4,near0?g.gap+.08:.95)-gap)/n); sh=add(sh,v.lf,(clamp(lat,near0?-g.off-.08:-.1,near0?-g.off+.08:.1)-lat)/n);
      const l=Math.hypot(sh[0],sh[1]); if(l>.25) sh=[sh[0]*.25/l,sh[1]*.25/l];
    }
    const d0=ds.length; tD=run(D,Math.hypot(sh[0],sh[1])>.004?sh:null,ds);
    for(let i=d0;i<ds.length;i++){ const r=ds[i]; if(r.tip||Math.abs(+r.turn||0)>=135){ // Hinweise der Dame beim passenden Schritt des Herrn zeigen
      const h=hs.findLast(x=>x.start<=r.start+1e-6); if(h&&h.blockStart===beat&&(!h.tip||h.tip===HOLD_TIP.hoch)) h.tip=r.tip||'Dame dreht '+(r.turn>0?'links':'rechts')+(h.hold==='hoch'?' unter seiner erhobenen Hand':''); } }
  }
  const end=Math.max(tH,tD);
  if(end-tH>1e-6) hs.push(Object.assign(doStep(H,{f:'L',dir:'halt',c:''},sty,tH,end-tH),meta,{hold:H.hold,holdPrev:H.hold}));
  if(end-tD>1e-6) ds.push(Object.assign(doStep(D,{f:'L',dir:'halt',c:''},sty,tD,end-tD),meta));
  return {end,out:Math.max(out,outside(pairCtr(H,D)))};
}
function simulate(blocks,st){
  const H=structuredClone(st.H), F0=blocks[0].F;
  const D=st.D?structuredClone(st.D):startD(H,styleOf(F0.dance),HOLDS[F0.steps[0].hold]?F0.steps[0].hold:'zu');
  const hs=[],ds=[]; let beat=0;
  for(let i=0;i<blocks.length;i++){
    let best=0, bc=Infinity;
    for(const e of st.noSteer?[0]:STEER){   // noSteer: schnelle Probe ohne Raumlenkung (Folgen-Generator)
      const h=structuredClone(H), d=structuredClone(D); let c=Math.abs(e)*.002+(e*lastSteer<0?.03:0);
      for(let k=0;k<3;k++) c+=simBlock(blocks[(i+k)%blocks.length],h,d,0,e,[],[]).out*(k?5:10);   // Annahme: die Kurve wird beibehalten
      const p=pairCtr(h,d); c+=Math.hypot(p[0],p[1])*.004;
      if(c<bc-1e-9){ bc=c; best=e; }
    }
    if(best) lastSteer=best;
    beat=simBlock(blocks[i],H,D,beat,best,hs,ds).end;
  }
  return {H:hs,D:ds,total:beat,end:{H,D}};
}
/* Zwei aufeinanderfolgende Abläufe verbinden, damit die Bewegung über die Nahtstelle hinweg weich bleibt */
function chain(a,b){
  for(const k of 'HD'){ b[k].pre=a[k].slice(-6).map(s=>({...s,start:s.start-a.total})); a[k].post=b[k].slice(0,6).map(s=>({...s,start:s.start+a.total})); }
}
/* Haltung eines Tänzers zum Zeitpunkt tb (in Schlägen). Die Füße setzen genau auf den Schlag; der Körper (Schwerpunkt, Blickrichtung,
   Heben/Senken) wird über ein kleines Zeitfenster gemittelt. So bleibt er zwischen zwei Schritten und Figuren nicht stehen,
   sondern fließt durch – er ist schon auf dem Weg, bevor der Fuß aufsetzt. */
const SMOOTH=[[-.4,1],[-.2,2],[.2,2],[.4,1]];
function evalDancer(steps,tb){
  const r=evalRaw(steps,tb); let sx=r.sup[0]*3, sy=r.sup[1]*3, h=r.h*3, rise=r.rise*3, n=3;
  for(const [o,w] of SMOOTH){ const t=tb+o;
    const q=rawAt(steps,t);
    sx+=q.sup[0]*w; sy+=q.sup[1]*w; h+=q.h*w; rise+=q.rise*w; n+=w; }
  r.sup=[sx/n,sy/n]; r.h=h/n; r.rise=rise/n;
  return r;
}
/* Beide Tänzer zum Zeitpunkt tb. In den Schwungtänzen gleitet das Paar als Ganzes gleichmäßig weiter (flow):
   Die Paarmitte wird über ein breiteres Zeitfenster gemittelt und beide werden gemeinsam verschoben – ihr Abstand zueinander bleibt gleich. */
function rawAt(steps,t){ const end=steps.at(-1).start+steps.at(-1).d; return t<0&&steps.pre?evalRaw(steps.pre,t):t>end&&steps.post?evalRaw(steps.post,t):evalRaw(steps,t); }
function evalPair(tl,tb){
  const H=evalDancer(tl.H,tb), D=evalDancer(tl.D,tb), fl=H.step.sty.flow||0;
  if(fl>.4){ let cx=0,cy=0,n=0; const m=Math.round(fl/.2), mid=H.step.sty.mid, g=p=>lerp(p.sup,lerp(p.feet.L.p,p.feet.R.p,.5),mid);
    for(let i=-m;i<=m;i++){ const w=m+1-Math.abs(i), a=g(rawAt(tl.H,tb+i*.2)), b=g(rawAt(tl.D,tb+i*.2)); cx+=(a[0]+b[0])*w/2; cy+=(a[1]+b[1])*w/2; n+=w; }
    const a=g(H), b=g(D);
    H.flow=D.flow=[cx/n-(a[0]+b[0])/2,cy/n-(a[1]+b[1])/2]; }
  return {H,D};
}
function evalRaw(steps,tb){
  let i=steps.length-1;
  for(let k=0;k<steps.length;k++) if(tb<steps[k].start+steps[k].d){i=k;break;}
  const s=steps[i], u=clamp((tb-s.start)/s.d,0,1), ue=Math.min(1,u/s.fe), ef=ease(ue), bump=Math.sin(Math.PI*ue), e=ease(u);
  const wt=sm((u-.25*s.fe)/(Math.min(1,s.fe+.3)-.25*s.fe));      // Gewichtsübertragung folgt dem Fuß
  let p=lerp(s.from,s.to,ef), lift=0, pitch=s.pit[0]*(1-sm(ue/.5))+s.pit[2]*sm((ue-.5)/.5);
  if(s.kind==='halt') pitch=s.pit[0];
  else if(s.kind==='step'){ lift=(s.dist>.03?s.sty.lift+s.dist*.05:.01)*bump;
    pitch+=s.pit[1]*sm((ue-.45)/.55)*(1-sm((u-s.fe)/Math.max(.08,Math.min(.25,1-s.fe)))); }
  else if(s.kind==='tap') lift=.04*bump;
  else if(s.kind==='kick'){ const kb=Math.sin(Math.PI*sm(ue)); p=lerp(p,s.kickAt,kb); lift=.22*kb; pitch+=.5*kb; }
  const feet={};
  feet[s.f]={p,lift,pitch,yaw:mix(s.yaw[0],s.yaw[1],ef)};
  feet[s.o]={p:s.other,lift:0,pitch:mix(s.opit[0],s.opit[1],sm((wt-.3)/.7)),yaw:mix(s.oyaw[0],s.oyaw[1],e)};
  return {feet,sup:lerp(s.supB,s.supA,wt),side:mix(s.sideB,s.sideA,wt),h:mix(s.hB,s.hA,e),
    rise:mix(s.rise[0],s.rise[1],s.late?sm((u-.45)/.55):sm(u)),idx:i,step:s,u};
}
