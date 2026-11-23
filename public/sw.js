const CACHE_NAME = "edupulse-shell-v5";
const OFFLINE_URL = "/offline-404.html";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([OFFLINE_URL]))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // For page navigations (opening app, refreshing):
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(OFFLINE_URL);
        return (
          cached ||
          new Response(
            `<!DOCTYPE html><html><head><title>404</title></head><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;flex-direction:column;"><h1>404</h1><h2>Oops, This Page Not Found!</h2><p>No internet connection</p></body></html>`,
            {
              status: 404,
              headers: { "Content-Type": "text/html" },
            }
          )
        );
      })
    );
    return;
  }

  // For static assets:
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (
          response &&
          response.status === 200 &&
          event.request.url.startsWith("http") &&
          !event.request.url.includes("chrome-extension")
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        return new Response("", { status: 404, statusText: "Offline" });
      })
  );
});
