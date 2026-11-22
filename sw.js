/* Paartanz-Simulator ohne Internet.
   Beim Installieren und bei jedem Laden der Seite mit Internet werden ALLE Dateien, die die Seite einbindet (Skripte mit ?v=…,
   CSS, Bibliotheken, Icons, Manifest), auf einmal gespeichert. So ist die App danach vollständig offline nutzbar, auch für
   Tänze und Figuren, die man noch nie geöffnet hatte.
   Die Seite selbst wird immer frisch geholt (sonst aus dem Speicher), alle anderen Dateien kommen aus dem Speicher.
   Alte Versionen (andere ?v=…) werden aufgeräumt. */
const CACHE='tanzsim-1';
const SEITE='tanzsimulator.html', FEST=['index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
/* Alle Dateien, die eine Fassung der Seite einbindet (auch von den Tests genutzt) */
const dateienAus=html=>[...new Set([...html.matchAll(/(?:src|href)="([^"#:]+\.(?:js|css|png|webmanifest)(?:\?v=\d+)?)"/g)].map(m=>m[1]))];
async function vorladen(html){
  const c=await caches.open(CACHE), liste=[...dateienAus(html),...FEST];
  await Promise.all(liste.map(async u=>{ if(await c.match(u)) return; try{ const r=await fetch(u); if(r.ok) await c.put(u,r); }catch(e){} }));
  await aufraeumen();
}
async function aufraeumen(){ const c=await caches.open(CACHE), keys=await c.keys(), neu={};
  for(const k of keys){ const u=new URL(k.url), v=+(u.searchParams.get('v')||0); if(v>(neu[u.pathname]||0)) neu[u.pathname]=v; }
  for(const k of keys){ const u=new URL(k.url), v=+(u.searchParams.get('v')||0); if(v&&v<neu[u.pathname]) await c.delete(k); } }
self.addEventListener('install',e=>{ self.skipWaiting();
  e.waitUntil((async()=>{ try{ const r=await fetch(SEITE,{cache:'no-store'}); if(r.ok){ const html=await r.clone().text(); await (await caches.open(CACHE)).put(SEITE,r); await vorladen(html); } }catch(e){} })()); });
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==location.origin) return;
  const put=res=>{ if(res&&res.ok){ const c=res.clone(); caches.open(CACHE).then(k=>k.put(req,c)); } return res; };
  if(req.mode==='navigate'||/\.html$|\/$/.test(url.pathname))
    e.respondWith(fetch(req).then(res=>{ put(res); if(res.ok&&/tanzsimulator\.html$/.test(url.pathname)) res.clone().text().then(vorladen).catch(()=>{}); return res; })
      .catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match(SEITE))));
  else e.respondWith(caches.match(req).then(r=>r||fetch(req).then(put).catch(()=>caches.match(req,{ignoreSearch:true}))));
});
self.addEventListener('message',e=>{ if(e.data==='aufraeumen') e.waitUntil(aufraeumen()); });
