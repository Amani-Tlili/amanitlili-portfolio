(function($) {
    'use strict';

    // Fonction principale qui s'exécute quand le document est prêt
    $(document).ready(function() {
        
        // Initialisation des fonctionnalités
        smoothScroll();
        activateScrollSpy();
        animateSkillsBars();
    });

    /**
     * 1. Défilement Fluide (Smooth Scrolling)
     * Permet à la page de se déplacer doucement vers la section ciblée
     * lorsque l'utilisateur clique sur un lien de la navigation.
     */
    function smoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            
            // S'assure que le lien n'est pas juste un "#" vide ou un lien externe
            if (this.hash !== "") {
                e.preventDefault();
                
                var hash = this.hash;

                // Calcule la position de la section ciblée
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){ // Durée de l'animation en ms (ici 800)
                    // Ajoute le hash à l'URL après l'animation
                    window.location.hash = hash;
                });
            } 
        });
    }

    /**
     * 2. Scrollspy et mise en évidence du menu
     * Met à jour la classe 'active' dans la navigation #fh5co-nav
     * lorsque l'utilisateur fait défiler la page.
     */
    function activateScrollSpy() {
        var $sections = $('.fh5co-section');
        var $navLinks = $('#fh5co-nav ul li a');

        // Écoute l'événement de défilement (scroll)
        $(window).on('scroll', function() {
            // Position actuelle de défilement (ajustée légèrement)
            var currentScroll = $(this).scrollTop() + 50; 

            $sections.each(function() {
                var sectionTop = $(this).offset().top;
                var sectionBottom = sectionTop + $(this).outerHeight();
                var sectionId = $(this).attr('id');

                // Si la position de défilement est à l'intérieur de la section
                if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                    
                    // Retire la classe 'active' de tous les liens
                    $navLinks.removeClass('active'); 
                    
                    // Ajoute la classe 'active' au lien correspondant
                    $('#fh5co-nav ul li a[href="#' + sectionId + '"]').addClass('active');
                }
            });
        });
        
        // Active la première section au chargement initial
        if ($(window).scrollTop() === 0) {
            $navLinks.first().addClass('active');
        }
    }

    /**
     * 3. Animation des barres de progression des compétences
     * Anime les barres de compétences une fois que le document est chargé.
     * La largeur est récupérée directement depuis l'attribut 'style' dans le HTML.
     */
    function animateSkillsBars() {
        // Sélectionne toutes les barres de progression
        $('.progress-bar').each(function() {
            var width = $(this).css('width'); // Récupère la largeur (ex: "90%")
            
            // Commence l'animation de la barre de 0 à la valeur définie dans le HTML
            $(this).animate({
                width: width
            }, 1000); // 1000ms = 1 seconde d'animation
        });
    }

})(jQuery);
