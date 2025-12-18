// Clona os cards do marquee para criar loop infinito
document.addEventListener('DOMContentLoaded', () => {
    const tracks = document.querySelectorAll('.team-track');
    
    tracks.forEach(track => {
        // Clona todos os cards originais
        const cards = track.querySelectorAll('.team-card');
        const clonedCards = Array.from(cards).map(card => card.cloneNode(true));
        
        // Adiciona os cards clonados ao final do track
        clonedCards.forEach(clonedCard => {
            track.appendChild(clonedCard);
        });
    });

    // Animação de entrada para a seção de contato
    const contactSection = document.querySelector('.sobre-contact');
    if (contactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target); // Para de observar após animar uma vez
                }
            });
        }, {
            threshold: 0.2, // Dispara quando 20% da seção estiver visível
            rootMargin: '0px 0px -100px 0px' // Adiciona um pequeno offset
        });

        observer.observe(contactSection);
    }
});


