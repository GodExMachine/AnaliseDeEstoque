const tbody = document.getElementById('body');

let dadosProcessados = {};

if (typeof dados === 'undefined') {
    console.error('dados não carregado');
} else {

    dados.forEach(item => {
        let codigo = item.codigo;

        if (agrupamentos[codigo]) {
            codigo = agrupamentos[codigo];
        }

        if (codigo === "IGNORAR") return;

        if (!dadosProcessados[codigo]) {
            dadosProcessados[codigo] = {
                codigo,
                P: 0,
                M: 0,
                G: 0,
                GG: 0,
                EX: 0
            };
        }

        dadosProcessados[codigo].P += Number(item.P) || 0;
        dadosProcessados[codigo].M += Number(item.M) || 0;
        dadosProcessados[codigo].G += Number(item.G) || 0;
        dadosProcessados[codigo].GG += Number(item.GG) || 0;
        dadosProcessados[codigo].EX += Number(item.EX) || 0;
    });

    const listaFinal = Object.values(dadosProcessados);

    listaFinal.forEach(item => {
        const tr = document.createElement('tr');


        const grupo = grupos[item.codigo] || "-";
        const exValor = trocaEX.includes(item.codigo) ? "X" : item.EX;

        tr.innerHTML = `
    <td>${item.codigo}</td>
    <td>${grupo}</td>
    <td>${item.P}</td>
    <td>${item.M}</td>
    <td>${item.G}</td>
    <td>${item.GG}</td>
    <td>${exValor}</td>
`;

        tbody.appendChild(tr);
    });
}