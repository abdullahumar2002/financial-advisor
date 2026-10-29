// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Floating call menu shared by every page that loads this script.
const callWidget = document.createElement('div');
callWidget.className = 'floating-call';
callWidget.innerHTML = `
    <div class="floating-call-panel" id="floatingCallPanel" aria-labelledby="floatingCallTitle" hidden>
        <div class="floating-call-heading">
            <span class="floating-call-eyebrow">Speak with our team</span>
            <h2 id="floatingCallTitle">Choose an office</h2>
        </div>
        <a class="floating-call-option" href="tel:+441733355120">
            <span class="floating-call-city">Peterborough</span>
            <span class="floating-call-number">01733 355 120</span>
        </a>
        <a class="floating-call-option" href="tel:+441223987120">
            <span class="floating-call-city">Cambridge</span>
            <span class="floating-call-number">01223 987 120</span>
        </a>
    </div>
    <button class="floating-call-button" type="button" aria-expanded="false" aria-controls="floatingCallPanel">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M7.2 3.8h2.5l1.1 4.5-1.8 1.6a14.6 14.6 0 0 0 5.1 5.1l1.6-1.8 4.5 1.1v2.5a2 2 0 0 1-2.2 2A15.7 15.7 0 0 1 5.2 6a2 2 0 0 1 2-2.2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Call our team</span>
    </button>
`;
document.body.appendChild(callWidget);

const callButton = callWidget.querySelector('.floating-call-button');
const callPanel = callWidget.querySelector('.floating-call-panel');
const setCallPanelOpen = (isOpen) => {
    callPanel.hidden = !isOpen;
    callButton.setAttribute('aria-expanded', String(isOpen));
};

callButton.addEventListener('click', () => {
    setCallPanelOpen(callPanel.hidden);
});

callWidget.querySelectorAll('.floating-call-option').forEach((link) => {
    link.addEventListener('click', () => setCallPanelOpen(false));
});

document.addEventListener('click', (event) => {
    if (!callWidget.contains(event.target)) setCallPanelOpen(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setCallPanelOpen(false);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe about card
const aboutCard = document.querySelector('.about-card');
if (aboutCard) {
    aboutCard.style.opacity = '0';
    aboutCard.style.transform = 'translateX(30px)';
    aboutCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(aboutCard);
}

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary)';
        }
    });
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    };
    
    updateCounter();
};

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                if (number > 0) {
                    stat.dataset.suffix = suffix;
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}
