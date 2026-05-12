// ==================== NAVBAR FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll and active link highlight
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            // Close mobile menu
            navbarCollapse.classList.remove('show');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ==================== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            if (element.classList.contains('fade-in-element')) {
                element.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-element').forEach(element => {
    observer.observe(element);
});

// ==================== CONTACT FORM VALIDATION & SUBMISSION ====================
const contactForm = document.getElementById('contactForm');

// Form validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Bootstrap validation
    if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
    }

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Here you can add your backend API call
    // Example: sendEmail(name, email, subject, message);

    // For demonstration, show success message
    showSuccessMessage();

    // Reset form
    contactForm.reset();
    contactForm.classList.remove('was-validated');
});

// Validation on input
const formInputs = contactForm.querySelectorAll('.form-control');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
            // Validate email
            if (input.id === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('is-invalid');
                }
            }
        }
    });

    input.addEventListener('focus', () => {
        if (input.classList.contains('is-invalid') && input.value.trim() !== '') {
            input.classList.remove('is-invalid');
        }
    });
});

// Success message function
function showSuccessMessage() {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const originalClass = submitBtn.className;

    // Change button to success state
    submitBtn.textContent = '✓ Message Sent Successfully!';
    submitBtn.className = 'btn btn-success btn-lg w-100';
    submitBtn.disabled = true;

    // Reset after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.className = originalClass;
        submitBtn.disabled = false;
    }, 3000);
}

// ==================== SKILL PROGRESS BAR ANIMATION ====================
const skillProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress && !skillProgress.classList.contains('animated')) {
                skillProgress.classList.add('animated');
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillProgressObserver.observe(card);
});

// ==================== PROJECT CARD HOVER EFFECTS ====================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (href === '#') return;

        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== PAGE LOAD ANIMATIONS ====================
window.addEventListener('load', () => {
    // Trigger initial fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add keyboard navigation for carousel/slider (if needed in future)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy loading for images (if images are added)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== UTILITY FUNCTIONS ====================
// Add utility for checking if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== MOBILE MENU HANDLING ====================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarNav = document.querySelector('#navbarNav');

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        if (navbarNav.classList.contains('show')) {
            navbarToggler.click();
        }
    }
});

// ==================== ANIMATION PERFORMANCE OPTIMIZATION ====================
// Pause animations on mobile devices if needed
if (window.matchMedia('(max-width: 768px)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        .floating-shape {
            animation: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ==================== CONSOLE LOGGING FOR DEBUGGING ====================
console.log('%c Utkarsh\'s Portfolio Loaded Successfully! 🚀', 'color: #38bdf8; font-size: 16px; font-weight: bold;');
console.log('%c Built with HTML5, CSS3, Bootstrap 5 & JavaScript', 'color: #94a3b8; font-size: 14px;');
