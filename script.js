// ===== MATRIX RAIN ANIMATION =====
const canvas = document.getElementById('matrix');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(5, 8, 16, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== TYPING EFFECT =====
const typingElement = document.getElementById('typingText');
if (typingElement) {
    const texts = [
        'Penetration Tester',
        'Bug Bounty Hunter',
        'CTF Player',
        'Web Security Enthusiast',
        'Security Researcher'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ===== NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number[data-target]');

if (counters.length > 0) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.stat-card, .info-card, .tech-category, .activity-item');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// ===== GLITCH EFFECT ON HOVER =====
const glitchElements = document.querySelectorAll('.glitch-title, .glitch-effect');

glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const text = element.textContent;
        let iterations = 0;
        
        const glitchInterval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= text.length) {
                clearInterval(glitchInterval);
                element.textContent = text;
            }
        }, 30);
    });
});

// ===== CURSOR FOLLOWER =====
const cursorFollower = document.createElement('div');
cursorFollower.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #00ff41;
    border-radius: 50%;
    pointer-events: none;
    transition: 0.1s;
    z-index: 9999;
    display: none;
`;
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.display = 'block';
    cursorFollower.style.left = e.clientX - 10 + 'px';
    cursorFollower.style.top = e.clientY - 10 + 'px';
});

// Expand cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-item, .stat-card, .info-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.backgroundColor = 'transparent';
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 255, 65, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PREVENT ZOOM ON MOBILE =====
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// ===== CONSOLE MESSAGE =====
console.log('%c HwyNe Portfolio ', 'background: #00ff41; color: #0a0e14; font-size: 20px; padding: 10px;');
console.log('%c Designed & Developed by HwyNe ', 'background: #0a0e14; color: #00ff41; font-size: 14px; padding: 5px;');
console.log('%c GitHub: https://github.com/HwyNe ', 'color: #00d9ff; font-size: 12px;');
