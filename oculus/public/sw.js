const staticCacheName = 'site-static';
const assets = [
    'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',

    '/media/PIEDISTALLO1.mp4',
    '/media/PIEDISTALLO2.mp4',
    '/media/PIEDISTALLO3.mp4',
    '/media/PIEDISTALLO4.mp4',
    '/media/wood.png',

    '/media/models/model_782628D7_7474_0C3C_41C1_B443BDCB7275/scene.glb',
    '/media/models/Skull.glb',
    '/media/models/point_84.glb',
    '/media/models/Globular_vase_with_cylindrical_neck.glb',
    '/media/models/Cross.glb',

    '/libs/basis/basis_transcoder.wasm',
    '/libs/basis/basis_transcoder.js',
    '/libs/draco/draco_decoder.wasm',
    '/libs/draco/draco_decoder.js',
    '/libs/draco/draco_wasm_wrapper.js',
    
    // '/media/Video360Final4K.mp4',
    '/media/Video360Final8K.mp4',
];

self.addEventListener('install', (event) => {

    event.waitUntil((async () => {
        const cache = await caches.open(staticCacheName);
        await cache.addAll(assets);

        console.log('install ended');
    })());
});

self.addEventListener('fetch', (event) => {
    
    event.respondWith((async () => {

        // Try to get the response from a cache.
        const cachedResponse = await caches.match(event.request);
        if(cachedResponse) {
            return cachedResponse;
        }

        // If we didn't find a match in the cache, use the network and cache the response.
        const response = await fetch(event.request);
        return response;
    })());
});