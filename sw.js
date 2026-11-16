/* Paartanz-Simulator ohne Internet: Die Seite selbst wird immer frisch geholt (sonst aus dem Speicher),
   alle anderen Dateien kommen aus dem Speicher und werden beim ersten Abruf dort abgelegt.
   Skripte tragen eine Versionsnummer (?v=…), neue Versionen werden deshalb von selbst neu geladen. */
const CACHE='tanzsim-1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==location.origin) return;
  const put=res=>{ if(res&&res.ok){ const c=res.clone(); caches.open(CACHE).then(k=>k.put(req,c)); } return res; };
  if(req.mode==='navigate'||/\.html$|\/$/.test(url.pathname))
    e.respondWith(fetch(req).then(put).catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('tanzsimulator.html'))));
  else e.respondWith(caches.match(req).then(r=>r||fetch(req).then(put).catch(()=>caches.match(req,{ignoreSearch:true}))));
});
/* alte Fassungen der Skripte aufräumen: nur die zuletzt geladene Versionsnummer je Datei behalten */
self.addEventListener('message',async e=>{ if(e.data!=='aufraeumen') return; const c=await caches.open(CACHE), keys=await c.keys(), neu={};
  for(const k of keys){ const u=new URL(k.url), v=+(u.searchParams.get('v')||0); if(v>(neu[u.pathname]||0)) neu[u.pathname]=v; }
  for(const k of keys){ const u=new URL(k.url), v=+(u.searchParams.get('v')||0); if(v&&v<neu[u.pathname]) c.delete(k); } });
