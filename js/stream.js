/* Spotify und Apple Music: ein kleiner Player der Dienste selbst, zum Ein- und Ausblenden. Ausgeblendet spielt er weiter.
   Der Simulator hört die Musik nicht – das Tanztempo wird durch Mittippen an die Musik angepasst. */
function streamUrl(link){ link=(link||'').trim(); let m;
  if((m=link.match(/^spotify:(track|album|playlist|artist|episode|show):([A-Za-z0-9]+)/))) return 'https://open.spotify.com/embed/'+m[1]+'/'+m[2];
  if((m=link.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/))) return 'https://open.spotify.com/embed/'+m[1]+'/'+m[2];
  if((m=link.match(/(?:embed\.)?music\.apple\.com\/([^\s#]+)/))) return 'https://embed.music.apple.com/'+m[1];
  return ''; }
function streamLoad(link){ const u=streamUrl(link), box=$('streamFrame');
  if(!u){ box.innerHTML=''; $('streamInfo').textContent=link.trim()?'Das ist kein Link von Spotify oder Apple Music. Im Dienst auf „Teilen“ → „Link kopieren“ gehen und hier einfügen.':STREAM_HELP; return false; }
  const f=document.createElement('iframe'); f.src=u; f.allow='autoplay *; encrypted-media *; clipboard-write; fullscreen *; picture-in-picture'; f.loading='lazy';
  f.height=/apple/.test(u)?(/[?&]i=|\/song\//.test(u)?175:320):(/\/track\/|\/episode\//.test(u)?152:352);
  box.innerHTML=''; box.appendChild(f); $('streamInfo').textContent=STREAM_HELP2;
  try{ localStorage.setItem('tanzsim_stream',link.trim()); }catch(e){} return true; }
const STREAM_HELP='Link zu einem Lied, Album oder einer Playlist einfügen (im Dienst: Teilen → Link kopieren).';
const STREAM_HELP2='Ganze Lieder gibt es nur, wenn du in diesem Browser beim Dienst angemeldet bist – sonst kurze Hörproben. Tempo: im Takt viermal oder öfter tippen, dann tanzt das Paar so schnell wie die Musik.';
$('streamBtn').onclick=()=>{ const off=$('streamBox').classList.toggle('off'); $('streamBtn').classList.toggle('on',!off); };
$('streamHide').onclick=()=>$('streamBtn').onclick();
$('streamGo').onclick=()=>streamLoad($('streamLink').value);
$('streamLink').onkeydown=e=>{ if(e.key==='Enter') streamLoad($('streamLink').value); };
$('streamLink').onpaste=()=>setTimeout(()=>streamLoad($('streamLink').value),0);
$('streamClear').onclick=()=>{ $('streamLink').value=''; streamLoad(''); try{ localStorage.removeItem('tanzsim_stream'); }catch(e){} };
let sTaps=[];
$('streamTap').onclick=()=>{ const now=performance.now()/1000; if(sTaps.length&&now-sTaps.at(-1)>3) sTaps=[]; sTaps.push(now); if(sTaps.length>12) sTaps.shift();
  if(sTaps.length<4){ $('streamTap').textContent=`noch ${4-sTaps.length}×`; return; }
  const bpm=60*(sTaps.length-1)/(sTaps.at(-1)-sTaps[0]), base=src?src.bpm:0; $('streamTap').textContent='Tempo tippen';
  if(!base){ $('streamBpm').textContent=Math.round(bpm)+' Schläge/min'; return; }
  let best=1; for(const f of [.5,1,2]) if(Math.abs(Math.log(bpm*f/base))<Math.abs(Math.log(bpm*best/base))) best=f;      // halbes oder doppeltes Zählmaß
  const pct=Math.round(bpm*best/base*100), ok=pct>=+speedEl.min&&pct<=+speedEl.max;
  if(ok){ speedEl.value=pct; updBpm(); $('oneBtn').onclick(); }
  $('streamBpm').textContent=Math.round(bpm)+' Schläge/min'+(ok?' → Tanz auf '+pct+' %':' – für diesen Tanz zu '+(pct<100?'langsam':'schnell')); };
{ let l=''; try{ l=localStorage.getItem('tanzsim_stream')||''; }catch(e){} $('streamLink').value=l; $('streamInfo').textContent=STREAM_HELP; $('streamBox').dataset.saved=l; }
/* erst beim ersten Öffnen laden, damit die Seite ohne Player nichts von den Diensten nachlädt */
$('streamBtn').addEventListener('click',()=>{ const b=$('streamBox'); if(b.dataset.saved&&!$('streamFrame').firstChild) streamLoad(b.dataset.saved); b.dataset.saved=''; });
