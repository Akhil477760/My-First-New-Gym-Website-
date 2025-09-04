// Animation utilities and effects
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupHeroAnimations();
    }

    // Intersection Observer for scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Handle different animation types
                    const delay = entry.target.getAttribute('data-aos-delay');
                    if (delay) {
                        entry.target.style.animationDelay = `${delay}ms`;
                    }
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // Counter animation for statistics
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            countObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);

            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    setupHeroAnimations() {
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// CSS Animation Classes
const animationStyles = `
    [data-aos="fade-up"] {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    [data-aos="fade-up"].animate {
        opacity: 1;
        transform: translateY(0);
    }

    [data-aos="fade-right"] {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease-out;
    }

    [data-aos="fade-right"].animate {
        opacity: 1;
        transform: translateX(0);
    }

    [data-aos="fade-left"] {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.6s ease-out;
    }

    [data-aos="fade-left"].animate {
        opacity: 1;
        transform: translateX(0);
    }

    [data-aos="zoom-in"] {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.6s ease-out;
    }

    [data-aos="zoom-in"].animate {
        opacity: 1;
        transform: scale(1);
    }
`;

// Inject animation styles
const style = document.createElement('style');
style.textContent = animationStyles;
document.head.appendChild(style);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});// Animation utilities and effects
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupHeroAnimations();
    }

    // Intersection Observer for scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Handle different animation types
                    const delay = entry.target.getAttribute('data-aos-delay');
                    if (delay) {
                        entry.target.style.animationDelay = `${delay}ms`;
                    }
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // Counter animation for statistics
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            countObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);

            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    setupHeroAnimations() {
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// CSS Animation Classes
const animationStyles = `
    [data-aos="fade-up"] {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    [data-aos="fade-up"].animate {
        opacity: 1;
        transform: translateY(0);
    }

    [data-aos="fade-right"] {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease-out;
    }

    [data-aos="fade-right"].animate {
        opacity: 1;
        transform: translateX(0);
    }

    [data-aos="fade-left"] {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.6s ease-out;
    }

    [data-aos="fade-left"].animate {
        opacity: 1;
        transform: translateX(0);
    }

    [data-aos="zoom-in"] {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.6s ease-out;
    }

    [data-aos="zoom-in"].animate {
        opacity: 1;
        transform: scale(1);
    }
`;

// Inject animation styles
const style = document.createElement('style');
style.textContent = animationStyles;
document.head.appendChild(style);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});