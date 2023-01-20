const exportButton = $("#export"),
      importButton = $("#import"),
      importPicker = $("#import-picker");

function exportCsv() {
    let csv = [];

    for (let row of table[0].rows) {
        let csvRow = [];
        for (let cell of row.cells) {
            csvRow.push(cell.innerHTML);
        }
        csv.push(csvRow.join(","));
    }

    const csfFile = new Blob([csv.join("\n")], { type: "text/csv" }),
          temp = document.createElement("a"),
          url = window.URL.createObjectURL(csfFile);

    const today = new Date();
    const date = today
          .toISOString()
          .replace("T", " ")
          .replaceAll(/-/g, ".")
          .replaceAll(/:/g, "-")
          .replace(/\.\d{3}Z/, "");

    temp.download = date + ".csv";
    temp.href = url;
    temp.style.display = "none";

    document.body.appendChild(temp);
    temp.click();

    document.body.removeChild(temp);
}

function importCsv() {
    const reader = new FileReader();

    reader.readAsText(importPicker[0].files[0]);

    reader.onloadend = () => {
        const csv = Papa.parse(reader.result);

        for (let rowCsv of csv.data.reverse()) {
            n = parseInt(rowCsv[0]);
            const t = rowCsv[1];
            solves.push(t == "DNF" ? "DNF" : parseFloat(t));

            const clearSolves = solves.filter((x) => x != "DNF");
            mean.html(`mean: ${(clearSolves.reduce((sum, x) => sum + x, 0) / clearSolves.length).toFixed(2)}`);

            table.prepend(`
                           <tr class="text-center">
                               <td class="border-2 border-[#444455] text-center">${n}</td>
                               <td class="border-2 border-[#444455]">${t}</td>
                               <td class="border-2 border-[#444455]">${rowCsv[2]}</td>
                               <td class="border-2 border-[#444455]">${rowCsv[3]}</td>
                           </tr>
                         `);
        }
    };
}

exportButton.click(exportCsv);
importPicker.change(importCsv);
