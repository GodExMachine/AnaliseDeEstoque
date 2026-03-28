const fs = require('fs');
const { exec } = require('child_process');

const pasta = './dados';

if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta);
}

const filePath = 'dados.csv';
const data = fs.readFileSync(filePath, 'utf8');

const linhas = data.split('\n');
const header = linhas[0].split(';');

const faixas = {
    "02": ["P", "M", "G", "GG", "EX"],
    "03": ["P", "M", "G", "GG"],
    "04": ["UNI"],
    "05": ["PP", "P", "M", "G", "GG", "EX"],
    "06": ["1", "2", "3", "4"],
    "07": ["6", "8", "10", "12", "14"]
};

function limpa(valor) {
    return (valor || '').replace(/"/g, '').trim();
}

const qtdIndexes = [];
let faixaIndex = -1;
let linhaIndex = -1;

header.forEach((col, i) => {
    const c = limpa(col);

    if (c.startsWith('Qtd')) qtdIndexes.push(i);
    if (c === 'Faixa') faixaIndex = i;
    if (c.toLowerCase() === 'linha') linhaIndex = i;
});

const resumo = {};

for (let i = 1; i < linhas.length; i++) {
    if (!linhas[i].trim()) continue;

    const cols = linhas[i].split(';');

    const baseCodigo = limpa(cols[0]).substring(0, 6);
    const numero = parseInt(baseCodigo.split('.')[1]) || 0;

    let codigo = baseCodigo;

    if (numero < 500) {
        const linhaValor = limpa(cols[linhaIndex]);

        if (linhaValor === "01.7") {
            codigo += ".0.7";
        } else {
            const linha2 = linhaValor.substring(0, 2);
            if (linha2 === "02") codigo += ".1";
            else if (linha2 === "03") codigo += ".2";
            else if (linha2 === "04") codigo += ".3";
        }
    }

    const faixaCodigo = limpa(cols[faixaIndex]);
    const tamanhos = faixas[faixaCodigo] || [];

    if (!resumo[codigo]) {
        resumo[codigo] = { P: 0, M: 0, G: 0, GG: 0, EX: 0 };
    }

    const qtdBruto = qtdIndexes.map(idx => limpa(cols[idx] || ''));

    const numeros = qtdBruto
        .map(v => {
            const n = parseInt(v);
            return isNaN(n) ? null : n;
        })
        .filter(v => v !== null);

    if (numeros.length === 0) continue;

    const qtdValores = numeros.slice(-tamanhos.length);

    for (let j = 0; j < tamanhos.length; j++) {
        const tam = tamanhos[j];
        const qtd = qtdValores[j] || 0;

        if (resumo[codigo][tam] !== undefined) {
            resumo[codigo][tam] += qtd;
        }
    }
}

const codigosOrdenados = Object.keys(resumo).sort();

let output = '';

for (const cod of codigosOrdenados) {
    const r = resumo[cod];
    output += `${cod} ${r.P}P ${r.M}M ${r.G}G ${r.GG}GG ${r.EX}EX\n`;
}

fs.writeFileSync(`${pasta}/resumo.txt`, output, 'utf8');

const arrayFinal = codigosOrdenados.map(cod => ({
    codigo: cod,
    P: resumo[cod].P,
    M: resumo[cod].M,
    G: resumo[cod].G,
    GG: resumo[cod].GG,
    EX: resumo[cod].EX
}));

fs.writeFileSync(
    `${pasta}/resumo.json`,
    JSON.stringify(arrayFinal, null, 2),
    'utf8'
);

fs.writeFileSync(
    `${pasta}/resumo.js`,
    'const dados = ' + JSON.stringify(arrayFinal, null, 2),
    'utf8'
);

console.log('Arquivos gerados em /dados');
