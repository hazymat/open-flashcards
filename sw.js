// Retires the old Open Flashcards service worker for returning visitors: removes its caches and itself, then reloads open pages so they get the redirect.
// Only open-flashcards-* caches: this address is shared with other apps.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) { if (key.startsWith('open-flashcards-')) await caches.delete(key); }
    await self.clients.claim();
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({type: 'window'})) client.navigate(client.url).catch(() => {});
  })());
});
