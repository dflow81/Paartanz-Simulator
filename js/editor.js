/* ================= Grafischer Figuren-Editor =================
   Vollbild-Fenster mit Schrittplan von oben: Füße anklicken und ziehen, rechts die Eigenschaften des gewählten Schritts.
   Arbeitet auf derselben Figur wie der Tab „Figuren“ (figEdit) – beide Ansichten bleiben synchron. */
const gui=$('gui'), plan=$('plan'), pctx=plan.getContext('2d');
let planSel=-1, planTl=null, planView=null, planHits=[], planDrag=null;
const guiOpen=()=>gui.classList.contains('on');
const guiWho=()=>figWho==='D'&&hasOwn()?'D':'H';
const editList=()=>guiWho()==='D'?figEdit.dame:figEdit.steps;

/* Die bearbeitete Figur einmal allein durchrechnen (ohne Raumbegrenzung, damit nichts mitgedreht wird) */
function planSim(){
  if(!figEdit.steps.length) return null;
  const w=ROOM.w, d=ROOM.d, ls=lastSteer; ROOM.w=ROOM.d=400;
  try{ const F={name:figEdit.name,dance:$('figDance').value,bpm:figEdit.bpm,steps:figEdit.steps}; if(hasOwn()) F.dame=figEdit.dame;
    return simulate([{F,item:0,rep:1,reps:1}],{H:startH()}); }
  catch(e){ return null; }
  finally{ ROOM.w=w; ROOM.d=d; lastSteer=ls; }
}

function drawPlan(){
  const dpr=devicePixelRatio||1, cw=plan.clientWidth, ch=plan.clientHeight; if(!cw||!ch) return;
  if(plan.width!==Math.round(cw*dpr)||plan.height!==Math.round(ch*dpr)){ plan.width=Math.round(cw*dpr); plan.height=Math.round(ch*dpr); }
  const c=pctx; c.setTransform(dpr,0,0,dpr,0,0); c.clearRect(0,0,cw,ch); planHits=[];
  planTl=planSim();
  if(!planTl){ c.fillStyle='#aaa'; c.font='15px system-ui,sans-serif'; c.fillText('Noch keine Schritte – rechts „+ Schritt“ wählen.',24,40); return; }
  const who=guiWho(), sets=[['H',planTl.H,'#3d7bff'],['D',planTl.D,'#ff4d6d']];
  const start=recs=>{ const p={}; for(const r of recs){ p[r.f]??={p:r.from,y:r.yaw[0]}; p[r.o]??={p:r.other,y:r.oyaw[0]}; if(p.L&&p.R) break; } return p; };
  // Ausschnitt: alles zeigen; während des Ziehens bleibt er stehen
  if(!planDrag||!planView){ let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9; const ext=p=>{ x0=Math.min(x0,p[0]); x1=Math.max(x1,p[0]); z0=Math.min(z0,p[1]); z1=Math.max(z1,p[1]); };
    for(const [,recs] of sets){ const s=start(recs); for(const k in s) ext(s[k].p); for(const r of recs) ext(r.to); }
    planView={sc:Math.min((cw-110)/Math.max(.8,x1-x0),(ch-110)/Math.max(.8,z1-z0),340),cx:(x0+x1)/2,cz:(z0+z1)/2}; }
  const {sc,cx,cz}=planView, T=p=>[cw/2-(p[0]-cx)*sc, ch/2-(p[1]-cz)*sc];   // oben = vorwärts für den Herrn, sein Links ist links
  // Raster alle 50 cm
  c.lineWidth=1; c.strokeStyle='#ffffff12';
  for(let gx=Math.floor((cx-cw/2/sc)*2)/2; gx<cx+cw/2/sc; gx+=.5){ const x=T([gx,0])[0]; c.beginPath(); c.moveTo(x,0); c.lineTo(x,ch); c.stroke(); }
  for(let gz=Math.floor((cz-ch/2/sc)*2)/2; gz<cz+ch/2/sc; gz+=.5){ const y=T([0,gz])[1]; c.beginPath(); c.moveTo(0,y); c.lineTo(cw,y); c.stroke(); }
  const foot=(p,yaw,col,o={})=>{ const [x,y]=T(p), a=Math.atan2(-Math.cos(yaw),-Math.sin(yaw)), dx=Math.cos(a), dy=Math.sin(a);
    c.save(); c.globalAlpha=o.alpha??1; c.translate(x+dx*.05*sc,y+dy*.05*sc); c.rotate(a);
    c.beginPath(); c.ellipse(0,0,.115*sc,.048*sc,0,0,7);
    if(o.hollow){ c.setLineDash(o.dash?[4,4]:[]); c.lineWidth=2; c.strokeStyle=col; c.stroke(); } else { c.fillStyle=col; c.fill(); }
    if(o.sel){ c.setLineDash([]); c.lineWidth=3; c.strokeStyle='#ffd166'; c.stroke(); }
    c.restore();
    if(o.label!=null){ c.save(); c.globalAlpha=o.alpha??1; c.font=`bold ${Math.max(11,Math.min(15,.07*sc))}px system-ui,sans-serif`; c.textAlign='center'; c.textBaseline='middle';
      c.fillStyle=o.hollow?col:'#fff'; c.fillText(o.label,x+dx*.05*sc,y+dy*.05*sc); c.restore(); }
    return [x+dx*.05*sc,y+dy*.05*sc]; };
  for(const [w,recs,col] of [...sets].sort((a,b)=>(a[0]===who)-(b[0]===who))){   // der bearbeitete Tänzer liegt oben
    const edit=w===who, alpha=edit?1:.3, s=start(recs);
    for(const k in s) foot(s[k].p,s[k].y,col,{hollow:true,dash:true,alpha:alpha*.8,label:k});
    c.save(); c.globalAlpha=alpha*.55; c.strokeStyle=col; c.lineWidth=1.5; c.setLineDash([3,4]);
    for(const r of recs) if(r.dist>.03){ const a=T(r.from), b=T(r.to); c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); }
    c.restore();
    recs.forEach((r,i)=>{ if(r.kind==='halt'&&!edit) return;
      const pos=foot(r.to,r.yaw[1],col,{alpha,hollow:!r.weight,label:String(i+1),sel:edit&&i===planSel});
      if(edit&&i<editList().length) planHits.push({i,x:pos[0],y:pos[1]}); });
  }
  c.fillStyle='#9aa'; c.font='12px system-ui,sans-serif'; c.textAlign='left'; c.textBaseline='alphabetic';
  c.fillText('Blick von oben · oben = vorwärts für den Herrn · Kästchen = 50 cm · Fuß anklicken und ziehen',14,ch-12);
}

/* Gezogene Position in Richtung und Länge des Schritts übersetzen */
function dragTo(i,wp){
  const s=editList()[i], r=planTl&&planTl[guiWho()][i]; if(!s||!r) return;
  const side=r.f==='L'?1:-1, {fw,lf}=dirv(r.hB), w=W*clamp(1.5-Math.abs(r.hA-r.hB)/(60*RAD),0,1), v=sub(wp,add(r.other,lf,w*side));
  const f=dot(v,fw), sd=dot(v,lf)*side, L=Math.hypot(f,sd), cm=x=>Math.round(x*100), a=Math.atan2(Math.max(sd,0),f)*180/Math.PI;
  if(s.dir==='kick'){ s.len=cm(L); return; }
  if(/^tap/.test(s.dir)){ // Tap: neben, vor, seitlich oder hinter dem Standfuß
    if(L<.05){ s.dir='tap'; s.len=0; } else if(a<50){ s.dir='tap'; s.len=cm(f); } else if(a<130){ s.dir='tapSeit'; s.len=cm(sd); } else { s.dir='tapRueck'; s.len=cm(-f); }
    return; }
  if(L<.05){ s.dir='schliessen'; s.len=0; }
  else if(sd<-.1){ // über die Linie des Standfußes hinaus: kreuzen
    if(Math.abs(f)<.1){ s.dir=f>=0?'kreuzSeit':'kreuzSeitHinter'; s.len=cm(Math.max(.15,-sd-w)); }
    else { s.dir=f>0?'kreuz':'kreuzHinter'; s.len=cm(Math.abs(f)); } }
  else if(a<22.5){ s.dir='vor'; s.len=cm(f); } else if(a<67.5){ s.dir='diagVor'; s.len=cm(L); } else if(a<112.5){ s.dir='seit'; s.len=cm(sd); }
  else if(a<157.5){ s.dir='diagRueck'; s.len=cm(L); } else { s.dir='rueck'; s.len=cm(-f); }
}
const planPos=e=>{ const b=plan.getBoundingClientRect(); return [e.clientX-b.left,e.clientY-b.top]; };
plan.onpointerdown=e=>{ const [x,y]=planPos(e); let best=-1, bd=20, hit=null;
  for(const h of planHits){ const d=Math.hypot(h.x-x,h.y-y); if(d<=bd){ bd=d; best=h.i; hit=h; } }
  const cur=planHits.find(h=>h.i===planSel); if(cur&&Math.hypot(cur.x-x,cur.y-y)<=20){ best=planSel; hit=cur; }   // liegen Füße übereinander, behält der gewählte Schritt den Vorrang
  planSel=best; if(hit){ planDrag={x,y,ox:hit.x-x,oy:hit.y-y,moved:false}; plan.setPointerCapture(e.pointerId); }
  guiRefresh(); };
plan.onpointermove=e=>{ if(!planDrag) return; const [x,y]=planPos(e);
  if(!planDrag.moved&&Math.hypot(x-planDrag.x,y-planDrag.y)<5) return; planDrag.moved=true;
  const {sc,cx,cz}=planView, r=planTl[guiWho()][planSel], a=Math.atan2(-Math.cos(r.yaw[1]),-Math.sin(r.yaw[1]));
  // Mittelpunkt des Fußes → Bezugspunkt unter dem Knöchel (5 cm dahinter)
  const px=x+planDrag.ox-Math.cos(a)*.05*sc, py=y+planDrag.oy-Math.sin(a)*.05*sc;
  dragTo(planSel,[cx-(px-plan.clientWidth/2)/sc, cz-(py-plan.clientHeight/2)/sc]); drawPlan(); guiSide(); };
plan.onpointerup=plan.onpointercancel=()=>{ if(planDrag){ const m=planDrag.moved; planDrag=null; if(m) renderFigSteps(); } };

/* Rechte Seite: Schrittliste und Eigenschaften des gewählten Schritts */
function guiSide(){
  const list=editList(), who=guiWho(), s=list[planSel], el=$('guiSide');
  const durs=[.25,.5,.75,1,1.5,2,3,4]; if(s&&!durs.includes(+s.d)) durs.push(+s.d);
  let h='<div class="glist">'+list.map((x,i)=>`<div data-i="${i}" class="${i===planSel?'cur':''}"><b>${i+1}.</b> ${esc(stepText(x))}${/^(halt|platz|schliessen|ferse)$/.test(x.dir)?'':' · '+(+x.len||0)+' cm'} <span>${x.d} Schl. · „${esc(x.c??'')}“${who==='H'&&x.hold&&x.hold!=='zu'?' · '+HOLDS[x.hold][0]:''}</span></div>`).join('')+'</div>'+
    '<div class="row"><button id="gAdd" class="sec">+ Schritt anhängen</button></div>';
  if(s) h+=`<div class="gprop">
    <label>Schritt ${planSel+1}: Fuß</label><div class="tabs" style="margin:0"><button data-f="L" class="${s.f==='L'?'on':''}">Links</button><button data-f="R" class="${s.f==='R'?'on':''}">Rechts</button></div>
    <label>Richtung</label><select id="gDir" class="full">${Object.entries(DIRS).map(([k,v])=>`<option value="${k}" ${k===s.dir?'selected':''}>${v}</option>`).join('')}</select>
    <label>Länge: <span id="gLenV">${+s.len||0}</span> cm</label><input type="range" id="gLen" min="0" max="90" value="${+s.len||0}">
    <label>Drehung (+ links, − rechts)</label><div class="row" style="margin-top:0"><button id="gTL" class="sec">↺ 45°</button><input id="gTurn" type="number" step="5" value="${+s.turn||0}" style="width:70px"><button id="gTR" class="sec">↻ 45°</button></div>
    <div class="row"><div style="flex:1"><label>Dauer (Schläge)</label><select id="gDur" class="full">${durs.map(d=>`<option ${d===+s.d?'selected':''}>${d}</option>`).join('')}</select></div>
      <div style="flex:1"><label>Zählung</label><input id="gCnt" class="full" value="${esc(s.c??'')}"></div></div>
    ${who==='H'?`<label>Haltung ab diesem Schritt</label><select id="gHold" class="full">${Object.entries(HOLDS).map(([k,v])=>`<option value="${k}" ${k===(s.hold||'zu')?'selected':''}>${v[0]} – ${v[1]}</option>`).join('')}</select>
      <label>Armführung in diesem Schritt</label><select id="gArm" class="full"><option value="">– keine besondere –</option>${Object.entries(ARME).map(([k,v])=>`<option value="${k}" ${k===s.arm?'selected':''}>${v}</option>`).join('')}</select>`:''}
    <label>Führungshinweis (wird beim Tanzen eingeblendet)</label><input id="gTip" class="full" value="${esc(s.tip||'')}" placeholder="z. B. Herr hebt die linke Hand">
    <div class="row"><button id="gUp" class="sec">↑ früher</button><button id="gDn" class="sec">↓ später</button><button id="gDel" class="del">🗑 löschen</button></div></div>`;
  else h+='<div class="info">Einen Fuß im Plan oder einen Schritt in der Liste anklicken, um ihn zu bearbeiten. Ausgefüllte Füße tragen Gewicht, hohle sind Taps. Gestrichelt: die Ausgangsstellung.</div>';
  el.innerHTML=h;
  el.querySelectorAll('.glist [data-i]').forEach(d=>d.onclick=()=>{ planSel=+d.dataset.i; guiRefresh(); });
  $('gAdd').onclick=()=>{ $('figAddStep').click(); planSel=editList().length-1; planView=null; guiRefresh(); };
  if(!s) return;
  const ch=fn=>()=>{ fn(); planView=null; renderFigSteps(); };
  el.querySelectorAll('[data-f]').forEach(b=>b.onclick=ch(()=>s.f=b.dataset.f));
  $('gDir').onchange=ch(()=>{ s.dir=$('gDir').value; if(!+s.len&&/^(vor|rueck|seit|diag|kreuz)/.test(s.dir)) s.len=30; });
  $('gLen').oninput=()=>{ s.len=+$('gLen').value; $('gLenV').textContent=s.len; drawPlan(); }; $('gLen').onchange=()=>renderFigSteps();
  $('gTL').onclick=ch(()=>s.turn=(+s.turn||0)+45); $('gTR').onclick=ch(()=>s.turn=(+s.turn||0)-45); $('gTurn').onchange=ch(()=>s.turn=+$('gTurn').value||0);
  $('gDur').onchange=ch(()=>s.d=+$('gDur').value); $('gCnt').onchange=ch(()=>s.c=$('gCnt').value);
  if($('gHold')) $('gHold').onchange=ch(()=>s.hold=$('gHold').value);
  if($('gArm')) $('gArm').onchange=ch(()=>{ const v=$('gArm').value; if(v) s.arm=v; else delete s.arm; });
  $('gTip').onchange=ch(()=>{ const v=$('gTip').value.trim(); if(v) s.tip=v; else delete s.tip; });
  const mv=d=>ch(()=>{ const j=planSel+d; if(j<0||j>=list.length) return; [list[planSel],list[j]]=[list[j],list[planSel]]; planSel=j; });
  $('gUp').onclick=mv(-1); $('gDn').onclick=mv(1);
  $('gDel').onclick=()=>{ list.splice(planSel,1); planSel=Math.min(planSel,list.length-1); planView=null;
    if(guiWho()==='D'&&!list.length){ delete figEdit.dame; $('figOwn').checked=false; setWho('H'); } else renderFigSteps(); };
}
function guiRefresh(){
  if(!guiOpen()) return;
  if(planSel>=editList().length) planSel=-1;
  $('guiName').textContent=$('figName').value+' · '+$('figDance').value;
  $('guiOwn').checked=hasOwn(); $('guiD').disabled=!hasOwn();
  $('guiH').classList.toggle('on',guiWho()==='H'); $('guiD').classList.toggle('on',guiWho()==='D');
  drawPlan(); guiSide();
}
$('guiBtn').onclick=()=>{ gui.classList.add('on'); planSel=-1; planView=null; guiRefresh(); };
$('guiClose').onclick=()=>gui.classList.remove('on');
$('guiH').onclick=()=>{ planSel=-1; planView=null; setWho('H'); }; $('guiD').onclick=()=>{ planSel=-1; planView=null; setWho('D'); };
$('guiOwn').onchange=()=>{ $('figOwn').checked=$('guiOwn').checked; $('figOwn').onchange(); planSel=-1; planView=null; guiRefresh(); };
$('guiPlay').onclick=()=>{ gui.classList.remove('on'); $('figPlay').click(); };
$('guiSave').onclick=()=>{ $('figSave').click(); flash($('guiSave'),'✔ Gespeichert'); };
addEventListener('resize',()=>{ planView=null; guiRefresh(); });
addEventListener('keydown',e=>{ if(e.key==='Escape'&&guiOpen()) gui.classList.remove('on'); });
