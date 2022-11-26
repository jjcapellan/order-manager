/**
 * Info:
 * https://parceljs.org/languages/javascript/#service-workers
 */

import { manifest, version } from '@parcel/service-worker';

async function install() {
  const cache = await caches.open(version);
  await cache.addAll(manifest);
  await cache.add('/order-manager/'); // <-- not included in manifest
}
self.addEventListener('install', e => e.waitUntil(install()));

async function activate() {
  const keys = await caches.keys();
  await Promise.all(
    keys.map(key => key !== version && caches.delete(key))
  );
}
self.addEventListener('activate', e => e.waitUntil(activate()));

/**
 * Info:
 * https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
 */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  e.respondWith(
    (async () => {
      const cache = await caches.open(version);
      const cachedResponse = await cache.match(e.request);

      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(e.request).catch(() => { console.log('Not found') });
    })()
  );
});