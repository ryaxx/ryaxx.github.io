document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavbar();
    initSmoothScroll();
    initActiveNavHighlight();
    initMobileMenu();
    initScrollReveal();
    initTypingAnimation();
    initCardTilt();
    initMagneticButtons();
    initParallaxShapes();
    initStatsCounter();
    initHeroAnimation();
});

/**
 * 1. Mouse Spotlight / Cursor Glow
 */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow) return;

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

/**
 * 2. Navbar Scroll Effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on load
}

/**
 * 3. Smooth Scroll Navigation
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('.nav-link, .mobile-link');
    const mobileMenu = document.getElementById('mobile-menu');
    const navToggle = document.getElementById('nav-toggle');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            // Smooth scroll
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

/**
 * 4. Active Nav Link Highlighting
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * 5. Mobile Menu Toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!navToggle || !mobileMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * 6. Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 7. Typing Animation
 */
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    const strings = ['Computer Engineer', 'Software Developer', 'Unity Developer', 'Mobile App Developer', 'UI/UX Enthusiast'];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentString = strings[stringIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 50;

        if (!isDeleting && charIndex === currentString.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % strings.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/**
 * 8. Card Tilt Effect
 */
function initCardTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    if (tiltCards.length === 0) return;

    tiltCards.forEach(card => {
        let requestId = null;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const maxTilt = 5;
            const rotateX = -((y - centerY) / centerY) * maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            if (requestId) cancelAnimationFrame(requestId);

            requestId = requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'none';
            });
        });

        card.addEventListener('mouseleave', () => {
            if (requestId) cancelAnimationFrame(requestId);
            
            requestId = requestAnimationFrame(() => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease';
            });
        });
    });
}

/**
 * 9. Magnetic Button Effect
 */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    if (magneticBtns.length === 0) return;

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const maxOffset = 5;
            const offsetX = (x / (rect.width / 2)) * maxOffset;
            const offsetY = (y / (rect.height / 2)) * maxOffset;

            btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            btn.style.transition = 'none';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.transition = 'transform 0.3s ease';
        });
    });
}

/**
 * 10. Parallax Floating Shapes
 */
function initParallaxShapes() {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    if (shapes.length === 0) return;

    // Assign random speeds to shapes
    shapes.forEach(shape => {
        shape.dataset.speed = (Math.random() * (0.05 - 0.02) + 0.02).toFixed(3);
    });

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                shapes.forEach(shape => {
                    const speed = parseFloat(shape.dataset.speed);
                    const yPos = scrollY * speed;
                    shape.style.transform = `translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * 11. Stats Counter Animation
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const easeOutQuad = t => t * (2 - t);
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const targetText = obj.getAttribute('data-target');
        const hasPlus = targetText.includes('+');
        const endValue = parseFloat(end);

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const currentValue = start + (endValue - start) * easeOutQuad(progress);
            
            if (Number.isInteger(endValue)) {
                obj.innerHTML = Math.floor(currentValue) + (hasPlus ? '+' : '');
            } else {
                obj.innerHTML = currentValue.toFixed(1) + (hasPlus ? '+' : '');
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = targetText;
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetText = entry.target.getAttribute('data-target');
                const numericTarget = targetText.replace(/[^0-9.]/g, '');
                
                if (numericTarget) {
                    animateValue(entry.target, 0, numericTarget, 2000);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

/**
 * 12. Hero Entry Animation
 */
function initHeroAnimation() {
    const heroElements = [
        { selector: '.hero-greeting', delay: 200 },
        { selector: '.hero-title', delay: 400 },
        { selector: '.hero-subtitle', delay: 600 },
        { selector: '.hero-description', delay: 800 },
        { selector: '.hero-buttons', delay: 1000 }
    ];

    heroElements.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, item.delay);
        }
    });
}
