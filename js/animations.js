// ===== Scroll Animations & Observer =====

// Observer for scroll reveal animations
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer for skill bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar-fill');
            if (fill) {
                const w = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => { fill.style.width = w; }, 200);
            }
        }
    });
}, { threshold: 0.5 });

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    
    // Initial entrance animations
    document.querySelectorAll('.animate-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + i * 150);
    });

    // Observe elements for scroll-triggered reveal
    const revealSelectors = [
        '.glass-card', '.section-label', '.section-heading', 
        '.about-heading', '.about-desc', '.about-stats', 
        '.project-item', '.tools-section', '.contact-intro', 
        '.skill-bar-fill'
    ].join(', ');
    
    document.querySelectorAll(revealSelectors).forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Observe skill cards to trigger bar animation
    document.querySelectorAll('.skill-category-card').forEach(el => {
        skillObserver.observe(el);
    });
});

// ===== Custom Cursor Logic =====
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 80, fill: "forwards" });
    });

    const clickables = document.querySelectorAll('a, button, .glass-card, .btn');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}
