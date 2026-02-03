// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation to project cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Click-to-spin for hero decoration boxes
document.querySelectorAll('.decoration-box').forEach(box => {
    let spinning = false;

    box.addEventListener('click', () => {
        if (spinning) return;
        spinning = true;

        const scrolled = window.pageYOffset;
        let speed = 0;
        let baseRot = 0;

        if (box.classList.contains('box-purple')) {
            speed = -0.15;
            baseRot = -15;
        } else if (box.classList.contains('box-yellow')) {
            speed = -0.2;
            baseRot = 25;
        } else if (box.classList.contains('box-orange')) {
            speed = -0.18;
            baseRot = 10;
        }

        box.classList.add('spinning');
        box.style.transform = `translate(0, ${scrolled * speed}px) rotate(${baseRot + 360}deg)`;

        setTimeout(() => {
            box.classList.remove('spinning');
            box.style.transform = `translate(0, ${scrolled * speed}px) rotate(${baseRot}deg)`;
            spinning = false;
        }, 800);
    });
});

// Parallax effect for hero decoration boxes
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const purpleBox = document.querySelector('.box-purple');
            const yellowBox = document.querySelector('.box-yellow');
            const orangeBox = document.querySelector('.box-orange');

            if (purpleBox) {
                const purpleSpeed = -0.15; // Moves up slowly
                purpleBox.style.transform = `translate(0, ${scrolled * purpleSpeed}px) rotate(-15deg)`;
            }

            if (yellowBox) {
                const yellowSpeed = -0.2; // Moves up slowly
                yellowBox.style.transform = `translate(0, ${scrolled * yellowSpeed}px) rotate(25deg)`;
            }

            if (orangeBox) {
                const orangeSpeed = -0.18; // Moves up slowly
                orangeBox.style.transform = `translate(0, ${scrolled * orangeSpeed}px) rotate(10deg)`;
            }

            ticking = false;
        });
        ticking = true;
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if we're at the bottom of the page
    const isBottom = scrollY + windowHeight >= documentHeight - 50;

    let activeSection = null;

    // Find which section is currently active
    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (isBottom && sectionId === 'contact') {
            activeSection = 'contact';
        } else if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            activeSection = sectionId;
        }
    });

    // Update all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        const sectionId = href ? href.substring(1) : null;

        if (sectionId === activeSection) {
            link.style.color = 'var(--brand-purple)';
        } else {
            link.style.color = 'var(--black)';
        }
    });
});
