document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.slideshow-container');
  if (container) {
    const slides = container.querySelectorAll('.slide');
    if (slides.length > 0) {
      let currentIndex = 0;
      const changeMs = 2000;

      container.setAttribute('role', 'region');
      container.setAttribute('aria-label', 'Image slideshow');

      slides.forEach((img, i) => {
        img.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
        img.style.display = i === 0 ? 'block' : 'none';
      });

      function showNext() {
        const nextIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].style.display = 'none';
        slides[currentIndex].setAttribute('aria-hidden', 'true');
        slides[nextIndex].style.display = 'block';
        slides[nextIndex].setAttribute('aria-hidden', 'false');
        currentIndex = nextIndex;
      }

      let timer = setInterval(showNext, changeMs);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          clearInterval(timer);
        } else {
          timer = setInterval(showNext, changeMs);
        }
      });
    }
  }

  document.querySelectorAll('aside img').forEach(img => {
    img.loading = 'lazy';
    img.decoding = 'async';
  });

  const header = document.querySelector('header');
  if (header) {
    const SHRINK_AT = 120;
    function onScroll() {
      if (window.scrollY > SHRINK_AT) {
        header.classList.add('shrink');
      } else {
        header.classList.remove('shrink');
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // === Contact form: alert if emails don't match (rubric Part E) ===
  const form = document.getElementById('contact-form');
  if (form) {
    const email = document.getElementById('email');
    const confirm = document.getElementById('confirm-email');
    form.addEventListener('submit', (e) => {
      if (email && confirm && email.value.trim() !== confirm.value.trim()) {
        e.preventDefault();
        alert('Emails do not match.');
        confirm.focus();
      }
    });
  }
});