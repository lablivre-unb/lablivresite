// Função para preload de imagens
function preloadImages(imagePaths) {
    imagePaths.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
}

// Array de imagens para preload - adicione os caminhos das imagens aqui
const imagesToPreload = [
    '../assets/img/nossa-missao.png',
    '../assets/img/nossos-principios.png',
    '../assets/img/lab-livre.png',
];

// Clona os cards do marquee para criar loop infinito e anima com JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Executa o preload das imagens
    if (imagesToPreload.length > 0) {
        preloadImages(imagesToPreload);
    }
    const tracks = document.querySelectorAll('.team-track');
    
    tracks.forEach(track => {
        // Adiciona lazy loading em todas as imagens originais
        const originalImages = track.querySelectorAll('.team-card img');
        originalImages.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
        
        // Clona todos os cards originais
        const cards = track.querySelectorAll('.team-card');
        const clonedCards = Array.from(cards).map(card => card.cloneNode(true));
        
        // Adiciona os cards clonados ao final do track
        clonedCards.forEach(clonedCard => {
            track.appendChild(clonedCard);
        });
    });

    // Animação JavaScript para velocidade constante - otimizada
    const marquees = document.querySelectorAll('.team-marquee');
    
    // Velocidade responsiva baseada no tamanho da tela
    const getSpeed = () => {
        if (window.innerWidth <= 576) {
            return 25; // Mais lento no mobile pequeno
        } else if (window.innerWidth <= 768) {
            return 35; // Velocidade média no tablet
        } else {
            return 50; // Velocidade normal no desktop
        }
    };
    
    let speed = getSpeed();
    
    marquees.forEach(marquee => {
        const track = marquee.querySelector('.team-track');
        if (!track) return;
        
        let position = 0;
        let animationId = null;
        let lastTime = null;
        let trackWidth = 0; // Cache da largura
        let isAnimating = false;
        const isReverse = marquee.classList.contains('marquee-bottom');
        
        // Calcula a largura total do conteúdo original (metade do total, já que está duplicado)
        // Cacheado para evitar recálculos
        const calculateTrackWidth = () => {
            const cards = track.querySelectorAll('.team-card');
            const cardCount = cards.length / 2; // Metade são originais
            let width = 0;
            // Gap responsivo baseado no tamanho da tela
            const gap = window.innerWidth <= 576 ? 10 : window.innerWidth <= 768 ? 12 : 16;
            for (let i = 0; i < cardCount; i++) {
                width += cards[i].offsetWidth + gap;
            }
            return width;
        };
        
        const animate = (currentTime) => {
            if (!lastTime) {
                lastTime = currentTime;
            }
            
            const deltaTime = (currentTime - lastTime) / 1000; // converter para segundos
            lastTime = currentTime;
            
            if (isReverse) {
                position += speed * deltaTime;
                if (position >= 0) {
                    position = -trackWidth;
                }
            } else {
                position -= speed * deltaTime;
                if (position <= -trackWidth) {
                    position = 0;
                }
            }
            
            track.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        };
        
        // Inicia a animação
        const startAnimation = () => {
            if (isAnimating) return;
            isAnimating = true;
            trackWidth = calculateTrackWidth();
            position = isReverse ? -trackWidth : 0;
            lastTime = null;
            animationId = requestAnimationFrame(animate);
        };
        
        // Para a animação quando não visível
        const stopAnimation = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            isAnimating = false;
        };
        
        // Usa IntersectionObserver para só animar quando visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Aguarda um pouco para garantir que as imagens estejam carregadas
                    const images = track.querySelectorAll('img');
                    let loadedImages = 0;
                    const totalImages = images.length;
                    
                    if (totalImages === 0) {
                        startAnimation();
                        return;
                    }
                    
                    // Conta imagens já carregadas
                    images.forEach(img => {
                        if (img.complete) loadedImages++;
                    });
                    
                    // Se a maioria já carregou, inicia imediatamente
                    if (loadedImages >= totalImages * 0.7) {
                        startAnimation();
                    } else {
                        // Senão, espera um pouco mais
                        setTimeout(() => {
                            startAnimation();
                        }, 500);
                    }
                } else {
                    stopAnimation();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        observer.observe(marquee);
        
        // Recalcula quando a janela é redimensionada (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                speed = getSpeed(); // Atualiza velocidade
                if (isAnimating) {
                    trackWidth = calculateTrackWidth();
                }
            }, 250);
        });
    });

    // Adiciona legendas aos cards da equipe
    const teamMembersData = {
        'Eric Silveira.jpg': { name: 'Eric Silveira', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Davi Vieira.jpg': { name: 'Davi Vieira', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Mateus Castro.jpg': { name: 'Mateus Castro', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Paulo Gonçalves Lima.jpg': { name: 'Paulo Gonçalves Lima', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Arthur Alves Melo.jpg': { name: 'Arthur Alves Melo', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Guilherme Gusmão.jpg': { name: 'Guilherme Gusmão', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Vinicius Ribeiro.jpg': { name: 'Vinicius Ribeiro', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com/in/vinicius-ribeiro-6192b2270/' },
        'Cibelly Lourenço.jpg': { name: 'Cibelly Lourenço', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Tiago Bittencourt.jpeg': { name: 'Tiago Bittencourt', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Gabriela Alves.jpeg': { name: 'Gabriela Alves', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Gabriel Zaranza.jpg': { name: 'Gabriel Zaranza', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Giovanni Giampauli.jpeg': { name: 'Giovanni Giampauli', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Guilherme Fernandes.jpg': { name: 'Guilherme Fernandes', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Gustavo Henrique.jpeg': { name: 'Gustavo Henrique', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Geovane Freitas.jpg': { name: 'Geovane Freitas', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Maria Clara Guimarães.jpg': { name: 'Maria Clara Guimarães', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Paulo Tada.jpg': { name: 'Paulo Tada', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Arthur.jpeg': { name: 'Arthur', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Caetano Santos Lúcio.jpg': { name: 'Caetano Santos Lúcio', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Kizia Fonseca.png': { name: 'Kizia Fonseca', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Daniela Soares.jpg': { name: 'Daniela Soares', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Lais Soares.jpg': { name: 'Lais Soares', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Lucas Guimarães.jpg': { name: 'Lucas Guimarães', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Flavio Vieira.jpg': { name: 'Flavio Vieira', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Gabriel Ferreira.jpg': { name: 'Gabriel Ferreira', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Luiza Maluf.jpg': { name: 'Luiza Maluf', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Bruna Pinos.jpg': { name: 'Bruna Pinos', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Leonardo Gonçalves Machado.jpeg': { name: 'Leonardo Gonçalves Machado', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Maria Eduarda.jpg': { name: 'Maria Eduarda', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Carolina Barbosa.jpg': { name: 'Carolina Barbosa', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Suzane Alves Duarte.jpg': { name: 'Suzane Alves Duarte', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Renan Girão.jpg': { name: 'Renan Girão', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Miguel Arthur.jpg': { name: 'Miguel Arthur', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Marina Alves.jpeg': { name: 'Marina Alves', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Juliana Petrocchi.jpg': { name: 'Juliana Petrocchi', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Larissa Gomes.png': { name: 'Larissa Gomes', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Marcus Martins.jpg': { name: 'Marcus Martins', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Ana Carolina Costa César.jpg': { name: 'Ana Carolina Costa César', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Eduardo Nunes.jpg': { name: 'Eduardo Nunes', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Caio Rocha.png': { name: 'Caio Rocha', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Breno Yuri.jpg': { name: 'Breno Yuri', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Vitor Borges.jpg': { name: 'Vitor Borges', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Rocha Carla.png': { name: 'Rocha Carla', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Mateus Cavalcante de Sousa.jpeg': { name: 'Mateus Cavalcante de Sousa', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'João Henrique Egewarth.jpg': { name: 'João Henrique Egewarth', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Clara Alvares Barbosa.jpg': { name: 'Clara Alvares Barbosa', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Gustavo Martins.jpeg': { name: 'Gustavo Martins', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Juan Ricarte.jpeg': { name: 'Juan Ricarte', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Vitória Ferrari.jpg': { name: 'Vitória Ferrari', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Will Bernardo.jpeg': { name: 'Will Bernardo', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Rodolfo Cabral Neves.jpeg': { name: 'Rodolfo Cabral Neves', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Thalita Quelita.jpeg': { name: 'Thalita Quelita', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Victor Silva.jpg': { name: 'Victor Silva', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Luiza Davison.jpg': { name: 'Luiza Davison', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Maicon Mares.jpg': { name: 'Maicon Mares', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Leo.jpg': { name: 'Leo', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Leonardo Moreno.jpg': { name: 'Leonardo Moreno', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Lucca Meds.jpg': { name: 'Lucca Meds', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Isaque Alves.jpg': { name: 'Isaque Alves', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'João Pedro Nóbrega Fernandes.jpg': { name: 'João Pedro Nóbrega Fernandes', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Heitor Msb.jpg': { name: 'Heitor Msb', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Hugo Rocha.jpg': { name: 'Hugo Rocha', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Hannan Hunny.png': { name: 'Hannan Hunny', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' },
        'Artur Ricardo.jpeg': { name: 'Artur Ricardo', role: 'Membro da Equipe', linkedin: 'https://www.linkedin.com' }
    };

    // Função para extrair o nome do arquivo da imagem
    function getImageFileName(imgSrc) {
        const parts = imgSrc.split('/');
        const fileName = parts[parts.length - 1];
        // Decodifica a URL para remover %20 (espaços codificados)
        return decodeURIComponent(fileName);
    }

    // Função para criar a legenda do card
    function createTeamCardCaption(memberData) {
        const caption = document.createElement('div');
        caption.className = 'team-card-caption';
        
        const info = document.createElement('div');
        info.className = 'team-card-caption-info';
        
        const name = document.createElement('h3');
        name.className = 'team-card-caption-name';
        name.textContent = memberData.name;
        
        const role = document.createElement('p');
        role.className = 'team-card-caption-role';
        role.textContent = memberData.role;
        
        info.appendChild(name);
        info.appendChild(role);
        
        const linkedinLink = document.createElement('a');
        linkedinLink.className = 'team-card-caption-linkedin';
        if (memberData.linkedin) {
            linkedinLink.href = memberData.linkedin;
            linkedinLink.target = '_blank';
            linkedinLink.rel = 'noopener noreferrer';
        }
        
        linkedinLink.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        `;
        
        caption.appendChild(info);
        caption.appendChild(linkedinLink);
        
        return caption;
    }

    // Adiciona legendas a todos os cards
    const allTeamCards = document.querySelectorAll('.team-card');
    allTeamCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            const fileName = getImageFileName(img.src);
            let memberData = teamMembersData[fileName];
            
            // Se não encontrar no objeto, extrai o nome do arquivo
            if (!memberData) {
                // Remove a extensão e substitui hífens/underscores por espaços
                const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
                memberData = { 
                    name: nameWithoutExt, 
                    role: 'Membro da Equipe', 
                    linkedin: '' 
                };
            }
            
            // Remove legenda existente se houver
            const existingCaption = card.querySelector('.team-card-caption');
            if (existingCaption) {
                existingCaption.remove();
            }
            
            // Adiciona nova legenda
            const caption = createTeamCardCaption(memberData);
            card.appendChild(caption);
        }
    });
});


