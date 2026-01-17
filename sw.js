const CACHE_NAME = 'rekap-azzahro-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js',
  'https://github.com/masrahmat-id/absensi-barcode-online-smp-smk-azzahro/raw/main/logo-smp-azzahro.png',
  'https://github.com/masrahmat-id/absensi-barcode-online-smp-smk-azzahro/raw/main/logo-smk-azzahro.png'
];

// Install Service Worker & Cache Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Strategi: Network First (Ambil data terbaru dari internet, jika gagal/offline baru ambil cache)
// Sangat penting untuk rekap agar data selalu sinkron
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Hapus cache lama saat ada pembaruan versi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});
