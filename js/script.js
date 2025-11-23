document.addEventListener('DOMContentLoaded', () => {
    // Rend la navigation par ancre plus fluide (smooth scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // S'assurer que le défilement se fait vers l'élément correct
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log("Amani Tlili Portfolio Chargé!");
});
