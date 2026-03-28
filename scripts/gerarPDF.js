document.addEventListener('DOMContentLoaded', () => {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString();
    const tituloEl = document.getElementById('tituloResumo');
    tituloEl.innerText = `Resumo de Estoque Coleções Anteriores (${dataFormatada})`;

    const btn = document.getElementById('btnPDF');


    btn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text(tituloEl.innerText, 40, 8);



        const headers = ["Código", "Grupo", "P", "M", "G", "GG", "EX"];
        const rows = [];
        const toggleLinhasExtras = document.getElementById('toggleLinhasExtras');
        const qtdLinhasExtras = document.getElementById('qtdLinhasExtras');

        document.querySelectorAll('#body tr').forEach(tr => {
            const row = [];
            tr.querySelectorAll('td').forEach(td => row.push(td.innerText));

            rows.push(row);

            if (toggleLinhasExtras.checked) {
                const qtd = parseInt(qtdLinhasExtras.value) || 1;

                for (let i = 0; i < qtd; i++) {
                    const emptyRow = new Array(row.length).fill('');
                    rows.push(emptyRow);
                }
            }
        });


        if (rows.length > 0) {
            doc.autoTable({
                head: [headers],
                body: rows,
                startY: 12,
                theme: 'grid',
                margin: {
                    left: 5,
                    right: 5,
                    bottom: 5
                },
                headStyles: { fillColor: [220, 220, 220], halign: 'center' },
                textColor: [0, 0, 0],
                bodyStyles: { halign: 'center' },
                columnStyles: {
                    0: { cellWidth: 25 },
                    1: { halign: 'left', cellWidth: 95 },
                    2: { cellWidth: 15 },
                    3: { cellWidth: 15 },
                    4: { cellWidth: 15 },
                    5: { cellWidth: 15 },
                    6: { cellWidth: 15 }
                }
            });
        }

        const pageCount = doc.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            doc.setFontSize(10);

            doc.text(`Página ${i}/${pageCount}`, pageWidth / 2, pageHeight - 5, {
                align: 'center'
            });

        }

        doc.save("Resumo_Estoque.pdf");
    });
});