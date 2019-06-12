const CACHE_NAME = 'restaurant-v1';
const assets = [
	'./',
	'./index.html',
	'./restaurant.html',
	'./data/restaurants.json',
	'./css/styles.css',
	'./js/main.js',
	'./js/dbhelper.js',
	'./js/restaurant_info.js',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg'
];

/**
 * Install service worker by opening a cache, and adding the necessary assets.
 */
self.addEventListener('install', function (ev) {
	ev.waitUntil(
		caches
		.open(CACHE_NAME)
		.then((cache) => {
			console.log('ServiceWorker: caching assets');
			return cache.addAll(assets);
		})
	);
});

/**
 * Delete any outdated caches.
 */
self.addEventListener('activate', function(ev) {
	ev.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') &&
						   cacheName != CACHE_NAME;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

/**
 * Respond to requests if a matching response is found, by returning the cached value.
 */
self.addEventListener('fetch', function(ev) {
	ev.respondWith(
		caches.match(ev.request)
		.then(function(response) {
			return response || fetch(ev.request);
		})
	);
});