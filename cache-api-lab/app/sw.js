const filesToCache = [
    '/',
    'style/main.css',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
]
const cacheName = 'pages-cache-v2';

self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(caches.open(cacheName)
        .then(cache => {
            return cache.addAll(filesToCache)
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
    const cacheWhiteList = [cacheName]

    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.map(cacheNam => {
                if (cacheWhiteList.indexOf(cacheNam) === -1)
                    return caches.delete(cacheNam);
            })
        );
    }));
});

self.addEventListener('fetch', event => {
    console.log('Fetch event for: ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if(response) {
                    console.log('Found ', event.request.url, ' in chache');
                    return response;
                }
                console.log("Network request for ", event.request.url);
                return fetch(event.request)
                    .then(response => {
                        if(response.status === 404) {
                            return caches.match('pages/404.html')
                        }
                        return caches.open(cacheName)
                            .then(cache => {
                                cache.put(event.request.url, response.clone());
                                return response;
                            }
                        );
                    });
            }).catch(err => {
                return caches.match('pages/offline.html')
            })

    );
});