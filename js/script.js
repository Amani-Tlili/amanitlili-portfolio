document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation fluide (Smooth scroll) et correction du décalage avec le header fixe
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculer la position en tenant compte des headers fixes (top bar + nav)
                    const headerOffset = document.querySelector('.meelo-header').offsetHeight + document.querySelector('.meelo-nav').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset - 20; // -20 pour un petit padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Intersection Observer pour l'animation de fade-in au scroll
    const sections = document.querySelectorAll('.meelo-section, .meelo-contact');

    const observerOptions = {
        root: null, // Le viewport (fenêtre d'affichage)
        rootMargin: '0px',
        threshold: 0.1 // L'animation se déclenche dès que 10% de la section est visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Arrêter d'observer après la première apparition
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    console.log("Amani Tlili Portfolio Loaded with Meelo-inspired styles and animations!");
});
