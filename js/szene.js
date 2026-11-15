/* ================= Szene ================= */
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(devicePixelRatio); renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; document.body.appendChild(renderer.domElement);
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x1b1d24);
/* Alles Sichtbare hängt an „world“. Für die Spiegelbild-Ansicht wird diese Gruppe seitenverkehrt (x → −x). */
const world=new THREE.Group(); scene.add(world);
let mirrored=false;
function setMirror(m){ mirrored=m; world.scale.x=m?-1:1; clearDiagram(); }
const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,0.05,100);
const controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true; controls.maxPolarAngle=Math.PI*.495;
const hemi=new THREE.HemisphereLight(0xffffff,0x334455,0.9); scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,1.4); sun.position.set(3,6,2); sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048); Object.assign(sun.shadow.camera,{left:-4,right:4,top:4,bottom:-4});
world.add(sun); world.add(sun.target);
/* Parkett: Stäbe mit Maserung */
const cv=document.createElement('canvas'); cv.width=cv.height=1024; const g=cv.getContext('2d');
for(let y=0;y<16;y++)for(let x=-1;x<4;x++){ const px=x*256+(y%2)*128, py=y*64, l=30+Math.random()*13, hue=26+Math.random()*8;
  g.fillStyle=`hsl(${hue},48%,${l}%)`; g.fillRect(px,py,256,64);
  for(let i=0;i<14;i++){ g.strokeStyle=`hsla(${hue},45%,${l+(Math.random()<.5?-9:8)}%,.35)`; g.lineWidth=.6+Math.random()*1.2;
    const yy=py+4+Math.random()*56; g.beginPath(); g.moveTo(px,yy); g.bezierCurveTo(px+80,yy+Math.random()*6-3,px+170,yy+Math.random()*6-3,px+256,yy+Math.random()*4-2); g.stroke(); }
  g.strokeStyle='#0007'; g.lineWidth=1.5; g.strokeRect(px,py,256,64); }
const tex=new THREE.CanvasTexture(cv); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.anisotropy=8;
tex.colorSpace=THREE.SRGBColorSpace;
const floor=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshStandardMaterial({map:tex,roughness:.45,metalness:.05}));
floor.rotation.x=-Math.PI/2; floor.receiveShadow=true; world.add(floor);
/* Glanz: eine fast durchsichtige Spiegelfläche knapp über dem Parkett (abschaltbar, kostet Rechenleistung) */
const gloss=new THREE.Reflector(new THREE.PlaneGeometry(1,1),{textureWidth:Math.min(1024,innerWidth),textureHeight:Math.min(1024,innerHeight),clipBias:.003});
gloss.material.transparent=true; gloss.material.depthWrite=false; gloss.rotation.x=-Math.PI/2; gloss.position.y=.004; scene.add(gloss);
// Raum: Wände sind nur von innen sichtbar, damit man von außen hineinschauen kann
const walls=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x565d78,roughness:.95,side:THREE.BackSide}));
walls.receiveShadow=true; world.add(walls);
const skirting=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x2a2d3a,roughness:.8,side:THREE.BackSide})); world.add(skirting);
function buildRoom(w,d){
  ROOM.w=w; ROOM.d=d;
  floor.scale.set(w,d,1); gloss.scale.set(w,d,1); tex.repeat.set(w/3,d/3); texHell.repeat.set(w/3.2,d/3.2); buildSaal(w,d);
  walls.scale.set(w,3.25,d); walls.position.y=1.575; skirting.scale.set(w-.05,.17,d-.05); skirting.position.y=.035;   // Böden der Kästen liegen 5 cm unter dem Parkett
  leuchter.position.set(0,2.72,0); spiegel3d.scale.set(w-1,2.3,1); spiegel3d.position.set(0,1.32,d/2-.03); spiegelRahmen.scale.set(w-.84,2.46,1); spiegelRahmen.position.set(0,1.32,d/2-.02);
  overview();
}
/* Ballsaal: gedämpftes Licht, Scheinwerfer auf dem Paar, Kronleuchter und eine Spiegelwand */
const spot=new THREE.SpotLight(0xfff1d6,0,0,.42,.6,1.2); spot.castShadow=true; spot.shadow.mapSize.set(1024,1024); world.add(spot); world.add(spot.target);
const leuchter=new THREE.Group(); world.add(leuchter);
{ const gold=new THREE.MeshStandardMaterial({color:0xc9a24a,roughness:.3,metalness:.6}), glow=new THREE.MeshBasicMaterial({color:0xffe9b8});
  const rod=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.5,8),gold); rod.position.y=.25; leuchter.add(rod);
  for(const [r,y,n] of [[.5,0,12],[.3,-.14,8]]){ const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.014,8,40),gold); ring.rotation.x=Math.PI/2; ring.position.y=y; leuchter.add(ring);
    for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, b=new THREE.Mesh(new THREE.SphereGeometry(.028,10,8),glow); b.position.set(Math.cos(a)*r,y+.05,Math.sin(a)*r); leuchter.add(b);
      const dr=new THREE.Mesh(new THREE.ConeGeometry(.012,.07,6),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.1,transparent:true,opacity:.6})); dr.position.set(Math.cos(a)*r,y-.06,Math.sin(a)*r); dr.rotation.x=Math.PI; leuchter.add(dr); } }
  const pl=new THREE.PointLight(0xffd9a0,9,0,1.6); pl.position.y=-.2; leuchter.add(pl); }
const spiegel3d=new THREE.Reflector(new THREE.PlaneGeometry(1,1),{textureWidth:Math.min(1024,innerWidth),textureHeight:Math.min(1024,innerHeight),clipBias:.003,color:0xb8bcc4});
spiegel3d.rotation.y=Math.PI; scene.add(spiegel3d);
const spiegelRahmen=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshStandardMaterial({color:0xb08d3c,roughness:.35,metalness:.5})); spiegelRahmen.rotation.y=Math.PI; world.add(spiegelRahmen);
/* „Unsere Tanzschule“: der Saal aus dem Video – heller Holzboden, dunkle Decke mit Leuchtröhren, blau-violette Wände mit braunem Band,
   eine braun gestrichene Wand mit Holztheke, eine weiße Wand mit gelb-schwarzem Streifen davor, Heizkörper, Türen und Lautsprecherboxen */
const cv2=document.createElement('canvas'); cv2.width=cv2.height=1024; { const g=cv2.getContext('2d');
  for(let y=0;y<24;y++)for(let x=-1;x<3;x++){ const px=x*400+(y%3)*133, py=y*43, l=72+Math.random()*8, hue=35+Math.random()*5;
    g.fillStyle=`hsl(${hue},42%,${l}%)`; g.fillRect(px,py,400,43);
    for(let i=0;i<6;i++){ g.strokeStyle=`hsla(${hue},40%,${l-8}%,.3)`; g.lineWidth=.6+Math.random(); const yy=py+3+Math.random()*37; g.beginPath(); g.moveTo(px,yy); g.bezierCurveTo(px+130,yy+Math.random()*4-2,px+270,yy+Math.random()*4-2,px+400,yy+Math.random()*3-1.5); g.stroke(); }
    g.strokeStyle='#5a3c1c55'; g.lineWidth=1; g.strokeRect(px,py,400,43); } }
const texHell=new THREE.CanvasTexture(cv2); texHell.wrapS=texHell.wrapT=THREE.RepeatWrapping; texHell.anisotropy=8; texHell.colorSpace=THREE.SRGBColorSpace;
const cv3=document.createElement('canvas'); cv3.width=512; cv3.height=64; { const g=cv3.getContext('2d');   // Holzvertäfelung: senkrechte Bretter
  for(let x=0;x<16;x++){ g.fillStyle=`hsl(${22+Math.random()*6},58%,${36+Math.random()*8}%)`; g.fillRect(x*32,0,32,64); g.fillStyle='#0004'; g.fillRect(x*32,0,1.5,64); } }
const texPaneel=new THREE.CanvasTexture(cv3); texPaneel.wrapS=texPaneel.wrapT=THREE.RepeatWrapping; texPaneel.colorSpace=THREE.SRGBColorSpace;
const cv4=document.createElement('canvas'); cv4.width=256; cv4.height=32; { const g=cv4.getContext('2d'); g.fillStyle='#f2c200'; g.fillRect(0,0,256,32); g.fillStyle='#161616';
  for(let x=-32;x<256;x+=64){ g.beginPath(); g.moveTo(x,32); g.lineTo(x+32,0); g.lineTo(x+64,0); g.lineTo(x+32,32); g.fill(); } }
const texWarn=new THREE.CanvasTexture(cv4); texWarn.wrapS=THREE.RepeatWrapping; texWarn.colorSpace=THREE.SRGBColorSpace;
const saal=new THREE.Group(); world.add(saal);
function buildSaal(w,d){
  for(const m of [...saal.children]){ saal.remove(m); m.geometry.dispose(); }
  const H=3.2, std=(c,r=.9,o={})=>new THREE.MeshStandardMaterial({color:c,roughness:r,...o});
  /* Fläche innen an einer Wand: side N/S/W/E, a..b = Anteil der Wandbreite (0–1), y0..y1 = Höhe, e = Abstand vor der Wand */
  const wand=(side,a,b,y0,y1,mat,e=.012)=>{ const L=side==='N'||side==='S'?w:d, m=new THREE.Mesh(new THREE.PlaneGeometry((b-a)*L,y1-y0),mat), u=((a+b)/2-.5)*L;
    if(side==='N'){ m.position.set(-u,(y0+y1)/2,d/2-e); m.rotation.y=Math.PI; } else if(side==='S') m.position.set(u,(y0+y1)/2,-d/2+e);
    else if(side==='W'){ m.position.set(-w/2+e,(y0+y1)/2,-u); m.rotation.y=Math.PI/2; } else { m.position.set(w/2-e,(y0+y1)/2,u); m.rotation.y=-Math.PI/2; }
    m.receiveShadow=true; saal.add(m); return m; };
  const kasten=(x,y,z,sx,sy,sz,mat)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; saal.add(m); return m; };
  const braun=std(0xa86a3c,.95), paneel=()=>braun;   // Wände glatt braun gestrichen (kein Holz); aus Holz ist nur die Theke
  const dunkel=std(0x17181c,.8), weiss=std(0xf2f2ee,.85,{emissive:0x55554f}), holz=std(0xa9743c,.6), schwarz=std(0x101012,.6);
  // Decke (von oben unsichtbar) und drei Reihen Leuchtröhren
  const decke=new THREE.Mesh(new THREE.PlaneGeometry(w,d),std(0x14161d,1)); decke.rotation.x=Math.PI/2; decke.position.y=H-.01; saal.add(decke);
  for(const z of [-d*.3,0,d*.3]){ const r=new THREE.Mesh(new THREE.PlaneGeometry(w*.82,.11),new THREE.MeshBasicMaterial({color:0xf4f8ff})); r.rotation.x=Math.PI/2; r.position.set(0,H-.16,z); saal.add(r);
    const tr=new THREE.Mesh(new THREE.PlaneGeometry(w*.84,.2),std(0x8a8d93,.5)); tr.rotation.x=Math.PI/2; tr.position.set(0,H-.15,z); saal.add(tr); }
  // braunes Band oben rundum
  for(const sd of 'NSWE') wand(sd,0,1,2.45,H,paneel(sd==='N'||sd==='S'?w:d));
  const hell=std(0xc9a26a,.55), glas=std(0xbfd8e6,.3,{emissive:0x4a6470}), tuerW=std(0xe6e4dc,.7), teal=std(0x5f9a96,.7), lit=std(0xd9c9a8,.9,{emissive:0x6b5a3a});
  /* Nordwand (braun), von der Ecke zur weißen Wand aus: weiße Tür, Heizkörper, Glastür ins Foyer, Theke mit Leiter, Durchgang */
  wand('N',0,1,0,2.45,paneel(w));
  wand('N',.04,.04+.9/w,0,2.02,tuerW,.02); wand('N',.14,.14+1.1/w,.16,.62,weiss,.05);
  wand('N',.4,.4+1.3/w,0,2.1,glas,.02); wand('N',.4,.4+.04/w,0,2.1,weiss,.03); wand('N',.4+1.26/w,.4+1.3/w,0,2.1,weiss,.03);
  { const cx=-w*.17, cw=Math.min(3,w*.34); { const t=texPaneel.clone(); t.needsUpdate=true; t.repeat.set(cw/1.6,1); kasten(cx,.52,d/2-.75,cw,1.04,.55,std(0xffffff,.7,{map:t})); } kasten(cx,1.06,d/2-.75,cw+.15,.05,.68,std(0x7a4f24,.5));
    for(const sx of [-.2,.2]){ const l=kasten(cx+cw*.3+sx,1.05,d/2-.16,.035,2.1,.035,std(0xb9bcc2,.4,{metalness:.5})); l.rotation.x=.1; }
    for(let k=0;k<6;k++) kasten(cx+cw*.3,.3+k*.32,d/2-.19+k*.033,.4,.025,.03,std(0xb9bcc2,.4,{metalness:.5}));           // Leiter
    wand('N',.5+(.17*w-cw*.1)/w/1,.5+(.17*w-cw*.1+.34)/w,1.25,1.75,std(0x6d7076,.6),.04); }                                 // grauer Kasten an der Wand
  wand('N',.88,.88+1/w,0,2.05,dunkel,.02);
  /* Westwand (blau), von der Holzwand aus: Lautsprecher, dunkler und weißer Heizkörper, Durchgang mit türkisem Rahmen in einen hellen Raum */
  kasten(-w/2+.4,.28,d*.34,.34,.56,.3,schwarz); kasten(-w/2+.4,.28,d*.34-.5,.34,.56,.3,schwarz);
  wand('W',.24,.24+1.1/d,.14,.62,dunkel,.05); wand('W',.4,.4+1.3/d,.14,.62,weiss,.05);
  wand('W',.62,.62+1.5/d,0,2.15,teal,.02); wand('W',.62+.12/d,.62+1.38/d,0,2.05,lit,.03);
  /* Südwand (blau): zwei dunkle Türen, ein Heizkörper */
  wand('S',.08,.08+.95/w,0,2.05,dunkel,.02); wand('S',.82,.82+.95/w,0,2.05,dunkel,.02); wand('S',.45,.45+1.2/w,.14,.62,weiss,.05);
  /* Ostwand: große weiße Fläche, davor die niedrige Bühne mit gelb-schwarzer Kante und Holzstufen; braune Flächen in den Ecken */
  wand('E',.1,.9,0,2.45,weiss,.02); wand('E',0,.1,0,2.45,paneel(d*.1),.02); wand('E',.9,1,0,2.45,paneel(d*.1),.02);
  const bt=Math.min(1,w*.09); kasten(w/2-bt/2,.075,0,bt,.15,d*.8,hell);
  const tw=texWarn.clone(); tw.needsUpdate=true; tw.repeat.set(d*.8/.5,1);
  const st=new THREE.Mesh(new THREE.PlaneGeometry(d*.8,.07),new THREE.MeshStandardMaterial({map:tw,roughness:.7})); st.rotation.set(-Math.PI/2,0,Math.PI/2); st.position.set(w/2-bt+.04,.152,0); saal.add(st);
  kasten(w/2-bt-.2,.07,d*.3,.4,.14,1.0,holz); kasten(w/2-bt-.2,.07,d*.3-1.1,.4,.14,1.0,holz);
}
let ambiente='schule';
function setAmbience(a){ ambiente=a; const b=a==='ball', z=a==='saal';
  hemi.intensity=b?.32:z?1.7:.9; sun.intensity=b?.35:z?1.3:1.4; spot.intensity=b?55:0; leuchter.visible=spiegel3d.visible=spiegelRahmen.visible=b; saal.visible=z;
  floor.material.map=z?texHell:tex; floor.material.needsUpdate=true;
  walls.material.color.set(b?0x4a2530:z?0x6d77b6:0x565d78); skirting.material.color.set(b?0x2a1418:z?0x3a3f5c:0x2a2d3a); scene.background.set(b?0x0d0b10:0x1b1d24); }
function overview(){ const w=ROOM.w,d=ROOM.d; camera.position.set(w*.5,Math.max(w,d)*.62+1.5,-d*.5-Math.max(w,d)*.75); controls.target.set(0,.7,0); }
buildRoom(ROOM.w,ROOM.d); setAmbience('schule');

/* ---------- Tänzer ---------- */
const UP=new THREE.Vector3(0,1,0), V3=THREE.Vector3;
function mk(geo,mat,parent=world){ const m=new THREE.Mesh(geo,mat); m.castShadow=true; parent.add(m); return m; }
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
const lathe=(pts,k,seg=28)=>new THREE.LatheGeometry(pts.map(([r,y])=>new THREE.Vector2(r*k,y*k)),seg);
class Dancer{
  constructor(color,fem){
    const k=this.k=fem?.93:1; this.fem=fem; this.shW=fem?.17:.2;
    this.mats=[]; this.meshes=[];
    const M=(c,r=.55,o={})=>{ const m=new THREE.MeshStandardMaterial({color:c,roughness:r,...o}); this.mats.push(m); return m; };
    const add=(geo,mat,parent)=>{ const m=mk(geo,mat,parent); this.meshes.push(m); return m; };
    const dark=new THREE.Color(color).multiplyScalar(.28);
    // Herr: Anzug (Jackett in seiner Farbe, dunkle Hose, weißes Hemd). Dame: Kleid in ihrer Farbe, Arme und Beine frei.
    const top=this.topM=M(color,fem?.38:.8), skin=M(0xf1c7a5,.65), legs=fem?skin:(this.legM=M(dark,.85)), shoe=M(fem?0x7a1630:0x101014,.25), hair=M(fem?0x5a3418:0x2a1f16,.85), white=M(0xf4f4f0,.6), eye=M(0x1c1c22,.4);
    this.P=new V3(); this.sh={L:new V3(),R:new V3()}; this.headPos=new V3(); this.fw=new V3(0,0,1); this.left=new V3(1,0,0);
    this.hipG=new THREE.Group(); this.chestG=new THREE.Group(); this.headG=new THREE.Group(); world.add(this.hipG,this.chestG);
    // Becken
    const pel=add(new THREE.SphereGeometry(.13*k,20,14),fem?top:legs,this.hipG); pel.scale.set(fem?.92:1.2,fem?.7:.78,fem?.78:.85);   // bei der Dame schmal, damit nichts durch den Rock sticht
    if(fem){ // Rock: schwingender Glockenrock mit hellerem Saum
      const sm_=this.skM=M(color,.38,{side:THREE.DoubleSide});
      this.skirt=add(lathe([[.1,.06],[.122,0],[.15,-.09],[.18,-.19],[.215,-.29],[.26,-.38],[.3,-.44]],1,40),sm_);
      const hem=add(lathe([[.293,-.43],[.312,-.455]],1,40),this.hemM=M(new THREE.Color(color).lerp(new THREE.Color(0xffffff),.45),.4,{side:THREE.DoubleSide}),this.skirt);
      // Oberteil: Taille, Brust, darüber Schultern und Dekolleté in Hautfarbe
      const bod=add(lathe([[.001,-.03],[.1,-.03],[.086,.05],[.092,.13],[.118,.24],[.112,.31],[.09,.345]],k),top,this.chestG); bod.scale.set(1.2,1,.82);
      const shd=add(lathe([[.1,.29],[.116,.35],[.095,.405],[.05,.44],[.001,.45]],k),skin,this.chestG); shd.scale.set(1.3,1,.72);
    } else { // Jackett mit Hemdbrust und Krawatte
      const jac=add(lathe([[.001,-.14],[.122,-.14],[.126,-.02],[.118,.09],[.132,.24],[.142,.33],[.115,.40],[.055,.44],[.001,.45]],k),top,this.chestG); jac.scale.set(1.4,1,.8);
      const shirt=add(new THREE.SphereGeometry(.06*k,14,10),white,this.chestG); shirt.scale.set(.62,1.75,.35); shirt.position.set(0,.31*k,.092*k);
      const tie=add(new THREE.BoxGeometry(.024*k,.15*k,.012),M(0x7a1322,.5),this.chestG); tie.position.set(0,.29*k,.113*k);
    }
    // Hals, Kopf, Gesicht, Haare
    add(new THREE.CylinderGeometry(.04*k,.046*k,.1*k,12),skin,this.chestG).position.y=.47*k;
    this.chestG.add(this.headG); this.headG.position.y=.5*k;
    const head=add(new THREE.SphereGeometry(.1*k,24,20),skin,this.headG); head.position.y=.1*k; head.scale.set(.9,1.08,.98);
    const nose=add(new THREE.ConeGeometry(.013,.034,8),skin,this.headG); nose.position.set(0,.09*k,.1*k); nose.rotation.x=Math.PI/2;
    for(const sg of [1,-1]) add(new THREE.SphereGeometry(.012*k,8,6),eye,this.headG).position.set(.034*k*sg,.118*k,.086*k);
    const hr=add(new THREE.SphereGeometry(.106*k,22,14,0,Math.PI*2,0,Math.PI*.46),hair,this.headG); hr.position.y=.105*k; hr.rotation.x=-.5; hr.scale.set(.93,1.06,1);
    if(fem){ add(new THREE.SphereGeometry(.052*k,14,10),hair,this.headG).position.set(0,.19*k,-.085*k);   // Dutt
      const back=add(new THREE.SphereGeometry(.09*k,16,12),hair,this.headG); back.position.set(0,.08*k,-.035*k); back.scale.set(.98,1.05,.9); }
    // Gliedmaßen und Gelenke
    const arm=fem?skin:top;
    this.limbs={thL:limb(.066*k,legs),thR:limb(.066*k,legs),shL:limb((fem?.043:.05)*k,legs),shR:limb((fem?.043:.05)*k,legs),
      uaL:limb((fem?.036:.046)*k,arm),uaR:limb((fem?.036:.046)*k,arm),faL:limb((fem?.03:.038)*k,arm),faR:limb((fem?.03:.038)*k,arm)};
    this.meshes.push(...Object.values(this.limbs));
    this.j={}; const ball=(n,r,m,sc)=>{for(const s of 'LR'){ this.j[n+s]=add(new THREE.SphereGeometry(r*k,12,10),m); if(sc) this.j[n+s].scale.set(...sc); }};
    ball('kn',.053,legs); ball('el',fem?.031:.04,arm); ball('so',fem?.045:.058,fem?skin:top);
    // Hände: Handfläche, vier Finger (leicht gebeugt) und Daumen; sie zeigen in Richtung des Unterarms
    for(const s of 'LR'){ const sg=s==='L'?1:-1, hg=new THREE.Group(); world.add(hg); this.j['ha'+s]=hg;
      const palm=add(new THREE.SphereGeometry(.03*k,12,10),skin,hg); palm.scale.set(.95,1.3,.42); palm.position.y=.032*k;
      for(let i=0;i<4;i++){ const f=add(new THREE.CapsuleGeometry(.0085*k,.036*k,3,8),skin,hg); f.position.set((i-1.5)*.0145*k,.085*k,.006); f.rotation.x=.3; f.scale.y=i===0||i===3?.86:1; }
      const th=add(new THREE.CapsuleGeometry(.0095*k,.026*k,3,8),skin,hg); th.position.set(sg*.031*k,.04*k,.008); th.rotation.z=-sg*.65; }
    this.feet={}; for(const s of 'LR'){ const g=new THREE.Group(); world.add(g);
      if(fem){ // Tanzschuh der Dame: Fuß auf dem Ballen; Sohle, Zehen- und Fersenkappe, geschwungener Absatz, Spann- und Knöchelriemchen mit Schnalle
        const lack=this.lack??=M(0x121216,.2), silber=this.silber??=M(0xd8dade,.25,{metalness:.7}), sohle=this.sohle??=M(0xb89a78,.7);
        const B=[0,-.07,.11*k], q=new THREE.Group(), sg=s==='L'?1:-1; q.position.set(...B); q.rotation.x=.3; g.add(q);
        const at=(m,x,y,z)=>{ m.position.set(x-B[0],y-B[1],z-B[2]); return m; };
        const ft=at(add(new THREE.CapsuleGeometry(.036*k,.14*k,4,10),skin,q),0,-.04,.05*k); ft.rotation.x=Math.PI/2; ft.scale.set(.82,1,.6);
        at(add(new THREE.BoxGeometry(.056*k,.005,.2*k),sohle,q),0,-.0665,.05*k);                              // helle Ledersohle
        at(add(new THREE.SphereGeometry(.037*k,14,10),lack,q),0,-.044,.118*k).scale.set(.88,.64,1.35);        // Zehenkappe (spitz zulaufend)
        at(add(new THREE.SphereGeometry(.037*k,14,10),lack,q),0,-.04,-.03*k).scale.set(.88,.85,.8);           // Fersenkappe
        for(const sd of [-1,1]){ const w=at(add(new THREE.BoxGeometry(.004,.014,.1*k),lack,q),sd*.029*k,-.056,.04*k); w.rotation.y=sd*.03; }   // schmale Seitenteile
        // Absatz: oben breit an der Ferse, nach unten schmal, mit kleinem Absatzfleck
        at(add(new THREE.CylinderGeometry(.021*k,.009*k,.052,12),lack,q),0,-.092,-.032*k);
        at(add(new THREE.CylinderGeometry(.0095*k,.0095*k,.004,10),sohle,q),0,-.119,-.032*k);
        // Riemchen über den Spann mit Schnalle außen
        const sp=at(add(new THREE.TorusGeometry(.03*k,.0035,6,20),lack,q),0,-.04,.035*k); sp.scale.set(.86,.66,1);
        at(add(new THREE.BoxGeometry(.004,.012,.012),silber,q),sg*.027*k,-.036,.035*k);
        // Knöchelriemchen (zum Zumachen) mit Schnalle außen, hinten an der Fersenkappe gehalten
        const kr=add(new THREE.TorusGeometry(.037*k,.0035,6,20),lack,g); kr.rotation.x=Math.PI/2; kr.position.set(0,.02,0);
        add(new THREE.BoxGeometry(.005,.013,.013),silber,g).position.set(sg*.039*k,.02,.004);
        const hs=add(new THREE.BoxGeometry(.012,.05,.004),lack,g); hs.position.set(0,0,-.036*k); hs.rotation.x=.12;
      } else { // Herrenschuh: glattes Oberleder, Sohlenrand, kleiner Absatz, Schnürung
        const sh=add(new THREE.CapsuleGeometry(.04*k,.15*k,4,10),shoe,g); sh.rotation.x=Math.PI/2; sh.scale.set(1,1,.6); sh.position.set(0,-.043,.055*k);
        const rand=this.rand??=M(0x3b2a1e,.6); add(new THREE.BoxGeometry(.076*k,.007,.215*k),rand,g).position.set(0,-.0665,.06*k);
        add(new THREE.BoxGeometry(.07*k,.012,.065*k),rand,g).position.set(0,-.064,-.02*k);
        for(let i=0;i<3;i++) add(new THREE.BoxGeometry(.03*k,.003,.004),this.band??=M(0x55555c,.5),g).position.set(0,-.019,(.05+i*.018)*k); }
      if(!fem) add(new THREE.CylinderGeometry(.05*k,.045*k,.05,10),legs,g).position.set(0,-.005,0);   // Hosensaum
      this.feet[s]=g; }
    this.reset();
  }
  /* Tänzer fast durchsichtig zeigen (damit man den Partner allein sieht) */
  setGhost(on){ for(const m of this.mats){ m.transparent=on; m.opacity=on?.12:1; m.depthWrite=!on; m.needsUpdate=true; } for(const m of this.meshes) m.castShadow=!on; }
  setColor(c){ const col=new THREE.Color(c); this.topM.color.copy(col);
    if(this.fem){ this.skM.color.copy(col); this.hemM.color.copy(col).lerp(new THREE.Color(0xffffff),.45); } else this.legM.color.copy(col).multiplyScalar(.28); }
  setVisible(v){ for(const m of this.meshes) m.visible=v; }
  reset(){ this.lag=null; this.hyS=null; this.headYaw=0; this.skY=null; this.prevYaw=null; this.spin=0; this.hs=null; }
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
    if(po.flow){ g0[0]+=po.flow[0]; g0[1]+=po.flow[1]; }   // das Paar gleitet gemeinsam weiter
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
    this.hipG.position.copy(P); this.hipG.rotation.set(0,yaw+sty.hip*po.side*.14,roll,'YXZ'); this.hipG.updateMatrix();
    // Oberkörper: Gegenbewegung zu den Beinen, Neigung (Sway) durch Nachlaufen
    const swing=this.swing=clamp((fl[0]-fr[0])*fw.x+(fl[1]-fr[1])*fw.z,-.5,.5);
    const cy=this.chestYaw=yaw+clamp(swing*.45,-.2,.2)*(1-.6*ex.closed);
    const ol=(this.lag[0]-gx)*left.x+(this.lag[1]-gz)*left.z;
    const sway=clamp(-ol*(sty.rise?1.4:.5),-.14,.14);
    this.chestG.position.set(gx-left.x*po.side*.012*sty.hip,hy+.1*k,gz-left.z*po.side*.012*sty.hip);
    this.chestG.rotation.set((sty.drop>.03?.03:0)-(this.fem&&sty.std?.07*ex.closed:0),cy,sway-roll*.5,'YXZ');
    this.chestG.updateMatrix();
    this.fw.set(Math.sin(cy),0,Math.cos(cy)); this.left.set(Math.cos(cy),0,-Math.sin(cy));
    for(const s of 'LR'){ const sg=s==='L'?1:-1;
      this.sh[s].set(this.shW*k*sg,.37*k,0).applyMatrix4(this.chestG.matrix); this.j['so'+s].position.copy(this.sh[s]);
      const hip=new V3(.09*k*sg,-.02,0).applyMatrix4(this.hipG.matrix), fy=po.feet[s].yaw+sg*sty.turnout;
      const r=ik(hip,A[s],.46*k,.44*k,new V3(Math.sin(fy),0,Math.cos(fy)).add(fw));
      placeLimb(this.limbs['th'+s],hip,r.j); placeLimb(this.limbs['sh'+s],r.j,r.e); this.j['kn'+s].position.copy(r.j); }
    this.headPos.set(0,.6*k,0).applyMatrix4(this.chestG.matrix);
    // Drehtempo (für Rock und Arme)
    if(this.prevYaw===null) this.prevYaw=yaw;
    const om=Math.abs(wrap(yaw-this.prevYaw))/Math.max(dt,1e-3); this.prevYaw=yaw;
    this.spin+=(Math.min(om,8)-this.spin)*Math.min(1,dt*4);
    if(this.skirt){ // Rock schwingt nach und öffnet sich bei Drehungen
      if(this.skY===null) this.skY=yaw;
      this.skY+=wrap(yaw-this.skY)*Math.min(1,dt*7);
      const fl_=1+Math.min(.45,this.spin*.1)+Math.min(.2,Math.abs(swing)*.35);
      this.skirt.position.copy(P); this.skirt.rotation.set(0,this.skY,roll*.5,'YXZ'); const ln=sty.hip>=.5?.7:1; this.skLen=(this.skLen??ln)+(ln-(this.skLen??ln))*Math.min(1,dt*3);   // Lateinkleid ist kürzer
      this.skirt.scale.set(fl_,(1-(fl_-1)*.3)*this.skLen,fl_); }
  }
  freeHand(s,sty){ const sg=s==='L'?1:-1, k=this.k, p=this.sh[s].clone();
    const out=Math.min(.16,this.spin*.035);   // bei Drehungen zieht es den freien Arm nach außen und oben
    if(sty.hip>=.5){ p.addScaledVector(this.left,sg*(.34*k+out*.4)).addScaledVector(this.fw,.12); p.y-=.2*k-out*.5; }   // Latein: Arm seitlich
    else { p.addScaledVector(this.left,sg*(.15+out)).addScaledVector(this.fw,.1-sg*this.swing*.3); p.y-=.45*k-out*1.2; }
    return p; }
  arms(hL,hR,closed){
    for(const [s,h] of [['L',hL],['R',hR]]){ const sg=s==='L'?1:-1, k=this.k;
      const bend=new V3(0,-mix(.5,.45,closed),0).addScaledVector(this.left,sg*mix(.45,1,closed)).addScaledVector(this.fw,-mix(.8,.25,closed));
      const r=ik(this.sh[s],h,.29*k,.27*k,bend);
      placeLimb(this.limbs['ua'+s],this.sh[s],r.j); placeLimb(this.limbs['fa'+s],r.j,r.e);
      this.j['el'+s].position.copy(r.j);
      const hd=this.j['ha'+s], dir=r.e.clone().sub(r.j); if(dir.lengthSq()>1e-8){ dir.normalize(); hd.quaternion.setFromUnitVectors(UP,dir); hd.position.copy(r.e).addScaledVector(dir,-.03*k); } }
  }
}
const herr=new Dancer(0x2f5fd0,false), dame=new Dancer(0xe8365a,true);

/* Zielpunkte der Hände je Tanzhaltung */
function reach(p,a,ra,b,rb){ for(let i=0;i<4;i++) for(const [c,r] of [[a,ra],[b,rb]]){ const d=p.clone().sub(c), l=d.length(); if(l>r) p.copy(c).addScaledVector(d,r/l); } return p; }
function handTargets(hold,sty,herr,dame){
  const hr=.54*herr.k, dr=.54*dame.k;
  const join=(a,b)=>{ const p=a.clone().add(b).multiplyScalar(.5); p.y=dame.P.y+.14; return reach(p,a,hr,b,dr); };
  const t={HL:herr.freeHand('L',sty),HR:herr.freeHand('R',sty),DL:dame.freeHand('L',sty),DR:dame.freeHand('R',sty)};
  switch(hold){
    case 'zu': case 'prom': {
      const j=herr.sh.L.clone().add(dame.sh.R).multiplyScalar(.5).addScaledVector(herr.left,.2); j.y=dame.sh.R.y+(sty.std?.13:.03);
      reach(j,herr.sh.L,hr,dame.sh.R,dr);
      const back=reach(new V3(.09,.22*dame.k,-.11).applyMatrix4(dame.chestG.matrix),herr.sh.R,hr,herr.sh.R,hr);   // Hand am linken Schulterblatt der Dame
      const arm=herr.sh.R.clone().addScaledVector(herr.fw,.03); arm.y-=.05;                                 // ihre Hand auf seinem Oberarm
      return {HL:j,DR:j.clone(),HR:back,DL:reach(arm,dame.sh.L,dr,dame.sh.L,dr)}; }
    case 'offen': { const a=join(herr.sh.L,dame.sh.R), b=join(herr.sh.R,dame.sh.L); return {HL:a,DR:a.clone(),HR:b,DL:b.clone()}; }
    case 'LR': case 'faecher': { const a=join(herr.sh.L,dame.sh.R); t.HL=a; t.DR=a.clone(); return t; }
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
function addPrint(p,yaw,color,opacity=.7,parent=world){
  const m=new THREE.Mesh(printGeo,new THREE.MeshBasicMaterial({color,transparent:true,opacity}));
  m.rotation.set(-Math.PI/2,yaw,0,'YXZ'); m.scale.set(.6,1.6,1);
  m.position.set(p[0]+Math.sin(yaw)*.055,.005,p[1]+Math.cos(yaw)*.055); parent.add(m); if(parent!==world) return m; prints.push(m);
  if(prints.length>48){const o=prints.shift(); world.remove(o); o.material.dispose();}
  return m;
}
const clearPrints=()=>{prints.forEach(p=>{world.remove(p);p.material.dispose();}); prints.length=0;};
const COL={H:0x3d7bff,D:0xff4d6d};
const markStep=(s,who)=>{ if(s&&s.weight&&$('prints').value==='spur'&&$('printWho').value.includes(who)) addPrint(s.to,s.yaw[1],COL[who]); };

/* Schrittdiagramm: alle Schritte der aktuellen Figur mit Schrittnummer, wie im Tanzbuch */
const diagram=new THREE.Group(); world.add(diagram); let diagramKey='';
const labelTex={};
function label(txt,color){
  const key=txt+color; if(!labelTex[key]){ const c=document.createElement('canvas'); c.width=c.height=64; const x=c.getContext('2d');
    x.fillStyle=color; x.beginPath(); x.arc(32,32,30,0,7); x.fill(); x.fillStyle='#fff'; x.font='bold 38px system-ui,sans-serif'; x.textAlign='center'; x.textBaseline='middle'; x.fillText(txt,32,35);
    labelTex[key]=new THREE.CanvasTexture(c); labelTex[key].colorSpace=THREE.SRGBColorSpace; }
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:labelTex[key],depthTest:false,transparent:true})); sp.scale.set(mirrored?-.13:.13,.13,1); sp.renderOrder=5; return sp;   // im Spiegelbild bleiben die Ziffern lesbar
}
function clearDiagram(){ for(const m of [...diagram.children]){ diagram.remove(m); m.material.dispose(); } diagramKey=''; }
function showDiagram(tl,item,rep,who){
  const key=[item,rep,who,tl.total,tl.H[0].from].join(); if(key===diagramKey) return; clearDiagram(); diagramKey=key;
  for(const w of who) { let n=0;
    for(const s of tl[w]) if(s.item===item&&s.rep===rep&&s.kind!=='halt'){ n++;
      addPrint(s.to,s.yaw[1],COL[w],s.weight?.8:.3,diagram);
      const sp=label(String(n),w==='H'?'#2456c9':'#c92447'); sp.position.set(s.to[0]+Math.cos(s.yaw[1])*(w==='H'?.1:-.1),.09,s.to[1]-Math.sin(s.yaw[1])*(w==='H'?.1:-.1)); diagram.add(sp); } }
}

