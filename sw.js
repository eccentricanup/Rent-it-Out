// Rent-it-out service worker: network first, so new versions always load when online; cached copy when offline.
const C="rio-v1",H=["https://www.gstatic.com/firebasejs/","https://cdn.jsdelivr.net/","https://cdnjs.cloudflare.com/"];
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request,u=r.url;
 if(r.method!=="GET")return;
 if(!(u.startsWith(self.location.origin)||H.some(h=>u.startsWith(h))))return;
 e.respondWith(fetch(r).then(x=>{if(x&&(x.ok||x.type==="opaque")){const c=x.clone();caches.open(C).then(k=>k.put(r,c))}return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()))))});
