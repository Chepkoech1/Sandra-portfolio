// ── NAVBAR SCROLL EFFECT 
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
});

// ── MOBILE HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── SCROLL REVEAL 
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.skills-grid .skill-card, .projects-grid .project-card, .about-cards .info-card').forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = i * 80;
});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── SKILL BAR ANIMATION 
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ── SCROLL TO TOP 
document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── ACTIVE NAV LINK ON SCROLL 
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => { link.style.color = ''; });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--primary)';
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => activeObserver.observe(s));

// ── CONTACT FORM — FIXED 
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

form?.addEventListener('submit', (e) => {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Only prevent & show error if fields are empty
  if (!name || !email || !message) {
    e.preventDefault();
    submitBtn.textContent = '⚠️ Please fill all required fields';
    submitBtn.style.background = '#f59e0b';
    setTimeout(() => {
      submitBtn.textContent = 'Send Message 🚀';
      submitBtn.style.background = '';
    }, 2500);
    return;
  }

  // Let Formspree handle the real submission
  submitBtn.textContent = 'Sending... ⏳';
  submitBtn.disabled = true;
});
