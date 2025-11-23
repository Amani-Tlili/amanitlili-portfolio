document.addEventListener('DOMContentLoaded', () => {
   
    const header = document.querySelector('.amani-header');
    const nav = document.querySelector('.amani-nav');
    
    // 1. Navigation fluide (Smooth scroll) et correction du décalage avec le header fixe
    document.querySelectorAll('.amani-nav a[href^="#"], .amani-footer a[href^="#"]').forEach(anchor => {
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
    // Nous ciblons toutes les sections qui doivent s'animer (celles qui ont la classe amani-section)
    const fadeSections = document.querySelectorAll('[class*="amani-section"]'); 

    const fadeObserverOptions = {
        root: null, 
        rootMargin: '0px 0px -200px 0px', 
        threshold: 0.1 
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Le JavaScript ajoute la classe is-visible pour déclencher le CSS
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    // Observer uniquement les sections qui doivent s'animer (amani-section)
    fadeSections.forEach(section => {
        fadeObserver.observe(section);
    });
    
    // 3. Intersection Observer pour la Navigation Active (Changement de couleur des <a>)
    const navLinks = document.querySelectorAll('.amani-nav a');
    
    const activeObserverOptions = {
        root: null,
        rootMargin: `-120px 0px -80% 0px`, 
        threshold: 0 
    };
    
    // Liste de toutes les sections cibles pour le menu
    const sectionsToObserve = document.querySelectorAll('#profil, #competences, #projets, #experience, #formation, #contact, #profile, #skills, #projects, #experience, #education, #contact');
    
    const activeObserver = new IntersectionObserver((entries) => {
        
        navLinks.forEach(link => link.classList.remove('active-section'));
        
        const visibleSections = entries.filter(entry => entry.isIntersecting);
        
        if (visibleSections.length > 0) {
            const topSection = visibleSections.reduce((prev, current) => {
                const isHigherThanCenter = current.boundingClientRect.top < window.innerHeight / 2;
                return (isHigherThanCenter && current.boundingClientRect.top > prev.boundingClientRect.top) ? current : prev;
            });
            
            const id = topSection.target.getAttribute('id');
            const navLink = document.querySelector(`.amani-nav a[href="#${id}"]`);

            if (navLink) {
                navLink.classList.add('active-section');
            }
        }
    }, activeObserverOptions);

    sectionsToObserve.forEach(section => {
        activeObserver.observe(section);
    });

    console.log("Amani Tlili Portfolio Finalized and Functional.");
});
