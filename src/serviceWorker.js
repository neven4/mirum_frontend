export function register(config) {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

			navigator.serviceWorker.register(swUrl)		
		})
	}
}

const urlsToCache = [
	'/',
	'/static'
];

window.addEventListener('install', function(event) {
	event.waitUntil(
		window.caches.open("mirum-cache")
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
	);
});

window.addEventListener('fetch', function(event) {
	const request = event.request;
	// check if request
	// if (request.url.indexOf('firebasestorage.googleapis.com') > -1) {
	  // contentful asset detected
		event.respondWith(
			window.caches.match(request).then(function(response) {
				return response || fetch(request)
				// .then(function(response) {
				// 	window.caches.open("mirum-cache").then(function(cache) {
				// 		cache.put(event.request, response);
				// 	});
				// })
				// .catch(function() {
				// 	window.caches.match(event.request).then(function(response) {
				// 		return response;
				// 	}
				// )});
			})
		);
});
