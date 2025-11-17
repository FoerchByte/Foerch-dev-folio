/**
 * @file modules/tax-arrears-calculator.js
 * @description
 * EN: Core logic for the Tax Arrears Calculator (Case Study).
 * Demonstrates complex, date-based financial calculations.
 * The business logic is separated into a "pure function" for testability.
 * PL: Kluczowa logika dla Kalkulatora Odsetek Podatkowych (Case Study).
 * Demonstruje złożone, oparte na datach obliczenia finansowe.
 * Logika biznesowa jest wydzielona do "czystej funkcji" dla zapewnienia testowalności.
 */

// EN: Historical tax interest rates. Sorted ascending.
// PL: Historyczne stawki odsetek podatkowych. Posortowane rosnąco.
const taxInterestRates = [
    { startDate: "2016-01-01", rate: 8.00 },
    { startDate: "2021-10-07", rate: 8.00 },
    { startDate: "2021-11-04", rate: 8.75 },
    { startDate: "2021-12-09", rate: 9.00 },
    { startDate: "2022-01-05", rate: 9.50 },
    { startDate: "2022-02-09", rate: 10.00 },
    { startDate: "2022-03-09", rate: 11.00 },
    { startDate: "2022-04-07", rate: 12.00 },
    { startDate: "2022-05-06", rate: 13.00 },
    { startDate: "2022-06-09", rate: 14.00 },
    { startDate: "2022-07-08", rate: 15.00 },
    { startDate: "2022-09-08", rate: 16.50 },
    { startDate: "2023-07-01", rate: 16.50 },
    { startDate: "2023-09-07", rate: 15.00 },
    { startDate: "2025-05-08", rate: 13.50 },
    { startDate: "2025-07-03", rate: 13.00 },
    { startDate: "2025-09-04", rate: 12.50 },
    { startDate: "2025-11-05", rate: 12.00 },
].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));


/**
 * @description
 * EN: "Pure" business logic function. Calculates tax interest.
 * It is independent of the DOM, which makes it easy to test (see .test.js).
 * PL: "Czysta" funkcja logiki biznesowej. Oblicza odsetki podatkowe.
 * Jest niezależna od DOM, co czyni ją łatwą do testowania (zobacz .test.js).
 * @param {number} amount - Arrears amount.
 * @param {Date} startDate - Due date.
 * @param {Date} endDate - Payment date.
 * @returns {object} - Object containing { totalInterest, details }.
 */
export function calculateTaxInterestLogic(amount, startDate, endDate) {
    if (isNaN(amount) || amount <= 0 || !(startDate instanceof Date) || !(endDate instanceof Date) || startDate >= endDate) {
        return { totalInterest: 0, details: [] };
    }

    let totalInterest = 0;
    const details = [];
    
    // EN: Calculation starts the day *after* the due date.
    // PL: Obliczenia rozpoczynają się dzień *po* terminie płatności.
    const calculationStart = new Date(startDate);
    calculationStart.setDate(calculationStart.getDate() + 1);

    for (let i = 0; i < taxInterestRates.length; i++) {
        const rateInfo = taxInterestRates[i];
        const rateStartDate = new Date(rateInfo.startDate);

        let rateEndDate;
        if (i + 1 < taxInterestRates.length) {
            rateEndDate = new Date(taxInterestRates[i + 1].startDate);
            rateEndDate.setDate(rateEndDate.getDate() - 1);
        } else {
            rateEndDate = new Date(endDate);
        }

        // EN: Determine the effective period for this specific rate.
        // PL: Określenie efektywnego okresu dla tej konkretnej stawki.
        const effectiveStart = calculationStart > rateStartDate ? calculationStart : rateStartDate;
        const effectiveEnd = endDate < rateEndDate ? endDate : rateEndDate;

        if (effectiveStart <= effectiveEnd) {
            const timeDiff = effectiveEnd.getTime() - effectiveStart.getTime();
            const daysInPeriod = Math.round(timeDiff / (1000 * 3600 * 24)) + 1;

            const interestForPeriod = (amount * (rateInfo.rate / 100) * daysInPeriod) / 365;
            totalInterest += interestForPeriod;

            details.push({
                period: `${effectiveStart.toLocaleDateString()} - ${effectiveEnd.toLocaleDateString()}`,
                days: daysInPeriod,
                rate: rateInfo.rate.toFixed(2) + '%',
                interest: interestForPeriod.toFixed(2) + ' zł'
            });
        }
    }
    
    return { totalInterest, details };
}


/**
 * @description
 * EN: Main function to initialize the calculator module.
 * Responsible for DOM interaction and calling the business logic.
 * PL: Główna funkcja inicjalizująca moduł kalkulatora.
 * Odpowiada za interakcję z DOM i wywoływanie logiki biznesowej.
 */
export function initializeTaxArrearsCalculator(dependencies) {
    const { t } = dependencies;

    // DOM Elements
    const amountInput = document.getElementById('amount');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    const errorContainer = document.getElementById('error-container');
    const interestAmountEl = document.getElementById('interest-amount');
    const totalAmountEl = document.getElementById('total-amount');
    const detailsTbody = document.getElementById('details-tbody');
    const noInterestMessage = document.getElementById('no-interest-message');

    // EN: Set end date to today by default.
    // PL: Ustaw domyślną datę końcową na dzisiaj.
    endDateInput.value = new Date().toISOString().split('T')[0];

    function handleCalculation() {
        // Step 1: Clear old results and errors
        errorContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        noInterestMessage.style.display = 'none';
        detailsTbody.innerHTML = '';

        // Step 2: Get and validate form data
        const amount = parseFloat(amountInput.value);
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (isNaN(amount) || amount <= 0) {
            showError(t('taxArrearsErrorAmount'));
            return;
        }
        if (!startDateInput.value || !endDateInput.value || startDate >= endDate) {
            showError(t('taxArrearsErrorDate'));
            return;
        }

        // Step 3: Call the "pure" logic function
        const { totalInterest, details } = calculateTaxInterestLogic(amount, startDate, endDate);

        // Step 4: Display results in the DOM
        const roundedInterest = Math.round(totalInterest);
        
        // EN: According to law, interest below 3x the postal fee is not collected.
        // PL: Zgodnie z prawem, odsetki poniżej 3-krotności opłaty pocztowej nie są pobierane.
        const interestThreshold = 8.70 * 3;

        if (roundedInterest < interestThreshold) {
            interestAmountEl.textContent = '0.00 zł';
            totalAmountEl.textContent = amount.toFixed(2) + ' zł';
            noInterestMessage.style.display = 'block';
        } else {
            interestAmountEl.textContent = roundedInterest.toFixed(2) + ' zł';
            totalAmountEl.textContent = (amount + roundedInterest).toFixed(2) + ' zł';
        }

        // EN: Sort details descending by date for clarity.
        // PL: Sortuj szczegóły malejąco wg daty dla czytelności.
        details.sort((a, b) => {
            const dateA = new Date(a.period.split(' - ')[0].split('.').reverse().join('-'));
            const dateB = new Date(b.period.split(' - ')[0].split('.').reverse().join('-'));
            return dateB - dateA;
        });

        details.forEach(detail => {
            const row = detailsTbody.insertRow();
            row.innerHTML = `
                <td>${detail.period}</td>
                <td>${detail.days}</td>
                <td>${detail.rate}</td>
                <td>${detail.interest}</td>
            `;
        });

        resultContainer.style.display = 'block';
    }

    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        resultContainer.style.display = 'none';
    }

    calculateBtn.addEventListener('click', handleCalculation);

    return []; // No cleanup needed
}
