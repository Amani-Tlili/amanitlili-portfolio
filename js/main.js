// Scroll fluide quand on clique sur les liens nav
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const cible = document.querySelector(this.getAttribute('href'));
    if (cible) {
      cible.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
