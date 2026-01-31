/**
 * Portfolio Demo System - Performance Optimizations
 * Handles performance monitoring, optimization, and resource management
 */

/**
 * Performance Monitor Class
 * Tracks and optimizes performance metrics for landing page integration
 */
class PerformanceMonitor {
    constructor(options = {}) {
        this.options = {
            // Performance thresholds (in milliseconds)
            loadTimeThreshold: options.loadTimeThreshold || 3000,
            renderTimeThreshold: options.renderTimeThreshold || 1000,
            
            // Resource optimization
            enableResourceHints: options.enableResourceHints !== false,
            enableLazyLoading: options.enableLazyLoading !== false,
            enableImageOptimization: options.enableImageOptimization !== false,
            
            // Monitoring
            enableMetrics: options.enableMetrics !== false,
            reportInterval: options.reportInterval || 30000, // 30 seconds
            
            // Callbacks
            onPerformanceIssue: options.onPerformanceIssue || null,
            onMetricsReport: options.onMetricsReport || null
        };
        
        this.metrics = {
            loadStart: performance.now(),
            loadEnd: null,
            renderStart: null,
            renderEnd: null,
            resourceCount: 0,
            errorCount: 0,
            memoryUsage: null
        };
        
        this.observers = [];
        this.resourceHints = new Set();
        
        this.init();
    }

    /**
     * Initialize performance monitoring
     */
    init() {
        // Setup performance observers
        this.setupPerformanceObservers();
        
        // Setup resource optimization
        if (this.options.enableResourceHints) {
            this.setupResourceHints();
        }
        
        if (this.options.enableLazyLoading) {
            this.setupLazyLoading();
        }
        
        if (this.options.enableImageOptimization) {
            this.setupImageOptimization();
        }
        
        // Setup metrics reporting
        if (this.options.enableMetrics) {
            this.setupMetricsReporting();
        }
        
        // Monitor page load completion
        this.monitorPageLoad();
        
        console.log('Performance monitor initialized');
    }

    /**
     * Setup performance observers
     */
    setupPerformanceObservers() {
        // Navigation timing
        if ('PerformanceObserver' in window) {
            try {
                const navObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.entryType === 'navigation') {
                            this.processNavigationEntry(entry);
                        }
                    });
                });
                
                navObserver.observe({ entryTypes: ['navigation'] });
                this.observers.push(navObserver);
            } catch (error) {
                console.warn('Navigation observer not supported:', error);
            }
            
            // Resource timing
            try {
                const resourceObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.entryType === 'resource') {
                            this.processResourceEntry(entry);
                        }
                    });
                });
                
                resourceObserver.observe({ entryTypes: ['resource'] });
                this.observers.push(resourceObserver);
            } catch (error) {
                console.warn('Resource observer not supported:', error);
            }
            
            // Largest Contentful Paint
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.largestContentfulPaint = lastEntry.startTime;
                    
                    if (lastEntry.startTime > this.options.loadTimeThreshold) {
                        this.reportPerformanceIssue('lcp', lastEntry.startTime);
                    }
                });
                
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(lcpObserver);
            } catch (error) {
                console.warn('LCP observer not supported:', error);
            }
            
            // First Input Delay
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
                    });
                });
                
                fidObserver.observe({ entryTypes: ['first-input'] });
                this.observers.push(fidObserver);
            } catch (error) {
                console.warn('FID observer not supported:', error);
            }
        }
    }

    /**
     * Process navigation timing entry
     */
    processNavigationEntry(entry) {
        this.metrics.navigationTiming = {
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            loadComplete: entry.loadEventEnd - entry.loadEventStart,
            domInteractive: entry.domInteractive - entry.navigationStart,
            firstPaint: entry.responseEnd - entry.requestStart
        };
        
        // Check for performance issues
        if (this.metrics.navigationTiming.loadComplete > this.options.loadTimeThreshold) {
            this.reportPerformanceIssue('load-time', this.metrics.navigationTiming.loadComplete);
        }
    }

    /**
     * Process resource timing entry
     */
    processResourceEntry(entry) {
        this.metrics.resourceCount++;
        
        // Track slow resources
        const loadTime = entry.responseEnd - entry.requestStart;
        if (loadTime > 2000) { // 2 seconds threshold for individual resources
            this.reportPerformanceIssue('slow-resource', loadTime, entry.name);
        }
        
        // Track failed resources
        if (entry.transferSize === 0 && entry.decodedBodySize === 0) {
            this.metrics.errorCount++;
            this.reportPerformanceIssue('resource-error', 0, entry.name);
        }
    }

    /**
     * Setup resource hints for better performance
     */
    setupResourceHints() {
        const head = document.head;
        
        // DNS prefetch for external domains
        const externalDomains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com',
            'cdn.jsdelivr.net'
        ];
        
        externalDomains.forEach(domain => {
            if (!this.resourceHints.has(`dns-${domain}`)) {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = `//${domain}`;
                head.appendChild(link);
                this.resourceHints.add(`dns-${domain}`);
            }
        });
        
        // Preconnect to critical domains
        const criticalDomains = ['fonts.googleapis.com'];
        criticalDomains.forEach(domain => {
            if (!this.resourceHints.has(`preconnect-${domain}`)) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = `https://${domain}`;
                link.crossOrigin = 'anonymous';
                head.appendChild(link);
                this.resourceHints.add(`preconnect-${domain}`);
            }
        });
    }

    /**
     * Preload critical resources
     */
    preloadCriticalResources(resources) {
        const head = document.head;
        
        resources.forEach(resource => {
            if (!this.resourceHints.has(`preload-${resource.href}`)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource.href;
                link.as = resource.as || 'fetch';
                if (resource.type) link.type = resource.type;
                if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
                
                head.appendChild(link);
                this.resourceHints.add(`preload-${resource.href}`);
            }
        });
    }

    /**
     * Setup lazy loading for images and iframes
     */
    setupLazyLoading() {
        // Use Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        if (element.dataset.src) {
                            element.src = element.dataset.src;
                            element.removeAttribute('data-src');
                        }
                        
                        if (element.dataset.srcset) {
                            element.srcset = element.dataset.srcset;
                            element.removeAttribute('data-srcset');
                        }
                        
                        element.classList.remove('lazy-load');
                        lazyObserver.unobserve(element);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            // Observe existing lazy elements
            document.querySelectorAll('.lazy-load').forEach(el => {
                lazyObserver.observe(el);
            });
            
            // Observe new lazy elements
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            if (node.classList && node.classList.contains('lazy-load')) {
                                lazyObserver.observe(node);
                            }
                            
                            // Check child elements
                            const lazyChildren = node.querySelectorAll && node.querySelectorAll('.lazy-load');
                            if (lazyChildren) {
                                lazyChildren.forEach(child => lazyObserver.observe(child));
                            }
                        }
                    });
                });
            });
            
            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            this.observers.push(lazyObserver, mutationObserver);
        }
    }

    /**
     * Setup image optimization
     */
    setupImageOptimization() {
        // Optimize images based on device capabilities
        const optimizeImage = (img) => {
            // Check if WebP is supported
            if (this.supportsWebP() && !img.src.includes('.webp')) {
                const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                
                // Test if WebP version exists
                const testImg = new Image();
                testImg.onload = () => {
                    img.src = webpSrc;
                };
                testImg.onerror = () => {
                    // Keep original format
                };
                testImg.src = webpSrc;
            }
            
            // Add loading="lazy" for native lazy loading
            if ('loading' in HTMLImageElement.prototype && !img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
        };
        
        // Optimize existing images
        document.querySelectorAll('img').forEach(optimizeImage);
        
        // Optimize new images
        const imageObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.tagName === 'IMG') {
                            optimizeImage(node);
                        }
                        
                        const images = node.querySelectorAll && node.querySelectorAll('img');
                        if (images) {
                            images.forEach(optimizeImage);
                        }
                    }
                });
            });
        });
        
        imageObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        this.observers.push(imageObserver);
    }

    /**
     * Check WebP support
     */
    supportsWebP() {
        if (this._webpSupport !== undefined) {
            return this._webpSupport;
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        this._webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        return this._webpSupport;
    }

    /**
     * Monitor page load completion
     */
    monitorPageLoad() {
        const checkLoadComplete = () => {
            if (document.readyState === 'complete') {
                this.metrics.loadEnd = performance.now();
                this.metrics.totalLoadTime = this.metrics.loadEnd - this.metrics.loadStart;
                
                // Check memory usage
                if ('memory' in performance) {
                    this.metrics.memoryUsage = {
                        used: performance.memory.usedJSHeapSize,
                        total: performance.memory.totalJSHeapSize,
                        limit: performance.memory.jsHeapSizeLimit
                    };
                }
                
                // Report load completion
                this.reportLoadComplete();
                
                return;
            }
            
            // Check again in 100ms
            setTimeout(checkLoadComplete, 100);
        };
        
        if (document.readyState === 'complete') {
            checkLoadComplete();
        } else {
            window.addEventListener('load', checkLoadComplete);
        }
    }

    /**
     * Setup metrics reporting
     */
    setupMetricsReporting() {
        setInterval(() => {
            this.reportMetrics();
        }, this.options.reportInterval);
        
        // Report on page unload
        window.addEventListener('beforeunload', () => {
            this.reportMetrics(true);
        });
    }

    /**
     * Report performance issue
     */
    reportPerformanceIssue(type, value, resource = null) {
        const issue = {
            type,
            value,
            resource,
            timestamp: Date.now(),
            url: window.location.href
        };
        
        console.warn('Performance issue detected:', issue);
        
        if (this.options.onPerformanceIssue) {
            this.options.onPerformanceIssue(issue);
        }
    }

    /**
     * Report load completion
     */
    reportLoadComplete() {
        const report = {
            totalLoadTime: this.metrics.totalLoadTime,
            resourceCount: this.metrics.resourceCount,
            errorCount: this.metrics.errorCount,
            memoryUsage: this.metrics.memoryUsage,
            navigationTiming: this.metrics.navigationTiming,
            largestContentfulPaint: this.metrics.largestContentfulPaint,
            firstInputDelay: this.metrics.firstInputDelay
        };
        
        console.log('Page load completed:', report);
        
        // Check if load time exceeds threshold
        if (this.metrics.totalLoadTime > this.options.loadTimeThreshold) {
            this.reportPerformanceIssue('total-load-time', this.metrics.totalLoadTime);
        }
    }

    /**
     * Report current metrics
     */
    reportMetrics(isFinal = false) {
        const currentMetrics = {
            ...this.metrics,
            timestamp: Date.now(),
            url: window.location.href,
            isFinal
        };
        
        // Add current memory usage if available
        if ('memory' in performance) {
            currentMetrics.currentMemoryUsage = {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
        }
        
        if (this.options.onMetricsReport) {
            this.options.onMetricsReport(currentMetrics);
        }
        
        if (isFinal) {
            console.log('Final performance metrics:', currentMetrics);
        }
    }

    /**
     * Optimize bundle loading
     */
    optimizeBundleLoading() {
        // Split critical and non-critical CSS
        const criticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-critical]');
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        
        // Load non-critical CSS asynchronously
        nonCriticalCSS.forEach(link => {
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
        });
        
        // Defer non-critical JavaScript
        const nonCriticalJS = document.querySelectorAll('script[data-defer]');
        nonCriticalJS.forEach(script => {
            script.defer = true;
        });
    }

    /**
     * Minimize main thread blocking
     */
    minimizeMainThreadBlocking() {
        // Use requestIdleCallback for non-critical operations
        const deferOperation = (callback) => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(callback, { timeout: 5000 });
            } else {
                setTimeout(callback, 1);
            }
        };
        
        return deferOperation;
    }

    /**
     * Get performance recommendations
     */
    getPerformanceRecommendations() {
        const recommendations = [];
        
        if (this.metrics.totalLoadTime > this.options.loadTimeThreshold) {
            recommendations.push({
                type: 'load-time',
                message: 'Page load time exceeds threshold',
                suggestion: 'Consider optimizing images, reducing bundle size, or implementing code splitting'
            });
        }
        
        if (this.metrics.resourceCount > 50) {
            recommendations.push({
                type: 'resource-count',
                message: 'High number of resources loaded',
                suggestion: 'Consider bundling resources or implementing resource prioritization'
            });
        }
        
        if (this.metrics.errorCount > 0) {
            recommendations.push({
                type: 'resource-errors',
                message: `${this.metrics.errorCount} resources failed to load`,
                suggestion: 'Check for broken links or missing resources'
            });
        }
        
        if (this.metrics.memoryUsage && this.metrics.memoryUsage.used > 50 * 1024 * 1024) { // 50MB
            recommendations.push({
                type: 'memory-usage',
                message: 'High memory usage detected',
                suggestion: 'Consider optimizing JavaScript execution or implementing memory cleanup'
            });
        }
        
        return recommendations;
    }

    /**
     * Clean up observers and resources
     */
    destroy() {
        this.observers.forEach(observer => {
            if (observer.disconnect) {
                observer.disconnect();
            }
        });
        
        this.observers = [];
        this.resourceHints.clear();
    }
}

// Create global performance monitor instance
const performanceMonitor = new PerformanceMonitor({
    onPerformanceIssue: (issue) => {
        // Log performance issues for debugging
        console.warn('Performance issue:', issue);
    },
    onMetricsReport: (metrics) => {
        // Send metrics to analytics if needed
        if (window.gtag) {
            window.gtag('event', 'performance_metrics', {
                load_time: metrics.totalLoadTime,
                resource_count: metrics.resourceCount,
                error_count: metrics.errorCount
            });
        }
    }
});

/**
 * Enhanced Image Optimization System
 */
class ImageOptimizer {
    constructor() {
        this.webpSupport = null;
        this.avifSupport = null;
        this.lazyObserver = null;
        this.preloadedImages = new Set();
        this.imageCache = new Map();
        
        this.init();
    }

    /**
     * Initialize image optimizer
     */
    init() {
        this.detectFormatSupport();
        this.setupLazyLoading();
        this.setupImagePreloading();
        this.optimizeExistingImages();
    }

    /**
     * Detect modern image format support
     */
    async detectFormatSupport() {
        // Test WebP support
        this.webpSupport = await this.testImageFormat('data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA');
        
        // Test AVIF support
        this.avifSupport = await this.testImageFormat('data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=');
        
        console.log('Image format support:', { webp: this.webpSupport, avif: this.avifSupport });
    }

    /**
     * Test image format support
     */
    testImageFormat(dataUri) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = dataUri;
        });
    }

    /**
     * Setup lazy loading with Intersection Observer
     */
    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.loadAllImages();
            return;
        }

        this.lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.lazyObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe existing lazy images
        this.observeLazyImages();
    }

    /**
     * Observe lazy images
     */
    observeLazyImages() {
        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (!img.src || img.src === img.dataset.placeholder) {
                this.lazyObserver.observe(img);
            }
        });
    }

    /**
     * Load image with format optimization
     */
    async loadImage(img) {
        const originalSrc = img.dataset.src || img.src;
        if (!originalSrc) return;

        try {
            // Show loading state
            this.showImageLoading(img);

            // Get optimized image URL
            const optimizedSrc = await this.getOptimizedImageUrl(originalSrc);

            // Preload the image
            await this.preloadImage(optimizedSrc);

            // Update image source
            img.src = optimizedSrc;
            img.removeAttribute('data-src');
            
            // Add loaded class for animations
            img.classList.add('image-loaded');
            
            // Hide loading state
            this.hideImageLoading(img);

            console.log(`Image loaded: ${optimizedSrc}`);

        } catch (error) {
            console.error('Failed to load image:', error);
            this.showImageError(img);
        }
    }

    /**
     * Get optimized image URL based on format support
     */
    async getOptimizedImageUrl(originalSrc) {
        // Check cache first
        if (this.imageCache.has(originalSrc)) {
            return this.imageCache.get(originalSrc);
        }

        let optimizedSrc = originalSrc;

        // Try AVIF first (best compression)
        if (this.avifSupport) {
            const avifSrc = originalSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '.avif');
            if (await this.imageExists(avifSrc)) {
                optimizedSrc = avifSrc;
            }
        }

        // Try WebP if AVIF not available
        if (optimizedSrc === originalSrc && this.webpSupport) {
            const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            if (await this.imageExists(webpSrc)) {
                optimizedSrc = webpSrc;
            }
        }

        // Cache the result
        this.imageCache.set(originalSrc, optimizedSrc);
        return optimizedSrc;
    }

    /**
     * Check if image exists
     */
    imageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    /**
     * Preload image
     */
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            if (this.preloadedImages.has(src)) {
                resolve();
                return;
            }

            const img = new Image();
            img.onload = () => {
                this.preloadedImages.add(src);
                resolve();
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Show image loading state
     */
    showImageLoading(img) {
        img.classList.add('image-loading');
        
        // Add loading placeholder if not exists
        if (!img.dataset.placeholder) {
            const placeholder = this.createImagePlaceholder(img);
            img.dataset.placeholder = placeholder;
            if (!img.src) {
                img.src = placeholder;
            }
        }
    }

    /**
     * Hide image loading state
     */
    hideImageLoading(img) {
        img.classList.remove('image-loading');
    }

    /**
     * Show image error state
     */
    showImageError(img) {
        img.classList.add('image-error');
        img.src = this.createErrorPlaceholder(img);
        
        // Add retry functionality
        img.addEventListener('click', () => {
            img.classList.remove('image-error');
            this.loadImage(img);
        }, { once: true });
    }

    /**
     * Create image placeholder
     */
    createImagePlaceholder(img) {
        const width = img.offsetWidth || 300;
        const height = img.offsetHeight || 200;
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f1f5f9');
        gradient.addColorStop(1, '#e2e8f0');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add loading animation
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Carregando...', width / 2, height / 2);
        
        return canvas.toDataURL();
    }

    /**
     * Create error placeholder
     */
    createErrorPlaceholder(img) {
        const width = img.offsetWidth || 300;
        const height = img.offsetHeight || 200;
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        
        // Error background
        ctx.fillStyle = '#fef2f2';
        ctx.fillRect(0, 0, width, height);
        
        // Error border
        ctx.strokeStyle = '#fecaca';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, width - 2, height - 2);
        
        // Error text
        ctx.fillStyle = '#dc2626';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Erro ao carregar', width / 2, height / 2 - 10);
        ctx.fillText('Clique para tentar novamente', width / 2, height / 2 + 10);
        
        return canvas.toDataURL();
    }

    /**
     * Setup image preloading for critical images
     */
    setupImagePreloading() {
        // Preload critical images (above the fold)
        const criticalImages = document.querySelectorAll('img[data-critical]');
        criticalImages.forEach(img => {
            const src = img.dataset.src || img.src;
            if (src) {
                this.preloadImage(src);
            }
        });
    }

    /**
     * Optimize existing images
     */
    optimizeExistingImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for native lazy loading support
            if (!img.hasAttribute('loading') && !img.dataset.critical) {
                img.loading = 'lazy';
            }
            
            // Add responsive image attributes
            this.makeImageResponsive(img);
        });
    }

    /**
     * Make image responsive
     */
    makeImageResponsive(img) {
        if (img.hasAttribute('data-responsive')) return;
        
        const src = img.src || img.dataset.src;
        if (!src) return;
        
        // Generate srcset for different screen sizes
        const srcset = this.generateSrcSet(src);
        if (srcset) {
            img.srcset = srcset;
            img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
        }
        
        img.setAttribute('data-responsive', 'true');
    }

    /**
     * Generate srcset for responsive images
     */
    generateSrcSet(src) {
        const baseName = src.replace(/\.[^/.]+$/, '');
        const extension = src.split('.').pop();
        
        // Common responsive breakpoints
        const sizes = [320, 640, 768, 1024, 1280, 1920];
        
        return sizes.map(size => {
            return `${baseName}-${size}w.${extension} ${size}w`;
        }).join(', ');
    }

    /**
     * Load all images (fallback for older browsers)
     */
    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    /**
     * Cleanup
     */
    destroy() {
        if (this.lazyObserver) {
            this.lazyObserver.disconnect();
        }
        this.preloadedImages.clear();
        this.imageCache.clear();
    }
}

/**
 * Bundle Optimization System
 */
class BundleOptimizer {
    constructor() {
        this.criticalResources = new Set();
        this.deferredResources = new Set();
        this.loadedChunks = new Set();
        
        this.init();
    }

    /**
     * Initialize bundle optimizer
     */
    init() {
        this.identifyCriticalResources();
        this.setupCodeSplitting();
        this.optimizeResourceLoading();
        this.setupResourceHints();
    }

    /**
     * Identify critical resources
     */
    identifyCriticalResources() {
        // Critical CSS (above the fold)
        const criticalCSS = [
            'assets/css/main.css',
            'assets/css/gallery.css'
        ];
        
        // Critical JS (core functionality)
        const criticalJS = [
            'assets/js/main.js',
            'assets/js/performance.js'
        ];
        
        criticalCSS.forEach(css => this.criticalResources.add(css));
        criticalJS.forEach(js => this.criticalResources.add(js));
    }

    /**
     * Setup code splitting
     */
    setupCodeSplitting() {
        // Defer non-critical resources
        this.deferResource('assets/js/demo-loader.js');
        this.deferResource('assets/js/accessibility.js');
        this.deferResource('assets/js/navigation.js');
        this.deferResource('assets/css/accessibility.css');
        this.deferResource('assets/css/navigation.css');
    }

    /**
     * Defer resource loading
     */
    deferResource(resourcePath) {
        this.deferredResources.add(resourcePath);
        
        // Use requestIdleCallback or setTimeout for deferred loading
        const defer = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
        
        defer(() => {
            this.loadResource(resourcePath);
        });
    }

    /**
     * Load resource dynamically
     */
    async loadResource(resourcePath) {
        if (this.loadedChunks.has(resourcePath)) return;
        
        try {
            if (resourcePath.endsWith('.css')) {
                await this.loadCSS(resourcePath);
            } else if (resourcePath.endsWith('.js')) {
                await this.loadJS(resourcePath);
            }
            
            this.loadedChunks.add(resourcePath);
            console.log(`Loaded deferred resource: ${resourcePath}`);
            
        } catch (error) {
            console.error(`Failed to load resource: ${resourcePath}`, error);
        }
    }

    /**
     * Load CSS dynamically
     */
    loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            
            document.head.appendChild(link);
        });
    }

    /**
     * Load JS dynamically
     */
    loadJS(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            
            document.head.appendChild(script);
        });
    }

    /**
     * Optimize resource loading
     */
    optimizeResourceLoading() {
        // Preload critical resources
        this.criticalResources.forEach(resource => {
            this.preloadResource(resource);
        });
        
        // Setup resource prioritization
        this.setupResourcePrioritization();
    }

    /**
     * Preload critical resource
     */
    preloadResource(href) {
        const link = document.createElement('link');
        link.rel = 'preload';
        
        if (href.endsWith('.css')) {
            link.as = 'style';
        } else if (href.endsWith('.js')) {
            link.as = 'script';
        } else if (href.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
            link.as = 'image';
        }
        
        link.href = href;
        document.head.appendChild(link);
    }

    /**
     * Setup resource hints
     */
    setupResourceHints() {
        const head = document.head;
        
        // DNS prefetch for external domains
        const externalDomains = [
            'fonts.googleapis.com',
            'fonts.gstatic.com'
        ];
        
        externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            head.appendChild(link);
        });
        
        // Preconnect to critical external resources
        const preconnectDomains = ['fonts.googleapis.com'];
        preconnectDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = `https://${domain}`;
            link.crossOrigin = 'anonymous';
            head.appendChild(link);
        });
    }

    /**
     * Setup resource prioritization
     */
    setupResourcePrioritization() {
        // Mark non-critical CSS as low priority
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        nonCriticalCSS.forEach(link => {
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
        });
    }
}

/**
 * Loading State Manager
 */
class LoadingStateManager {
    constructor() {
        this.loadingStates = new Map();
        this.globalLoadingState = false;
        
        this.init();
    }

    /**
     * Initialize loading state manager
     */
    init() {
        this.createGlobalLoadingIndicator();
        this.setupLoadingObservers();
    }

    /**
     * Create global loading indicator
     */
    createGlobalLoadingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'global-loading-indicator';
        indicator.className = 'global-loading-indicator';
        indicator.innerHTML = `
            <div class="loading-bar"></div>
            <div class="loading-text">Carregando...</div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .global-loading-indicator {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: rgba(37, 99, 235, 0.1);
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .global-loading-indicator.active {
                opacity: 1;
            }
            
            .loading-bar {
                height: 100%;
                background: linear-gradient(90deg, #2563eb, #3b82f6, #2563eb);
                background-size: 200% 100%;
                animation: loading-progress 2s ease-in-out infinite;
                transform-origin: left;
                transform: scaleX(0);
                transition: transform 0.3s ease;
            }
            
            .global-loading-indicator.active .loading-bar {
                transform: scaleX(1);
            }
            
            @keyframes loading-progress {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            .loading-text {
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(37, 99, 235, 0.9);
                color: white;
                padding: 8px 16px;
                border-radius: 0 0 8px 8px;
                font-size: 12px;
                font-weight: 500;
                white-space: nowrap;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(indicator);
        
        this.globalIndicator = indicator;
    }

    /**
     * Show loading state
     */
    showLoading(key, message = 'Carregando...') {
        this.loadingStates.set(key, { active: true, message });
        this.updateGlobalState();
    }

    /**
     * Hide loading state
     */
    hideLoading(key) {
        this.loadingStates.delete(key);
        this.updateGlobalState();
    }

    /**
     * Update global loading state
     */
    updateGlobalState() {
        const hasActiveLoading = this.loadingStates.size > 0;
        
        if (hasActiveLoading !== this.globalLoadingState) {
            this.globalLoadingState = hasActiveLoading;
            
            if (hasActiveLoading) {
                this.globalIndicator.classList.add('active');
                
                // Update message with the most recent loading state
                const messages = Array.from(this.loadingStates.values()).map(state => state.message);
                const currentMessage = messages[messages.length - 1] || 'Carregando...';
                this.globalIndicator.querySelector('.loading-text').textContent = currentMessage;
                
            } else {
                this.globalIndicator.classList.remove('active');
            }
        }
    }

    /**
     * Setup loading observers
     */
    setupLoadingObservers() {
        // Observe image loading
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (!img.complete) {
                this.showLoading(`image-${index}`, 'Carregando imagens...');
                
                img.addEventListener('load', () => {
                    this.hideLoading(`image-${index}`);
                });
                
                img.addEventListener('error', () => {
                    this.hideLoading(`image-${index}`);
                });
            }
        });
        
        // Observe script loading
        this.observeScriptLoading();
        
        // Observe CSS loading
        this.observeCSSLoading();
    }

    /**
     * Observe script loading
     */
    observeScriptLoading() {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach((script, index) => {
            if (!script.hasAttribute('data-loaded')) {
                this.showLoading(`script-${index}`, 'Carregando scripts...');
                
                script.addEventListener('load', () => {
                    script.setAttribute('data-loaded', 'true');
                    this.hideLoading(`script-${index}`);
                });
                
                script.addEventListener('error', () => {
                    this.hideLoading(`script-${index}`);
                });
            }
        });
    }

    /**
     * Observe CSS loading
     */
    observeCSSLoading() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach((link, index) => {
            if (!link.hasAttribute('data-loaded')) {
                this.showLoading(`css-${index}`, 'Carregando estilos...');
                
                link.addEventListener('load', () => {
                    link.setAttribute('data-loaded', 'true');
                    this.hideLoading(`css-${index}`);
                });
                
                link.addEventListener('error', () => {
                    this.hideLoading(`css-${index}`);
                });
            }
        });
    }

    /**
     * Create component loading indicator
     */
    createComponentLoader(container, message = 'Carregando...') {
        const loader = document.createElement('div');
        loader.className = 'component-loader';
        loader.innerHTML = `
            <div class="component-loader-content">
                <div class="component-spinner"></div>
                <p class="component-loader-message">${message}</p>
            </div>
        `;
        
        // Add component loader styles if not exists
        if (!document.getElementById('component-loader-styles')) {
            const style = document.createElement('style');
            style.id = 'component-loader-styles';
            style.textContent = `
                .component-loader {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    backdrop-filter: blur(2px);
                }
                
                .component-loader-content {
                    text-align: center;
                    padding: 2rem;
                }
                
                .component-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #e2e8f0;
                    border-top: 3px solid #2563eb;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                .component-loader-message {
                    color: #64748b;
                    font-size: 14px;
                    font-weight: 500;
                    margin: 0;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.style.position = 'relative';
        container.appendChild(loader);
        
        return loader;
    }

    /**
     * Remove component loader
     */
    removeComponentLoader(container) {
        const loader = container.querySelector('.component-loader');
        if (loader) {
            loader.remove();
        }
    }
}

// Create global instances
const imageOptimizer = new ImageOptimizer();
const bundleOptimizer = new BundleOptimizer();
const loadingStateManager = new LoadingStateManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.performanceMonitor = performanceMonitor;
    window.imageOptimizer = imageOptimizer;
    window.bundleOptimizer = bundleOptimizer;
    window.loadingStateManager = loadingStateManager;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        PerformanceMonitor, 
        performanceMonitor,
        ImageOptimizer,
        imageOptimizer,
        BundleOptimizer,
        bundleOptimizer,
        LoadingStateManager,
        loadingStateManager
    };
}