let cacheName = 'weather-app'; 
let filesToCache = [
'/',    
'/index.html',    
'/css/main.css',  
'/js/main.js',
'/images/icon1.png',
'/images/icon2.png',
'/images/bg.jpg',
'/images/unknown.png'];  
self.addEventListener('install', function(e) { 
    e.waitUntil(
    caches.open(cacheName).then(function(cache) { 
    return cache.addAll(filesToCache);   
    })    
    );  
}); 

/* Serve cached content when offline */ 
self.addEventListener('fetch', function(e) {  
    e.respondWith(      caches.match(e.request).then(function(response) {  
    return response || fetch(e.request);
    })   
    );  
});