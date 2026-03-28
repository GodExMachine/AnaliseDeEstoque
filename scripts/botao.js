const toggleLinhasExtras = document.getElementById('toggleLinhasExtras');

toggleLinhasExtras.addEventListener('change', function () {
    if (this.checked) {
        console.log("Linhas extras ligadas");

    } else {
        console.log("Linhas extras desligadas");

    }
});




document.getElementById('btnConfigGrupo').addEventListener('click', () => {
    window.location.href = '../agrupamentos.html';
});

document.getElementById('btnConfigDescricao').addEventListener('click', () => {
    window.location.href = '../grupos.html'

});


document.getElementById('btnConfigEX').addEventListener('click', () => {
    window.location.href = '../configEX.html';


});



const labelQtd = document.getElementById('labelQtd');

toggleLinhasExtras.addEventListener('change', () => {
    const ativo = toggleLinhasExtras.checked;

    qtdLinhasExtras.style.display = ativo ? 'inline-block' : 'none';
    labelQtd.style.display = ativo ? 'inline-block' : 'none';
});