/* HEX 3072: PWA somente com tabuleiros de 7 e 19 casas. */
const CACHE='hex-3072-clean-v1';
const ASSETS=['./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./leaderboard.js','./leaderboard-config.js'];

self.addEventListener('install',event=>{
  // Ignora cópias antigas do HTML e das dependências na instalação.
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(ASSETS.map(path=>new Request(path,{cache:'reload'}))))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys
        .filter(key=>/^(hex-19683-static-|hex-24576-static-|hex-3072-clean-)/.test(key)&&key!==CACHE)
        .map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const req=event.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    // Também para ?size=7: sempre prioriza HTML atualizado da rede.
    // A mesma versão única do jogo é usada em ambos os tamanhos.
    event.respondWith(
      fetch(req,{cache:'no-store'})
        .then(response=>{
          if(response.ok){
            const copy=response.clone();
            event.waitUntil(caches.open(CACHE).then(cache=>cache.put('./index.html',copy)));
          }
          return response;
        })
        .catch(()=>caches.open(CACHE).then(cache=>cache.match('./index.html')))
    );
    return;
  }
  event.respondWith(
    caches.open(CACHE).then(cache=>cache.match(req).then(cached=>cached||fetch(req).then(response=>{
      if(response.ok){
        const copy=response.clone();
        event.waitUntil(cache.put(req,copy));
      }
      return response;
    })))
  );
});
