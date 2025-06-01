// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const contactForm = document.getElementById('contactForm');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        document.body.classList.add('is-scrolled');
    } else {
        header.classList.remove('scrolled');
        document.body.classList.remove('is-scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle Functionality removed - using dark theme only
// No theme toggle needed as we're using a single dark theme


// Form validation and submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            showAlert('Please fill in all fields', 'danger');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email', 'danger');
            return;
        }
        
        // Simulate form submission (in a real app, you would send data to a server)
        showAlert('Your message has been sent successfully!', 'success');
        contactForm.reset();
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show alert
function showAlert(message, type) {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `form-alert alert-${type}`;
    alert.textContent = message;
    
    // Insert alert before the form
    contactForm.parentNode.insertBefore(alert, contactForm);
    
    // Style the alert
    alert.style.padding = '10px';
    alert.style.marginBottom = '20px';
    alert.style.borderRadius = '5px';
    alert.style.textAlign = 'center';
    
    if (type === 'danger') {
        alert.style.backgroundColor = '#f8d7da';
        alert.style.color = '#721c24';
        alert.style.border = '1px solid #f5c6cb';
    } else if (type === 'success') {
        alert.style.backgroundColor = '#d4edda';
        alert.style.color = '#155724';
        alert.style.border = '1px solid #c3e6cb';
    }
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Skills Slider Functionality
const skillsSlider = document.querySelector('.skills-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slideWidth = 330; // Width of slide + gap
let currentPosition = 0;
let maxSlides;

function updateSliderPosition() {
    skillsSlider.style.transform = `translateX(${currentPosition}px)`;
}

function updateSliderControls() {
    const categories = document.querySelectorAll('.skill-category');
    maxSlides = categories.length;
    const maxPosition = -(maxSlides - 1) * slideWidth;
    
    prevBtn.disabled = currentPosition >= 0;
    nextBtn.disabled = currentPosition <= maxPosition;
    
    prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
}

prevBtn.addEventListener('click', () => {
    if (currentPosition < 0) {
        currentPosition += slideWidth;
        updateSliderPosition();
        updateSliderControls();
    }
});

nextBtn.addEventListener('click', () => {
    const categories = document.querySelectorAll('.skill-category');
    const maxPosition = -(categories.length - 1) * slideWidth;
    
    if (currentPosition > maxPosition) {
        currentPosition -= slideWidth;
        updateSliderPosition();
        updateSliderControls();
    }
});

// Add animation to skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            bar.style.width = bar.parentElement.getAttribute('data-level') || bar.style.width;
            bar.style.transition = 'width 1s ease';
        }
    });
}

// Initialize slider and animations
window.addEventListener('DOMContentLoaded', () => {
    updateSliderControls();
    animateSkillBars();
});

// Check on scroll
window.addEventListener('scroll', () => {
    animateSkillBars();
});

// Handle window resize
window.addEventListener('resize', () => {
    updateSliderControls();
});