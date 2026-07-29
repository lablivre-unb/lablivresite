# Site do Lab Livre

Site oficial do **Lab Livre** — laboratório de competência em software livre da Universidade de Brasília (UnB).

🌐 **[lablivre.unb.br](https://lablivre.unb.br)**

---

## Tecnologias

- **[MkDocs](https://www.mkdocs.org/)** — gerador de site estático
- **Tema customizado** — templates Jinja2 em `theme/` com Bootstrap 5 e Swiper.js
- **Plugin customizado** — coleta metadados dos arquivos `.md` e injeta nas páginas automaticamente
- **GitHub Actions** — deploy contínuo para GitHub Pages a cada push na `main`

---

## Estrutura do Projeto

```
lablivresite/
├── docs/                    # Conteúdo em Markdown
│   ├── index.md             # Página inicial
│   ├── sobre/               # Página Sobre
│   ├── capacitacao/         # Programas de capacitação
│   │   └── index.md         # Página dedicada de Capacitação
│   ├── projects/            # Projetos de pesquisa
│   ├── publications/        # Publicações científicas
│   ├── treinamentos/        # Linhas de pesquisa
│   └── 404/                 # Página de erro customizada
├── theme/                   # Tema customizado
│   ├── main.html            # Layout base (navbar + footer)
│   ├── home.html            # Template da home
│   ├── sobre.html           # Template da página Sobre
│   ├── capacitacao.html     # Template da página Capacitação
│   ├── publicacao.html      # Template de publicação individual
│   └── assets/              # CSS, JS e imagens do tema
│       ├── navbar.css / navbar.js
│       ├── footer.css
│       ├── home/
│       ├── capacitacao/
│       ├── publicacao/
│       ├── sobre/
│       └── img/
├── plugins/                 # Plugin MkDocs local
│   └── publications/
│       └── plugin.py        # Coleta e injeta metadados das coleções
├── mkdocs.yml               # Configuração do MkDocs
└── requirements.txt         # Dependências Python
```

---

## Rodando Localmente

**Pré-requisitos:** Python 3.10+

```bash
# 1. Clone o repositório
git clone https://github.com/lablivre-unb/lablivresite.git
cd lablivresite

# 2. Crie o ambiente virtual
python3 -m venv .venv

# 3. Instale as dependências
.venv/bin/pip install -r requirements.txt

# 4. Suba o servidor de desenvolvimento
.venv/bin/mkdocs serve
```

Acesse **http://127.0.0.1:8000** — o live reload recarrega automaticamente ao salvar qualquer arquivo.

---

## Como Adicionar Conteúdo

Cada seção dinâmica do site é alimentada por arquivos `.md` com metadados em frontmatter YAML. Basta criar o arquivo na pasta correta e o plugin cuida do resto.

### Projetos — `docs/projects/nome.md`

```yaml
---
title: "Nome do Projeto"
image: "assets/img/logo.png"
link: "https://link-do-projeto.com"
order: 1
description: "Descrição do projeto."
financing: "Fonte de financiamento"   # opcional
partner: "Nome do parceiro"           # opcional
---
```

### Publicações — `docs/publications/ano-nome.md`

```yaml
---
title: "Título da Publicação"
date: 2025-01-15
link: "https://link-da-publicacao.com"
description: "Resumo da publicação."
order: 1
image: "assets/img/publications/capa.png"  # opcional
type: ebook                                 # opcional: anima o card
venue: "Nome do evento/revista"             # opcional
authors:                                    # opcional
  - "Autor 1"
  - "Autor 2"
template: publicacao.html
---

Conteúdo do artigo em **Markdown**...
```

### Capacitação — `docs/capacitacao/nome.md`

```yaml
---
title: "Nome do Programa"
image: "assets/img/logo.png"
order: 1
description: "Descrição do programa."
financing: "Fonte"          # opcional
badge: "Em breve"           # opcional: exibe badge na página de Capacitação
highlights:                 # opcional: lista de destaques
  - "💰 100% gratuita"
  - "🗓️ 8 meses"
link: "https://..."         # opcional: link único
links:                      # opcional: múltiplos links
  - text: "Saiba mais →"
    url: "https://..."
---
```

### Linhas de Pesquisa — `docs/treinamentos/nome.md`

```yaml
---
title: "Nome da Linha"
order: 1
description: "Descrição da linha de pesquisa."
---
```

> **Dica:** use o campo `order` para controlar a ordem de exibição (menor número aparece primeiro).

---

## Deploy

O deploy é automático via GitHub Actions. Todo push na branch `main` dispara o workflow `.github/workflows/ci.yml` que:

1. Instala as dependências
2. Executa `mkdocs build`
3. Publica o conteúdo de `site/` no GitHub Pages com o domínio `lablivre.unb.br`

---

## Licença

O conteúdo deste site está licenciado sob [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
