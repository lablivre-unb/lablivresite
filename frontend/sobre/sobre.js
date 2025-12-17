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
});


