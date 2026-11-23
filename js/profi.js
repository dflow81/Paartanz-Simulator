/* ================= Profi-Funktionen: Technikanzeige, Tanzlehrer-Ansicht, Profi-Lernmodus, Turniermodus, Qualitätsprüfung =================
   Baut auf der vorhandenen Wiedergabe auf (Schritt weiter, Zeitleiste, Ansagen) und ersetzt nichts davon. */

/* ---------- Technikdaten unter „Schritte erklärt“ (optional) ---------- */
function zeigeTechnik(){
  const box=$('techBox'); if(!$('techOn').checked||!tl||exItem<0){ box.innerHTML=''; return; }
  const {H,D}=figSteps(tl,exItem), fid=src&&src.items[exItem]&&src.items[exItem].fig, td=typeof TECHNIK_DATEN!=='undefined'&&TECHNIK_DATEN[fid];
  const tab=(steps,t)=>{ if(!steps.length) return ''; const tx=technikVon(steps,steps[0].sty||H[0].sty,td&&td[t==='Herr'?'H':'D']); const mitArm=steps.some(x=>x.arm);
    return `<div class="tcap">${t}</div><table class="tech"><tr><th>Zähl</th><th title="Belastungsfuß / freier Fuß">Gew./frei</th><th title="H Ferse, T Spitze, B Ballen, F ganzer Fuß">Fuß</th><th title="Rise">Heben</th><th title="Fall">Senken</th><th title="H Ferse, T Spitze, B Ballen, F ganzer Fuß">H T B F</th><th>CBM</th><th>CBMP</th><th>Sway</th><th title="Ausrichtung im Raum">Ausr.</th>${mitArm?'<th title="Armführung in der Haltung">Arm</th>':''}</tr>`+
      tx.map((x,i)=>`<tr><td>${esc(x.c)}</td><td>${x.belastet} / ${x.frei}</td><td>${x.technik}</td><td>${x.heben}</td><td>${x.senken}</td><td>${[x.heel?'H':'',x.toe?'T':'',x.ball?'B':'',x.flat?'F':''].filter(Boolean).join(' ')||'–'}</td><td>${x.cbm?'●':''}</td><td>${x.cbmp?'●':''}</td><td>${x.sway}</td><td title="${esc(ausrichtung(steps[i].to,steps[i].hA).lang)}">${esc(ausrichtung(steps[i].to,steps[i].hA).kurz)}</td>${mitArm?`<td>${steps[i].arm?esc(ARME[steps[i].arm]):''}</td>`:''}</tr>`).join('')+'</table>'; };
  box.innerHTML=tab(H,'Herr')+tab(D,'Dame')+(td?`<div class="info">Fußarbeit und Sway laut Quelle: <a href="${esc(QUELLEN[fid])}" target="_blank" rel="noopener">${esc(QUELLEN[fid])}</a>. Übrige Spalten abgeleitet.</div>`:'')+'<div class="info">'+(td?'':'Aus den Schritten abgeleitet, als Lernhilfe. ')+' H Ferse, T Spitze, B Ballen, F ganzer Fuß. LOD Tanzrichtung, DW diagonal zur Wand, DC diagonal zur Mitte.</div>';
}
$('techOn').onchange=zeigeTechnik;

/* ---------- Aktuelle Figur ---------- */
const aktFigur=()=>{ const it=src&&src.items[Math.max(0,curItem)], F=it&&allFigs()[it.fig]; return F?{id:it.fig,F}:null; };

/* ---------- Tanzlehrer-Ansicht ---------- */
function lehrerZeigen(){
  const a=aktFigur(); if(!a) return; const d=lehrerDaten(a.F,a.id), m=d.meta, ul=l=>'<ul>'+l.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>';
  $('lehrerTitel').textContent='👩‍🏫 '+figTitle(a.F);
  $('lehrerInhalt').innerHTML=`<div class="info">${STUFEN[m.stufe]}${m.stufeFest?'':' (geschätzt)'} · ${ARTEN[m.art]} · Zählzeiten ${esc(m.rhythmus)}</div>
    <h4>Figurenbeschreibung</h4><p>${esc(d.beschreibung)}</p>${m.schematisch?'<p class="info">Schrittfolge schematisch dargestellt, nicht mit einem Technikbuch abgeglichen.</p>':''}
    ${m.alias?`<p class="info">Alias: ${esc(m.alias.text)}.</p>`:''}${m.quelle?`<p class="info">Quelle: <a href="${esc(m.quelle)}" target="_blank" rel="noopener">${esc(m.quelle)}</a></p>`:''}
    <h4>Technik</h4>${ul(d.technik)}<h4>Typische Fehler</h4>${ul(d.fehler)}<h4>Hinweise für Herren</h4>${ul(d.herr)}<h4>Hinweise für Damen</h4>${ul(d.dame)}`;
  $('lehrer').hidden=false;
}
$('lehrerBtn').onclick=lehrerZeigen; $('lehrerZu').onclick=()=>$('lehrer').hidden=true;
$('lehrerUnterricht').onclick=()=>{ $('lehrer').hidden=true; proStart(true); };

/* ---------- Profi-Lernmodus: nach jedem Schritt Stopp, belasteter Fuß und nächster Schritt am Boden markiert, Zählzeit wird angesagt ---------- */
let pro=null, proWar=false, proSeit=0;
const ring=(c,r1,r2)=>{ const m=new THREE.Mesh(new THREE.RingGeometry(r1,r2,28),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide})); m.rotation.x=-Math.PI/2; m.visible=false; world.add(m); return m; };
const mGewicht=ring(0x3ddc84,.09,.14), mNaechst=ring(0xffd166,.1,.17);
const proListe=()=>tl?tl[pro.role]:[];
const proNext=()=>{ if(!pro||!tl) return; const l=proListe(), s=l.find(x=>x.start+x.d>beat+1e-6)||l[0]; setPlaying(false); stepTarget=s.start+s.d; };
function proBack(){ if(!pro||!tl) return; const l=proListe(), i=l.findIndex(x=>x.start+x.d>beat+1e-6), s=l[i<0?0:i]; setPlaying(false); jumpTo(beat-s.start>.25*s.d||i<=0?s.start:l[i-1].start); }
function proRolle(){ $('proH').classList.toggle('on',pro.role==='H'); $('proD').classList.toggle('on',pro.role==='D'); }
function proStart(teach=false){ if(!tl||!src) return; if(typeof lernEnd==='function') lernEnd();
  pro={role:look.role||'H',auto:+$('proAuto').value||0,teach,loop:$('loopFig').checked}; $('loopFig').checked=true; setPlaying(false);
  const r=itemRange(Math.max(0,curItem)); if(r) jumpTo(r[0]); proWar=false; proSeit=performance.now(); proRolle();
  $('proTitel').textContent=teach?'👩‍🏫 Unterrichtsmodus':'🎯 Profi-Lernmodus'; $('profi').hidden=false; $('profiBtn').textContent='🎯 Profi-Lernmodus beenden'; }
function proEnd(){ if(!pro) return; $('loopFig').checked=pro.loop; pro=null; $('profi').hidden=true; mGewicht.visible=mNaechst.visible=false; $('profiBtn').textContent='🎯 Profi-Lernmodus'; }
$('profiBtn').onclick=()=>pro?proEnd():proStart(false); $('proZu').onclick=proEnd; $('proWeiter').onclick=proNext; $('proZurueck').onclick=proBack;
$('proAuto').onchange=()=>{ if(pro) pro.auto=+$('proAuto').value||0; };
for(const r of 'HD') $('pro'+r).onclick=()=>{ if(!pro) return; pro.role=look.role=r; saveLook(); proRolle(); proWar=false; };
for(const id of ['source','danceSel']) $(id).addEventListener('change',()=>proEnd(),true);
setInterval(()=>{ if(!pro||!tl) return;
  const l=proListe(), steht=!playing&&stepTarget===null, t=clamp(beat-1e-3,0,tl.total-1e-3), r=evalRaw(l,t), s=l.find(x=>x.start+x.d>beat+1e-6)||l[0];
  const fuss=r.side>=0?'L':'R', p=r.feet[fuss].p; mGewicht.position.set(p[0],.016,p[1]); mGewicht.visible=true;
  const ziel=s.kind!=='halt'; if(ziel) mNaechst.position.set(s.to[0],.018,s.to[1]); mNaechst.visible=ziel&&steht;
  const tx=technikVon(l.filter(x=>x.blockStart===s.blockStart&&x.rep===s.rep),s.sty), i=l.filter(x=>x.blockStart===s.blockStart&&x.rep===s.rep).indexOf(s), te=tx[i]||tx[0];
  $('proSchritt').textContent=(s.c||'')+' · '+stepText(s);
  $('proInfo').innerHTML=`Gewicht auf <b style="color:#3ddc84">${fuss==='L'?'links':'rechts'}</b> · nächster Schritt <b style="color:#ffd166">${s.f==='L'?'links':'rechts'}</b>`+(te?` · Fuß ${te.technik}${te.rise!=='keine'?' · '+te.rise:''}${te.cbm?' · CBM':''}${te.cbmp?' · CBMP':''}${te.sway!=='–'&&te.sway!=='gerade'?' · Sway '+te.sway:''}`:'')+(s.tip?`<br>💡 ${esc(s.tip)}`:'');
  if(steht&&!proWar){ proSeit=performance.now(); const z=ZAHL[String(s.c??'').trim()]||''; say(pro.teach?(z?z+'. ':'')+stepText(s).replace(' · ',', '):z,1.2); }
  proWar=steht;
  if(steht&&pro.auto&&performance.now()-proSeit>pro.auto*1000) proNext();
},120);

/* ---------- Turniermodus: Tanzrichtung, Ausrichtung, Ecken und Raumaufteilung auf der Fläche ---------- */
const turnierG=new THREE.Group(); turnierG.visible=false; world.add(turnierG);
function turnierBauen(){
  turnierG.clear(); const {w,d}=ROOM, b=1.25, flaeche=(x,z,sx,sz,c,o)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.set(x,.009,z); turnierG.add(m); };
  const lang=w>=d?0x4b6bfb:0x8e5bd6, kurz=w>=d?0x8e5bd6:0x4b6bfb;
  for(const s of [1,-1]){ flaeche(0,s*(d/2-b/2),w-2*b,b,lang,.13); flaeche(s*(w/2-b/2),0,b,d-2*b,kurz,.13); for(const t of [1,-1]) flaeche(s*(w/2-b/2),t*(d/2-b/2),b,b,0xffc23d,.2); }
  const pfeil=new THREE.Shape(); pfeil.moveTo(0,.34); pfeil.lineTo(.22,-.06); pfeil.lineTo(.08,-.06); pfeil.lineTo(.08,-.3); pfeil.lineTo(-.08,-.3); pfeil.lineTo(-.08,-.06); pfeil.lineTo(-.22,-.06); pfeil.closePath();
  const geo=new THREE.ShapeGeometry(pfeil), mat=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.55,depthWrite:false,side:THREE.DoubleSide});
  const setz=(x,z,vx,vz)=>{ const m=new THREE.Mesh(geo,mat); m.rotation.set(-Math.PI/2,0,Math.atan2(-vx,-vz)); m.position.set(x,.012,z); turnierG.add(m); };
  for(let x=-w/2+b+.5;x<w/2-b;x+=1.6){ setz(x,d/2-b/2,1,0); setz(-x,-d/2+b/2,-1,0); }
  for(let z=-d/2+b+.5;z<d/2-b;z+=1.6){ setz(w/2-b/2,-z,0,-1); setz(-w/2+b/2,z,0,1); }
}
$('turnierOn').onchange=()=>{ const on=$('turnierOn').checked; if(on) turnierBauen(); turnierG.visible=on; $('turnierInfo').hidden=!on; };
$('room').addEventListener('change',()=>{ if($('turnierOn').checked) turnierBauen(); });
const eckFiguren=d=>Object.entries(allFigs()).filter(([k,f])=>f.dance===d&&f.steps&&f.steps.length).map(([k,f])=>figMeta(f,k)).filter(m=>m.drehung>=45&&m.drehung<=135).slice(0,3).map(m=>m.name.replace(/\s*\(.*?\)/g,''));
setInterval(()=>{ if(!$('turnierOn').checked||!tl) return; const t=clamp(beat,0,tl.total-1e-3), a=evalRaw(tl.H,t), al=ausrichtung(a.sup,a.h), d=a.step.sty&&aktFigur()?aktFigur().F.dance:'';
  $('turnierInfo').innerHTML=`🏁 ${al.seite} (${al.langeSeite?'lange':'kurze'} Seite) · Blick: <b>${al.kurz}</b> – ${esc(al.lang)}`+(al.ecke?`<br>↪ Ecke: jetzt nach links um die Ecke tanzen${eckFiguren(d).length?' – z. B. '+esc(eckFiguren(d).join(', ')):''}`:''); },300);

/* ---------- Figuren-Qualitätsprüfung ---------- */
$('qualBtn').onclick=()=>{ const out=$('qualOut'); out.textContent='Prüfe …'; setTimeout(()=>{ const d=curDance()===ALL?null:curDance(), r=qualitaetAlle(d);
  out.innerHTML=`<b>${r.geprueft} Figuren${d?' ('+esc(d)+')':''} geprüft: ${r.fehler} Fehler, ${r.warnungen} Warnungen.</b>`+r.liste.slice(0,40).map(x=>`<div class="qz"><b>${esc(x.tanz)} – ${esc(x.name)}</b>${x.q.map(q=>`<br><span class="${q.art==='fehler'?'qf':'qw'}">${q.art==='fehler'?'✖':'⚠'} ${esc(q.text)}</span>`).join('')}</div>`).join('')+(r.liste.length>40?`<div>… und ${r.liste.length-40} weitere</div>`:''); },30); };
