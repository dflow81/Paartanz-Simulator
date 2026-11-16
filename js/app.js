/* ================= Wiedergabe ================= */
const $=id=>document.getElementById(id);
let src=null, blocks=[], tl=null, beat=0, playing=true, lastH=-1, lastD=-1, lastBeatIdx=-99, stepTarget=null, curItem=-1, lastSaid=-1;
const speedEl=$('speed');
/* Musik-Zustand (steht oben, weil schon beim ersten Laden einer Folge das Tempo gebraucht wird) */
const music=new Audio(); music.loop=true; music.preservesPitch=true;
let mBpm=0, mOff=0, taps=[], mBusy=false;
/* Zeitlupe: Figuren der Folge, die im halben Tempo laufen */
const slow=new Set(), extra=[]; let exItem=-1;
const spd=()=>speedEl.value/100*(slow.has(curItem)?.5:1);
const hasMusic=()=>!!music.src;
/* Tanztempo zur Musik: erkannte Schläge, bei Bedarf halbiert oder verdoppelt, damit es zum Tanz passt */
function danceBpm(){ if(!hasMusic()||!mBpm||!src) return 0; let best=mBpm, e=9;
  for(const f of [.5,1,2]){ const d=Math.abs(Math.log(mBpm*f/src.bpm)); if(d<e){ e=d; best=mBpm*f; } } return best; }

function setSource(s){
  src=s; blocks=flatten(s);
  if(!blocks.length){tl=null;$('seqlist').innerHTML='<div>Diese Folge enthält keine Schritte.</div>';return;}
  tl=simulate(blocks,{H:startH()}); beat=$('countIn').checked?-tl.H[0].meter:0; slow.clear(); exItem=-1; extra.forEach((p,i)=>{ if(p.on){ p.tl=simulate(blocks,{H:startH(...startPos(i))}); p.H.reset(); p.D.reset(); } }); lastH=lastD=-1; lastBeatIdx=-99; stepTarget=null; curItem=-1; lastSaid=-1; clearPrints(); clearDiagram(); herr.reset(); dame.reset();
  const figs=allFigs(), warn=new Set(tl.H.concat(tl.D).filter(r=>r.warn).map(r=>r.item));
  $('seqlist').innerHTML=s.items.map((it,i)=>`<div data-i="${i}">${i+1}. ${figs[it.fig]?esc(figLabel(figs[it.fig])):'(fehlt)'}${it.rep>1?' ×'+it.rep:''}${warn.has(i)?' <span title="Ein Schritt beginnt mit dem Fuß, auf dem gerade das Gewicht steht.">⚠ falscher Fuß</span>':''}<span class="turtle" data-slow="${i}" title="Diese Figur in Zeitlupe tanzen (halbes Tempo)">🐢</span></div>`).join('');
  updBpm();
}
/* Tanztempo in Schlägen pro Minute: mit Musik gibt die Musik das Tempo vor, sonst die Folge */
const baseBpm=()=>danceBpm()||(src?src.bpm:0);
const updBpm=()=>{$('speedv').textContent=speedEl.value; $('bpmv').textContent=src?Math.round(baseBpm()*speedEl.value/100)+(danceBpm()?' Schläge/min, Musik gibt das Tempo vor':' Schläge/min'):'';};
speedEl.oninput=updBpm;
$('room').onchange=()=>{ const [w,d]=$('room').value.split('x').map(Number); buildRoom(w,d); if(src) setSource(src); };
const playBtn=$('play');
const setPlaying=p=>{playing=p;stepTarget=null;playBtn.textContent=p?'⏸ Pause':'▶ Start';};
playBtn.onclick=()=>setPlaying(!playing);
$('stepbtn').onclick=()=>{ if(!tl) return; setPlaying(false);
  const s=tl.H.find(s=>s.start+s.d>beat+1e-6)||tl.H[0]; stepTarget=s.start+s.d; };
$('reset').onclick=()=>src&&setSource(src);
/* An eine Stelle springen (ohne Klick und ohne Fußspur) */
function jumpTo(b){ beat=Math.max(0,b); stepTarget=null; lastH=lastD=-1; lastBeatIdx=Math.floor(beat+1e-6); herr.reset(); dame.reset(); }
$('backbtn').onclick=()=>{ if(!tl) return; setPlaying(false);
  const i=tl.H.findIndex(s=>s.start+s.d>beat+1e-6), s=tl.H[i<0?0:i];
  jumpTo(beat-s.start>.25*s.d||i<=0?s.start:tl.H[i-1].start); };
/* Bereich [a,b) einer Figur der Folge in Schlägen */
const itemRange=i=>{ const r=tl.H.filter(s=>s.item===i); return r.length?[r[0].start,r.at(-1).start+r.at(-1).d]:null; };
$('seqlist').onclick=e=>{ const d=e.target.closest('[data-i]'); if(!d||!tl) return;
  if(e.target.dataset.slow!==undefined){ const i=+e.target.dataset.slow; slow.has(i)?slow.delete(i):slow.add(i); e.target.classList.toggle('on',slow.has(i)); return; } const r=itemRange(+d.dataset.i); if(r){ jumpTo(r[0]); clearPrints(); } };
$('trainer').onchange=()=>{ if($('trainer').checked){ $('loopFig').checked=true; speedEl.value=60; updBpm(); } };
/* „Hier ist die 1“: Tanz auf die nächstgelegene Eins des Takts schieben; mit Musik liegt der Schlag ab jetzt auf diesem Moment */
$('oneBtn').onclick=()=>{ if(!tl) return; const s=evalDancer(tl.H,beat).step, m=s.meter;
  if(hasMusic()) mOff=music.currentTime;
  const pos=(((beat-s.blockStart+s.off)%m)+m)%m; beat=Math.max(0,beat+(pos>m/2?m-pos:-pos)); lastBeatIdx=-99; flash($('oneBtn'),'✔ Eins gesetzt'); };
$('minBtn').onclick=()=>{ $('ui').classList.toggle('min'); $('minBtn').textContent=$('ui').classList.contains('min')?'▴':'▾'; };
$('cam').onchange=()=>{ if($('cam').value==='frei') overview(); };
$('show').onchange=()=>{ const v=$('show').value; herr.setGhost(v==='D'); dame.setGhost(v==='H'); };
$('mirror').onchange=()=>setMirror($('mirror').checked);
/* Aussehen: Farben, Ambiente, Anzahl der Paare – wird im Browser gemerkt */
const look=(()=>{ try{ return JSON.parse(localStorage.getItem('tanzsim_look'))||{}; }catch(e){ return {}; } })();
const saveLook=()=>{ try{ localStorage.setItem('tanzsim_look',JSON.stringify(look)); }catch(e){} };
function applyLook(){ $('colH').value=look.h||'#2f5fd0'; $('colD').value=look.d||'#e8365a'; $('ambiente').value=look.a||'schule';
  herr.setColor($('colH').value); dame.setColor($('colD').value); setAmbience($('ambiente').value); }
$('colH').oninput=()=>{ look.h=$('colH').value; herr.setColor(look.h); saveLook(); };
$('colD').oninput=()=>{ look.d=$('colD').value; dame.setColor(look.d); saveLook(); };
$('ambiente').onchange=()=>{ look.a=$('ambiente').value; setAmbience(look.a); saveLook(); };
$('pairsN').onchange=()=>setPairs(+$('pairsN').value);
$('gloss').onchange=()=>{ gloss.visible=$('gloss').checked; };
$('prints').onchange=$('printWho').onchange=()=>{ clearPrints(); clearDiagram(); };

/* ---------- Tanz-Auswahl: filtert alle Listen ---------- */
const ALL='*';
const curDance=()=>$('danceSel').value||ALL;
const inDance=d=>curDance()===ALL||(d||'Sonstige')===curDance();
const seqDance=s=>{ const f=allFigs(); for(const it of s.items) if(f[it.fig]) return f[it.fig].dance||'Sonstige'; return 'Sonstige'; };
const startsRight=F=>{ const s=F.steps.find(s=>s.dir!=='halt'); return !!s&&s.f==='R'; };
/* Anzeigename: innerhalb des gewählten Tanzes ohne Tanznamen, sonst mit */
const figLabel=(F,full=!inDance(F.dance)||curDance()===ALL)=>(F.builtin?(full?F.dance+' – ':'')+F.name:F.name+' ★')+(startsRight(F)?' · beginnt rechts':'');
function fillDance(){
  const set=new Set(DANCES); for(const f of Object.values(user.figures)) set.add(f.dance||'Sonstige');
  const cnt=d=>Object.values(allFigs()).filter(f=>(f.dance||'Sonstige')===d).length;
  $('danceSel').innerHTML=`<option value="*">Alle Tänze (${Object.keys(allFigs()).length} Figuren)</option>`+[...set].map(d=>`<option value="${esc(d)}">${esc(d)} (${cnt(d)})</option>`).join('');
  $('danceSel').value=user.dance||ALL; if($('danceSel').selectedIndex<0) $('danceSel').value=ALL;
}
function fillSource(selectKey){
  const sel=$('source'), keep=selectKey||sel.value, all=curDance()===ALL;
  const seqs=Object.entries(user.seqs).filter(([k,s])=>inDance(seqDance(s)));
  let h=seqs.length?'<optgroup label="Tanzfolgen">'+seqs.map(([k,s])=>`<option value="seq:${k}">${esc(s.name)}</option>`).join('')+'</optgroup>':'';
  const groups={}; for(const [k,f] of Object.entries(allFigs())) if(inDance(f.dance)) (groups[f.dance||'Sonstige']??=[]).push([k,f]);
  for(const [d,list] of Object.entries(groups)) h+=`<optgroup label="${all?'Figuren: '+esc(d):'Einzelne Figuren'}">`+list.map(([k,f])=>`<option value="fig:${k}">${esc(figLabel(f,false))}</option>`).join('')+'</optgroup>';
  sel.innerHTML=h; sel.value=keep; if(sel.selectedIndex<0&&sel.options.length) sel.selectedIndex=0;
}
function sourceFromKey(key){
  const [t,k]=key.split(':');
  if(t==='seq'&&user.seqs[k]) return user.seqs[k];
  const f=allFigs()[k]; if(f) return {name:figTitle(f),bpm:f.bpm||100,items:[{fig:k,rep:1}]};
  return null;
}
$('source').onchange=()=>{const s=sourceFromKey($('source').value); if(s){setSource(s);setPlaying(true);}};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ================= Tabs ================= */
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id==='p-'+b.dataset.tab));
});
const gotoPlay=()=>document.querySelector('.tabs button[data-tab=play]').click();

/* ================= Tanzfolgen-Editor ================= */
let seqEdit=null, seqKey=null;
/* Passt die Figur an dieser Stelle? side = Fuß, auf dem vorher das Gewicht steht (1 = links, −1 = rechts, 0 = egal) */
const footFits=(F,side)=>{ const s=F.steps.find(s=>s.dir!=='halt'); return !side||!s||/^(tap|kick|platz)/.test(s.dir)||(s.f==='L'?1:-1)!==side; };
function figOptions(sel,side=0){ // Figuren des gewählten Tanzes; eine bereits eingetragene Figur eines anderen Tanzes bleibt wählbar
  return Object.entries(allFigs()).filter(([k,f])=>inDance(f.dance)||k===sel).map(([k,f])=>`<option value="${k}" ${k===sel?'selected':''}>${footFits(f,side)?'':'⚠ '}${esc(figLabel(f))}</option>`).join('');
}
/* Für jede Zeile der bearbeiteten Folge: belasteter Fuß davor und ob irgendwo mit dem falschen Fuß begonnen wird */
function seqFootInfo(){
  const figs=allFigs(), info=[]; let st={H:startH()};
  seqEdit.items.forEach((it,i)=>{ const F=figs[it.fig], row={side:st.H.side,bad:false}; info.push(row); if(!F||!F.steps||!F.steps.length) return;
    const bl=[]; for(let r=0;r<Math.max(1,it.rep||1);r++) bl.push({F,item:i,rep:r+1,reps:1});
    const res=simulate(bl,st); row.bad=res.H.concat(res.D).some(r=>r.warn); st=res.end; });
  return info;
}
const firstFig=()=>{ const e=Object.entries(allFigs()).find(([k,f])=>inDance(f.dance)); return e?e[0]:'b_w_box'; };
function fillSeqSel(){ $('seqSel').innerHTML=Object.entries(user.seqs).filter(([k,s])=>inDance(seqDance(s))||k===seqKey).map(([k,s])=>`<option value="${k}">${esc(s.name)}</option>`).join(''); $('seqSel').value=seqKey||''; }
function loadSeq(k){
  seqKey=k; const ff=firstFig(); seqEdit=k&&user.seqs[k]?structuredClone(user.seqs[k]):{name:'Meine Tanzfolge',bpm:allFigs()[ff].bpm||100,items:[{fig:ff,rep:1}]};
  $('seqName').value=seqEdit.name; $('seqBpm').value=seqEdit.bpm; renderSeqItems();
}
function readSeq(){ seqEdit.name=$('seqName').value.trim()||'Ohne Namen'; seqEdit.bpm=+$('seqBpm').value||90; return seqEdit; }
let dragFrom=-1;
function renderSeqItems(){
  const box=$('seqItems'), info=seqFootInfo(); box.innerHTML='';
  seqEdit.items.forEach((it,i)=>{
    const d=document.createElement('div'); d.className='item';
    d.innerHTML=`<span class="grip" draggable="true" title="ziehen zum Umsortieren">⠿${i+1}</span><select>${figOptions(it.fig,info[i].side)}</select>
      ${info[i].bad?'<span class="bad" title="Beginnt mit dem Fuß, auf dem gerade das Gewicht steht. Andere Figur wählen oder davor eine Figur mit Fußwechsel einfügen.">⚠</span>':''}
      <span style="font-size:12px">×</span><input type="number" min="1" max="32" value="${it.rep}" style="width:42px">
      <button class="mini sec" title="hoch">↑</button><button class="mini sec" title="runter">↓</button><button class="mini del" title="entfernen">✕</button>`;
    const [sel]=d.getElementsByTagName('select'), [inp]=d.getElementsByTagName('input'), [up,dn,rm]=d.getElementsByTagName('button'), grip=d.querySelector('.grip');
    sel.onchange=()=>{it.fig=sel.value;renderSeqItems();}; inp.onchange=()=>{it.rep=Math.max(1,+inp.value||1);renderSeqItems();};
    up.onclick=()=>{if(i>0){[seqEdit.items[i-1],seqEdit.items[i]]=[seqEdit.items[i],seqEdit.items[i-1]];renderSeqItems();}};
    dn.onclick=()=>{if(i<seqEdit.items.length-1){[seqEdit.items[i+1],seqEdit.items[i]]=[seqEdit.items[i],seqEdit.items[i+1]];renderSeqItems();}};
    rm.onclick=()=>{seqEdit.items.splice(i,1);renderSeqItems();};
    grip.ondragstart=e=>{ dragFrom=i; e.dataTransfer.effectAllowed='move'; e.dataTransfer.setData('text/plain',String(i)); try{e.dataTransfer.setDragImage(d,10,10);}catch(err){} };
    d.ondragover=e=>{ if(dragFrom>=0){ e.preventDefault(); d.classList.add('over'); } };
    d.ondragleave=()=>d.classList.remove('over');
    d.ondrop=e=>{ e.preventDefault(); if(dragFrom>=0&&dragFrom!==i){ const [m]=seqEdit.items.splice(dragFrom,1); seqEdit.items.splice(i,0,m); } dragFrom=-1; renderSeqItems(); };
    box.appendChild(d);
  });
}
$('seqSel').onchange=()=>loadSeq($('seqSel').value);
$('seqNew').onclick=()=>{seqKey=null;loadSeq(null);$('seqSel').value='';};
$('seqDel').onclick=()=>{ if(!seqKey||!confirm('Tanzfolge „'+user.seqs[seqKey].name+'“ löschen?')) return;
  delete user.seqs[seqKey]; saveStore(); seqKey=null; fillSource(); loadSeq(Object.keys(user.seqs).find(k=>inDance(seqDance(user.seqs[k])))||null); fillSeqSel(); };
$('seqAdd').onclick=()=>{const last=seqEdit.items.at(-1); seqEdit.items.push({fig:last?last.fig:firstFig(),rep:1}); renderSeqItems();};
$('seqSave').onclick=()=>{ readSeq(); if(!seqKey) seqKey=uid('s_'); user.seqs[seqKey]=structuredClone(seqEdit); saveStore();
  fillSeqSel(); fillSource('seq:'+seqKey); flash($('seqSave'),'✔ Gespeichert'); };
$('seqPlay').onclick=()=>{ readSeq(); setSource(structuredClone(seqEdit)); setPlaying(true); gotoPlay(); };

/* ================= Figuren-Editor ================= */
let figEdit=null, figKey=null, figSrc=null, figWho='H';
const mirrorSteps=spiegel;
const hasOwn=()=>Array.isArray(figEdit.dame)&&figEdit.dame.length>0;
function setWho(w){ figWho=w==='D'&&hasOwn()?'D':'H';
  document.querySelectorAll('#whoTabs button').forEach(b=>{b.classList.toggle('on',b.dataset.who===figWho); if(b.dataset.who==='D') b.disabled=!hasOwn();});
  renderFigSteps(); }
function updFigSum(){ const sum=l=>l.reduce((a,s)=>a+Math.max(.25,+s.d||1),0), h=sum(figEdit.steps);
  let t='Herr: '+h+' Schläge';
  if(hasOwn()){ const d=sum(figEdit.dame); t+=' · Dame: '+d+' Schläge'+(Math.abs(h-d)>1e-6?' ⚠ ungleich – der kürzere Teil wartet am Ende':''); }
  $('figSum').textContent=t; }
function fillFigSel(){
  const own=Object.entries(user.figures).filter(([k,f])=>inDance(f.dance)||k===figKey), std=Object.entries(BUILTIN).filter(([k,f])=>inDance(f.dance));
  $('figSel').innerHTML=(own.length?'<optgroup label="Eigene Figuren">'+own.map(([k,f])=>`<option value="${k}">${esc(figLabel(f,false))}</option>`).join('')+'</optgroup>':'')+
    '<optgroup label="Vorgegeben (wird als Kopie bearbeitet)">'+std.map(([k,f])=>`<option value="${k}">${esc(figLabel(f,curDance()===ALL))}</option>`).join('')+'</optgroup>';
  $('figSel').value=figKey||figSrc||'';
}
function loadFig(k){
  const F=k?allFigs()[k]:null; figSrc=F?k:null;
  if(F&&F.builtin){ figKey=null; figEdit=structuredClone(F); delete figEdit.builtin; figEdit.name=F.name+' (eigene Version)'; }
  else { figKey=F?k:null; const nd=curDance()===ALL?'Langsamer Walzer':curDance(), nf=allFigs()[firstFig()]; figEdit=F?structuredClone(F):{name:'Meine Figur',dance:nd,bpm:(nf&&nf.dance===nd&&nf.bpm)||100,steps:[S('L','vor',38,1,'1'),S('R','seit',22,1,'2'),S('L','schliessen',0,1,'3')]}; }
  $('figName').value=figEdit.name; $('figDance').value=figEdit.dance||''; $('figBpm').value=figEdit.bpm||100; $('figOwn').checked=hasOwn(); setWho('H');
}
function renderFigSteps(){
  const tb=$('figSteps'), list=figWho==='D'?figEdit.dame:figEdit.steps; tb.innerHTML='';
  $('figTable').classList.toggle('noHold',figWho==='D'); updFigSum();
  list.forEach((s,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td><select data-k="f"><option value="L">L</option><option value="R">R</option></select></td>
      <td><select data-k="dir">${Object.entries(DIRS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></td>
      <td><input data-k="len" type="number" min="0" max="120" step="1"></td>
      <td><input data-k="turn" type="number" min="-360" max="360" step="5"></td>
      <td><input data-k="d" type="number" min="0.25" max="8" step="0.25"></td>
      <td><input data-k="c"></td>
      <td class="hc"><select data-k="hold">${Object.entries(HOLDS).map(([k,v])=>`<option value="${k}" title="${v[1]}">${v[0]}</option>`).join('')}</select></td>
      <td style="white-space:nowrap"><button class="mini sec">↑</button><button class="mini del">✕</button></td>`;
    tr.querySelectorAll('[data-k]').forEach(el=>{ const k=el.dataset.k; el.value=s[k]??(k==='hold'?'zu':'');
      el.onchange=()=>{ s[k]=(el.type==='number')?(+el.value||0):el.value; updFigSum(); }; });
    const [up,rm]=tr.getElementsByTagName('button');
    up.onclick=()=>{if(i>0){[list[i-1],list[i]]=[list[i],list[i-1]];renderFigSteps();}};
    rm.onclick=()=>{list.splice(i,1); if(figWho==='D'&&!list.length){$('figOwn').checked=false; delete figEdit.dame; setWho('H');} else renderFigSteps();};
    tb.appendChild(tr);
  });
  if(typeof guiRefresh==='function') guiRefresh();   // grafischer Editor zeigt dieselbe Figur
}
function readFig(){ if(!hasOwn()) delete figEdit.dame; figEdit.name=$('figName').value.trim()||'Ohne Namen'; figEdit.dance=$('figDance').value.trim()||'Sonstige'; figEdit.bpm=+$('figBpm').value||100; return figEdit; }
$('figSel').onchange=()=>loadFig($('figSel').value);
$('figNew').onclick=()=>{loadFig(null);};
$('figDel').onclick=()=>{ if(!figKey) {alert('Vorgegebene Figuren können nicht gelöscht werden.');return;}
  const used=Object.values(user.seqs).filter(s=>s.items.some(i=>i.fig===figKey)).map(s=>s.name);
  if(!confirm('Figur „'+user.figures[figKey].name+'“ löschen?'+(used.length?'\nSie wird noch benutzt in: '+used.join(', '):''))) return;
  delete user.figures[figKey]; saveStore(); figKey=null; fillDance(); fillSource(); loadFig(Object.keys(user.figures).find(k=>inDance(user.figures[k].dance))||firstFig()); fillFigSel(); renderSeqItems(); };
$('figAddStep').onclick=()=>{ const list=figWho==='D'?figEdit.dame:figEdit.steps, last=list.at(-1), free=last&&/^(tap|kick|halt)/.test(last.dir);
  list.push(S(last?(free?last.f:(last.f==='L'?'R':'L')):(figWho==='D'?'R':'L'),'vor',30,1,last?String((+last.c||0)+1):'1',0,figWho==='H'&&last&&last.hold&&last.hold!=='zu'?last.hold:undefined)); renderFigSteps(); };
$('figOwn').onchange=()=>{
  if($('figOwn').checked){ figEdit.dame=mirrorSteps(figEdit.steps); setWho('D'); }
  else if(!hasOwn()||confirm('Eigene Schritte der Dame verwerfen? Sie tanzt dann wieder gegengleich.')){ delete figEdit.dame; setWho('H'); }
  else $('figOwn').checked=true; };
document.querySelectorAll('#whoTabs button').forEach(b=>b.onclick=()=>setWho(b.dataset.who));
$('figSave').onclick=()=>{ readFig(); if(!figEdit.steps.length){alert('Die Figur braucht mindestens einen Schritt.');return;}
  if(!figKey) figKey=uid('f_'); user.figures[figKey]=structuredClone(figEdit); saveStore();
  fillDance(); fillFigSel(); fillSource('fig:'+figKey); renderSeqItems(); flash($('figSave'),'✔ Gespeichert'); };
$('figPlay').onclick=()=>{ readFig(); if(!figEdit.steps.length) return;
  const tmp='__preview'; user.figures[tmp]=structuredClone(figEdit);
  setSource({name:figEdit.name,bpm:figEdit.bpm,items:[{fig:tmp,rep:1}]}); delete user.figures[tmp]; setPlaying(true); gotoPlay(); };

/* ================= Teilen per Link =================
   Die Folge steckt (mit den darin benutzten eigenen Figuren) als Text in der Adresse hinter „#folge=“. */
const SHARE_BASE=location.protocol==='file:'?'https://dflow81.github.io/Paartanz-Simulator/tanzsimulator.html':location.origin+location.pathname;   // lokal geöffnet: Link auf die Online-Version
const b64e=s=>btoa(String.fromCharCode(...new TextEncoder().encode(s))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const b64d=s=>new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0)));
$('shareBtn').onclick=async()=>{ readSeq(); const f={}; for(const it of seqEdit.items) if(user.figures[it.fig]) f[it.fig]=user.figures[it.fig];
  const url=SHARE_BASE+'#folge='+b64e(JSON.stringify({n:seqEdit.name,b:seqEdit.bpm,i:seqEdit.items.map(it=>[it.fig,it.rep]),f}));
  try{ await navigator.clipboard.writeText(url); flash($('shareBtn'),'✔ Link kopiert'); }catch(e){ prompt('Link zum Kopieren:',url); } };
/* Beim Öffnen eines geteilten Links: Folge übernehmen und gleich abspielen */
function importShared(){
  const m=location.hash.match(/^#folge=([\w-]+)/); if(!m) return null;
  try{ const d=JSON.parse(b64d(m[1])); if(!Array.isArray(d.i)) return null;
    let h=0; for(const ch of m[1]) h=(h*31+ch.charCodeAt(0))>>>0; const key='s_link'+h.toString(36);
    for(const [k,fig] of Object.entries(d.f||{})) if(!user.figures[k]&&!BUILTIN[k]&&fig&&Array.isArray(fig.steps)) user.figures[k]=fig;
    user.seqs[key]={name:String(d.n||'Geteilte Folge'),bpm:+d.b||100,items:d.i.map(([fig,rep])=>({fig:String(fig),rep:Math.max(1,+rep||1)}))};
    user.dance='*'; saveStore(); history.replaceState(null,'',location.pathname+location.search); return key;
  }catch(e){ return null; }
}

/* ================= Export / Import ================= */
$('exportBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify({app:'tanzsimulator',version:2,figures:user.figures,seqs:user.seqs},null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='meine-tanzfolgen.json'; a.click(); URL.revokeObjectURL(a.href);
};
$('importBtn').onclick=()=>$('importFile').click();
$('importFile').onchange=async e=>{ const f=e.target.files[0]; if(!f) return;
  try{ const d=JSON.parse(await f.text()); if(!d.figures||!d.seqs) throw 0;
    Object.assign(user.figures,d.figures); Object.assign(user.seqs,d.seqs); saveStore();
    fillDance(); fillSource(); fillSeqSel(); fillFigSel(); alert(`Importiert: ${Object.keys(d.figures).length} Figuren, ${Object.keys(d.seqs).length} Tanzfolgen.`);
  }catch(err){ alert('Die Datei konnte nicht gelesen werden.'); }
  e.target.value=''; };
function flash(btn,txt){const o=btn.textContent; btn.textContent=txt; setTimeout(()=>btn.textContent=o,1200);}

/* ================= Start ================= */
/* Tanz gewählt: Listen neu füllen, erste Folge/Figur des Tanzes spielen und in die Editoren laden */
function applyDance(play){
  fillSource(); fillSeqSel(); fillFigSel();
  const seqs=Object.keys(user.seqs).filter(k=>inDance(seqDance(user.seqs[k])));
  loadSeq(seqs[0]||null); fillSeqSel();
  loadFig(Object.keys(user.figures).find(k=>inDance(user.figures[k].dance))||firstFig()); fillFigSel();
  if(play&&$('source').options.length){ $('source').selectedIndex=0; const s=sourceFromKey($('source').value); if(s){ setSource(s); setPlaying(true); } }
}
$('danceSel').onchange=()=>{ user.dance=curDance(); saveStore(); applyDance(true); };
const sharedKey=importShared();
fillDance(); applyDance(true);
if(sharedKey){ fillSource('seq:'+sharedKey); const s=sourceFromKey('seq:'+sharedKey); if(s){ setSource(s); setPlaying(true); } loadSeq(sharedKey); fillSeqSel(); }

/* ---------- Schritte der Figur erklären ---------- */
const ZAHL={'1':'eins','2':'zwei','3':'drei','4':'vier','5':'fünf','6':'sechs','7':'sieben','8':'acht',S:'lang',Q:'schnell','&':'und',a:'a'};
const figSteps=(t,item)=>({H:t.H.filter(s=>s.item===item&&s.rep===1&&s.kind!=='halt'),D:t.D.filter(s=>s.item===item&&s.rep===1&&s.kind!=='halt')});
const cm=s=>/^(platz|schliessen|ferse|tap|halt)$/.test(s.dir)||!+s.len?'':`, ${s.len} cm`;
function renderExplain(){
  if(!tl||exItem<0){ $('explain').innerHTML=''; return; }
  const {H,D}=figSteps(tl,exItem), n=Math.max(H.length,D.length); let h=`<div><b>${esc(H[0]?H[0].fig:'')}</b> – Haltung: ${H[0]?HOLDS[H[0].hold][1]:''}</div>`;
  for(let i=0;i<n;i++){ const a=H[i], b=D[i];
    h+=`<div class="ex"><b>${esc((a||b).c||i+1)}</b><span class="h">${a?'Herr: '+esc(stepText(a)+cm(a)):''}</span><span class="d">${b?'Dame: '+esc(stepText(b)+cm(b)):''}</span>${a&&a.tip?`<span class="tp">💡 ${esc(a.tip)}</span>`:''}</div>`; }
  $('explain').innerHTML=h;
}
const readSteps=w=>{ if(!tl||exItem<0) return; const st=figSteps(tl,exItem)[w]; say((w==='H'?'Herr. ':'Dame. ')+st.map((s,i)=>`${ZAHL[String(s.c??'').trim()]||i+1}: ${stepText(s).replace(' · ',', ')}`).join('. '),1); };
$('readH').onclick=()=>readSteps('H'); $('readD').onclick=()=>readSteps('D');

/* ---------- Schrittplan zum Ausdrucken: jede Figur der Folge von oben, mit nummerierten Füßen und Schrittliste ---------- */
function planImage(t){
  const all=[...t.H,...t.D].filter(s=>s.kind!=='halt'), pts=all.flatMap(s=>[s.to,s.from,s.other]);
  const x0=Math.min(...pts.map(p=>p[0]))-.25, x1=Math.max(...pts.map(p=>p[0]))+.25, z0=Math.min(...pts.map(p=>p[1]))-.25, z1=Math.max(...pts.map(p=>p[1]))+.25;
  const sc=Math.min(260,900/(x1-x0),620/(z1-z0)), c=document.createElement('canvas'); c.width=Math.ceil((x1-x0)*sc); c.height=Math.ceil((z1-z0)*sc);
  const g=c.getContext('2d'); g.fillStyle='#fff'; g.fillRect(0,0,c.width,c.height);
  g.strokeStyle='#e4e4e4'; g.lineWidth=1; for(let x=Math.ceil(x0*2)/2;x<x1;x+=.5){ g.beginPath(); g.moveTo((x1-x)*sc,0); g.lineTo((x1-x)*sc,c.height); g.stroke(); }
  for(let z=Math.ceil(z0*2)/2;z<z1;z+=.5){ g.beginPath(); g.moveTo(0,(z1-z)*sc); g.lineTo(c.width,(z1-z)*sc); g.stroke(); }
  const foot=(p,yaw,fill,stroke,txt,dash)=>{ const X=(x1-p[0]-Math.sin(yaw)*.055)*sc, Y=(z1-p[1]-Math.cos(yaw)*.055)*sc;
    g.save(); g.translate(X,Y); g.rotate(-yaw); g.beginPath(); g.ellipse(0,0,.045*sc,.115*sc,0,0,7); g.fillStyle=fill; g.fill(); g.setLineDash(dash?[4,3]:[]); g.strokeStyle=stroke; g.lineWidth=2; g.stroke(); g.restore();
    if(txt){ g.fillStyle=stroke; g.font=`bold ${Math.round(.075*sc)}px sans-serif`; g.textAlign='center'; g.textBaseline='middle'; g.fillText(txt,X,Y); } };
  for(const [w,fill,stroke] of [['D','#ffd9e0','#c92447'],['H','#d6e2ff','#2456c9']]){ const st=t[w].filter(s=>s.kind!=='halt'); if(!st.length) continue;
    foot(st[0].from,st[0].yaw[0],'#f2f2f2','#999',st[0].f); foot(st[0].other,st[0].oyaw[0],'#f2f2f2','#999',st[0].o);   // Ausgangsstellung
    st.forEach((s,i)=>{ if(i){ const a=st[i-1].to, b=s.to; g.strokeStyle=stroke+'55'; g.lineWidth=1; g.beginPath(); g.moveTo((x1-a[0])*sc,(z1-a[1])*sc); g.lineTo((x1-b[0])*sc,(z1-b[1])*sc); g.stroke(); } });
    st.forEach((s,i)=>foot(s.to,s.yaw[1],fill,stroke,String(i+1),!s.weight)); }
  return c.toDataURL('image/png');
}
$('printBtn').onclick=()=>{ if(!src) return;
  const figs=allFigs(), room={...ROOM}, ls=lastSteer, seen=new Set(); ROOM.w=ROOM.d=400;   // ohne Raumbegrenzung, damit die Figur gerade bleibt
  let h=`<h1>${esc(src.name)}</h1><p>${src.items.map((it,i)=>`${i+1}. ${figs[it.fig]?esc(figTitle(figs[it.fig])):'?'}${it.rep>1?' ×'+it.rep:''}`).join(' &nbsp;·&nbsp; ')}</p>`;
  try{ for(const it of src.items){ const F=figs[it.fig]; if(!F||seen.has(it.fig)) continue; seen.add(it.fig);
    const t=simulate(flatten({items:[{fig:it.fig,rep:1}]}),{H:startH()}), st=figSteps(t,0), n=Math.max(st.H.length,st.D.length);
    h+=`<section><h2>${esc(figTitle(F))}</h2><img src="${planImage(t)}"><table><tr><th>Nr.</th><th>Zählzeit</th><th class="h">Herr</th><th class="d">Dame</th></tr>`;
    for(let i=0;i<n;i++){ const a=st.H[i], b=st.D[i]; h+=`<tr><td>${i+1}</td><td>${esc((a||b).c||'')}</td><td>${a?esc(stepText(a)+cm(a)):''}${a&&a.tip?'<br><i>'+esc(a.tip)+'</i>':''}</td><td>${b?esc(stepText(b)+cm(b)):''}</td></tr>`; }
    h+='</table></section>'; } } finally { ROOM.w=room.w; ROOM.d=room.d; lastSteer=ls; }
  const w=open('','_blank'); if(!w){ alert('Bitte Pop-ups für diese Seite erlauben, dann öffnet sich der Schrittplan in einem neuen Fenster.'); return; }
  w.document.write(`<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Schrittplan – ${esc(src.name)}</title><style>
    body{font-family:system-ui,sans-serif;margin:24px;color:#111} h1{font-size:22px;margin:0 0 4px} h2{font-size:17px;margin:18px 0 6px} p{color:#444;font-size:13px}
    section{page-break-inside:avoid} img{max-width:100%;max-height:520px;border:1px solid #ccc} table{border-collapse:collapse;font-size:13px;margin-top:8px;width:100%}
    td,th{border:1px solid #ccc;padding:3px 6px;text-align:left;vertical-align:top} .h{color:#2456c9} .d{color:#c92447} i{color:#666} .leg{font-size:12px;color:#555}
    @media print{button{display:none}}</style></head><body><button onclick="print()">Drucken</button>${h}
    <p class="leg">Blau = Herr, Rot = Dame, Grau = Ausgangsstellung. Die Zahl ist die Schrittnummer; gestrichelt = Tap ohne Gewicht. Raster: 50 cm. Blick von oben, der Herr schaut am Anfang nach oben.</p></body></html>`);
  w.document.close(); };

/* ================= Hauptschleife ================= */
const clock=new THREE.Clock();
/* Takt (Metronom): ein Klick pro Schlag, die „1“ ist betont. Browser erlauben Ton erst nach dem ersten Klick/Tastendruck. */
let actx=null;
const wakeAudio=()=>{ try{ actx??=new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==='suspended') actx.resume(); }catch(e){} };
addEventListener('pointerdown',wakeAudio); addEventListener('keydown',wakeAudio);
function click(accent){
  if(!actx||actx.state!=='running'||!$('tick').checked) return;
  const t=actx.currentTime, o=actx.createOscillator(), g=actx.createGain();
  o.type='triangle'; o.frequency.value=accent?1320:880;
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(accent?.5:.25,t+.003); g.gain.exponentialRampToValueAtTime(.001,t+(accent?.11:.07));
  o.connect(g).connect(actx.destination); o.start(t); o.stop(t+.13);
}
/* ---------- Übungsmusik: ein einfacher Rhythmus je Tanz, im Browser erzeugt und Schlag für Schlag zum Tanz gespielt ----------
   Jeder Tanz hat ein Muster über einen Takt in halben Schlägen: K = große Trommel, S = kleine Trommel, H = Becken, C = Glocke,
   G = Conga, B = Bass, A = Akkord. Die Harmonie wechselt taktweise (I – IV – V – I). */
const GROOVES={
  walzer:{m:3,p:['KBH','','AH','','AH','']},
  wiener:{m:3,p:['KB','','A','','A','']},
  tango:{m:4,p:['KBA','','A','','KA','','A','S']},
  fox:{m:4,p:['KBH','','SAH','H','KBH','','SAH','H'],swing:.16},
  quick:{m:4,p:['KBH','','SAH','','KBH','','SAH','']},
  chacha:{m:4,p:['KBC','H','C','GH','KBC','H','GC','G']},
  rumba:{m:4,p:['KB','H','C','BH','G','H','KBC','GH']},
  samba:{m:4,p:['KB','H','H','BH','KS','H','H','BH']},
  jive:{m:4,p:['KBH','H','SAH','H','KBH','H','SAH','H'],swing:.2},
  disco:{m:4,p:['KB','H','KSA','H','KB','BH','KSA','H']},
  salsa:{m:4,p:['KBC','G','C','GA','C','BG','CA','G']},
  bachata:{m:4,p:['KBG','H','G','H','KG','BH','GS','H']},
  polka:{m:4,p:['KB','','SA','','KB','','SA','H']},
  blues:{m:4,p:['KBH','','H','H','SAH','','H','H'],swing:.2},
  paso:{m:4,p:['KBA','','SA','S','KA','','SA','']},
};
function grooveOf(d){ d=(d||'').toLowerCase();
  return /wiener/.test(d)?GROOVES.wiener:/walzer|waltz/.test(d)?GROOVES.walzer:/tango/.test(d)?GROOVES.tango:/quick/.test(d)?GROOVES.quick:/slow|foxtrott/.test(d)?GROOVES.fox:
    /disco/.test(d)?GROOVES.disco:/cha/.test(d)?GROOVES.chacha:/rumba/.test(d)?GROOVES.rumba:/samba/.test(d)?GROOVES.samba:/jive|boogie|rock|bugg/.test(d)?GROOVES.jive:/salsa|merengue|cumbia|mambo/.test(d)?GROOVES.salsa:
    /bachata/.test(d)?GROOVES.bachata:/polka|marsch/.test(d)?GROOVES.polka:/blues|west/.test(d)?GROOVES.blues:/paso/.test(d)?GROOVES.paso:GROOVES.disco; }
let noiseBuf=null, gOut=null, lastHalf=-999;
function drum(kind,t,root,chord){
  const env=(node,peak,dur)=>{ const g=actx.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(peak,t+.004); g.gain.exponentialRampToValueAtTime(.001,t+dur); node.connect(g).connect(gOut); return g; };
  const osc=(type,f,peak,dur,f2)=>{ const o=actx.createOscillator(); o.type=type; o.frequency.setValueAtTime(f,t); if(f2) o.frequency.exponentialRampToValueAtTime(f2,t+dur*.7); env(o,peak,dur); o.start(t); o.stop(t+dur+.02); };
  const noise=(type,f,peak,dur)=>{ const n=actx.createBufferSource(); n.buffer=noiseBuf; const fl=actx.createBiquadFilter(); fl.type=type; fl.frequency.value=f; n.connect(fl); env(fl,peak,dur); n.start(t); n.stop(t+dur+.02); };
  switch(kind){
    case 'K': osc('sine',130,.9,.16,45); break;
    case 'S': noise('bandpass',1900,.5,.13); osc('triangle',190,.2,.08); break;
    case 'H': noise('highpass',7000,.16,.045); break;
    case 'C': osc('square',560,.1,.09); osc('square',845,.08,.09); break;
    case 'G': osc('sine',240,.4,.11,170); break;
    case 'B': osc('triangle',root,.5,.3); break;
    case 'A': for(const n of chord) osc('triangle',n,.11,.2); break;
  }
}
/* hi = Nummer des halben Schlags, pos = Lage des Schlags im Takt (0 = die „1“) */
function groove(hi,s,bps){
  if(!$('groove').checked||hasMusic()||!actx||actx.state!=='running') return;
  if(!gOut){ gOut=actx.createGain(); gOut.gain.value=.55; gOut.connect(actx.destination);
    noiseBuf=actx.createBuffer(1,actx.sampleRate*.3,actx.sampleRate); const d=noiseBuf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; }
  const G=grooveOf(s.name&&s.fig?s.fig.split(' – ')[0]:''), m=G.m, bi=Math.floor(hi/2), half=((hi%2)+2)%2;
  const pos=(((bi-s.blockStart+s.off)%m)+m)%m, bar=Math.floor((bi-pos)/m), hits=G.p[(pos*2+half)%G.p.length]||'';
  const deg=[0,5,7,0][((bar%4)+4)%4], root=55*Math.pow(2,(deg+5)/12), tri=[0,4,7].map(x=>root*4*Math.pow(2,x/12));
  const t=actx.currentTime+(half&&G.swing?G.swing/Math.max(bps,.5):0);   // Swing: der Zwischenschlag kommt etwas später
  for(const k of hits) drum(k,t,root,tri);
}
$('groove').onchange=()=>{ wakeAudio(); if($('groove').checked&&hasMusic()) flash($('musicBtn'),'Eigene Musik hat Vorrang'); };

/* Ansage der nächsten Figur über die Sprachausgabe des Browsers */
function say(txt,rate=1.15){ if(!('speechSynthesis' in window)) return; try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(txt); u.lang='de-DE'; u.rate=rate; speechSynthesis.speak(u); }catch(e){} }
$('say').onchange=()=>{ lastSaid=-1; if(!$('say').checked&&'speechSynthesis' in window) speechSynthesis.cancel(); };

/* Eigene Musik: Das Paar folgt der Musik. Tempo und Schlag werden aus der Datei erkannt; der Tempo-Regler verlangsamt
   Musik und Tanz gemeinsam. Passt die Erkennung nicht, lässt sie sich durch Mittippen oder Eintragen korrigieren. */
const MUSIC_HELP='Musikdatei wählen – das Paar tanzt dann im Tempo der Musik. Der Tempo-Regler macht Musik und Tanz gemeinsam langsamer oder schneller.';
/* Welche Tänze passen zum Tempo der Musik? Verglichen wird mit dem üblichen Tempo jedes Tanzes, auch im halben und doppelten Zählmaß. */
function musicFit(){
  const box=$('musicFit'); if(!hasMusic()||!mBpm){ box.innerHTML=''; return; }
  const usual={}; for(const F of Object.values(BUILTIN)) usual[F.dance]??=F.bpm;
  const fit=Object.entries(usual).map(([d,b])=>{ let e=9; for(const f of [.5,1,2]) e=Math.min(e,Math.abs(Math.log(mBpm*f/b))); return [d,e]; }).filter(x=>x[1]<.1).sort((a,b)=>a[1]-b[1]).slice(0,7);
  box.innerHTML=fit.length?'Zu diesem Tempo passen: '+fit.map(([d])=>`<button data-d="${esc(d)}" title="Diesen Tanz wählen">${esc(d)}</button>`).join('')+
    '<div class="info" style="margin-top:4px">Geprüft wird nur das Tempo. Ob das Stück im ¾-Takt steht (Walzer) oder welchen Rhythmus es hat, erkennt der Simulator nicht.</div>'
    :'Zu diesem Tempo passt keiner der Tänze genau.';
}
$('musicFit').onclick=e=>{ const d=e.target.dataset.d; if(!d) return; $('danceSel').value=d; $('danceSel').dispatchEvent(new Event('change')); };
function musicInfo(){ const db=danceBpm(); musicFit();
  $('musicInfo').textContent=!hasMusic()?MUSIC_HELP:mBusy?'Tempo der Musik wird erkannt …':
    !mBpm?'Das Tempo wurde nicht erkannt. Bitte im Takt mindestens viermal auf „Tempo tippen“ drücken oder die Schläge pro Minute eintragen.':
    `Erkannt: ${mBpm.toFixed(1)} Schläge/min – das Paar tanzt mit ${Math.round(db)} Schlägen/min zur Musik.`+
    (Math.abs(Math.log(db/src.bpm))>.3?` Für diesen Tanz sind etwa ${src.bpm} üblich; das Stück passt nur bedingt.`:'')+' Stimmt der Takt nicht, mittippen.';
  updBpm(); }
/* Tempo und Lage der Schläge aus der Datei bestimmen: Lautstärke-Anstiege suchen und prüfen, in welchem Abstand sie sich wiederholen */
async function analyseMusic(file){
  wakeAudio(); const ab=await actx.decodeAudioData(await file.arrayBuffer());
  const sr=ab.sampleRate, hop=Math.round(sr/200), fr=sr/hop, n=Math.min(ab.length,sr*120), m=Math.floor(n/hop);
  const ch=[]; for(let i=0;i<ab.numberOfChannels;i++) ch.push(ab.getChannelData(i));
  const env=new Float32Array(m), on=new Float32Array(m);
  for(let i=0;i<m;i++){ let e=0; for(let j=i*hop,end=j+hop;j<end;j++){ let s=0; for(const c of ch) s+=c[j]; e+=s*s; } env[i]=Math.log(1e-7+e); }
  for(let i=2;i<m-1;i++) on[i]=Math.max(0,env[i]-env[i-1])+.5*Math.max(0,env[i+1]-env[i]);
  let mean=0; for(let i=0;i<m;i++) mean+=on[i]; mean/=m; for(let i=0;i<m;i++) on[i]-=mean;
  // grob: Autokorrelation zwischen 60 und 200 Schlägen/min, mit leichter Vorliebe für mittlere Tempi
  let bestB=0, bestS=-1e9;
  for(let lag=Math.floor(fr*60/200); lag<=Math.ceil(fr*60/60); lag++){ let s=0; for(let i=0;i+lag<m;i++) s+=on[i]*on[i+lag];
    const bpm=fr*60/lag, w=Math.exp(-.5*Math.pow(Math.log2(bpm/118)/.9,2)); s=s/(m-lag)*w; if(s>bestS){ bestS=s; bestB=bpm; } }
  if(!bestB||bestS<=0) return null;
  // fein: Raster aus Schlägen über das ganze Stück legen und Tempo und Versatz mit der besten Übereinstimmung nehmen
  let res=null, top=-1e9;
  for(let bpm=bestB-2.5; bpm<=bestB+2.5; bpm+=.02){ const P=fr*60/bpm;
    for(let k=0;k<32;k++){ const ph=k*P/32; let s=0, c=0; for(let x=ph;x<m-1;x+=P){ const i=Math.round(x); s+=on[i]+.5*(on[i-1]||0)+.5*on[i+1]; c++; }
      s/=c; if(s>top){ top=s; res={bpm,off:ph/fr}; } } }
  return res;
}
$('musicBtn').onclick=()=>$('musicFile').click();
$('musicFile').onchange=async e=>{ const f=e.target.files[0]; if(!f) return; e.target.value='';
  if(music.src) URL.revokeObjectURL(music.src);
  music.src=URL.createObjectURL(f); mBpm=0; mOff=0; taps=[]; $('musicBpm').value=''; $('musicBtn').textContent='🎵 '+f.name; mBusy=true; musicInfo();
  let r=null; try{ r=await analyseMusic(f); }catch(err){}
  mBusy=false; if(r&&!mBpm){ mBpm=r.bpm; mOff=r.off; $('musicBpm').value=mBpm.toFixed(1); }
  musicInfo(); };
$('musicOff').onclick=()=>{ music.pause(); if(music.src) URL.revokeObjectURL(music.src); music.removeAttribute('src'); music.load(); mBpm=0; taps=[]; $('musicBpm').value=''; $('musicBtn').textContent='🎵 Musikdatei wählen'; musicInfo(); };
$('musicBpm').onchange=()=>{ mBpm=+$('musicBpm').value||0; musicInfo(); };
$('tapBtn').onclick=()=>{ if(!hasMusic()) { musicInfo(); return; }
  const now=music.currentTime; if(taps.length&&(now-taps.at(-1)>2.5||now<taps.at(-1))) taps=[]; taps.push(now); if(taps.length>12) taps.shift();
  if(taps.length>=4){ mBpm=60*(taps.length-1)/(taps.at(-1)-taps[0]); mOff=now; $('musicBpm').value=mBpm.toFixed(1); }
  else if(mBpm) mOff=now;   // schon ein Tipp verschiebt den Schlag auf diesen Moment
  $('tapBtn').textContent=taps.length<4?`noch ${4-taps.length}×`:'Tempo tippen'; musicInfo(); };
/* Musik starten/anhalten wie der Tanz und den Tanz Schlag für Schlag an die Musik heranführen */
function syncMusic(dt){
  if(!hasMusic()) return;
  const moving=playing||stepTarget!==null, rate=clamp(spd(),.25,2);
  if(Math.abs(music.playbackRate-rate)>.002) music.playbackRate=rate;
  if(moving&&music.paused) music.play().catch(()=>{}); else if(!moving&&!music.paused) music.pause();
  const db=danceBpm();
  if(db&&playing&&!music.paused){ const f=x=>x-Math.floor(x), err=f(f((music.currentTime-mOff)*db/60)-f(beat)+.5)-.5; beat=Math.max(-8,beat+err*Math.min(1,dt*4)); }
}
/* Ein Paar zum aktuellen Zeitpunkt darstellen (Körper, Köpfe, Hände) */
function drawPair(h,d,tlx,dt){
  const {H:pH,D:pD}=evalPair(tlx,beat), s=pH.step, sty=s.sty;
    // Übergang zwischen zwei Tanzhaltungen
    const hb=sm(pH.u/.6), closed=mix(isClosed(s.holdPrev),isClosed(s.hold),hb), prom=mix(isProm(s.holdPrev),isProm(s.hold),hb);
    h.update(pH,sty,dt,beat,{prom:.3*prom,closed}); d.update(pD,sty,dt,beat,{prom:-.3*prom,closed});
    aimHead(h,d,sty,closed,prom,.35,.75,dt); aimHead(d,h,sty,closed,prom,.5,-.75,dt);
    const t=handTargets(s.hold,sty,h,d);
    if(s.holdPrev!==s.hold&&hb<1){ // Haltungswechsel: Hände wandern in einem kleinen Bogen statt auf gerader Linie
      const a=handTargets(s.holdPrev,sty,h,d), arc=Math.sin(Math.PI*hb)*.07; for(const k in t){ t[k]=a[k].lerp(t[k],hb); t[k].y+=arc; } }
    // Hände folgen ihrem Ziel leicht verzögert (relativ zum Paar), das macht Armwege bei Drehungen weich
    const pc=h.P.clone().add(d.P).multiplyScalar(.5), ka=1-Math.exp(-dt/.085);
    if(!h.hs||!d.hs){ h.hs={}; d.hs={}; for(const k in t) (k[0]==='H'?h:d).hs[k]=t[k].clone().sub(pc); }
    for(const k in t){ const q=(k[0]==='H'?h:d).hs[k]; q.lerp(t[k].sub(pc),ka); t[k].copy(q).add(pc); }
    h.arms(t.HL,t.HR,closed); d.arms(t.DL,t.DR,closed);

  return {pH,pD,s,sty};
}
/* Weitere Paare auf der Tanzfläche: Sie tanzen dieselbe Folge, beginnen aber an einer anderen Stelle und in eine andere Richtung */
const startPos=i=>i?[-ROOM.w*.24,-ROOM.d*.2,Math.PI/2]:[ROOM.w*.24,ROOM.d*.2,Math.PI];
function setPairs(n){
  while(extra.length<n-1){ const i=extra.length; extra.push({H:new Dancer([0x2f6b4f,0x6b4a2a][i],false),D:new Dancer([0xe2a21c,0x8a4fd0][i],true),tl:null,on:false}); }
  extra.forEach((p,i)=>{ p.on=i<n-1; p.H.setVisible(p.on); p.D.setVisible(p.on); });
  if(src) setSource(src);
}
const isClosed=h=>h==='zu'||h==='prom'?1:0, isProm=h=>h==='prom'?1:0;
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),.05);
  if(tl){
    const bps=baseBpm()/60*spd();
    if(playing) beat+=dt*bps;
    else if(stepTarget!==null){ beat=Math.min(stepTarget,beat+dt*bps); if(beat>=stepTarget) stepTarget=null; }
    syncMusic(dt);
    if($('loopFig').checked&&curItem>=0){ // nur die aktuelle Figur üben: am Ende zurück an ihren Anfang
      const r=itemRange(curItem); if(r&&beat>=r[1]-1e-6){ const b=r[0]+Math.min(beat-r[1],.5); if(stepTarget!==null) stepTarget=null; jumpTo(b); lastBeatIdx=-99; clearPrints();
        if($('trainer').checked&&+speedEl.value<100){ speedEl.value=Math.min(100,+speedEl.value+10); updBpm(); } } }
    if(beat>=tl.total){ // Folge beginnt von vorn – weitertanzen ab aktueller Position
      markStep(tl.H.at(-1),'H'); markStep(tl.D.at(-1),'D');
      beat=Math.min(beat-tl.total,tl.total*.5); if(stepTarget!==null) stepTarget=Math.max(0,stepTarget-tl.total);
      tl=tl.next||simulate(blocks,tl.end); for(const p of extra) if(p.on&&p.tl) p.tl=simulate(blocks,p.tl.end);
      lastH=lastD=-1; lastBeatIdx=-99; lastSaid=-1;
    }
    if(!tl.next&&beat>tl.total-1){ tl.next=simulate(blocks,tl.end); chain(tl,tl.next); }   // Anschluss vorausberechnen: weicher Übergang beim Neubeginn
    const {pH,pD,s,sty}=drawPair(herr,dame,tl,dt);
    for(const p of extra) if(p.on&&p.tl) drawPair(p.H,p.D,p.tl,dt);
    curItem=s.item;
    if($('say').checked&&playing){ // etwa 1,3 Sekunden vor dem Wechsel die nächste Figur ansagen
      const la=beat+1.3*bps, nx=la<tl.total?evalDancer(tl.H,la).step:tl.H[0], key=nx.item+(la<tl.total?0:1000);
      if(key!==lastSaid&&!$('loopFig').checked){ if(lastSaid!==-1||beat<1) say(nx.name.replace(/\s*\(.*?\)/g,'')); lastSaid=key; } }
    if($('prints').value==='diagramm') showDiagram(tl,s.item,s.rep,$('printWho').value==='HD'?['H','D']:[$('printWho').value]);
    const hi=Math.floor(beat*2+1e-6); if(hi!==lastHalf){ lastHalf=hi; if(playing||stepTarget!==null) groove(hi,s,bps); }
    const bi=Math.floor(beat+1e-6);
    if(bi!==lastBeatIdx){ lastBeatIdx=bi;
      if(playing||stepTarget!==null) click((bi-s.blockStart+s.off)%s.meter===0);
      if(bi<0&&playing) say(ZAHL[String((s.meter===3?7:9)+bi)]||'',1.5); }   // Einzählen: „fünf, sechs, sieben, acht“ (Walzer: „vier, fünf, sechs“)
    if(s.item!==exItem){ exItem=s.item; renderExplain(); }
    if(pH.idx!==lastH){
      if($('sayCount').checked&&playing&&beat>=0&&s.d>=.5&&s.kind!=='halt') say(ZAHL[String(s.c??'').trim()]||'',1.7);
      if(lastH>=0) markStep(tl.H[lastH],'H');
      lastH=pH.idx;
      document.querySelectorAll('#seqlist div').forEach(d=>{ const c=+d.dataset.i===s.item; d.classList.toggle('cur',c);
        if(c){ const l=$('seqlist'), y=d.offsetTop-l.offsetTop; if(y<l.scrollTop||y+d.offsetHeight>l.scrollTop+l.clientHeight) l.scrollTop=y-l.clientHeight/3; } });   // aktuelle Figur in der Liste sichtbar halten
    }
    if(pD.idx!==lastD){ if(lastD>=0) markStep(tl.D[lastD],'D'); lastD=pD.idx; }
    prints.forEach(p=>p.material.opacity=Math.max(0,p.material.opacity-dt*.06));
    $('count').textContent=beat<0?String((s.meter===3?7:9)+Math.floor(beat)):s.c||'';
    $('stepname').textContent='Herr: '+stepText(s);
    $('damename').textContent='Dame: '+stepText(pD.step);
    let tp=''; if($('tips').checked){ // Hinweis des laufenden Schritts (bleibt zwei Schläge stehen), sonst Vorschau auf den nächsten
      for(let i=pH.idx;i>=0&&tl.H[i].start>beat-2&&!tp;i--) tp=tl.H[i].tip||'';
      if(!tp){ const nx=tl.H[pH.idx+1]; if(nx&&nx.tip&&nx.start-beat<1.5) tp='gleich: '+nx.tip; } }
    $('tip').textContent=tp?'💡 '+tp:'';
    $('figname').textContent=s.fig+(s.reps>1?` (${s.rep}/${s.reps})`:'')+' · '+HOLDS[s.hold][0];

    const c=herr.P.clone().add(dame.P).multiplyScalar(.5); c.y=.9;
    sun.position.set(c.x+3,6,c.z+2); sun.target.position.copy(c); spot.position.set(c.x*.6,3.1,c.z*.6-.4); spot.target.position.copy(c);
    const mx=v=>{ if(mirrored) v.x=-v.x; return v; }; mx(c);   // die Kamera steht außerhalb der gespiegelten Welt
    const cm=$('cam').value;
    if(cm==='folgen'){ const d=c.clone().sub(controls.target); controls.target.add(d); camera.position.add(d); }
    else if(cm!=='frei'){ // feste Blickwinkel, die dem Paar nachgeführt werden
      const pos=c.clone(); if(cm==='oben'){ pos.y=7; pos.z-=.02; } else { const dn=cm==='herr'?herr:dame; mx(pos.copy(dn.P).addScaledVector(dn.fw,-2.6)); pos.y=2; }
      const k=Math.min(1,dt*(cm==='oben'?4:2)); camera.position.lerp(pos,k); controls.target.lerp(cm==='oben'?c.clone().setY(0):c,Math.min(1,dt*5)); }
  }
  controls.update(); renderer.render(scene,camera);
}
applyLook();
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
