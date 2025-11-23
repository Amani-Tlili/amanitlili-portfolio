document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.querySelector('.meelo-header');
    const nav = document.querySelector('.meelo-nav');
    
    // 1. Navigation fluide (Smooth scroll) et correction du décalage avec le header fixe
    document.querySelectorAll('.meelo-nav a[href^="#"], .meelo-footer a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                // Gérer le retour en haut
                if (targetId === '#home' || targetId === '#accueil') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                
                if (targetElement) {
                    // Calculer le décalage total des barres fixes
                    const headerOffset = header.offsetHeight + nav.offsetHeight;
                    
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Intersection Observer pour l'animation de fade-in au scroll
    const fadeSections = document.querySelectorAll('.meelo-section, .meelo-contact');

    const fadeObserverOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });
    
    // 3. Intersection Observer pour la Navigation Active (Changement de couleur des <a>)
    const navLinks = document.querySelectorAll('.meelo-nav a');
    
    // Liste de toutes les sections à observer (français et anglais)
    const sectionsToObserve = document.querySelectorAll('#profil, #competences, #projets, #experience, #formation, #contact, #profile, #skills, #projects, #experience, #education, #contact');
    
    const activeObserverOptions = {
        root: null,
        // Marge négative égale à la hauteur du header + nav (déclenchement au passage sous la nav)
        rootMargin: `-${header.offsetHeight + nav.offsetHeight + 1}px 0px 0px 0px`, 
        threshold: 0 
    };
    
    const activeObserver = new IntersectionObserver((entries) => {
        
        // Retirer la classe active de tous les liens
        navLinks.forEach(link => link.classList.remove('active-section'));
        
        // Trouver la première section visible à partir du haut du document
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        
        if (visibleSections.length > 0) {
            // Identifier la section la plus haute (la plus pertinente)
            const topSection = visibleSections.reduce((prev, current) => {
                return (prev.boundingClientRect.top < current.boundingClientRect.top) ? prev : current;
            });
            
            const id = topSection.target.getAttribute('id');
            const navLink = document.querySelector(`.meelo-nav a[href="#${id}"]`);

            if (navLink) {
                // Appliquer la couleur violette
                navLink.classList.add('active-section');
            }
        }
    }, activeObserverOptions);

    // Démarrer l'observation
    sectionsToObserve.forEach(section => {
        activeObserver.observe(section);
    });

    console.log("Amani Tlili Portfolio Finalized and Functional.");
});
