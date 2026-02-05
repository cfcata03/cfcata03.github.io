// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}

// Initialize theme: localStorage > system preference > light
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

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

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

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
            box.style.transition = 'none';
            box.style.transform = `translate(0, ${scrolled * speed}px) rotate(${baseRot}deg)`;
            requestAnimationFrame(() => {
                box.style.transition = '';
                spinning = false;
            });
        }, 800);
    });
});

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const purpleBox = document.querySelector('.box-purple');
            const yellowBox = document.querySelector('.box-yellow');
            const orangeBox = document.querySelector('.box-orange');

            if (purpleBox) {
                const purpleSpeed = -0.15;
                purpleBox.style.transform = `translate(0, ${scrolled * purpleSpeed}px) rotate(-15deg)`;
            }

            if (yellowBox) {
                const yellowSpeed = -0.2;
                yellowBox.style.transform = `translate(0, ${scrolled * yellowSpeed}px) rotate(25deg)`;
            }

            if (orangeBox) {
                const orangeSpeed = -0.18;
                orangeBox.style.transform = `translate(0, ${scrolled * orangeSpeed}px) rotate(10deg)`;
            }

            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isBottom = scrollY + windowHeight >= documentHeight - 50;

    let activeSection = null;

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
