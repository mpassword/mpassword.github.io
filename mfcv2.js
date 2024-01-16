self.addEventListener("install", e => {
    e.waitUntil(
      caches.open("static").then(cache => {
        return cache.addAll(['./', './logo.png', './black.css','./app.js']);
      })
    );
  });
  

  self.addEventListener("fetch", e => {
    //console.log(`intercepting fetch Request for: ${e.request.url}`);
  
    e.respondWith(
      caches.match(e.request).then(res => {
        return res || fetch(e.request);
      })
    );
  });