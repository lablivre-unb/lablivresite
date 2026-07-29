# Guia: Como Adicionar Itens nas Seções da Home

Este guia explica como adicionar novos itens (projetos, publicações, treinamentos, capacitação) nas seções dinâmicas da página home.

## 📋 Índice

- [Projetos de Pesquisa](#projetos-de-pesquisa)
- [Publicações](#publicações)
- [Linhas de Pesquisa (Treinamentos)](#linhas-de-pesquisa-treinamentos)
- [Capacitação](#capacitação)
- [Referência do Template](#referência-do-template)
- [Instalação e Configuração do Plugin](#instalação-e-configuração-do-plugin)
- [Como Testar e Executar Localmente](#como-testar-e-executar-localmente)

---

## Projetos de Pesquisa

### Onde criar:
```
docs/projects/nome-do-projeto.md
```

### Estrutura do arquivo:

```yaml
---
title: "Nome do Projeto"
image: "assets/img/nome-da-imagem.png"
link: "https://link-do-projeto.com"
order: 1
description: "Descrição do projeto que aparece no card"
financing: "Fonte de financiamento"  # Opcional
partner: "Nome do parceiro"          # Opcional
text_logo: "Nome"                    # Opcional: se não tiver imagem, mostra texto
---
```

### Campos disponíveis:

| Campo | Obrigatório | Descrição | Onde aparece no template |
|-------|-------------|-----------|--------------------------|
| `title` | Sim | Título do projeto | Linha 33: `{{ proj.title }}` |
| `description` | Sim | Descrição do projeto | Linha 34: `{{ proj.description }}` |
| `link` | Sim | URL do projeto | Linha 45: `{{ proj.link }}` |
| `image` | Condicional | Imagem do projeto | Linha 28: `{{ proj.image }}` |
| `text_logo` | Condicional | Texto alternativo se não tiver imagem | Linha 26: `{{ proj.text_logo }}` |
| `order` | Não | Ordem de exibição (menor = primeiro) | Usado pelo plugin para ordenar |
| `financing` | Não | Fonte de financiamento | Linha 37: `{{ proj.financing }}` |
| `partner` | Não | Nome do parceiro | Linha 42: `{{ proj.partner }}` |

### Exemplo completo:

```yaml
---
title: "Brasil Participativo"
image: "assets/img/bp-logo.png"
link: "https://brasilparticipativo.presidencia.gov.br/"
order: 1
description: "O Brasil Participativo é reconhecido como a maior experiência de participação social digital do Poder Executivo."
financing: "Presidência da República"
partner: "Secretaria Nacional de Participação Social"
---
```

### Referência no template:
- **Arquivo:** `theme/home.html`
- **Linhas:** 8-59
- **Loop:** `{% for proj in projects %}` (linha 21)

---

## Publicações

### Onde criar:
```
docs/publications/ano-nome-publicacao.md
```

### Estrutura do arquivo:

```yaml
---
title: "Título da Publicação"
date: 2025-01-15
link: "https://link-para-publicacao.com"
description: "Descrição da publicação"
order: 1
image: "assets/img/publications/nome-imagem.png"  # Opcional
type: ebook                                       # Opcional: "ebook" para animação especial
venue: "Nome do evento/revista"                  # Opcional
template: publicacao.html                         # Recomendado: renderiza o texto em uma página
authors:                                          # Opcional
  - "Autor 1"
  - "Autor 2"
---

Aqui começa a escrita de **todo o seu artigo** utilizando a flexibilidade do *Markdown*! As informações do cabeçalho não precisam ser repetidas pois entram no topo da tela sozinhas.
```

### Campos disponíveis:

| Campo | Obrigatório | Descrição | Onde aparece no template |
|-------|-------------|-----------|--------------------------|
| `title` | Sim | Título da publicação | Card (`home.html`) e título do artigo (`publicacao.html`) |
| `date` | Sim | Data (formato: YYYY-MM-DD) | Card (formatado) e subtítulo do artigo (`publicacao.html`) |
| `link` | Sim | URL da publicação original | Botão "Ler Artigo Original" no rodapé da página |
| `template`| Recomendado | Usar `publicacao.html` | Informa que ao clicar no item ele abre o artigo formatado |
| `description` | Sim | Descrição da publicação | Resumo no card da Home |
| `order` | Não | Ordem de exibição | Usado pelo plugin para ordenar |
| `image` | Não | Imagem da publicação | Ícone do card e cabeçalho do artigo |
| `type` | Não | `"ebook"`, mostra animação especial | Animação do Card na Home |
| `venue` | Não | Nome do evento/revista (em negrito) | Card da Home |
| `authors` | Não | Lista de autores | Subtítulo do artigo (`publicacao.html`) |

### Exemplo completo:

```yaml
---
title: "Dinheiro Público, Código Público"
date: 2019-01-01
authors:
  - "Free Software Foundation Europe"
  - "LabLivre (Tradução)"
link: "https://download.fsfe.org/campaigns/pmpc/PMPC-Modernising-with-Free-Software.pt_br.pdf"
image: "assets/img/publications/dinheiropublico-publication.png"
order: 2
template: publicacao.html
description: "Tradução para o português brasileiro da publicação da FSFE."
---

## Modernização Exige Software Livre

A transição para um governo digital aberto...
Aqui você pode usar a sintaxe **Markdown** para desenvolver ou sumarizar os pontos da publicação!
```

### Referência no template:
- **Arquivo:** `theme/home.html`
- **Linhas:** 142-208
- **Loop:** `{% for pub in publications %}` (linha 152)

---

## Linhas de Pesquisa (Treinamentos)

### Onde criar:
```
docs/treinamentos/nome-da-linha.md
```

### Estrutura do arquivo:

```yaml
---
title: "Nome da Linha de Pesquisa"
order: 1
description: "Descrição da linha de pesquisa"
---
```

### Campos disponíveis:

| Campo | Obrigatório | Descrição | Onde aparece no template |
|-------|-------------|-----------|--------------------------|
| `title` | Sim | Título da linha de pesquisa | Linha 123: `{{ item.title }}` |
| `description` | Sim | Descrição da linha | Linha 125: `{{ item.description }}` |
| `order` | Não | Ordem de exibição | Usado pelo plugin para ordenar |

### Exemplo completo:

```yaml
---
title: "DevOps"
order: 1
description: "Estudo e aplicação de práticas, estruturas de times que integram desenvolvimento e operações para melhorar a entrega contínua, qualidade e confiabilidade de software."
---
```

### Referência no template:
- **Arquivo:** `theme/home.html`
- **Linhas:** 112-131
- **Loop:** `{% for item in treinamentos %}` (linha 120)

---

## Capacitação

### Onde criar:
```
docs/capacitacao/nome-do-programa.md
```

### Estrutura do arquivo:

```yaml
---
title: "Nome do Programa"
image: "assets/img/nome-logo.png"
order: 1
description: "Descrição do programa de capacitação"
image_class: "capacitacao-logo-contain"  # Opcional: classe CSS para a imagem
financing: "Fonte de financiamento"      # Opcional
link: "https://link-unico.com"          # Opcional: link único
links:                                   # Opcional: múltiplos links
  - text: "Texto do link 1"
    url: "https://link1.com"
  - text: "Texto do link 2"
    url: "https://link2.com"
---
```

### Campos disponíveis:

| Campo | Obrigatório | Descrição | Onde aparece no template |
|-------|-------------|-----------|--------------------------|
| `title` | Sim | Título do programa | Linha 86: `{{ item.title }}` |
| `description` | Sim | Descrição do programa | Linha 88: `{{ item.description }}` |
| `image` | Sim | Logo/imagem do programa | Linha 82: `{{ item.image }}` |
| `order` | Não | Ordem de exibição | Usado pelo plugin para ordenar |
| `image_class` | Não | Classe CSS para a imagem | Linha 83: `{{ item.image_class }}` |
| `financing` | Não | Fonte de financiamento | Linha 92: `{{ item.financing }}` |
| `link` | Condicional | Link único (se não usar `links`) | Linha 102: `{{ item.link }}` |
| `links` | Condicional | Lista de links (se não usar `link`) | Linhas 95-100: `{% for link in item.links %}` |

### Exemplo com link único:

```yaml
---
title: "Programa de Capacitação"
image: "assets/img/programa-logo.png"
order: 1
description: "Descrição do programa"
link: "https://programa.com"
financing: "FAPDF"
---
```

### Exemplo com múltiplos links:

```yaml
---
title: "Big Open Source Siblings (BOSS)"
image: "assets/img/boss-logo.png"
image_class: "capacitacao-logo-contain"
order: 2
description: "A iniciativa BOSS promove a inclusão de pessoas de grupos sub-representados na tecnologia."
links:
  - text: "Prêmio →"
    url: "https://noticias.unb.br/..."
  - text: "Saiba mais →"
    url: "https://github.com/..."
---
```

### Referência no template:
- **Arquivo:** `theme/home.html`
- **Linhas:** 69-110
- **Loop:** `{% for item in capacitacao %}` (linha 78)

---

## Referência do Template

### Como funciona:

1. **Plugin coleta os dados:** O plugin `publications` (em `plugins/publications/plugin.py`) coleta automaticamente todos os arquivos `.md` das pastas:
   - `docs/projects/` → variável `projects`
   - `docs/publications/` → variável `publications`
   - `docs/treinamentos/` → variável `treinamentos`
   - `docs/capacitacao/` → variável `capacitacao`

2. **Template renderiza:** O template `theme/home.html` usa loops Jinja2 para renderizar os dados:
   - `{% for proj in projects %}` - Projetos
   - `{% for pub in publications %}` - Publicações
   - `{% for item in treinamentos %}` - Treinamentos
   - `{% for item in capacitacao %}` - Capacitação

3. **Uso de Templates:** Para visualizar arquivos Markdown como páginas completas e bem formatadas em postagens (como no caso das **Publicações**), adicione `template: publicacao.html` ao frontmatter. Se omitido, o plugin pode detectar as urls com uso interno das macros, mas sem estilo de blog nativo.

### Como verificar quais campos usar:

1. Abra o arquivo `theme/home.html`
2. Encontre a seção desejada (veja linhas acima)
3. Procure por `{{ item.campo }}` ou `{{ proj.campo }}` ou `{{ pub.campo }}`
4. Esses são os campos que você pode usar no frontmatter do `.md`

### Dicas:

- ✅ **Ordem:** Use o campo `order` para controlar a ordem de exibição (menor número aparece primeiro)
- ✅ **Opcionais:** Campos marcados como opcionais podem ser omitidos
- ✅ **Imagens:** Coloque as imagens em `theme/assets/img/` ou `docs/assets/img/`
- ✅ **Links:** Use `link` para um único link ou `links` para múltiplos links (apenas em capacitação)
- ✅ **Data:** Para publicações, a data é formatada automaticamente pelo plugin (ex: "Janeiro de 2025")

---

## Instalação e Configuração do Plugin

O plugin responsável por catalogar as pastas (`publications`, `projects`, `capacitacao`, `treinamentos`) foi desenvolvido especificamente para o LabLivre (ambiente local). Ele injeta todo o conteúdo nas tags do tema automaticamente.

### 1. Estrutura de Arquivos Obrigatória
Certifique-se de que a pasta do plugin não seja apagada da raiz do projeto MkDocs:
```text
plugins/
└── publications/
    ├── __init__.py
    └── plugin.py
```

### 2. Habilitação no `mkdocs.yml`
Para o MkDocs reconhecer a existência do script e transformá-lo nos cards HTML, o arquivo principal de configuração declara a ativação do plugin:

```yaml
plugins:
  - search
  - publications: # <-- Nosso plugin local
      collections:
        - name: publications
          path: publications/
          format_date: true
        - name: projects
          path: projects/
          exclude:
            - gsoc-projects/
        - name: capacitacao
          path: capacitacao/
        - name: treinamentos
          path: treinamentos/
```

- **collections**: Para criar novas vitrines dinâmicas para o site, basta adicionar um `name` (variável recebida no HTML via Jinja2) e o `path` correspondente (pasta oficial localizada dentro de `docs/` onde ficam os metadados do `.md`).
- **format_date**: Traduz datas numéricas do Frontmatter para texto formatado em português (Ex: "Julho de 2025").
- **exclude**: Lista de strings de diretórios que o plugin *não deve* registrar para não invadir outros domínios sem a formatação prevista.

---

## Exemplo Rápido

### Adicionar um novo projeto:

1. Crie: `docs/projects/meu-projeto.md`
2. Adicione:
```yaml
---
title: "Meu Projeto"
image: "assets/img/meu-projeto.png"
link: "https://meuprojeto.com"
order: 10
description: "Descrição do meu projeto"
---
```
3. Pronto! O projeto aparecerá automaticamente na home.

---

## Como Testar e Executar Localmente

Para visualizar suas alterações (como a adição de novas publicações e projetos) na prática antes de aplicá-las em produção, você deve testar o sistema na sua máquina.

### 1. Instalação das Dependências
Na raiz do projeto (mesma pasta onde está o `mkdocs.yml`), execute o comando para instalar as ferramentas essenciais via gerenciador de pacotes do Python:

```bash
pip install -r requirements.txt
```

### 2. Rodando o Servidor de Desenvolvimento
Com as dependências instaladas, inicialize localmente a aplicação com:

```bash
mkdocs serve
```

Pronto! Abra o seu navegador no link que aparecer no terminal (geralmente [http://127.0.0.1:8000/](http://127.0.0.1:8000/)).
Graças ao *Live Reload* nativo do framework, qualquer edição que você realizar e salvar nos arquivos Markdown será automaticamente recarregada no navegador, facilitando a visualização rápida e progressiva!

---

**Última atualização:** Este guia reflete a estrutura atual do projeto. Para verificar campos atualizados, consulte sempre o template `theme/home.html`.


