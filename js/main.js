// Scroll to Contact Form
function scrollToContact() {
  const contactSection = document.getElementById('contact-form-section');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('mobile-menu');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('mobile-menu');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
}

// Tab Functionality
function showTab(tabId) {
  // Hide all tab contents
  const allTabs = document.querySelectorAll('.tab-content');
  allTabs.forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from all tab triggers
  const allTriggers = document.querySelectorAll('.tab-trigger');
  allTriggers.forEach(trigger => {
    trigger.classList.remove('active');
  });

  // Show selected tab content
  const selectedTab = document.getElementById(`tab-${tabId}`);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Add active class to clicked trigger
  const clickedTrigger = event.target;
  if (clickedTrigger) {
    clickedTrigger.classList.add('active');
  }
}

// Form Submit Handler
async function handleSubmit(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const company = document.getElementById('company').value;

  // Get submit button
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  try {
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = 'Enviando...';

    // Send data to server
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, company })
    });

    const data = await response.json();

    if (data.success) {
      // Show success message
      alert(data.message);

      // Reset form
      document.getElementById('contact-form').reset();
    } else {
      // Show error message
      alert(data.message || 'Erro ao enviar formulário. Tente novamente.');
    }

  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    alert('Erro ao enviar formulário. Verifique se o servidor está rodando e tente novamente.');
  } finally {
    // Re-enable button and restore text
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Don't prevent default for empty hash or just "#"
    if (href === '#' || href === '') {
      return;
    }

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Observe cards and sections
  const elementsToAnimate = document.querySelectorAll('.card, section');
  elementsToAnimate.forEach(el => observer.observe(el));

  // Set first tab as active
  const firstTab = document.querySelector('.tab-content');
  if (firstTab) {
    firstTab.classList.add('active');
  }

  const firstTrigger = document.querySelector('.tab-trigger');
  if (firstTrigger) {
    firstTrigger.classList.add('active');
  }
});

// Add sticky header effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});

// Add transition to header
if (header) {
  header.style.transition = 'transform 0.3s ease-in-out';
}