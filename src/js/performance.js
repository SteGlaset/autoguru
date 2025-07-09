// Performance monitoring script
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Monitor Core Web Vitals
        this.monitorLCP();
        this.monitorFID();
        this.monitorCLS();
        this.monitorFCP();
        this.monitorTTFB();
        
        // Monitor custom metrics
        this.monitorBundleSize();
        this.monitorImageLoadTimes();
        
        // Report metrics
        this.reportMetrics();
    }

    monitorLCP() {
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                this.metrics.lcp = entry.startTime;
                console.log('LCP:', entry.startTime);
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }

    monitorFID() {
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                this.metrics.fid = entry.processingStart - entry.startTime;
                console.log('FID:', this.metrics.fid);
            }
        }).observe({ entryTypes: ['first-input'] });
    }

    monitorCLS() {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.cls = clsValue;
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    monitorFCP() {
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                this.metrics.fcp = entry.startTime;
                console.log('FCP:', entry.startTime);
            }
        }).observe({ entryTypes: ['first-contentful-paint'] });
    }

    monitorTTFB() {
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.initiatorType === 'navigation') {
                    this.metrics.ttfb = entry.responseStart - entry.requestStart;
                    console.log('TTFB:', this.metrics.ttfb);
                }
            }
        }).observe({ entryTypes: ['navigation'] });
    }

    monitorBundleSize() {
        // Monitor JavaScript bundle size
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const url = script.src;
            if (url.includes('js/')) {
                fetch(url, { method: 'HEAD' })
                    .then(response => {
                        const size = response.headers.get('content-length');
                        if (size) {
                            console.log(`Bundle size (${url}):`, Math.round(size / 1024), 'KB');
                        }
                    })
                    .catch(err => console.log('Error measuring bundle size:', err));
            }
        });
    }

    monitorImageLoadTimes() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const startTime = performance.now();
            img.addEventListener('load', () => {
                const loadTime = performance.now() - startTime;
                console.log(`Image load time (${img.src}):`, Math.round(loadTime), 'ms');
            });
        });
    }

    reportMetrics() {
        // Report metrics after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.sendMetrics();
            }, 1000);
        });
    }

    sendMetrics() {
        // Send metrics to analytics (if configured)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metrics', {
                event_category: 'Performance',
                event_label: 'Core Web Vitals',
                value: JSON.stringify(this.metrics)
            });
        }

        // Log to console for debugging
        console.log('Performance Metrics:', this.metrics);
    }

    getMetrics() {
        return this.metrics;
    }
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
    window.performanceMonitor = new PerformanceMonitor();
}

export default PerformanceMonitor;