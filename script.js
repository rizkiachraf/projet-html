document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Smooth Scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Accordéon FAQ
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fermer tous les autres
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Ouvrir celui cliqué s'il n'était pas actif
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // 4. Validation Formulaire Newsletter
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const rgpdCheckbox = document.getElementById('rgpd');
  const emailError = document.getElementById('email-error');
  const checkboxError = document.getElementById('checkbox-error');
  const successMessage = document.getElementById('form-success');

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset messages
      emailError.classList.remove('show');
      emailInput.classList.remove('error');
      checkboxError.classList.remove('show');
      successMessage.classList.remove('show');

      // Validation email
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailError.classList.add('show');
        emailInput.classList.add('error');
        isValid = false;
      }

      // Validation checkbox
      if (!rgpdCheckbox.checked) {
        checkboxError.classList.add('show');
        isValid = false;
      }

      // Si tout est valide
      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi...';
        submitBtn.disabled = true;

        setTimeout(() => {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          successMessage.classList.add('show');
          
          setTimeout(() => {
            successMessage.classList.remove('show');
          }, 5000);
        }, 1000);
      }
    });
  }

  // 5. Animations d'apparition (Intersection Observer)
  const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .slide-in-right');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // 6. Theme Toggle Logic (Dark/Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'light') {
      themeIconSun.style.display = 'none';
      themeIconMoon.style.display = 'block';
    } else {
      themeIconSun.style.display = 'block';
      themeIconMoon.style.display = 'none';
    }
  };

  // Initial application
  applyTheme(currentTheme);

  // Toggle on click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
});
