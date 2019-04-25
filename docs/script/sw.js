
self.addEventListener('install', function(e){
	console.log('Installed:',e);
});

self.addEventListener('activate', function(e){
	console.log('Activated:',e);
});

self.addEventListener('fetch',function(e){});

