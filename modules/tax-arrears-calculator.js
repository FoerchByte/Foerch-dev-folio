/*
  EN: This module is the core logic for the Tax Arrears Calculator, demonstrating
  a strong command of financial calculations and date-based logic. It is a
  great showcase of how to build a robust, testable business logic layer
  that is separated from the user interface.
  PL: Ten moduł to kluczowa logika dla kalkulatora zaległości podatkowych,
  demonstrująca solidne umiejętności w obliczeniach finansowych i logice
  opartej na datach. Jest to świetny przykład, jak budować solidną, testowalną
  warstwę logiki biznesowej, oddzieloną od interfejsu użytkownika.
*/
// Stawki odsetek za zwłokę od zaległości podatkowych (dane historyczne)
// WAŻNE: Posortowane od najstarszej do najnowszej (ASCENDING)
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
    // === AKTUALIZACJA FAZY 11 (12.11.2025) ===
    // Zgodnie z info od Any, nowa stawka od 05.11.2025
    { startDate: "2025-11-05", rate: 12.00 },
].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));


/**
 * "Czysta" funkcja logiki biznesowej.
 * Oblicza odsetki podatkowe na podstawie podanych danych.
 * Jest niezależna od DOM, co czyni ją łatwą do testowania.
 * @param {number} amount - Kwota zaległości.
 * @param {Date} startDate - Data powstania zaległości.
 * @param {Date} endDate - Data wpłaty.
 * @returns {object} - Obiekt zawierający { totalInterest, details }.
 */
export function calculateTaxInterestLogic(amount, startDate, endDate) {
    // Warunek sprawdzający poprawność danych wejściowych.
    // Zapewnia, że funkcja nie będzie wykonywać zbędnych obliczeń dla błędnych danych.
    if (isNaN(amount) || amount <= 0 || !(startDate instanceof Date) || !(endDate instanceof Date) || startDate >= endDate) {
        return { totalInterest: 0, details: [] };
    }

    let totalInterest = 0;
    const details = [];
    
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
 * Główna funkcja inicjalizująca moduł kalkulatora.
 * Odpowiada za interakcję z DOM.
 */
export function initializeTaxArrearsCalculator(dependencies) {
    const { t } = dependencies;

    // Elementy DOM
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

    endDateInput.value = new Date().toISOString().split('T')[0];

    function handleCalculation() {
        // Krok 1: Ukryj stare wyniki i błędy
        errorContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        noInterestMessage.style.display = 'none';
        detailsTbody.innerHTML = '';

        // Krok 2: Pobierz i zweryfikuj dane z formularza
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

        // Krok 3: Wywołaj "czystą" funkcję z logiką obliczeń
        const { totalInterest, details } = calculateTaxInterestLogic(amount, startDate, endDate);

        // Krok 4: Wyświetl wyniki w DOM
        const roundedInterest = Math.round(totalInterest);
        const interestThreshold = 8.70 * 3;

        if (roundedInterest < interestThreshold) {
            interestAmountEl.textContent = '0.00 zł';
            totalAmountEl.textContent = amount.toFixed(2) + ' zł';
            noInterestMessage.style.display = 'block';
        } else {
            interestAmountEl.textContent = roundedInterest.toFixed(2) + ' zł';
            totalAmountEl.textContent = (amount + roundedInterest).toFixed(2) + ' zł';
        }

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

    return [];
}
