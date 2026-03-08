// ==========================================
// Navigation Menu Toggle
// ==========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ==========================================
// Sticky Navigation
// ==========================================

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollTop = scrollTop;
});

// ==========================================
// Smooth Scrolling
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// Image Slider/Carousel
// ==========================================

const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
let slideInterval;

// Show specific slide
function showSlide(index) {
  // Wrap around
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Add active class to current slide and dot
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
  showSlide(currentSlide + 1);
}

// Previous slide
function previousSlide() {
  showSlide(currentSlide - 1);
}

// Start auto-play
function startSlideShow() {
  slideInterval = setInterval(nextSlide, 5000);
}

// Stop auto-play
function stopSlideShow() {
  clearInterval(slideInterval);
}

// Event listeners for buttons
nextBtn.addEventListener('click', () => {
  nextSlide();
  stopSlideShow();
  startSlideShow();
});

prevBtn.addEventListener('click', () => {
  previousSlide();
  stopSlideShow();
  startSlideShow();
});

// Event listeners for dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    stopSlideShow();
    startSlideShow();
  });
});

// Pause on hover
slider.addEventListener('mouseenter', stopSlideShow);
slider.addEventListener('mouseleave', startSlideShow);

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide();
  }
  if (touchEndX > touchStartX + 50) {
    previousSlide();
  }
  stopSlideShow();
  startSlideShow();
}

// Start the slideshow
startSlideShow();

// ==========================================
// Scroll Animations
// ==========================================

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll(
  '.feature-card, .service-card, .testimonial-card, .contact-card, .about-text, .faq-item'
);

animateElements.forEach(element => {
  element.classList.add('scroll-animate');
  observer.observe(element);
});

// ==========================================
// Form Validation & Submission
// ==========================================

const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');
const closeSuccessBtn = document.getElementById('closeSuccess');

// Form field elements
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const serviceInput = document.getElementById('service');
const dateInput = document.getElementById('date');

// Error message elements
const nameError = document.getElementById('nameError');
const phoneError = document.getElementById('phoneError');
const emailError = document.getElementById('emailError');
const serviceError = document.getElementById('serviceError');
const dateError = document.getElementById('dateError');

// Validation functions
function validateName() {
  const name = nameInput.value.trim();

  if (name === '') {
    nameError.textContent = 'Name is required';
    nameInput.classList.add('error');
    return false;
  } else if (name.length < 2) {
    nameError.textContent = 'Name must be at least 2 characters';
    nameInput.classList.add('error');
    return false;
  } else {
    nameError.textContent = '';
    nameInput.classList.remove('error');
    return true;
  }
}

function validatePhone() {
  const phone = phoneInput.value.trim();
  const phoneRegex = /^[0-9]{10}$/;

  if (phone === '') {
    phoneError.textContent = 'Phone number is required';
    phoneInput.classList.add('error');
    return false;
  } else if (!phoneRegex.test(phone)) {
    phoneError.textContent = 'Enter a valid 10-digit phone number';
    phoneInput.classList.add('error');
    return false;
  } else {
    phoneError.textContent = '';
    phoneInput.classList.remove('error');
    return true;
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    emailError.textContent = 'Email is required';
    emailInput.classList.add('error');
    return false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = 'Enter a valid email address';
    emailInput.classList.add('error');
    return false;
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('error');
    return true;
  }
}

function validateService() {
  if (serviceInput.value === '') {
    serviceError.textContent = 'Please select a service';
    serviceInput.classList.add('error');
    return false;
  } else {
    serviceError.textContent = '';
    serviceInput.classList.remove('error');
    return true;
  }
}

function validateDate() {
  const selectedDate = new Date(dateInput.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateInput.value === '') {
    dateError.textContent = 'Travel date is required';
    dateInput.classList.add('error');
    return false;
  } else if (selectedDate < today) {
    dateError.textContent = 'Please select a future date';
    dateInput.classList.add('error');
    return false;
  } else {
    dateError.textContent = '';
    dateInput.classList.remove('error');
    return true;
  }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
phoneInput.addEventListener('blur', validatePhone);
emailInput.addEventListener('blur', validateEmail);
serviceInput.addEventListener('change', validateService);
dateInput.addEventListener('change', validateDate);

// Form submission
const submitBtn = bookingForm.querySelector('.btn-submit');

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate all fields
  const isNameValid = validateName();
  const isPhoneValid = validatePhone();
  const isEmailValid = validateEmail();
  const isServiceValid = validateService();
  const isDateValid = validateDate();

  if (isNameValid && isPhoneValid && isEmailValid && isServiceValid && isDateValid) {
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Send form data to Web3Forms
    const formData = new FormData(bookingForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        successMessage.classList.add('show');
        bookingForm.reset();
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
      } else {
        alert('Something went wrong. Please call us at 9384419927 to book.');
      }
    } catch (error) {
      alert('Network error. Please call us at 9384419927 to book.');
    }

    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Booking Request';
  } else {
    // Scroll to first error
    const firstError = bookingForm.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

// Close success message
closeSuccessBtn.addEventListener('click', () => {
  successMessage.classList.remove('show');
});

// Close success message when clicking outside
successMessage.addEventListener('click', (e) => {
  if (e.target === successMessage) {
    successMessage.classList.remove('show');
  }
});

// ==========================================
// Set minimum date for date input (today)
// ==========================================

const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ==========================================
// Performance: Debounce scroll events
// ==========================================

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

// Apply debounce to scroll handler if needed for performance
// Currently not applied to maintain smooth animation detection

// ==========================================
// Add loading animation for images
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });

    img.addEventListener('error', () => {
      console.error('Failed to load image:', img.src);
      img.style.opacity = '1';
      // Set a placeholder or handle the error
      img.alt = 'Image failed to load';
    });

    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
  });

  // Specifically handle slider images
  const sliderImages = document.querySelectorAll('.slide img');
  sliderImages.forEach((img, index) => {
    const originalSrc = img.getAttribute('src');
    console.log(`Slider image ${index + 1} path:`, originalSrc);
  });
});

// ==========================================
// Console message
// ==========================================

console.log('%c🚗 Karpagam Travels', 'font-size: 24px; font-weight: bold; color: #0a3d62;');
console.log('%cWebsite loaded successfully! Book your ride today.', 'font-size: 14px; color: #27ae60;');
