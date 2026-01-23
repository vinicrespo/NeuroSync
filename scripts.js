/**
 * NeuroSync - Premium Sales Page Scripts
 * Minimal JavaScript for FAQ accordion and scroll animations
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // FAQ Accordion
  // ========================================
  const faqItems = document.querySelectorAll('.faq__item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
      question.setAttribute('aria-expanded', !isActive);
    });
  });
  
  // ========================================
  // Scroll Reveal Animations
  // ========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
  
  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ========================================
  // CTA Button Tracking (placeholder)
  // ========================================
  const ctaButtons = document.querySelectorAll('.btn--primary');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Add tracking logic here
      // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': this.textContent });
    });
  });
  
});
