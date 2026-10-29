// About Page JavaScript

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000, suffix = '') => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
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
                const target = parseInt(stat.dataset.target);
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                animateCounter(stat, target, 2000, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsBanner = document.querySelector('.stats-banner');
if (statsBanner) {
    statsObserver.observe(statsBanner);
}

// Timeline Animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const timelineItems = entry.target.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            });
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const timeline = document.querySelector('.timeline');
if (timeline) {
    timelineItems = timeline.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    timelineObserver.observe(timeline);
}

// Value Cards Animation
const valuesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const valueCards = entry.target.querySelectorAll('.value-card');
            valueCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
            valuesObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const valuesGrid = document.querySelector('.values-grid');
if (valuesGrid) {
    const valueCards = valuesGrid.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    valuesObserver.observe(valuesGrid);
}

// Community Cards Animation
const communityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntering) {
            const communityCards = entry.target.querySelectorAll('.community-card');
            communityCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
            communityObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const communityVisual = document.querySelector('.community-visual');
if (communityVisual) {
    const communityCards = communityVisual.querySelectorAll('.community-card');
    communityCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    communityObserver.observe(communityVisual);
}

// Story Section Animation
const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            storyObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const storyVisual = document.querySelector('.story-visual');
if (storyVisual) {
    storyVisual.style.opacity = '0';
    storyVisual.style.transform = 'translateX(-50px)';
    storyVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    storyObserver.observe(storyVisual);
}

const storyText = document.querySelector('.story-text');
if (storyText) {
    storyText.style.opacity = '0';
    storyText.style.transform = 'translateX(50px)';
    storyText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    storyObserver.observe(storyText);
}

// Smooth Scroll for anchor links
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
