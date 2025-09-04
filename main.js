// Main application controller
class GymWebsite {
    constructor() {
        this.isLoaded = false;
        this.init();
    }

    async init() {
        try {
            await this.waitForDOM();
            this.setupEventListeners();
            this.setupLazyLoading();
            this.setupPerformanceOptimizations();
            this.isLoaded = true;
            this.showLoadingComplete();
        } catch (error) {
            console.error('Error initializing website:', error);
        }
    }

    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    setupEventListeners() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.getAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup efficient scroll handling
        this.setupThrottledScrollHandling();
    }

    preloadCriticalResources() {
        const criticalImages = [
            'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupThrottledScrollHandling() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    onScroll() {
        const scrollY = window.scrollY;
        
        // Update scroll-based effects
        this.updateScrollProgress(scrollY);
        this.updateParallaxElements(scrollY);
    }

    updateScrollProgress(scrollY) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPercent = (scrollY / documentHeight) * 100;
        
        // Update scroll indicator if it exists
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.width = `${scrollPercent}%`;
        }
    }

    updateParallaxElements(scrollY) {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    handleResize() {
        // Recalculate layouts if necessary
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && window.innerWidth < 768) {
            heroStats.style.position = 'static';
            heroStats.style.transform = 'none';
        }
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    handleKeyboardNavigation(e) {
        // Handle escape key to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }

        // Handle tab navigation for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    }

    showLoadingComplete() {
        // Add loaded class to body for any final animations
        document.body.classList.add('loaded');
        
        // Log successful initialization
        console.log('🏋️ FitCore Gym website loaded successfully!');
    }

    // Public methods for external use
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        return currentSection;
    }
}

// Initialize the main application
document.addEventListener('DOMContentLoaded', () => {
    window.gymWebsite = new GymWebsite();
});

// Global utility functions
window.utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatPhoneNumber: (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phoneNumberString;
    }
};