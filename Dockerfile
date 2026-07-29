FROM python:3.12-slim

WORKDIR /app

# Dependências primeiro, em camada própria: só reinstala quando o
# requirements.txt ou o plugin mudam. O requirements.txt já instala o
# plugin local (-e ./plugins), então plugins/ precisa existir aqui.
COPY requirements.txt ./
COPY plugins/ ./plugins/
RUN pip install --no-cache-dir -r requirements.txt

COPY mkdocs.yml ./
COPY docs/ ./docs/
COPY theme/ ./theme/

EXPOSE 8000

# -a 0.0.0.0 para o servidor responder de fora do container.
# --watch theme recarrega o navegador ao editar templates e CSS do tema
# (o mkdocs já observa docs/ e mkdocs.yml por padrão).
CMD ["mkdocs", "serve", "-a", "0.0.0.0:8000", "--watch", "theme"]
