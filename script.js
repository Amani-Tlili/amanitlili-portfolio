// Fade-in simple pour les sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = 0;
  });

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    sections.forEach(section => {
      if (scrollPosition > section.offsetTop + 100) {
        section.style.transition = 'opacity 1s';
        section.style.opacity = 1;
      }
    });
  });
});
