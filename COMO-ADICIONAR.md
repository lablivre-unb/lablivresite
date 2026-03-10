# Guia: Como Adicionar Itens nas Seções da Home

Este guia explica como adicionar novos itens (projetos, publicações, treinamentos, capacitação) nas seções dinâmicas da página home.

## 📋 Índice

- [Projetos de Pesquisa](#projetos-de-pesquisa)
- [Publicações](#publicações)
- [Linhas de Pesquisa (Treinamentos)](#linhas-de-pesquisa-treinamentos)
- [Capacitação](#capacitação)
- [Referência do Template](#referência-do-template)

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

## Projetos GSoC

### Onde criar:
```
docs/gsoc-projects/proposal-N.md
```

### Estrutura do arquivo:

```yaml
---
title: "Título do projeto"
order: 1                        # define a ordem (Proposal 1, 2, 3…)
size: "Medium (175 hours)"      # ou "Large (350 hours)"
difficulty: "Medium"            # ou "Difficult"
subtitle: "Frase opcional abaixo do título"
external_link: "https://link-externo.com"      # opcional
external_label: "Texto do botão externo"       # ex.: "Visitar GovHub"

outcomes:
  - "Resultado esperado 1"
  - "Resultado esperado 2"

required_skills:
  - "Languages: Python, SQL"
  - "Knowledge: ..."
  - "Tools: ..."

nice_to_have:
  - "Skill extra 1"
  - "Skill extra 2"

mentors:
  - "Nome do mentor (@github)"
  - "Outro mentor (@github)"
---

Texto longo da descrição do projeto em Markdown.

Pode ter vários parágrafos separados por linhas em branco.
```

### Campos disponíveis:

| Campo            | Obrigatório | Descrição                                                   | Onde aparece no template                         |
|------------------|-------------|-------------------------------------------------------------|--------------------------------------------------|
| `title`          | Sim         | Título da proposal                                         | Título do card (`{{ project.title }}`)           |
| `order`          | Sim         | Ordem de exibição (1, 2, 3…)                              | Define `Proposal {{ ns.idx }}`                   |
| `size`           | Sim         | Tamanho (ex.: Medium/ Large + horas)                      | Badge de tamanho (`.projeto-size`)               |
| `difficulty`     | Sim         | Nível (Medium / Difficult)                                | Badge de dificuldade (`.projeto-difficulty-*`)   |
| `subtitle`       | Não         | Frase logo abaixo do título                               | `{{ project.subtitle }}`                         |
| `external_link`  | Não         | URL do botão no final do card                             | `href` do botão preto                            |
| `external_label` | Não         | Texto do botão                                             | `{{ project.external_label }}`                   |
| `outcomes`       | Não         | Lista de resultados esperados                             | Lista em “Expected Outcomes”                     |
| `required_skills`| Não         | Lista de habilidades requeridas                           | Seção “Required Skills”                          |
| `nice_to_have`   | Não         | Lista de habilidades desejáveis                           | Seção “Nice to Have Skills”                      |
| `mentors`        | Não         | Lista de mentores                                          | Chips com os nomes na seção “Mentors”           |

### Comportamento da página

- A página `docs/projeto-gsoc/index.md` usa o template `projeto-gsoc.html`.
- O template percorre o `nav` do MkDocs, encontra todas as páginas sob `docs/gsoc-projects/` e monta os cards dinamicamente.
- O texto **abaixo do frontmatter** de cada `proposal-N.md` é renderizado como parágrafos dentro do card (corpo da descrição).

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
authors:                                          # Opcional
  - "Autor 1"
  - "Autor 2"
---
```

### Campos disponíveis:

| Campo | Obrigatório | Descrição | Onde aparece no template |
|-------|-------------|-----------|--------------------------|
| `title` | Sim | Título da publicação | Linha 183: `{{ pub.title }}` |
| `date` | Sim | Data (formato: YYYY-MM-DD) | Linha 182: `{{ pub.date_formatted }}` (formatado pelo plugin) |
| `link` | Sim | URL da publicação | Linha 154: `{{ pub.link }}` |
| `description` | Sim | Descrição da publicação | Linha 186: `{{ pub.description }}` |
| `order` | Não | Ordem de exibição | Usado pelo plugin para ordenar |
| `image` | Não | Imagem da publicação | Linhas 160, 173: `{{ pub.image }}` |
| `type` | Não | Se for `"ebook"`, mostra animação especial | Linha 157: `{% if pub.type == 'ebook' %}` |
| `venue` | Não | Nome do evento/revista (aparece em negrito) | Linha 185: `{{ pub.venue }}` |
| `authors` | Não | Lista de autores | Não aparece no template, mas pode ser usado futuramente |

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
description: "Tradução para o português brasileiro da publicação da FSFE."
---
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

3. **Não precisa especificar template:** Os arquivos `.md` não precisam ter `template:` no frontmatter. O plugin detecta automaticamente pela URL (pasta onde está o arquivo).

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

**Última atualização:** Este guia reflete a estrutura atual do projeto. Para verificar campos atualizados, consulte sempre o template `theme/home.html`.


