// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hide');
    }, 1000);
});

// Game button - Flappy Bird activation
const gameBtn = document.getElementById('gameBtn');
const gameModal = document.getElementById('gameModal');

if (gameBtn) {
    gameBtn.addEventListener('click', () => {
        gameModal.classList.add('active');
        initGame();
    });
}

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

// Typing animation
const phrases = [
    'Aspiring Engineer & Developer',
    'Web Developer',
    'Problem Solver',
    'Coding Enthusiast'
];
const typedEl = document.getElementById('typed');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;

function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;

        if (charIdx === current.length) {
            deleting = true;
            setTimeout(type, 2000);
            return;
        }
        setTimeout(type, 80);
    } else {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;

        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(type, 400);
            return;
        }
        setTimeout(type, 40);
    }
}

type();

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.form-submit');

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            formResponse.textContent = 'Thanks! Your message has been sent successfully.';
            formResponse.className = 'form-response success';
            contactForm.reset();
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        formResponse.textContent = 'Oops! Something went wrong. Please try again or email me directly.';
        formResponse.className = 'form-response error';
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Send Message';

        // Hide response message after 5 seconds
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 5000);
    }
});

// Flappy Bird Game
let gameCanvas, ctx, bird, pipes, score, gameRunning, animationId;

function initGame() {
    gameCanvas = document.getElementById('gameCanvas');
    ctx = gameCanvas.getContext('2d');

    bird = {
        x: 80,
        y: 250,
        width: 34,
        height: 24,
        velocity: 0,
        gravity: 0.5,
        jump: -8
    };

    pipes = [];
    score = 0;
    gameRunning = true;

    document.getElementById('gameScore').textContent = score;

    gameCanvas.addEventListener('click', flap);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameModal.classList.contains('active')) {
            e.preventDefault();
            flap();
        }
    });

    const gameClose = document.getElementById('gameClose');
    gameClose.addEventListener('click', () => {
        gameModal.classList.remove('active');
        gameRunning = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });

    gameLoop();
}

function flap() {
    if (gameRunning) {
        bird.velocity = bird.jump;
    }
}

function createPipe() {
    const gap = 150;
    const minHeight = 50;
    const maxHeight = gameCanvas.height - gap - minHeight;
    const height = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;

    pipes.push({
        x: gameCanvas.width,
        top: height,
        bottom: height + gap,
        width: 60,
        passed: false
    });
}

function drawBird() {
    ctx.fillStyle = '#D0B4F4';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.roundRect(bird.x, bird.y, bird.width, bird.height, 5);
    ctx.fill();
    ctx.stroke();

    // Eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(bird.x + 25, bird.y + 10, 3, 0, Math.PI * 2);
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = '#90EE90';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;

    pipes.forEach(pipe => {
        // Top pipe
        ctx.beginPath();
        ctx.roundRect(pipe.x, 0, pipe.width, pipe.top, 5);
        ctx.fill();
        ctx.stroke();

        // Bottom pipe
        ctx.beginPath();
        ctx.roundRect(pipe.x, pipe.bottom, pipe.width, gameCanvas.height - pipe.bottom, 5);
        ctx.fill();
        ctx.stroke();
    });
}

function updateGame() {
    if (!gameRunning) return;

    // Update bird
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Check ceiling and floor collision
    if (bird.y <= 0 || bird.y + bird.height >= gameCanvas.height) {
        gameOver();
        return;
    }

    // Create new pipes
    if (pipes.length === 0 || pipes[pipes.length - 1].x < gameCanvas.width - 200) {
        createPipe();
    }

    // Update pipes
    pipes.forEach((pipe, index) => {
        pipe.x -= 3;

        // Check collision
        if (bird.x + bird.width > pipe.x &&
            bird.x < pipe.x + pipe.width &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)) {
            gameOver();
            return;
        }

        // Update score
        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            pipe.passed = true;
            score++;
            document.getElementById('gameScore').textContent = score;
        }

        // Remove off-screen pipes
        if (pipe.x + pipe.width < 0) {
            pipes.splice(index, 1);
        }
    });
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // Draw clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(100, 100, 30, 0, Math.PI * 2);
    ctx.arc(130, 100, 40, 0, Math.PI * 2);
    ctx.arc(160, 100, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(300, 150, 35, 0, Math.PI * 2);
    ctx.arc(330, 150, 45, 0, Math.PI * 2);
    ctx.arc(365, 150, 35, 0, Math.PI * 2);
    ctx.fill();

    drawPipes();
    drawBird();
}

function gameLoop() {
    if (!gameRunning) return;

    updateGame();
    drawGame();

    animationId = requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameRunning = false;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', gameCanvas.width / 2, gameCanvas.height / 2 - 20);

    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Score: ${score}`, gameCanvas.width / 2, gameCanvas.height / 2 + 20);

    ctx.font = '18px Arial';
    ctx.fillText('Click to restart', gameCanvas.width / 2, gameCanvas.height / 2 + 60);

    gameCanvas.addEventListener('click', restartGame);
}

function restartGame() {
    gameCanvas.removeEventListener('click', restartGame);
    bird.y = 250;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameRunning = true;
    document.getElementById('gameScore').textContent = score;
    gameLoop();
}
