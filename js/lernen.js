/* ================= Lernmodus =================
   Die aktuelle Figur in fünf Stufen: erst nur die eigenen Schritte einzeln, dann allein in Zeitlupe, dann zu zweit bis zum vollen Tempo. */
const LERN=[
  {t:'Schritt für Schritt',x:'Du siehst nur deine eigenen Schritte. Drücke „Nächster Schritt“ und tanze jeden Schritt nach.',solo:true,step:true,sp:60},
  {t:'Allein in Zeitlupe',x:'Deine Schritte im Zusammenhang, ganz langsam. Die Figur wiederholt sich, tanze mit.',solo:true,sp:40},
  {t:'Zu zweit, langsam',x:'Jetzt mit Partner. Achte auf die Tanzhaltung und die Hinweise oben rechts.',sp:60},
  {t:'Fast im Tempo',x:'Dieselbe Figur, schon flüssiger.',sp:80},
  {t:'Im Tempo',x:'Volles Tempo. Klappt es mehrmals hintereinander, sitzt die Figur.',sp:100}];
let lern=null;
function lernShow(){
  const L=LERN[lern.stage], n=src?src.items.length:1, F=allFigs()[src.items[lern.item].fig];
  $('learnTitle').textContent='🎓 '+(F?figTitle(F):'Figur')+(n>1?` (Figur ${lern.item+1} von ${n})`:'');
  $('learnDots').innerHTML=LERN.map((s,i)=>`<span class="${i===lern.stage?'on':i<lern.stage?'done':''}">${i+1}</span>`).join('');
  $('learnText').innerHTML=`<b>Stufe ${lern.stage+1} von ${LERN.length}: ${L.t}</b> (${L.sp} % Tempo)<br>${L.x}`;
  $('learnH').classList.toggle('on',lern.role==='H'); $('learnD').classList.toggle('on',lern.role==='D');
  $('learnNextStep').hidden=!L.step; $('learnStep').hidden=!L.step; $('learnBack').disabled=lern.stage===0;
  $('learnNext').textContent=lern.stage<LERN.length-1?'Stufe weiter ▶':n>1?'Nächste Figur ▶':'✔ Fertig';
}
function lernApply(){
  const L=LERN[lern.stage], r=lern.role;
  lern.item=Math.min(lern.item,src.items.length-1);
  $('trainer').checked=false; $('loopFig').checked=true; $('countIn').checked=false; slow.clear(); document.querySelectorAll('#seqlist .turtle.on').forEach(e=>e.classList.remove('on'));
  $('show').value=L.solo?r:'HD'; $('show').onchange();
  $('prints').value='diagramm'; $('printWho').value=L.solo?r:'HD'; $('prints').onchange();
  speedEl.value=L.sp; updBpm();
  const rg=itemRange(lern.item); if(rg){ jumpTo(rg[0]); clearPrints(); curItem=lern.item; }
  setPlaying(!L.step); lernShow();
}
function lernStart(){
  if(!tl||!src) return;
  lern={role:look.role||'H',stage:0,item:Math.max(0,curItem),
    saved:{loop:$('loopFig').checked,trainer:$('trainer').checked,countIn:$('countIn').checked,show:$('show').value,speed:speedEl.value,prints:$('prints').value,who:$('printWho').value}};
  $('learn').hidden=false; $('learnBtn').textContent='🎓 Lernmodus beenden'; lernApply();
}
function lernEnd(){
  if(!lern) return; const s=lern.saved; lern=null; $('learn').hidden=true; $('learnBtn').textContent='🎓 Diese Figur lernen';
  $('loopFig').checked=s.loop; $('trainer').checked=s.trainer; $('countIn').checked=s.countIn; $('show').value=s.show; $('show').onchange();
  $('prints').value=s.prints; $('printWho').value=s.who; $('prints').onchange(); speedEl.value=s.speed; updBpm();
}
$('learnBtn').onclick=()=>lern?lernEnd():lernStart();
$('learnEnd').onclick=lernEnd;
$('learnBack').onclick=()=>{ if(lern&&lern.stage>0){ lern.stage--; lernApply(); } };
$('learnNext').onclick=()=>{ if(!lern) return;
  if(lern.stage<LERN.length-1){ lern.stage++; lernApply(); }
  else if(src.items.length>1){ lern.item=(lern.item+1)%src.items.length; lern.stage=0; lernApply(); }
  else lernEnd(); };
$('learnNextStep').onclick=()=>$('stepbtn').onclick();
for(const r of 'HD') $('learn'+r).onclick=()=>{ if(!lern) return; lern.role=look.role=r; saveLook(); lernApply(); };
/* Anderer Tanz oder andere Folge gewählt: Lernmodus beenden */
for(const id of ['source','danceSel','randBtn']) $(id).addEventListener(id==='randBtn'?'click':'change',()=>lernEnd(),true);
/* In Stufe 1 den aktuellen Schritt groß anzeigen */
setInterval(()=>{ if(!lern||!LERN[lern.stage].step) return;
  $('learnStep').textContent=$('count').textContent+' · '+$(lern.role==='H'?'stepname':'damename').textContent; },150);

/* ================= Als App installierbar, läuft danach auch ohne Internet ================= */
if('serviceWorker' in navigator&&location.protocol==='https:') navigator.serviceWorker.register('sw.js').catch(()=>{});
if(navigator.serviceWorker) navigator.serviceWorker.ready.then(r=>setTimeout(()=>r.active&&r.active.postMessage('aufraeumen'),8000)).catch(()=>{});
