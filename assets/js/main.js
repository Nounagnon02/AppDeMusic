// Navigation interactive
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-bar li');
    const projectCards = document.querySelectorAll('.projet-card');

    // Navigation active
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animation des cartes de projet
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectName = this.textContent;
            alert(`Redirection vers: ${projectName}`);
        });
    });

    // Animation d'entrée
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(card);
    });
});