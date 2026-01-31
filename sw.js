/**
 * Portfolio Demo System - Service Worker
 * Handles caching strategies for optimal performance
 */

const CACHE_NAME = 'portfolio-demo-v1.0.0';
const STATIC_CACHE = 'portfolio-static-v1.0.0';
const DYNAMIC_CACHE = 'portfolio-dynamic-v1.0.0';
const IMAGE_CACHE = 'portfolio-images-v1.0.0';

// Resources to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/css/gallery.css',
    '/assets/css/performance.css',
    '/assets/js/main.js',
    '/assets/js/performance.js',
    '/assets/images/placeholder.jpg'
];

// Resources to cache on first request
const DYNAMIC_ASSETS = [
    '/assets/css/navigation.css',
    '/assets/css/accessibility.css',
    '/assets/js/demo-loader.js',
    '/assets/js/navigation.js',
    '/assets/js/accessibility.js',
    '/assets/js/file-operations.js'
];

// Image resources (cached with different strategy)
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'];

/**
 * Service Worker Installation
 */
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            }),
            
            // Pre-cache critical demo assets
            caches.open(DYNAMIC_CACHE).then((cache) => {
                console.log('Pre-caching dynamic assets...');
                return cache.addAll([
                    '/demos/acai-dany/index.html',
                    '/demos/barbearia-raimundos/index.html',
                    '/demos/financas-pessoais/index.html',
                    '/demos/whatsapp-bot-ai/index.html',
                    '/demos/landpage-divulga/index.html'
                ].filter(url => STATIC_ASSETS.indexOf(url) === -1));
            })
        ]).then(() => {
            console.log('Service Worker installed successfully');
            // Force activation of new service worker
            return self.skipWaiting();
        })
    );
});

/**
 * Service Worker Activation
 */
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            cacheName !== IMAGE_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Take control of all clients
            self.clients.claim()
        ]).then(() => {
            console.log('Service Worker activated successfully');
        })
    );
});

/**
 * Fetch Event Handler
 */
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip cross-origin requests (except for known CDNs)
    if (url.origin !== location.origin && !isTrustedOrigin(url.origin)) {
        return;
    }
    
    // Handle different types of requests
    if (isImageRequest(request)) {
        event.respondWith(handleImageRequest(request));
    } else if (isStaticAsset(request)) {
        event.respondWith(handleStaticAsset(request));
    } else if (isDemoRequest(request)) {
        event.respondWith(handleDemoRequest(request));
    } else {
        event.respondWith(handleDynamicRequest(request));
    }
});

/**
 * Handle image requests with cache-first strategy
 */
async function handleImageRequest(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Fetch from network
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(IMAGE_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('Failed to handle image request:', error);
        
        // Return placeholder image on error
        const cache = await caches.open(STATIC_CACHE);
        return cache.match('/assets/images/placeholder.jpg');
    }
}

/**
 * Handle static assets with cache-first strategy
 */
async function handleStaticAsset(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Fetch from network and cache
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('Failed to handle static asset:', error);
        throw error;
    }
}

/**
 * Handle demo requests with network-first strategy
 */
async function handleDemoRequest(request) {
    try {
        // Try network first for fresh content
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('Network failed for demo request:', error);
        
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page or error response
        return new Response(
            createOfflineHTML(request.url),
            {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'text/html' }
            }
        );
    }
}

/**
 * Handle dynamic requests with stale-while-revalidate strategy
 */
async function handleDynamicRequest(request) {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        // Fetch from network in background
        const networkPromise = fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        }).catch(() => {
            // Network failed, return cached version if available
            return cachedResponse;
        });
        
        // Return cached version immediately if available
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Otherwise wait for network
        return networkPromise;
        
    } catch (error) {
        console.error('Failed to handle dynamic request:', error);
        throw error;
    }
}

/**
 * Check if request is for an image
 */
function isImageRequest(request) {
    const url = new URL(request.url);
    return IMAGE_EXTENSIONS.some(ext => url.pathname.toLowerCase().endsWith(ext));
}

/**
 * Check if request is for a static asset
 */
function isStaticAsset(request) {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase();
    
    return pathname.includes('/assets/css/') ||
           pathname.includes('/assets/js/') ||
           pathname.endsWith('.css') ||
           pathname.endsWith('.js') ||
           pathname === '/' ||
           pathname === '/index.html';
}

/**
 * Check if request is for a demo
 */
function isDemoRequest(request) {
    const url = new URL(request.url);
    return url.pathname.includes('/demos/');
}

/**
 * Check if origin is trusted
 */
function isTrustedOrigin(origin) {
    const trustedOrigins = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdn.jsdelivr.net'
    ];
    
    return trustedOrigins.includes(origin);
}

/**
 * Create offline HTML page
 */
function createOfflineHTML(requestedUrl) {
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - Portfolio Demo</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    background: #f8fafc;
                    color: #1e293b;
                }
                .offline-container {
                    text-align: center;
                    max-width: 400px;
                    padding: 2rem;
                }
                .offline-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                h1 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: #0f172a;
                }
                p {
                    color: #64748b;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
                .retry-btn {
                    background: #2563eb;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .retry-btn:hover {
                    background: #1d4ed8;
                }
            </style>
        </head>
        <body>
            <div class="offline-container">
                <div class="offline-icon">📡</div>
                <h1>Você está offline</h1>
                <p>Não foi possível carregar o conteúdo solicitado. Verifique sua conexão com a internet e tente novamente.</p>
                <button class="retry-btn" onclick="window.location.reload()">Tentar Novamente</button>
            </div>
        </body>
        </html>
    `;
}

/**
 * Background Sync for failed requests
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

/**
 * Perform background sync
 */
async function doBackgroundSync() {
    try {
        // Retry failed requests stored in IndexedDB
        console.log('Performing background sync...');
        
        // This would typically involve retrying failed API calls
        // For this demo system, we'll just log the sync event
        
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

/**
 * Push notification handler
 */
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body || 'Nova atualização disponível',
            icon: '/assets/images/icon-192x192.png',
            badge: '/assets/images/badge-72x72.png',
            tag: 'portfolio-update',
            requireInteraction: false,
            actions: [
                {
                    action: 'view',
                    title: 'Ver Agora'
                },
                {
                    action: 'dismiss',
                    title: 'Dispensar'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'Portfolio Demo', options)
        );
    }
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

/**
 * Message handler for communication with main thread
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            }).then(() => {
                event.ports[0].postMessage({ success: true });
            })
        );
    }
});

console.log('Service Worker script loaded');