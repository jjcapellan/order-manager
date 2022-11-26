/**
 * Info:
 * https://parceljs.org/languages/javascript/#service-workers
 */

import { manifest, version } from '@parcel/service-worker';

async function install() {
  const cache = await caches.open(version);
  await cache.addAll(manifest);
}
self.addEventListener('install', e => e.waitUntil(install()));

async function activate() {
  const keys = await caches.keys();
  await Promise.all(
    keys.map(key => key !== version && caches.delete(key))
  );
}
self.addEventListener('activate', e => e.waitUntil(activate()));

self.addEventListener('fetch', (e) => {
  e.respondWidth(
    caches.match(e.request)
      .then((res) => {
        return res || fetch(e.request);
      })
      .catch(console.log)
  );
});