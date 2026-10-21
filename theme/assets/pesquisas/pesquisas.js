document.addEventListener('DOMContentLoaded', function () {
    var busca = document.getElementById('pesquisas-busca');
    var vazio = document.getElementById('pesquisas-vazio');
    if (!busca) return;

    var colunas = document.querySelectorAll('.pesquisa-col');

    busca.addEventListener('input', function () {
        var termo = busca.value.trim().toLowerCase();
        var visiveis = 0;

        colunas.forEach(function (col) {
            var corresponde = col.textContent.toLowerCase().indexOf(termo) !== -1;
            col.hidden = !corresponde;
            if (corresponde) visiveis++;
        });

        vazio.hidden = visiveis !== 0;
    });
});
