// Sistema de Cards com Modal
document.addEventListener('DOMContentLoaded', () => {
    // Dados dos projetos
    const projectsData = {
        'brasil-participativo': {
            title: 'Brasil Participativo',
            description: 'O Brasil Participativo é reconhecido como a maior experiência de participação social digital do Poder Executivo, reunindo mais de 1,5 milhão de cidadãos cadastrados.',
            financing: null,
            link: 'https://brasilparticipativo.presidencia.gov.br/',
            logo: './frontend/assets/img/bp-logo.png',
            logoType: 'image'
        },
        'mepa': {
            title: 'MEPA',
            description: 'Plataforma de eficiência energética que utiliza inteligência artificial e análise de dados para otimizar contratos de energia e reduzir custos em instituições públicas.',
            financing: 'MEC',
            link: 'https://mepaenergia.org/',
            logo: './frontend/assets/img/mepa-logo.png',
            logoType: 'image'
        },
        'govhub': {
            title: 'Gov Hub',
            description: 'Plataforma de dados para a integração dos sistemas estruturantes do Governo Federal, transformando-os em informações estratégicas para uma gestão pública baseada em dados.',
            financing: 'IPEA, Ministério da Igualdade Racial (MIR)',
            link: 'https://gov-hub.io/',
            logo: './frontend/assets/img/govhub-logo.png',
            logoType: 'image'
        },
        'dermalert': {
            title: 'Dermalert',
            description: 'Sistema Inteligente de Detecção de Lesões Dermatológicas voltado para a triagem de pacientes com suspeita de câncer de pele, facilitando a identificação precoce e o encaminhamento adequado.',
            financing: 'FAP-DF',
            link: 'https://www.dermalert.ai/',
            logo: './frontend/assets/img/dermalert-logo.png',
            logoType: 'image'
        },
        'efake': {
            title: 'É fake?',
            description: 'Sistema avançado de inteligência artificial que identifica conteúdos desinformativos em matérias jornalísticas com precisão e transparência, fortalecendo o ecossistema de informação confiável no Brasil.',
            financing: 'Edital Dex/UnB',
            partner: 'Sleeping Giants',
            link: 'https://think-ads.vercel.app/',
            logo: 'ThinkAds',
            logoType: 'text'
        }
    };

    // Elementos
    const projectsGrid = document.getElementById('projects-grid');
    const projectExpanded = document.getElementById('project-expanded');
    const expandedBody = document.getElementById('project-expanded-body');
    const closeBtn = document.getElementById('project-expanded-close');
    const projectCards = document.querySelectorAll('.project-card-clickable');

    // Função para abrir o card expandido
    function openExpanded(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Criar conteúdo do card expandido
        let logoHtml = '';
        if (project.logoType === 'image') {
            logoHtml = `<img src="${project.logo}" alt="${project.title}" class="project-logo">`;
        } else {
            logoHtml = `<span class="project-text-logo">${project.logo}</span>`;
        }

        let financingHtml = '';
        if (project.financing) {
            financingHtml = `<p class="project-expanded-financing"><strong>Financiamento:</strong> ${project.financing}</p>`;
        }
        if (project.partner) {
            financingHtml += `<p class="project-expanded-financing"><strong>Parceiro:</strong> ${project.partner}</p>`;
        }

        expandedBody.innerHTML = `
            <div class="project-expanded-image">
                ${logoHtml}
            </div>
            <p class="project-expanded-description">${project.description}</p>
            ${financingHtml}
            <a href="${project.link}" target="_blank" class="project-expanded-link">Saiba mais →</a>
        `;

        // Esconder grid e mostrar card expandido
        projectsGrid.style.display = 'none';
        projectExpanded.style.display = 'block';
        projectExpanded.classList.add('active');

        // Scroll suave para o topo da seção
        const projectsSection = document.getElementById('projetos');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Função para fechar o card expandido
    function closeExpanded() {
        projectExpanded.classList.remove('active');
        projectExpanded.style.display = 'none';
        projectsGrid.style.display = 'block';

        // Scroll suave para o topo da seção
        const projectsSection = document.getElementById('projetos');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Adicionar event listeners aos cards
    projectCards.forEach(card => {
        // Click para abrir card expandido
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openExpanded(projectId);
        });

    });

    // Fechar card expandido ao clicar no botão X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeExpanded);
    }

    // Fechar card expandido com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectExpanded.classList.contains('active')) {
            closeExpanded();
        }
    });

    // Controle de visibilidade dos cards de publicação
    const viewMoreBtn = document.getElementById('publicacao-view-more-btn');
    const hiddenCards = document.querySelectorAll('.publicacao-card-hidden');
    
    if (viewMoreBtn && hiddenCards.length > 0) {
        let isExpanded = false;
        
        viewMoreBtn.addEventListener('click', () => {
            if (!isExpanded) {
                // Mostrar todos os cards escondidos
                hiddenCards.forEach(card => {
                    card.classList.add('show');
                });
                viewMoreBtn.textContent = 'Ver menos';
                isExpanded = true;
            } else {
                // Esconder os cards extras
                hiddenCards.forEach(card => {
                    card.classList.remove('show');
                });
                viewMoreBtn.textContent = 'Ver mais';
                isExpanded = false;
                
                // Scroll suave para o topo da seção de publicações
                const publicacoesSection = document.getElementById('noticias');
                if (publicacoesSection) {
                    publicacoesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // Animação de entrada para a seção de ciência aplicada
    const collaborateSection = document.querySelector('.collaborate-section');
    if (collaborateSection) {
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

        observer.observe(collaborateSection);
    }
});
