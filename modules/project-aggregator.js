/**
 * @file modules/project-aggregator.js
 * @description
 * EN: Core logic for the Project Settlement Aggregator (Case Study).
 * Demonstrates client-side XLSX parsing (SheetJS), data aggregation,
 * and dynamic report rendering.
 * PL: Kluczowa logika dla Agregatora Rozliczeń Projektowych (Case Study).
 * Demonstruje parsowanie plików XLSX po stronie klienta (SheetJS),
 * agregację danych i dynamiczne renderowanie raportu.
 */

export function initializeProjectAggregator(dependencies) {
    const { t } = dependencies;

    // References to DOM elements
    const fileInput = document.getElementById('xlsx-files');
    const projectBaseInput = document.getElementById('project-base');
    const generateBtn = document.getElementById('generate-report-btn');
    const downloadSamplesBtn = document.getElementById('download-samples-btn');
    const resultsSection = document.getElementById('results-section');
    const reportOutput = document.getElementById('report-output');
    const errorMessage = document.getElementById('error-message');
    const loader = document.getElementById('loader');
    const buttonText = document.getElementById('button-text');
    const reportIcon = document.getElementById('report-icon');

    if (!fileInput) return []; // Elementy nie istnieją, zakończ

    /**
     * @description Przełącza stan ładowania przycisku generowania.
     * @param {boolean} isLoading - Czy pokazać stan ładowania.
     */
    const toggleLoadingState = (isLoading) => {
        if (isLoading) {
            generateBtn.disabled = true;
            generateBtn.classList.add('loading');
            loader.classList.remove('hidden');
            reportIcon.classList.add('hidden');
            buttonText.textContent = t('loading');
        } else {
            generateBtn.disabled = false;
            generateBtn.classList.remove('loading');
            loader.classList.add('hidden');
            reportIcon.classList.remove('hidden');
            buttonText.textContent = t('aggregatorGenerateReport');
        }
    };
    
    /**
     * @description Wyświetla komunikat o błędzie.
     * @param {string} messageKey - Klucz tłumaczenia dla błędu.
     */
    const displayError = (messageKey) => {
        errorMessage.textContent = t(messageKey);
        errorMessage.classList.remove('hidden');
        reportOutput.innerHTML = '';
        resultsSection.classList.remove('hidden');
    };

    /**
     * @description Czyści poprzednie wyniki i błędy.
     */
    const clearPreviousResults = () => {
        resultsSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
        reportOutput.innerHTML = '';
    };

    /**
     * @description Dynamicznie generuje przykładowe pliki .xlsx i inicjuje ich pobieranie.
     */
    const handleDownloadSamples = () => {
        const sampleData = [
            {
                filename: 'projekt_938.xlsx',
                data: [
                    { Kategoria: 'Wynagrodzenia', 'Wartość Netto': 15000, 'Miesiąc': 'Styczeń' },
                    { Kategoria: 'Materiały biurowe', 'Wartość Netto': 750, 'Miesiąc': 'Styczeń' },
                    { Kategoria: 'Wynagrodzenia', 'Wartość Netto': 15000, 'Miesiąc': 'Luty' },
                ]
            },
            {
                filename: 'projekt_939.xlsx',
                data: [
                    { Kategoria: 'Szkolenia', 'Wartość Netto': 8200, 'Miesiąc': 'Marzec' },
                    { Kategoria: 'Oprogramowanie', 'Wartość Netto': 3500, 'Miesiąc': 'Marzec' },
                    { Kategoria: 'Marketing', 'Wartość Netto': 1200, 'Miesiąc': 'Kwiecień' },
                ]
            }
        ];

        sampleData.forEach(sample => {
            const ws = XLSX.utils.json_to_sheet(sample.data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Rozliczenie');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = sample.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        
        projectBaseInput.value = "938 AKADEMIA PROFESJONALNEGO HOTELARZA\n939 Projekt Innowacji Edukacyjnych";
    };

    /**
     * @description Przetwarza listę nazw projektów na obiekt mapujący numer na nazwę.
     */
    const parseProjectBase = (baseText) => {
        const projectMap = {};
        baseText.trim().split('\n').forEach(line => {
            const match = line.match(/^(\d+)\s+(.*)$/);
            if (match) {
                projectMap[match[1]] = match[2].trim();
            }
        });
        return projectMap;
    };

    /**
     * @description Główna funkcja generująca raport.
     */
    const handleGenerateReport = async () => {
        clearPreviousResults();
        
        if (fileInput.files.length === 0) {
            displayError('aggregatorErrorFiles');
            return;
        }
        if (!projectBaseInput.value.trim()) {
            displayError('aggregatorErrorBase');
            return;
        }

        toggleLoadingState(true);

        try {
            const projectMap = parseProjectBase(projectBaseInput.value);
            const aggregatedData = {};

            for (const file of fileInput.files) {
                const fileNameMatch = file.name.match(/(\d+)/);
                if (!fileNameMatch) continue;
                const projectNumber = fileNameMatch[1];
                
                const data = await file.arrayBuffer();
                const workbook = XLSX.read(data);
                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

                const totalValue = jsonData.reduce((sum, row) => {
                    const value = parseFloat(row['Wartość Netto']);
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);

                if (!aggregatedData[projectNumber]) {
                    aggregatedData[projectNumber] = {
                        name: projectMap[projectNumber] || 'Nieznana nazwa',
                        total: 0
                    };
                }
                aggregatedData[projectNumber].total += totalValue;
            }
            renderReport(aggregatedData);
        } catch (error) {
            console.error("Processing error:", error);
            displayError("errorApiGeneric");
        } finally {
            toggleLoadingState(false);
        }
    };

    /**
     * @description Renderuje tabelę z wynikami raportu w DOM.
     */
    const renderReport = (data) => {
        if (Object.keys(data).length === 0) {
            displayError('aggregatorErrorNoData');
            return;
        }

        let tableHTML = `<table class="aggregator-table">
                <thead>
                    <tr>
                        <th>${t('aggregatorColNumber')}</th>
                        <th>${t('aggregatorColName')}</th>
                        <th>${t('aggregatorColSum')}</th>
                    </tr>
                </thead>
                <tbody>`;

        let grandTotal = 0;
        for (const [number, details] of Object.entries(data)) {
            grandTotal += details.total;
            tableHTML += `<tr>
                    <td>${number}</td>
                    <td>${details.name}</td>
                    <td>${details.total.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</td>
                </tr>`;
        }
        
        tableHTML += `<tr class="aggregator-table__summary">
                <td colspan="2">${t('aggregatorTotal')}</td>
                <td>${grandTotal.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</td>
            </tr></tbody></table>`;
            
        reportOutput.innerHTML = tableHTML;
        resultsSection.classList.remove('hidden');
    };

    // Attach event listeners
    generateBtn.addEventListener('click', handleGenerateReport);
    downloadSamplesBtn.addEventListener('click', handleDownloadSamples);

    // EN: No cleanup needed for this module as listeners are on elements
    //     that are destroyed when the route changes.
    // PL: Czyszczenie nie jest potrzebne, ponieważ nasłuchiwacze są na elementach,
    //     które są niszczone przy zmianie trasy.
    return [];
}
