// This service worker intentionally caches nothing. It only exists so the
// app registers as installable; every request always goes straight to the
// network so a normal refresh (in the browser or the installed PWA) always
// reflects the latest deployed changes, with no hard-refresh/cache-clear
// needed. The activate handler also wipes out any caches a previous
// version of this file may have written on a returning user's device.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
