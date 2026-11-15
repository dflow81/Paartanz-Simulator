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

/* ---------- Spotify direkt (Premium): Anmeldung im Browser, Suche und Wiedergabe ganzer Lieder im Simulator ----------
   Offizielle Schnittstelle von Spotify (Web Playback SDK). Die Kennnummer (Client-ID) ist kein Geheimnis; Anmeldung ohne
   Passwort im Simulator (PKCE) – das Zugangs-Token bleibt nur in diesem Browser gespeichert. */
const SPOTIFY_CLIENT='';                                   // feste Kennnummer der Spotify-App (leer = im Player eintragen)
const SP_SCOPE='streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state playlist-read-private playlist-read-collaborative';
const spGet=k=>{ try{ return localStorage.getItem('tanzsim_sp_'+k)||''; }catch(e){ return ''; } };
const spSet=(k,v)=>{ try{ v?localStorage.setItem('tanzsim_sp_'+k,v):localStorage.removeItem('tanzsim_sp_'+k); }catch(e){} };
const spClient=()=>SPOTIFY_CLIENT||spGet('client');
const spRedirect=()=>location.origin+location.pathname;
const spWeb=()=>location.protocol==='https:'||location.hostname==='127.0.0.1'||location.hostname==='localhost';
const spMsg=t=>{ $('spInfo').textContent=t||''; };
let spPlayer=null, spDev='', spTracks=[];
function spView(){ const c=spClient(), tok=spGet('refresh');
  $('spSetup').hidden=!!c; $('spLogin').hidden=!c||!!tok; $('spMain').hidden=!c||!tok; $('spChange').hidden=!!SPOTIFY_CLIENT;
  $('spRedir').textContent=spWeb()?spRedirect():'https://dflow81.github.io/Paartanz-Simulator/tanzsimulator.html';
  if(!spWeb()) spMsg('Die Anmeldung bei Spotify geht nur auf der Internetseite des Simulators, nicht mit der Datei von der Festplatte.'); }
const b64u=buf=>btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
async function spAuthUrl(){ const ver=b64u(crypto.getRandomValues(new Uint8Array(48))), state=b64u(crypto.getRandomValues(new Uint8Array(12)));
  const ch=b64u(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ver))); spSet('verifier',ver); spSet('state',state);
  return 'https://accounts.spotify.com/authorize?'+new URLSearchParams({client_id:spClient(),response_type:'code',redirect_uri:spRedirect(),code_challenge_method:'S256',code_challenge:ch,scope:SP_SCOPE,state}); }
async function spTokenReq(params){ const r=await fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:spClient(),...params})});
  const j=await r.json().catch(()=>({})); if(!r.ok||!j.access_token) throw new Error(j.error_description||j.error||('Fehler '+r.status));
  spSet('access',j.access_token); spSet('until',String(Date.now()+(j.expires_in-60)*1000)); if(j.refresh_token) spSet('refresh',j.refresh_token); return j.access_token; }
let spRefreshing=null;
async function spToken(){ if(spGet('access')&&Date.now()<+spGet('until')) return spGet('access');
  if(!spGet('refresh')) throw new Error('nicht angemeldet');
  spRefreshing??=spTokenReq({grant_type:'refresh_token',refresh_token:spGet('refresh')}).finally(()=>spRefreshing=null);
  try{ return await spRefreshing; }catch(e){ spLogout('Die Anmeldung ist abgelaufen. Bitte neu anmelden.'); throw e; } }
async function spApi(method,path,body){ const go=async()=>fetch('https://api.spotify.com/v1'+path,{method,headers:{Authorization:'Bearer '+await spToken(),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
  let r=await go(); if(r.status===401){ spSet('until','0'); r=await go(); }
  if(r.status===204||r.status===202) return null; const j=await r.json().catch(()=>null);
  if(!r.ok) throw new Error(j&&j.error&&j.error.message||('Fehler '+r.status)); return j; }
function spLogout(msg){ for(const k of ['access','until','refresh','verifier','state']) spSet(k,''); if(spPlayer){ try{ spPlayer.disconnect(); }catch(e){} spPlayer=null; } spDev=''; $('spList').innerHTML=''; $('spNow').innerHTML=''; spView(); spMsg(msg||''); }
function spStart(){ if(spPlayer||!spGet('refresh')) return; spMsg('Spotify wird verbunden …');
  const init=()=>{ spPlayer=new Spotify.Player({name:'Paartanz-Simulator',getOAuthToken:cb=>spToken().then(cb).catch(()=>{}),volume:+$('spVol').value/100});
    spPlayer.addListener('ready',({device_id})=>{ spDev=device_id; spMsg('Bereit. Lied oder Playlist suchen und anklicken.'); });
    spPlayer.addListener('not_ready',()=>{ spDev=''; spMsg('Verbindung zu Spotify unterbrochen …'); });
    spPlayer.addListener('player_state_changed',spState);
    spPlayer.addListener('initialization_error',()=>spMsg('Dieser Browser kann Spotify nicht direkt abspielen (geschützte Wiedergabe fehlt). Bitte Chrome, Edge oder Firefox am PC versuchen.'));
    spPlayer.addListener('authentication_error',()=>spLogout('Die Anmeldung bei Spotify hat nicht geklappt. Bitte neu anmelden.'));
    spPlayer.addListener('account_error',()=>spMsg('Das geht nur mit Spotify Premium.'));
    spPlayer.addListener('autoplay_failed',()=>spMsg('Der Browser hat den Start blockiert – bitte auf ▶ drücken.'));
    spPlayer.connect(); };
  if(window.Spotify) init(); else { window.onSpotifyWebPlaybackSDKReady=init; const s=document.createElement('script'); s.src='https://sdk.scdn.co/spotify-player.js'; s.onerror=()=>spMsg('Spotify ließ sich nicht laden (Internet oder Werbeblocker?).'); document.head.appendChild(s); } }
function spState(st){ if(!st){ $('spNow').innerHTML=''; return; } const t=st.track_window.current_track; $('spPP').textContent=st.paused?'▶':'⏸';
  $('spNow').innerHTML=t?`${t.album&&t.album.images&&t.album.images[0]?`<img src="${esc(t.album.images[0].url)}" alt="">`:''}<div><b>${esc(t.name)}</b><br>${esc(t.artists.map(a=>a.name).join(', '))}</div>`:''; }
function spShow(tracks,lists){ spTracks=tracks; $('spList').innerHTML=
  tracks.map((t,i)=>`<div class="spi" data-i="${i}">♪ <b>${esc(t.name)}</b> – ${esc(t.artists.map(a=>a.name).join(', '))}</div>`).join('')+
  lists.map(p=>`<div class="spi" data-u="${esc(p.uri)}">☰ <b>${esc(p.name)}</b> <span>Playlist</span></div>`).join('')||'<div class="info">Nichts gefunden.</div>'; }
async function spSearch(){ const q=$('spQ').value.trim(); if(!q) return; spMsg('');
  try{ const j=await spApi('GET','/search?'+new URLSearchParams({q,type:'track,playlist',limit:'8'})); spShow((j.tracks&&j.tracks.items||[]).filter(Boolean),(j.playlists&&j.playlists.items||[]).filter(Boolean).slice(0,4)); }catch(e){ spMsg('Suche: '+e.message); } }
async function spMine(){ spMsg(''); try{ const j=await spApi('GET','/me/playlists?limit=30'); spShow([],(j.items||[]).filter(Boolean)); }catch(e){ spMsg('Playlists: '+e.message); } }
async function spPlay(body){ if(!spDev){ spMsg('Spotify ist noch nicht bereit – einen Moment bitte.'); return; }
  try{ spPlayer.activateElement&&spPlayer.activateElement(); await spApi('PUT','/me/player/play?device_id='+encodeURIComponent(spDev),body); spMsg(''); }catch(e){ spMsg('Abspielen: '+e.message); } }
$('spSave').onclick=()=>{ const v=$('spClient').value.trim(); if(!/^[0-9a-f]{32}$/i.test(v)){ spMsg('Die Kennnummer (Client ID) hat genau 32 Zeichen aus Ziffern und den Buchstaben a–f.'); return; } spSet('client',v); spMsg(''); spView(); };
$('spChange').onclick=()=>{ spSet('client',''); spLogout(); };
$('spLoginBtn').onclick=async()=>{ if(!spWeb()){ spView(); return; } location.href=await spAuthUrl(); };
$('spOut').onclick=()=>spLogout('Abgemeldet.');
$('spGo').onclick=spSearch; $('spQ').onkeydown=e=>{ if(e.key==='Enter') spSearch(); }; $('spMine').onclick=spMine;
$('spList').onclick=e=>{ const el=e.target.closest('.spi'); if(!el) return; if(el.dataset.u) spPlay({context_uri:el.dataset.u}); else spPlay({uris:spTracks.map(t=>t.uri),offset:{position:+el.dataset.i}}); };
$('spPP').onclick=()=>spPlayer&&spPlayer.togglePlay(); $('spPrev').onclick=()=>spPlayer&&spPlayer.previousTrack(); $('spNext').onclick=()=>spPlayer&&spPlayer.nextTrack();
$('spVol').oninput=()=>spPlayer&&spPlayer.setVolume(+$('spVol').value/100);
$('streamBtn').addEventListener('click',spStart);
/* Rückkehr von der Spotify-Anmeldung: Code gegen Zugang tauschen, Adresse aufräumen, Player öffnen */
(async()=>{ spView(); const p=new URLSearchParams(location.search), code=p.get('code'), err=p.get('error'); if(!code&&!err) return;
  history.replaceState(null,'',location.pathname); $('streamBtn').click();
  if(err||p.get('state')!==spGet('state')){ spMsg(err==='access_denied'?'Anmeldung abgebrochen.':'Anmeldung fehlgeschlagen'+(err?': '+err:'.')); return; }
  try{ await spTokenReq({grant_type:'authorization_code',code,redirect_uri:spRedirect(),code_verifier:spGet('verifier')}); spSet('verifier',''); spSet('state',''); spView(); spStart(); }
  catch(e){ spMsg('Anmeldung fehlgeschlagen: '+e.message); } })();
