FROM nginx:alpine

# O site é estático: index.html na raiz + assets em frontend/,
# mesma estrutura publicada no GitHub Pages.
COPY index.html /usr/share/nginx/html/index.html
COPY frontend/ /usr/share/nginx/html/frontend/

EXPOSE 80
