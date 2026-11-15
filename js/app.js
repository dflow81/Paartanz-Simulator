/* ================= Wiedergabe ================= */
const $=id=>document.getElementById(id);
let src=null, blocks=[], tl=null, beat=0, playing=true, lastH=-1, lastD=-1, lastBeatIdx=-1, stepTarget=null, curItem=-1, lastSaid=-1;
const speedEl=$('speed');
/* Musik-Zustand (steht oben, weil schon beim ersten Laden einer Folge das Tempo gebraucht wird) */
const music=new Audio(); music.loop=true; music.preservesPitch=true;
let mBpm=0, mOff=0, taps=[], mBusy=false;
const hasMusic=()=>!!music.src;
/* Tanztempo zur Musik: erkannte Schläge, bei Bedarf halbiert oder verdoppelt, damit es zum Tanz passt */
function danceBpm(){ if(!hasMusic()||!mBpm||!src) return 0; let best=mBpm, e=9;
  for(const f of [.5,1,2]){ const d=Math.abs(Math.log(mBpm*f/src.bpm)); if(d<e){ e=d; best=mBpm*f; } } return best; }

function setSource(s){
  src=s; blocks=flatten(s);
  if(!blocks.length){tl=null;$('seqlist').innerHTML='<div>Diese Folge enthält keine Schritte.</div>';return;}
  tl=simulate(blocks,{H:startH()}); beat=0; lastH=lastD=-1; lastBeatIdx=-1; stepTarget=null; curItem=-1; lastSaid=-1; clearPrints(); clearDiagram(); herr.reset(); dame.reset();
  const figs=allFigs(), warn=new Set(tl.H.concat(tl.D).filter(r=>r.warn).map(r=>r.item));
  $('seqlist').innerHTML=s.items.map((it,i)=>`<div data-i="${i}">${i+1}. ${figs[it.fig]?esc(figLabel(figs[it.fig])):'(fehlt)'}${it.rep>1?' ×'+it.rep:''}${warn.has(i)?' <span title="Ein Schritt beginnt mit dem Fuß, auf dem gerade das Gewicht steht.">⚠ falscher Fuß</span>':''}</div>`).join('');
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
$('seqlist').onclick=e=>{ const d=e.target.closest('[data-i]'); if(!d||!tl) return; const r=itemRange(+d.dataset.i); if(r){ jumpTo(r[0]); clearPrints(); } };
$('trainer').onchange=()=>{ if($('trainer').checked){ $('loopFig').checked=true; speedEl.value=60; updBpm(); } };
/* „Hier ist die 1“: Tanz auf die nächstgelegene Eins des Takts schieben; mit Musik liegt der Schlag ab jetzt auf diesem Moment */
$('oneBtn').onclick=()=>{ if(!tl) return; const s=evalDancer(tl.H,beat).step, m=s.meter;
  if(hasMusic()) mOff=music.currentTime;
  const pos=(((beat-s.blockStart+s.off)%m)+m)%m; beat=Math.max(0,beat+(pos>m/2?m-pos:-pos)); lastBeatIdx=-1; flash($('oneBtn'),'✔ Eins gesetzt'); };
$('minBtn').onclick=()=>{ $('ui').classList.toggle('min'); $('minBtn').textContent=$('ui').classList.contains('min')?'▴':'▾'; };
$('cam').onchange=()=>{ if($('cam').value==='frei') overview(); };
$('show').onchange=()=>{ const v=$('show').value; herr.setGhost(v==='D'); dame.setGhost(v==='H'); };
$('mirror').onchange=()=>setMirror($('mirror').checked);
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
/* Ansage der nächsten Figur über die Sprachausgabe des Browsers */
function say(txt){ if(!('speechSynthesis' in window)) return; try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(txt); u.lang='de-DE'; u.rate=1.15; speechSynthesis.speak(u); }catch(e){} }
$('say').onchange=()=>{ lastSaid=-1; if(!$('say').checked&&'speechSynthesis' in window) speechSynthesis.cancel(); };

/* Eigene Musik: Das Paar folgt der Musik. Tempo und Schlag werden aus der Datei erkannt; der Tempo-Regler verlangsamt
   Musik und Tanz gemeinsam. Passt die Erkennung nicht, lässt sie sich durch Mittippen oder Eintragen korrigieren. */
const MUSIC_HELP='Musikdatei wählen – das Paar tanzt dann im Tempo der Musik. Der Tempo-Regler macht Musik und Tanz gemeinsam langsamer oder schneller.';
function musicInfo(){ const db=danceBpm();
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
  const moving=playing||stepTarget!==null, rate=clamp(speedEl.value/100,.25,2);
  if(Math.abs(music.playbackRate-rate)>.002) music.playbackRate=rate;
  if(moving&&music.paused) music.play().catch(()=>{}); else if(!moving&&!music.paused) music.pause();
  const db=danceBpm();
  if(db&&playing&&!music.paused){ const f=x=>x-Math.floor(x), err=f(f((music.currentTime-mOff)*db/60)-f(beat)+.5)-.5; beat=Math.max(0,beat+err*Math.min(1,dt*4)); }
}
const isClosed=h=>h==='zu'||h==='prom'?1:0, isProm=h=>h==='prom'?1:0;
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),.05);
  if(tl){
    const bps=baseBpm()/60*speedEl.value/100;
    if(playing) beat+=dt*bps;
    else if(stepTarget!==null){ beat=Math.min(stepTarget,beat+dt*bps); if(beat>=stepTarget) stepTarget=null; }
    syncMusic(dt);
    if($('loopFig').checked&&curItem>=0){ // nur die aktuelle Figur üben: am Ende zurück an ihren Anfang
      const r=itemRange(curItem); if(r&&beat>=r[1]-1e-6){ const b=r[0]+Math.min(beat-r[1],.5); if(stepTarget!==null) stepTarget=null; jumpTo(b); lastBeatIdx=-1; clearPrints();
        if($('trainer').checked&&+speedEl.value<100){ speedEl.value=Math.min(100,+speedEl.value+10); updBpm(); } } }
    if(beat>=tl.total){ // Folge beginnt von vorn – weitertanzen ab aktueller Position
      markStep(tl.H.at(-1),'H'); markStep(tl.D.at(-1),'D');
      beat=Math.min(beat-tl.total,tl.total*.5); if(stepTarget!==null) stepTarget=Math.max(0,stepTarget-tl.total);
      tl=tl.next||simulate(blocks,tl.end); lastH=lastD=-1; lastBeatIdx=-1; lastSaid=-1;
    }
    if(!tl.next&&beat>tl.total-1){ tl.next=simulate(blocks,tl.end); chain(tl,tl.next); }   // Anschluss vorausberechnen: weicher Übergang beim Neubeginn
    const {H:pH,D:pD}=evalPair(tl,beat), s=pH.step, sty=s.sty;
    curItem=s.item;
    if($('say').checked&&playing){ // etwa 1,3 Sekunden vor dem Wechsel die nächste Figur ansagen
      const la=beat+1.3*bps, nx=la<tl.total?evalDancer(tl.H,la).step:tl.H[0], key=nx.item+(la<tl.total?0:1000);
      if(key!==lastSaid&&!$('loopFig').checked){ if(lastSaid!==-1||beat<1) say(nx.name.replace(/\s*\(.*?\)/g,'')); lastSaid=key; } }
    if($('prints').value==='diagramm') showDiagram(tl,s.item,s.rep,$('printWho').value==='HD'?['H','D']:[$('printWho').value]);
    const bi=Math.floor(beat+1e-6);
    if(bi!==lastBeatIdx){ lastBeatIdx=bi;
      if(playing||stepTarget!==null) click((bi-s.blockStart+s.off)%s.meter===0); }
    // Übergang zwischen zwei Tanzhaltungen
    const hb=sm(pH.u/.6), closed=mix(isClosed(s.holdPrev),isClosed(s.hold),hb), prom=mix(isProm(s.holdPrev),isProm(s.hold),hb);
    herr.update(pH,sty,dt,beat,{prom:.3*prom,closed}); dame.update(pD,sty,dt,beat,{prom:-.3*prom,closed});
    aimHead(herr,dame,sty,closed,prom,.35,.75,dt); aimHead(dame,herr,sty,closed,prom,.5,-.75,dt);
    const t=handTargets(s.hold,sty);
    if(s.holdPrev!==s.hold&&hb<1){ // Haltungswechsel: Hände wandern in einem kleinen Bogen statt auf gerader Linie
      const a=handTargets(s.holdPrev,sty), arc=Math.sin(Math.PI*hb)*.07; for(const k in t){ t[k]=a[k].lerp(t[k],hb); t[k].y+=arc; } }
    // Hände folgen ihrem Ziel leicht verzögert (relativ zum Paar), das macht Armwege bei Drehungen weich
    const pc=herr.P.clone().add(dame.P).multiplyScalar(.5), ka=1-Math.exp(-dt/.085);
    if(!herr.hs||!dame.hs){ herr.hs={}; dame.hs={}; for(const k in t) (k[0]==='H'?herr:dame).hs[k]=t[k].clone().sub(pc); }
    for(const k in t){ const h=(k[0]==='H'?herr:dame).hs[k]; h.lerp(t[k].sub(pc),ka); t[k].copy(h).add(pc); }
    herr.arms(t.HL,t.HR,closed); dame.arms(t.DL,t.DR,closed);

    if(pH.idx!==lastH){
      if(lastH>=0) markStep(tl.H[lastH],'H');
      lastH=pH.idx;
      document.querySelectorAll('#seqlist div').forEach(d=>d.classList.toggle('cur',+d.dataset.i===s.item));
    }
    if(pD.idx!==lastD){ if(lastD>=0) markStep(tl.D[lastD],'D'); lastD=pD.idx; }
    prints.forEach(p=>p.material.opacity=Math.max(0,p.material.opacity-dt*.06));
    $('count').textContent=s.c||'';
    $('stepname').textContent='Herr: '+stepText(s);
    $('damename').textContent='Dame: '+stepText(pD.step);
    let tp=''; if($('tips').checked){ // Hinweis des laufenden Schritts (bleibt zwei Schläge stehen), sonst Vorschau auf den nächsten
      for(let i=pH.idx;i>=0&&tl.H[i].start>beat-2&&!tp;i--) tp=tl.H[i].tip||'';
      if(!tp){ const nx=tl.H[pH.idx+1]; if(nx&&nx.tip&&nx.start-beat<1.5) tp='gleich: '+nx.tip; } }
    $('tip').textContent=tp?'💡 '+tp:'';
    $('figname').textContent=s.fig+(s.reps>1?` (${s.rep}/${s.reps})`:'')+' · '+HOLDS[s.hold][0];

    const c=herr.P.clone().add(dame.P).multiplyScalar(.5); c.y=.9;
    sun.position.set(c.x+3,6,c.z+2); sun.target.position.copy(c);
    const mx=v=>{ if(mirrored) v.x=-v.x; return v; }; mx(c);   // die Kamera steht außerhalb der gespiegelten Welt
    const cm=$('cam').value;
    if(cm==='folgen'){ const d=c.clone().sub(controls.target); controls.target.add(d); camera.position.add(d); }
    else if(cm!=='frei'){ // feste Blickwinkel, die dem Paar nachgeführt werden
      const pos=c.clone(); if(cm==='oben'){ pos.y=7; pos.z-=.02; } else { const dn=cm==='herr'?herr:dame; mx(pos.copy(dn.P).addScaledVector(dn.fw,-2.6)); pos.y=2; }
      const k=Math.min(1,dt*(cm==='oben'?4:2)); camera.position.lerp(pos,k); controls.target.lerp(cm==='oben'?c.clone().setY(0):c,Math.min(1,dt*5)); }
  }
  controls.update(); renderer.render(scene,camera);
}
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
