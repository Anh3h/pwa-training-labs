self.addEventListener('install', event => {
    console.log("Service work is installing...");
    self.skipWaiting();
})

self.addEventListener('activate', event => {
    console.log("Service worker activating...");
})

self.addEventListener('fetch', event => {
    console.log("Fetching:", event.request.url);
})
//I see something