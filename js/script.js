document.addEventListener('DOMContentLoaded', () => {
    // Rend la navigation par ancre plus fluide (smooth scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fonctionnalité future : si vous ajoutez des projets,
    // ce script pourrait gérer le filtrage ou l'affichage modal.

    console.log("Amani Tlili Portfolio Chargé!");
});
