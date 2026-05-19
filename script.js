// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section, header');
const navLinkEls = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// ===== Scroll reveal animations =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Animate hero elements on load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 200 + i * 150);
    });

    // Observe sections for scroll-triggered animations
    document.querySelectorAll('.glass-card, .section-label, .section-heading, .about-heading, .about-desc, .about-stats, .project-item, .tools-section, .contact-intro, .skill-bar-fill').forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Animate skill bars when visible
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
    document.querySelectorAll('.skill-category-card').forEach(el => skillObserver.observe(el));
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
