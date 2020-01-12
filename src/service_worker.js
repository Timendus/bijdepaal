self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('bijdepaal').then(function(cache) {
      return cache.addAll(
        [
          'index.html',
          'styles.css',
          'index.js'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('bijdepaal').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request);
      });
    })
  );
});
