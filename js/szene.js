/* ================= Szene ================= */
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(devicePixelRatio); renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true; document.body.appendChild(renderer.domElement);
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x1b1d24);
const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,0.05,100);
const controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true; controls.maxPolarAngle=Math.PI*.495;
scene.add(new THREE.HemisphereLight(0xffffff,0x334455,0.9));
const sun=new THREE.DirectionalLight(0xffffff,1.4); sun.position.set(3,6,2); sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048); Object.assign(sun.shadow.camera,{left:-4,right:4,top:4,bottom:-4});
scene.add(sun); scene.add(sun.target);
const cv=document.createElement('canvas'); cv.width=cv.height=512; const g=cv.getContext('2d');
for(let y=0;y<16;y++)for(let x=0;x<5;x++){const l=55+Math.random()*20;
  g.fillStyle=`hsl(30,45%,${l*0.6}%)`; g.fillRect(x*128-(y%2)*64,y*32,128,32);
  g.strokeStyle='#0004'; g.strokeRect(x*128-(y%2)*64,y*32,128,32);}
const tex=new THREE.CanvasTexture(cv); tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
tex.colorSpace=THREE.SRGBColorSpace;
const floor=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshStandardMaterial({map:tex,roughness:.6}));
floor.rotation.x=-Math.PI/2; floor.receiveShadow=true; scene.add(floor);
// Raum: Wände sind nur von innen sichtbar, damit man von außen hineinschauen kann
const walls=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x4a5068,roughness:.9,side:THREE.BackSide}));
walls.receiveShadow=true; scene.add(walls);
const skirting=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x2a2d3a,roughness:.8,side:THREE.BackSide})); scene.add(skirting);
function buildRoom(w,d){
  ROOM.w=w; ROOM.d=d;
  floor.scale.set(w,d,1); tex.repeat.set(w/4,d/4);
  walls.scale.set(w,3.25,d); walls.position.y=1.575; skirting.scale.set(w-.05,.17,d-.05); skirting.position.y=.035;   // Böden der Kästen liegen 5 cm unter dem Parkett
  overview();
}
function overview(){ const w=ROOM.w,d=ROOM.d; camera.position.set(w*.5,Math.max(w,d)*.62+1.5,-d*.5-Math.max(w,d)*.75); controls.target.set(0,.7,0); }
buildRoom(ROOM.w,ROOM.d);

/* ---------- Tänzer ---------- */
const UP=new THREE.Vector3(0,1,0), V3=THREE.Vector3;
function mk(geo,mat,parent=scene){ const m=new THREE.Mesh(geo,mat); m.castShadow=true; parent.add(m); return m; }
function limb(r,mat){ const geo=new THREE.CylinderGeometry(r*.8,r,1,12); geo.translate(0,.5,0); return mk(geo,mat); }
function placeLimb(m,a,b){ const d=new V3().subVectors(b,a), len=d.length();
  m.position.copy(a); m.scale.set(1,Math.max(len,1e-4),1); if(len>1e-6) m.quaternion.setFromUnitVectors(UP,d.multiplyScalar(1/len)); }
function ik(a,b,l1,l2,bend){ // Zwei-Knochen-IK: j = Gelenk, e = erreichter Endpunkt
  const d=new V3().subVectors(b,a), full=d.length(), dist=clamp(full,1e-4,(l1+l2)*.999);
  const dir=full>1e-6?d.multiplyScalar(1/full):new V3(0,-1,0);
  const x=(l1*l1-l2*l2+dist*dist)/(2*dist), hgt=Math.sqrt(Math.max(0,l1*l1-x*x));
  const perp=bend.clone().addScaledVector(dir,-bend.dot(dir)); if(perp.lengthSq()<1e-8) perp.set(0,0,1); perp.normalize();
  return {j:a.clone().addScaledVector(dir,x).addScaledVector(perp,hgt), e:a.clone().addScaledVector(dir,dist)};
}
class Dancer{
  constructor(color,fem){
    const k=this.k=fem?.93:1; this.fem=fem; this.shW=fem?.17:.2;
    const M=(c,r=.55)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
    const top=M(color), skin=M(0xf1c7a5,.7), legs=fem?skin:M(0x1c2540), shoe=M(fem?0x8f1d3a:0x15151a,.35), hair=M(fem?0x5a3418:0x2e2218,.8);
    this.P=new V3(); this.sh={L:new V3(),R:new V3()}; this.headPos=new V3(); this.fw=new V3(0,0,1); this.left=new V3(1,0,0);
    this.hipG=new THREE.Group(); this.chestG=new THREE.Group(); this.headG=new THREE.Group(); scene.add(this.hipG,this.chestG);
    // Becken, Rock
    const pel=mk(new THREE.SphereGeometry(.13*k,20,14),fem?top:legs,this.hipG); pel.scale.set(1.2,.78,.85);
    if(fem){ const sm_=top.clone(); sm_.side=THREE.DoubleSide; const g=new THREE.CylinderGeometry(.11,.3,.44,28,1,true); g.translate(0,-.16,0);
      this.skirt=mk(g,sm_); }
    // Oberkörper, Hals, Kopf
    const torso=mk(new THREE.CapsuleGeometry(.115*k,.25*k,6,18),top,this.chestG); torso.position.y=.2*k; torso.scale.set(fem?1.18:1.38,1,.8);
    mk(new THREE.CylinderGeometry(.04*k,.045*k,.1*k,12),skin,this.chestG).position.y=.47*k;
    this.chestG.add(this.headG); this.headG.position.y=.5*k;
    mk(new THREE.SphereGeometry(.1*k,22,18),skin,this.headG).position.y=.1*k;
    const hr=mk(new THREE.SphereGeometry(.106*k,20,14,0,Math.PI*2,0,Math.PI*.44),hair,this.headG); hr.position.y=.1*k; hr.rotation.x=-.5;
    if(fem) mk(new THREE.SphereGeometry(.055*k,14,10),hair,this.headG).position.set(0,.17*k,-.09*k);
    const nose=mk(new THREE.ConeGeometry(.014,.035,8),skin,this.headG); nose.position.set(0,.09*k,.1*k); nose.rotation.x=Math.PI/2;
    // Gliedmaßen und Gelenke
    this.limbs={thL:limb(.06*k,legs),thR:limb(.06*k,legs),shL:limb(.048*k,legs),shR:limb(.048*k,legs),
      uaL:limb(.042*k,fem?skin:top),uaR:limb(.042*k,fem?skin:top),faL:limb(.034*k,fem?skin:top),faR:limb(.034*k,fem?skin:top)};
    this.j={}; const ball=(n,r,m)=>{for(const s of 'LR') this.j[n+s]=mk(new THREE.SphereGeometry(r*k,12,10),m);};
    ball('kn',.05,legs); ball('el',.036,fem?skin:top); ball('ha',.04,skin); ball('so',.052,top);
    this.feet={}; for(const s of 'LR'){ const g=new THREE.Group(); scene.add(g);
      mk(new THREE.BoxGeometry(.085*k,.05,.23*k),shoe,g).position.set(0,-.045,.055*k); this.feet[s]=g; }
    this.reset();
  }
  reset(){ this.lag=null; this.hyS=null; this.headYaw=0; this.skY=null; this.prevYaw=null; this.spin=0; }
  /* po = Ergebnis von evalDancer, sty = Bewegungsstil, tb = Zeit in Schlägen, ex = {prom, closed} */
  update(po,sty,dt,tb,ex){
    const k=this.k, yaw=po.h+ex.prom;
    const fw=new V3(Math.sin(yaw),0,Math.cos(yaw)), left=new V3(Math.cos(yaw),0,-Math.sin(yaw));
    // Füße: Knöchel so setzen, dass je nach Neigung Ballen oder Ferse am Boden bleibt
    const A={};
    for(const s of 'LR'){ const f=po.feet[s], sg=s==='L'?1:-1, fy=f.yaw+sg*sty.turnout, ph=f.pitch+po.rise*.28;
      const dir=new V3(Math.sin(fy),0,Math.cos(fy)), a=new V3(f.p[0],f.lift,f.p[1]), c=Math.cos(ph), sn=Math.sin(ph);
      if(ph>=0){ a.addScaledVector(dir,.11-.11*c+.07*sn); a.y+=.11*sn+.07*c; }
      else { a.addScaledVector(dir,-.05+.05*c+.07*sn); a.y+=-.05*sn+.07*c; }
      A[s]=a; const g=this.feet[s]; g.position.copy(a); g.rotation.set(ph,fy,0,'YXZ'); }
    // Becken: über dem Standbein, Höhe aus Stil (Heben/Senken, Federn) und Beinlänge
    const fl=po.feet.L.p, fr=po.feet.R.p, g0=lerp(po.sup,lerp(fl,fr,.5),sty.mid);
    const gx=g0[0]+left.x*po.side*.025*sty.hip, gz=g0[1]+left.z*po.side*.025*sty.hip;
    if(!this.lag) this.lag=[gx,gz];
    const kl=Math.min(1,dt*5); this.lag[0]+=(gx-this.lag[0])*kl; this.lag[1]+=(gz-this.lag[1])*kl;
    let hy=k*.935-sty.drop+(sty.rise?(po.rise-.35)*.05:0)-sty.bounce*(.5+.5*Math.cos(2*Math.PI*tb));
    this.hyS=this.hyS===null?hy:this.hyS+(hy-this.hyS)*Math.min(1,dt*20); hy=this.hyS;
    const Lg=.9*k*.997;
    for(const s of 'LR'){ const sg=s==='L'?1:-1, hx=gx+left.x*.09*k*sg, hz=gz+left.z*.09*k*sg;
      hy=Math.min(hy,A[s].y+Math.sqrt(Math.max(.02,Lg*Lg-(A[s].x-hx)**2-(A[s].z-hz)**2))+.02); }
    const P=this.P.set(gx,hy,gz);
    const roll=sty.hip*po.side*.09;
    this.hipG.position.copy(P); this.hipG.rotation.set(0,yaw+sty.hip*po.side*.14,roll,'YXZ'); this.hipG.updateMatrixWorld(true);
    // Oberkörper: Gegenbewegung zu den Beinen, Neigung (Sway) durch Nachlaufen
    const swing=this.swing=clamp((fl[0]-fr[0])*fw.x+(fl[1]-fr[1])*fw.z,-.5,.5);
    const cy=this.chestYaw=yaw+clamp(swing*.45,-.2,.2)*(1-.6*ex.closed);
    const ol=(this.lag[0]-gx)*left.x+(this.lag[1]-gz)*left.z;
    const sway=clamp(-ol*(sty.rise?1.4:.5),-.14,.14);
    this.chestG.position.set(gx-left.x*po.side*.012*sty.hip,hy+.1*k,gz-left.z*po.side*.012*sty.hip);
    this.chestG.rotation.set((sty.drop>.03?.03:0)-(this.fem&&sty.std?.07*ex.closed:0),cy,sway-roll*.5,'YXZ');
    this.chestG.updateMatrixWorld(true);
    this.fw.set(Math.sin(cy),0,Math.cos(cy)); this.left.set(Math.cos(cy),0,-Math.sin(cy));
    for(const s of 'LR'){ const sg=s==='L'?1:-1;
      this.chestG.localToWorld(this.sh[s].set(this.shW*k*sg,.37*k,0)); this.j['so'+s].position.copy(this.sh[s]);
      const hip=this.hipG.localToWorld(new V3(.09*k*sg,-.02,0)), fy=po.feet[s].yaw+sg*sty.turnout;
      const r=ik(hip,A[s],.46*k,.44*k,new V3(Math.sin(fy),0,Math.cos(fy)).add(fw));
      placeLimb(this.limbs['th'+s],hip,r.j); placeLimb(this.limbs['sh'+s],r.j,r.e); this.j['kn'+s].position.copy(r.j); }
    this.chestG.localToWorld(this.headPos.set(0,.6*k,0));
    if(this.skirt){ // Rock schwingt nach und öffnet sich bei Drehungen
      if(this.skY===null){ this.skY=yaw; this.prevYaw=yaw; }
      const om=Math.abs(wrap(yaw-this.prevYaw))/Math.max(dt,1e-3); this.prevYaw=yaw;
      this.spin+=(Math.min(om,8)-this.spin)*Math.min(1,dt*4); this.skY+=wrap(yaw-this.skY)*Math.min(1,dt*7);
      const fl_=1+Math.min(.45,this.spin*.1)+Math.min(.2,Math.abs(swing)*.35);
      this.skirt.position.copy(P); this.skirt.rotation.set(0,this.skY,roll*.5,'YXZ'); this.skirt.scale.set(fl_,1-(fl_-1)*.3,fl_); }
  }
  freeHand(s,sty){ const sg=s==='L'?1:-1, k=this.k, p=this.sh[s].clone();
    if(sty.hip>=.5){ p.addScaledVector(this.left,sg*.34*k).addScaledVector(this.fw,.12); p.y-=.2*k; }   // Latein: Arm seitlich
    else { p.addScaledVector(this.left,sg*.15).addScaledVector(this.fw,.1-sg*this.swing*.3); p.y-=.45*k; }
    return p; }
  arms(hL,hR,closed){
    for(const [s,h] of [['L',hL],['R',hR]]){ const sg=s==='L'?1:-1, k=this.k;
      const bend=new V3(0,-mix(.5,.45,closed),0).addScaledVector(this.left,sg*mix(.45,1,closed)).addScaledVector(this.fw,-mix(.8,.25,closed));
      const r=ik(this.sh[s],h,.29*k,.27*k,bend);
      placeLimb(this.limbs['ua'+s],this.sh[s],r.j); placeLimb(this.limbs['fa'+s],r.j,r.e);
      this.j['el'+s].position.copy(r.j); this.j['ha'+s].position.copy(r.e); }
  }
}
const herr=new Dancer(0x3d7bff,false), dame=new Dancer(0xff4d6d,true);

/* Zielpunkte der Hände je Tanzhaltung */
function reach(p,a,ra,b,rb){ for(let i=0;i<4;i++) for(const [c,r] of [[a,ra],[b,rb]]){ const d=p.clone().sub(c), l=d.length(); if(l>r) p.copy(c).addScaledVector(d,r/l); } return p; }
function handTargets(hold,sty){
  const hr=.54*herr.k, dr=.54*dame.k;
  const join=(a,b)=>{ const p=a.clone().add(b).multiplyScalar(.5); p.y=dame.P.y+.14; return reach(p,a,hr,b,dr); };
  const t={HL:herr.freeHand('L',sty),HR:herr.freeHand('R',sty),DL:dame.freeHand('L',sty),DR:dame.freeHand('R',sty)};
  switch(hold){
    case 'zu': case 'prom': {
      const j=herr.sh.L.clone().add(dame.sh.R).multiplyScalar(.5).addScaledVector(herr.left,.2); j.y=dame.sh.R.y+(sty.std?.13:.03);
      reach(j,herr.sh.L,hr,dame.sh.R,dr);
      const back=reach(dame.chestG.localToWorld(new V3(.09,.22*dame.k,-.11)),herr.sh.R,hr,herr.sh.R,hr);   // Hand am linken Schulterblatt der Dame
      const arm=herr.sh.R.clone().addScaledVector(herr.fw,.03); arm.y-=.05;                                 // ihre Hand auf seinem Oberarm
      return {HL:j,DR:j.clone(),HR:back,DL:reach(arm,dame.sh.L,dr,dame.sh.L,dr)}; }
    case 'offen': { const a=join(herr.sh.L,dame.sh.R), b=join(herr.sh.R,dame.sh.L); return {HL:a,DR:a.clone(),HR:b,DL:b.clone()}; }
    case 'LR': { const a=join(herr.sh.L,dame.sh.R); t.HL=a; t.DR=a.clone(); return t; }
    case 'RL': { const b=join(herr.sh.R,dame.sh.L); t.HR=b; t.DL=b.clone(); return t; }
    case 'kreuz': { const a=join(herr.sh.R,dame.sh.R), b=join(herr.sh.L,dame.sh.L); b.y-=.08; return {HR:a,DR:a.clone(),HL:b,DL:b.clone()}; }
    case 'korb': { // seine rechte Hand hält hinter ihrem Rücken ihre linke an ihrer rechten Hüfte, die anderen Hände sind vor ihr gefasst
      const hip=dame.P.clone().addScaledVector(dame.left,-.19*dame.k).addScaledVector(dame.fw,.05); hip.y+=.2; reach(hip,herr.sh.R,hr,dame.sh.L,dr);
      const fr=dame.P.clone().addScaledVector(dame.fw,.3).addScaledVector(dame.left,.06); fr.y+=.16; reach(fr,herr.sh.L,hr,dame.sh.R,dr);
      return {HR:hip,DL:hip.clone(),HL:fr,DR:fr.clone()}; }
    case 'schatten': { // linke Hände seitlich gefasst, seine rechte Hand an ihrer rechten Hüfte
      const a=dame.sh.L.clone().addScaledVector(dame.left,.28).addScaledVector(dame.fw,.05); a.y-=.04; reach(a,herr.sh.L,hr,dame.sh.L,dr);
      const hip=dame.P.clone().addScaledVector(dame.left,-.18*dame.k); hip.y+=.14; reach(hip,herr.sh.R,hr,dame.sh.R,dr);
      return {HL:a,DL:a.clone(),HR:hip,DR:hip.clone()}; }
    case 'hoch': { const j=dame.headPos.clone(); j.y+=.25*dame.k; reach(j,herr.sh.L,hr,dame.sh.R,dr); t.HL=j; t.DR=j.clone(); return t; }
  }
  return t;
}
function aimHead(a,b,sty,closed,prom,stdYaw,promYaw,dt){
  const d=b.headPos.clone().sub(a.headPos), look=clamp(wrap(Math.atan2(d.x,d.z)-a.chestYaw),-1.3,1.3);
  const cp=sty.std?mix(stdYaw,promYaw,prom):mix(look,promYaw*.7,prom), y=mix(look,cp,closed);
  a.headYaw+=(y-a.headYaw)*Math.min(1,dt*9);
  const t=a.fem&&sty.std?closed:0; a.headG.rotation.set(-.1*t,a.headYaw,.08*t,'YXZ');
}

/* ================= Fußabdrücke ================= */
const prints=[]; const printGeo=new THREE.CircleGeometry(.06,16);
function addPrint(p,yaw,color,opacity=.7,parent=scene){
  const m=new THREE.Mesh(printGeo,new THREE.MeshBasicMaterial({color,transparent:true,opacity}));
  m.rotation.set(-Math.PI/2,yaw,0,'YXZ'); m.scale.set(.6,1.6,1);
  m.position.set(p[0]+Math.sin(yaw)*.055,.005,p[1]+Math.cos(yaw)*.055); parent.add(m); if(parent!==scene) return m; prints.push(m);
  if(prints.length>48){const o=prints.shift(); scene.remove(o); o.material.dispose();}
  return m;
}
const clearPrints=()=>{prints.forEach(p=>{scene.remove(p);p.material.dispose();}); prints.length=0;};
const COL={H:0x3d7bff,D:0xff4d6d};
const markStep=(s,who)=>{ if(s&&s.weight&&$('prints').value==='spur'&&$('printWho').value.includes(who)) addPrint(s.to,s.yaw[1],COL[who]); };

/* Schrittdiagramm: alle Schritte der aktuellen Figur mit Schrittnummer, wie im Tanzbuch */
const diagram=new THREE.Group(); scene.add(diagram); let diagramKey='';
const labelTex={};
function label(txt,color){
  const key=txt+color; if(!labelTex[key]){ const c=document.createElement('canvas'); c.width=c.height=64; const x=c.getContext('2d');
    x.fillStyle=color; x.beginPath(); x.arc(32,32,30,0,7); x.fill(); x.fillStyle='#fff'; x.font='bold 38px system-ui,sans-serif'; x.textAlign='center'; x.textBaseline='middle'; x.fillText(txt,32,35);
    labelTex[key]=new THREE.CanvasTexture(c); labelTex[key].colorSpace=THREE.SRGBColorSpace; }
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:labelTex[key],depthTest:false,transparent:true})); sp.scale.set(.13,.13,1); sp.renderOrder=5; return sp;
}
function clearDiagram(){ for(const m of [...diagram.children]){ diagram.remove(m); m.material.dispose(); } diagramKey=''; }
function showDiagram(tl,item,rep,who){
  const key=[item,rep,who,tl.total,tl.H[0].from].join(); if(key===diagramKey) return; clearDiagram(); diagramKey=key;
  for(const w of who) { let n=0;
    for(const s of tl[w]) if(s.item===item&&s.rep===rep&&s.kind!=='halt'){ n++;
      addPrint(s.to,s.yaw[1],COL[w],s.weight?.8:.3,diagram);
      const sp=label(String(n),w==='H'?'#2456c9':'#c92447'); sp.position.set(s.to[0]+Math.cos(s.yaw[1])*(w==='H'?.1:-.1),.09,s.to[1]-Math.sin(s.yaw[1])*(w==='H'?.1:-.1)); diagram.add(sp); } }
}

