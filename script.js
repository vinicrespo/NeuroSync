/**
 * Jewish Secret Code - VSL Landing Page
 * JavaScript Interactions
 */

(function () {
  'use strict';

  // ============================================
  // DOM Elements (updated based on new functionality)
  // ============================================
  const credibilityBar = document.querySelector('.credibility-bar');
  const discussionSection = document.querySelector('.discussion-section'); // Kept for potential other uses, though new code uses specific class
  // replyButtons are now handled within the DOMContentLoaded listener for .fb-reply-btn

  // ============================================
  // Performance: Preload check
  // ============================================
  document.addEventListener('DOMContentLoaded', function () {
    // Mark page as interactive
    document.body.classList.add('loaded');

    /* ============================================
       DISCUSSION SECTION INTERACTIVITY (LOCAL ONLY)
       ============================================ */
    const likeButtons = document.querySelectorAll('.fb-like-btn');
    const replyButtons = document.querySelectorAll('.fb-reply-btn');

    // 1. Handle Like Clicks
    likeButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        this.classList.toggle('liked');

        // Find the reaction count container relative to this button
        const actionsDiv = this.closest('.fb-actions');
        const reactionCountDiv = actionsDiv.querySelector('.fb-reaction-count');

        if (reactionCountDiv) {
          // Extract number text
          let countText = reactionCountDiv.innerText.replace(/[^\d]/g, '');
          let count = parseInt(countText, 10);

          if (this.classList.contains('liked')) {
            this.innerText = 'Like'; // Visual feedback color handles "Liked" state
            count++;
          } else {
            this.innerText = 'Like';
            count--;
          }

          // Update visual count
          reactionCountDiv.innerHTML = `<span class="fb-reaction-icon">👍</span> ${count}`;
        }
      });
    });

    // 2. Handle Reply Clicks (Visual Only - Fake Response)
    replyButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        // Just a visual feedback that interaction happened
        // No input field to focus anymore
        const originalText = this.innerText;
        this.style.fontWeight = '700';

        // Optional: show a small temporary "Reply..." or similar feedback, 
        // purely to simulate something happened without opening inputs.
        // For now, per request, just "fake responder" -> maybe toggle a visible state or just do nothing significant.
        // User asked: "poder curtir e fake responder... obviamente nao ficando salvo"
        // Since input is removed, "fake responder" might mean they click reply and it behaves like they *could* reply but maybe requires login or just flashes.
        // Keeping it simple: Visual tap effect.
      });
    });

    // Call the viewer counter initialization when DOM is ready
    initViewerCounter();
  }); // End of DOMContentLoaded for discussion interactivity

  // ============================================
  // Top Bar Scroll Effect
  // ============================================
  const topBar = document.querySelector('.credibility-bar');
  const scrollThreshold = 100;

  if (topBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        topBar.classList.add('scrolled');
      } else {
        topBar.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // Dynamic Viewer Counter (Live Realism)
  // ============================================
  function initViewerCounter() {
    const counterElement = document.getElementById('viewer-count');
    if (!counterElement) return;

    // Configuration
    const minViewers = 572;
    const maxViewers = 603;
    let currentViewers = Math.floor(Math.random() * (maxViewers - minViewers + 1)) + minViewers;

    const updateDisplay = () => {
      counterElement.textContent = `${currentViewers} viewers currently inside this private presentation`;
    };

    // Initial set
    updateDisplay();

    const scheduleNextUpdate = () => {
      // Random interval between 6 and 12 seconds
      const interval = Math.floor(Math.random() * (12000 - 6000 + 1)) + 6000;

      setTimeout(() => {
        // Randomize change: usually small fluctuation, staying within bounds
        // Logic: 50% chance to go up or down.
        // Magnitude: 1 to 3.
        const change = Math.floor(Math.random() * 3) + 1;
        const direction = Math.random() > 0.5 ? 1 : -1;

        let nextValue = currentViewers + (direction * change);

        // Clamp values
        if (nextValue < minViewers) nextValue = minViewers + Math.floor(Math.random() * 3);
        if (nextValue > maxViewers) nextValue = maxViewers - Math.floor(Math.random() * 3);

        currentViewers = nextValue;
        updateDisplay();

        scheduleNextUpdate();
      }, interval);
    };

    scheduleNextUpdate();
  }

  // ============================================
  // Discussion Section Fade In
  // ============================================
  const discussionSectionFb = document.querySelector('.discussion-section-fb') || document.querySelector('.discussion-section');

  if (discussionSectionFb) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a class that handles fade in
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Initial style to support fade in if not already in CSS
    discussionSectionFb.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    if (!discussionSectionFb.classList.contains('visible')) { // Check if CSS already handles it
      discussionSectionFb.style.opacity = '0';
      discussionSectionFb.style.transform = 'translateY(20px)';
    }

    observer.observe(discussionSectionFb);
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#checkout') {
        // Allow default behavior for checkout links, as they might be external
        return;
      }

      e.preventDefault();

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

})();
