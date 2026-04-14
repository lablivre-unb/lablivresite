/**
 * LabLivre Tech Radar
 * Inspired by Thoughtworks Technology Radar
 */
(function () {
    'use strict';

    /* ======================================================
       DATA — quadrants × rings × blips
       ====================================================== */
    const RADAR_DATA = {
        quadrants: [
            {
                id: 'pesquisa',
                label: 'Pesquisa',
                color: '#17CEE6',
                angle: 0   // top-left
            },
            {
                id: 'tecnicas',
                label: 'Técnicas',
                color: '#F9A10E',
                angle: 1   // top-right
            },
            {
                id: 'tecnologias',
                label: 'Tecnologias',
                color: '#CF2B6B',
                angle: 2   // bottom-right
            },
            {
                id: 'devops',
                label: 'Práticas DevOps',
                color: '#a78bfa',
                angle: 3   // bottom-left
            }
        ],
        rings: [
            { id: 'adopt',  label: 'Adotar',   color: '#17CEE6', outerR: 0.25 },
            { id: 'trial',  label: 'Avaliar',   color: '#F9A10E', outerR: 0.50 },
            { id: 'assess', label: 'Testar',    color: '#CF2B6B', outerR: 0.72 },
            { id: 'hold',   label: 'Suspender', color: '#9e9e9e', outerR: 1.00 }
        ],
        blips: [
            // --- Pesquisa ---
            { id: 1,  name: 'Design Participativo', quadrant: 'pesquisa', ring: 'adopt',  desc: 'Metodologia de co-design com usuários e comunidades para co-criação de soluções.' },
            { id: 2,  name: 'Open Source Research',  quadrant: 'pesquisa', ring: 'adopt',  desc: 'Produção e publicação científica vinculada a projetos de software livre.' },
            { id: 3,  name: 'Revisão Sistemática',   quadrant: 'pesquisa', ring: 'adopt',  desc: 'Metodologia estruturada de levantamento e análise bibliográfica.' },
            { id: 4,  name: 'Pesquisa com GSoC',     quadrant: 'pesquisa', ring: 'trial',  desc: 'Participação no Google Summer of Code como vetor de pesquisa aplicada.' },
            { id: 5,  name: 'Co-design Comunitário', quadrant: 'pesquisa', ring: 'trial',  desc: 'Abordagem colaborativa de design com comunidades externas à academia.' },
            { id: 6,  name: 'MLOps para Pesquisa',   quadrant: 'pesquisa', ring: 'assess', desc: 'Operacionalização de modelos de ML no contexto de pesquisa científica.' },
            { id: 7,  name: 'Green Computing',       quadrant: 'pesquisa', ring: 'assess', desc: 'Linha de pesquisa sobre eficiência energética em sistemas computacionais.' },
            { id: 8,  name: 'P&D Proprietário',      quadrant: 'pesquisa', ring: 'hold',   desc: 'Pesquisa vinculada a plataformas fechadas; preferimos abordagens abertas.' },

            // --- Técnicas ---
            { id: 9,  name: 'TDD',                   quadrant: 'tecnicas', ring: 'adopt',  desc: 'Desenvolvimento guiado por testes para maior confiabilidade e design limpo.' },
            { id: 10, name: 'Code Review',            quadrant: 'tecnicas', ring: 'adopt',  desc: 'Prática contínua de revisão de código para garantir qualidade e disseminar conhecimento.' },
            { id: 11, name: 'Scrum/Agile',            quadrant: 'tecnicas', ring: 'adopt',  desc: 'Framework ágil amplamente utilizado nos projetos do laboratório.' },
            { id: 12, name: 'Clean Architecture',     quadrant: 'tecnicas', ring: 'trial',  desc: 'Separação de responsabilidades para código manutenível e testável.' },
            { id: 13, name: 'Domain-Driven Design',   quadrant: 'tecnicas', ring: 'trial',  desc: 'Modelagem de sistemas orientada ao domínio do negócio/pesquisa.' },
            { id: 14, name: 'Programação Pareada',    quadrant: 'tecnicas', ring: 'assess', desc: 'Técnica colaborativa de desenvolvimento para transferência de conhecimento.' },
            { id: 15, name: 'Microserviços',          quadrant: 'tecnicas', ring: 'assess', desc: 'Divisão de sistemas em serviços pequenos e independentes.' },
            { id: 16, name: 'Monolito Modular',       quadrant: 'tecnicas', ring: 'hold',   desc: 'Pode ser válido em contextos específicos, mas preferimos arquiteturas modulares desacopladas.' },

            // --- Tecnologias ---
            { id: 17, name: 'Python',                 quadrant: 'tecnologias', ring: 'adopt',  desc: 'Principal linguagem para scripts, ML e prototipagem rápida no laboratório.' },
            { id: 18, name: 'C/C++',                  quadrant: 'tecnologias', ring: 'adopt',  desc: 'Fundamental para sistemas embarcados e software de baixo nível.' },
            { id: 19, name: 'TypeScript',             quadrant: 'tecnologias', ring: 'adopt',  desc: 'Tipagem estática sobre JavaScript para projetos frontend/backend.' },
            { id: 20, name: 'React',                  quadrant: 'tecnologias', ring: 'trial',  desc: 'Biblioteca UI amplamente adotada em projetos web do laboratório.' },
            { id: 21, name: 'FastAPI',                quadrant: 'tecnologias', ring: 'trial',  desc: 'Framework Python moderno para APIs de alto desempenho.' },
            { id: 22, name: 'Rust',                   quadrant: 'tecnologias', ring: 'assess', desc: 'Linguagem com foco em segurança de memória; explorada em sistemas críticos.' },
            { id: 23, name: 'RISC-V',                 quadrant: 'tecnologias', ring: 'assess', desc: 'Arquitetura ISA aberta de grande interesse em pesquisas do LabLivre.' },
            { id: 24, name: 'PHP',                    quadrant: 'tecnologias', ring: 'hold',   desc: 'Usado em projetos legados; novas iniciativas preferem outras stacks.' },

            // --- Práticas DevOps ---
            { id: 25, name: 'Git',                    quadrant: 'devops', ring: 'adopt',  desc: 'Controle de versão distribuído; padrão absoluto em todos os projetos.' },
            { id: 26, name: 'Docker',                 quadrant: 'devops', ring: 'adopt',  desc: 'Containerização de aplicações garantindo portabilidade entre ambientes.' },
            { id: 27, name: 'GitHub Actions',         quadrant: 'devops', ring: 'adopt',  desc: 'Plataforma de CI/CD integrada ao GitHub para automação de pipelines.' },
            { id: 28, name: 'Kubernetes',             quadrant: 'devops', ring: 'trial',  desc: 'Orquestração de containers para implantação escalável de serviços.' },
            { id: 29, name: 'Terraform',              quadrant: 'devops', ring: 'trial',  desc: 'Infrastructure as Code para provisionamento declarativo de recursos.' },
            { id: 30, name: 'Prometheus & Grafana',   quadrant: 'devops', ring: 'assess', desc: 'Stack de monitoramento e visualização de métricas operacionais.' },
            { id: 31, name: 'Ansible',                quadrant: 'devops', ring: 'assess', desc: 'Automação de configuração de servidores e infraestrutura.' },
            { id: 32, name: 'Jenkins',                quadrant: 'devops', ring: 'hold',   desc: 'CI legado; migrando para GitHub Actions e soluções mais modernas.' }
        ]
    };

    /* ======================================================
       SVG RADAR RENDERING
       ====================================================== */
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const SIZE   = 520;   // px (viewBox units)
    const CX     = SIZE / 2;
    const CY     = SIZE / 2;
    const MAXR   = SIZE / 2 - 12;

    // Maps para referências diretas dos elementos SVG
    const arcMap   = {};  // quadrantId → arc element
    const labelMap = {};  // quadrantId → label element
    const blipMap  = {};  // blipId     → blip group element

    function polarToCart(angleDeg, r) {
        const rad = (angleDeg - 90) * Math.PI / 180;
        return {
            x: CX + r * Math.cos(rad),
            y: CY + r * Math.sin(rad)
        };
    }

    function svgEl(tag, attrs) {
        const el = document.createElementNS(SVG_NS, tag);
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
        return el;
    }

    function buildRadarSVG(svg) {
        svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
        svg.setAttribute('xmlns', SVG_NS);

        const defs = svgEl('defs', {});

        // Clip path for each quadrant
        const clipAngles = [270, 0, 90, 180]; // start angle per quadrant (top-left, top-right, bot-right, bot-left)
        RADAR_DATA.quadrants.forEach((q, i) => {
            const startA = clipAngles[i];
            const endA   = startA + 90;
            const p1 = polarToCart(startA, MAXR + 20);
            const p2 = polarToCart(endA, MAXR + 20);
            const clip = svgEl('clipPath', { id: `clip-${q.id}` });
            const path = svgEl('path', {
                d: `M ${CX} ${CY} L ${p1.x} ${p1.y} A ${MAXR + 20} ${MAXR + 20} 0 0 1 ${p2.x} ${p2.y} Z`
            });
            clip.appendChild(path);
            defs.appendChild(clip);
        });

        svg.appendChild(defs);

        // Background
        const bg = svgEl('rect', { x: 0, y: 0, width: SIZE, height: SIZE, fill: '#1a0d2e' });
        svg.appendChild(bg);

        // Rings (dark arcs)
        RADAR_DATA.rings.slice().reverse().forEach((ring, ri) => {
            const r = ring.outerR * MAXR;
            const circle = svgEl('circle', {
                cx: CX, cy: CY, r,
                fill: 'none',
                stroke: 'rgba(255,255,255,0.08)',
                'stroke-width': '1'
            });
            svg.appendChild(circle);

            // Subtle filled area per ring (very light)
            const fillR = svgEl('circle', {
                cx: CX, cy: CY, r,
                fill: `rgba(255,255,255,${0.012 * (RADAR_DATA.rings.length - ri)})`,
                stroke: 'none'
            });
            svg.insertBefore(fillR, circle);
        });

        // Ring labels (shown on the divider lines)
        RADAR_DATA.rings.forEach(ring => {
            const r = ring.outerR * MAXR;
            const prevR = (RADAR_DATA.rings[RADAR_DATA.rings.indexOf(ring) - 1]?.outerR || 0) * MAXR;
            const midR = (r + prevR) / 2;
            const labelEl = svgEl('text', {
                x: CX + 4,
                y: CY - midR,
                fill: 'rgba(255,255,255,0.18)',
                'font-size': '10',
                'font-weight': '600',
                'letter-spacing': '1',
                'text-anchor': 'middle',
                'font-family': 'system-ui, sans-serif',
                'text-transform': 'uppercase'
            });
            labelEl.textContent = ring.label.toUpperCase();
            svg.appendChild(labelEl);
        });

        // Divider lines (cross)
        ['h', 'v'].forEach(dir => {
            const line = svgEl('line', {
                x1: dir === 'h' ? 0 : CX,
                y1: dir === 'h' ? CY : 0,
                x2: dir === 'h' ? SIZE : CX,
                y2: dir === 'h' ? CY : SIZE,
                stroke: 'rgba(255,255,255,0.12)',
                'stroke-width': '1.5',
                'stroke-dasharray': '4 4'
            });
            svg.appendChild(line);
        });

        // Quadrant tinted arcs (colored overlay per quadrant)
        const arcAngles = [270, 0, 90, 180];
        RADAR_DATA.quadrants.forEach((q, i) => {
            const startA = arcAngles[i];
            const endA   = startA + 90;
            const outerR = MAXR;
            const p1 = polarToCart(startA, outerR);
            const p2 = polarToCart(endA, outerR);
            const arc = svgEl('path', {
                d: `M ${CX} ${CY} L ${p1.x} ${p1.y} A ${outerR} ${outerR} 0 0 1 ${p2.x} ${p2.y} Z`,
                fill: q.color,
                opacity: '0.045'
            });
            svg.appendChild(arc);
            arcMap[q.id] = arc;  // guarda referência direta
        });

        // Quadrant labels
        const qlPositions = [
            { x: CX - MAXR * 0.52, y: CY - MAXR * 0.88, anchor: 'middle' },
            { x: CX + MAXR * 0.52, y: CY - MAXR * 0.88, anchor: 'middle' },
            { x: CX + MAXR * 0.52, y: CY + MAXR * 0.92, anchor: 'middle' },
            { x: CX - MAXR * 0.52, y: CY + MAXR * 0.92, anchor: 'middle' }
        ];
        RADAR_DATA.quadrants.forEach((q, i) => {
            const pos  = qlPositions[i];
            const text = svgEl('text', {
                x: pos.x,
                y: pos.y,
                fill: q.color,
                'font-size': '12',
                'font-weight': '700',
                'letter-spacing': '0.5',
                'text-anchor': pos.anchor,
                'font-family': 'system-ui, sans-serif'
            });
            text.textContent = q.label.toUpperCase();
            svg.appendChild(text);
            labelMap[q.id] = text;  // guarda referência direta
        });

        // --- Blips ---
        // We need to spread blips inside each ring+quadrant zone
        // Seed positions deterministically to avoid overlap
        const blipGroups = {};
        RADAR_DATA.blips.forEach(blip => {
            const key = `${blip.quadrant}-${blip.ring}`;
            if (!blipGroups[key]) blipGroups[key] = [];
            blipGroups[key].push(blip);
        });

        // Mapeamento dos ângulos para posicionamento dos blips.
        // arcAngles[i] define onde a arc COMEÇA,
        // então os blips devem cair no mesmo intervalo angular.
        // pesquisa  → arc: 270→360 → blips: 270–360 (top-left)
        // tecnicas  → arc:   0→90  → blips:   0–90  (top-right)
        // tecnologias → arc: 90→180 → blips: 90–180 (bottom-right)
        // devops    → arc: 180→270 → blips: 180–270 (bottom-left)
        const quadrantAngles = [
            { start: 270, end: 360 },  // pesquisa    (top-left)
            { start: 0,   end: 90  },  // tecnicas    (top-right)
            { start: 90,  end: 180 },  // tecnologias (bottom-right)
            { start: 180, end: 270 }   // devops      (bottom-left)
        ];

        RADAR_DATA.blips.forEach(blip => {
            const qi = RADAR_DATA.quadrants.findIndex(q => q.id === blip.quadrant);
            const ri = RADAR_DATA.rings.findIndex(r => r.id === blip.ring);
            const q  = RADAR_DATA.quadrants[qi];
            const ring = RADAR_DATA.rings[ri];
            const prevRing = RADAR_DATA.rings[ri - 1];

            const innerR = (prevRing ? prevRing.outerR : 0) * MAXR + 10;
            const outerR = ring.outerR * MAXR - 10;

            // Deterministic spread using blip id as seed
            const key = `${blip.quadrant}-${blip.ring}`;
            const idxInGroup = blipGroups[key].indexOf(blip);
            const total      = blipGroups[key].length;

            const angleRange = quadrantAngles[qi];
            const angleSpan  = angleRange.end - angleRange.start;
            const margin     = 10; // deg margin from edges
            const aStart     = angleRange.start + margin;
            const aEnd       = angleRange.end - margin;
            const aStep      = (aEnd - aStart) / Math.max(total, 1);
            const angle      = aStart + aStep * idxInGroup + aStep * 0.5;

            const rMid  = (innerR + outerR) / 2;
            const rJitter = (outerR - innerR) * 0.25;
            // Jitter using id mod
            const rOffset = ((blip.id * 7) % 11 - 5) / 5 * rJitter;
            const r = Math.max(innerR + 8, Math.min(outerR - 8, rMid + rOffset));

            const pos = polarToCart(angle, r);

            const g = svgEl('g', {
                'data-id': blip.id,
                'data-name': blip.name,
                'data-ring': blip.ring,
                'data-quadrant': blip.quadrant,
                'data-desc': blip.desc
            });
            g.setAttribute('class', 'radar-blip');  // separado para garantir classList

            const circle = svgEl('circle', {
                cx: pos.x,
                cy: pos.y,
                r: 7,
                fill: q.color,
                stroke: '#1a0d2e',
                'stroke-width': '1.5',
                opacity: '0.9'
            });

            // Label number inside blip
            const numLabel = svgEl('text', {
                x: pos.x,
                y: pos.y + 4,
                'text-anchor': 'middle',
                fill: '#1a0d2e',
                'font-size': '7',
                'font-weight': '800',
                'font-family': 'system-ui, sans-serif',
                'pointer-events': 'none',
                'user-select': 'none'
            });
            numLabel.textContent = blip.id;

            g.appendChild(circle);
            g.appendChild(numLabel);
            svg.appendChild(g);
            blipMap[blip.id] = g;  // guarda referência direta
        });
    }

    /* ======================================================
       LEGEND / TABS
       ====================================================== */
    function buildLegend(container) {
        // Tabs
        const tabsEl = container.querySelector('.radar-legend-tabs');
        const panels  = container.querySelector('.radar-legend-panels');

        RADAR_DATA.quadrants.forEach((q, qi) => {
            const tab = document.createElement('button');
            tab.className = 'radar-legend-tab' + (qi === 0 ? ' active' : '');
            tab.dataset.quadrant = q.id;
            tab.textContent = q.label;
            tabsEl.appendChild(tab);

            // Panel
            const panel = document.createElement('div');
            panel.className = 'radar-quadrant-panel' + (qi === 0 ? ' active' : '');
            panel.dataset.quadrant = q.id;

            RADAR_DATA.rings.forEach(ring => {
                const blipsInGroup = RADAR_DATA.blips.filter(b => b.quadrant === q.id && b.ring === ring.id);
                if (blipsInGroup.length === 0) return;

                const group = document.createElement('div');
                group.className = 'radar-ring-group';

                const lbl = document.createElement('p');
                lbl.className = `radar-ring-label ${ring.id}`;
                lbl.textContent = ring.label.toUpperCase();
                group.appendChild(lbl);

                blipsInGroup.forEach(blip => {
                    const item = document.createElement('div');
                    item.className = 'radar-blip-item';
                    item.dataset.blipId = blip.id;

                    const dot = document.createElement('span');
                    dot.className = 'radar-blip-dot';
                    dot.style.background = q.color;

                    const name = document.createElement('span');
                    name.className = 'radar-blip-name';
                    name.textContent = `${blip.id}. ${blip.name}`;

                    item.appendChild(dot);
                    item.appendChild(name);
                    group.appendChild(item);
                });

                panel.appendChild(group);
            });

            panels.appendChild(panel);
        });

        // Tab switching
        tabsEl.addEventListener('click', e => {
            const tab = e.target.closest('.radar-legend-tab');
            if (!tab) return;
            const qid = tab.dataset.quadrant;

            tabsEl.querySelectorAll('.radar-legend-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            panels.querySelectorAll('.radar-quadrant-panel').forEach(p => p.classList.remove('active'));
            panels.querySelector(`.radar-quadrant-panel[data-quadrant="${qid}"]`).classList.add('active');

            // Highlight quadrant on SVG
            highlightQuadrant(qid);
        });
    }

    /* ======================================================
       INTERACTIONS
       ====================================================== */
    function highlightQuadrant(qid) {
        // Arcs — usa referências diretas do arcMap
        RADAR_DATA.quadrants.forEach(q => {
            if (arcMap[q.id]) {
                arcMap[q.id].setAttribute('opacity', q.id === qid ? '0.14' : '0.03');
            }
        });

        // Labels — usa referências diretas do labelMap
        RADAR_DATA.quadrants.forEach(q => {
            if (labelMap[q.id]) {
                labelMap[q.id].setAttribute('opacity', q.id === qid ? '1' : '0.3');
                labelMap[q.id].setAttribute('font-size', q.id === qid ? '13' : '11');
            }
        });

        // Blips — usa referências diretas do blipMap
        RADAR_DATA.blips.forEach(blip => {
            if (blipMap[blip.id]) {
                blipMap[blip.id].style.opacity = blip.quadrant === qid ? '1' : '0.15';
            }
        });
    }

    function setupTooltip(svg, tooltip) {
        svg.addEventListener('mousemove', e => {
            const blipEl = e.target.closest('.radar-blip');
            if (!blipEl) {
                tooltip.classList.remove('visible');
                return;
            }

            const ring = RADAR_DATA.rings.find(r => r.id === blipEl.dataset.ring);
            tooltip.querySelector('.radar-tooltip-name').textContent = blipEl.dataset.name;
            tooltip.querySelector('.radar-tooltip-ring').textContent  = ring ? ring.label : '';
            tooltip.querySelector('.radar-tooltip-ring').className    = `radar-tooltip-ring ${blipEl.dataset.ring}`;
            tooltip.querySelector('.radar-tooltip-desc').textContent  = blipEl.dataset.desc;

            const vw = window.innerWidth;
            const vh = window.innerHeight;
            let lx = e.clientX + 14;
            let ly = e.clientY - 80;
            if (lx + 280 > vw) lx = e.clientX - 280;
            if (ly < 10) ly = e.clientY + 16;

            tooltip.style.left = lx + 'px';
            tooltip.style.top  = ly + 'px';
            tooltip.classList.add('visible');
        });

        svg.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    }

    function setupListInteraction(svg, legendContainer) {
        legendContainer.addEventListener('click', e => {
            const item = e.target.closest('.radar-blip-item');
            if (!item) return;
            const bid = item.dataset.blipId;

            // Usa referência direta do blipMap
            RADAR_DATA.blips.forEach(blip => {
                if (blipMap[blip.id]) blipMap[blip.id].style.opacity = '0.15';
            });

            const blipEl = blipMap[bid];
            if (blipEl) {
                blipEl.style.opacity = '1';
                const circle = blipEl.querySelector('circle');
                if (circle) {
                    circle.setAttribute('r', '11');
                    setTimeout(() => circle.setAttribute('r', '7'), 300);
                }
            }

            legendContainer.querySelectorAll('.radar-blip-item').forEach(i => i.classList.remove('highlighted-list'));
            item.classList.add('highlighted-list');
        });
    }

    /* ======================================================
       INIT
       ====================================================== */
    function init() {
        const svg = document.getElementById('radar-svg');
        if (!svg) return;

        buildRadarSVG(svg);

        const section = document.querySelector('.radar-section');
        const legendContainer = section ? section.querySelector('.radar-legend') : null;

        if (legendContainer) {
            buildLegend(legendContainer);
            setupListInteraction(svg, legendContainer);

            // Highlight first quadrant on load
            highlightQuadrant(RADAR_DATA.quadrants[0].id);
        }

        // Tooltip
        let tooltip = document.querySelector('.radar-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'radar-tooltip';
            tooltip.innerHTML = `
                <div class="radar-tooltip-name"></div>
                <div class="radar-tooltip-ring"></div>
                <div class="radar-tooltip-desc"></div>
                <div class="radar-tooltip-arrow"></div>
            `;
            document.body.appendChild(tooltip);
        }

        setupTooltip(svg, tooltip);

        // Scroll-reveal animation for section
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            const radarSection = document.querySelector('.radar-section');
            if (radarSection) {
                radarSection.style.opacity = '0';
                radarSection.style.transform = 'translateY(40px)';
                radarSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(radarSection);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
