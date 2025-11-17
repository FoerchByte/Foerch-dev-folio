/**
 * @file modules/statutory-interest-calculator.js
 * @description
 * EN: Core logic for the Statutory Interest Calculator (Case Study).
 * Demonstrates handling multiple, complex, date-based financial calculation types (standard vs. commercial).
 * PL: Kluczowa logika dla Kalkulatora Odsetek Ustawowych (Case Study).
 * Demonstruje obsługę wielu złożonych, opartych na datach typów obliczeń finansowych (standardowe vs handlowe).
 */
export function initializeStatutoryInterestCalculator(dependencies) {
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

    // EN: Historical interest rates (Standard and Commercial).
    // PL: Historyczne stawki odsetek (Standardowe i Handlowe).
    const rates = {
        standard: [
            { startDate: "2016-01-01", rate: 7.00 },
            { startDate: "2021-10-07", rate: 4.00 },
            { startDate: "2021-11-04", rate: 4.75 },
            { startDate: "2021-12-09", rate: 5.25 },
            { startDate: "2022-01-05", rate: 6.00 },
            { startDate: "2022-02-09", rate: 6.75 },
            { startDate: "2022-03-09", rate: 7.50 },
            { startDate: "2022-04-07", rate: 8.50 },
            { startDate: "2022-05-06", rate: 9.50 },
            { startDate: "2022-06-09", rate: 10.50 },
            { startDate: "2022-07-08", rate: 11.50 },
            { startDate: "2022-09-08", rate: 12.25 },
            { startDate: "2023-09-07", rate: 11.25 },
            { startDate: "2025-05-08", rate: 10.75 },
            { startDate: "2025-07-03", rate: 10.50 },
            { startDate: "2025-09-04", rate: 10.25 }
        ],
        commercial: [
            { startDate: "2020-01-01", rate: 9.50 },
            { startDate: "2020-07-01", rate: 8.10 },
            { startDate: "2021-01-01", rate: 8.05 },
            { startDate: "2021-07-01", rate: 8.10 },
            { startDate: "2022-01-01", rate: 10.00 },
            { startDate: "2022-07-01", rate: 13.00 },
            { startDate: "2023-01-01", rate: 14.25 },
            { startDate: "2023-07-01", rate: 14.75 },
            { startDate: "2024-01-01", rate: 11.50 },
            { startDate: "2025-07-01", rate: 15.25 }
        ]
    };

    // EN: Ensure all rate tables are sorted ascending by date.
    // PL: Zapewnienie, że wszystkie tabele stawek są posortowane rosnąco wg daty.
    for (const key in rates) {
        rates[key].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    endDateInput.value = new Date().toISOString().split('T')[0];

    /**
     * @description "Pure" business logic function.
     * Separated for testability (see .test.js).
     */
    function calculateStatutoryInterestLogic(amount, startDate, endDate, interestType, interestRates) {
        if (isNaN(amount) || amount <= 0 || !(startDate instanceof Date) || !(endDate instanceof Date) || startDate >= endDate) {
            return { totalInterest: 0, details: [] };
        }
        
        const selectedRates = interestRates[interestType];
        let totalInterest = 0;
        const details = [];
        
        const calculationStart = new Date(startDate);
        calculationStart.setDate(calculationStart.getDate() + 1);

        for (let i = 0; i < selectedRates.length; i++) {
            const rateInfo = selectedRates[i];
            const rateStartDate = new Date(rateInfo.startDate);
            let rateEndDate;

            if (i + 1 < selectedRates.length) {
                rateEndDate = new Date(selectedRates[i + 1].startDate);
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

    function handleCalculation() {
        errorContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        detailsTbody.innerHTML = '';

        const amount = parseFloat(amountInput.value);
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const interestType = document.querySelector('input[name="interest-type"]:checked').value;

        if (isNaN(amount) || amount <= 0) {
            showError(t('taxArrearsErrorAmount')); // Reusing translation key
            return;
        }
        if (!startDateInput.value || !endDateInput.value || startDate >= endDate) {
            showError(t('taxArrearsErrorDate')); // Reusing translation key
            return;
        }

        // Call the "pure" logic function
        const { totalInterest, details } = calculateStatutoryInterestLogic(amount, startDate, endDate, interestType, rates);
        
        // EN: Statutory interest is rounded to 2 decimal places (do groszy).
        // PL: Odsetki ustawowe zaokrągla się do groszy (2 miejsca po przecinku).
        const roundedInterest = Math.round(totalInterest * 100) / 100;

        interestAmountEl.textContent = roundedInterest.toFixed(2) + ' zł';
        totalAmountEl.textContent = (amount + roundedInterest).toFixed(2) + ' zł';

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

    // EN: Exporting the logic function to make it accessible for testing.
    // PL: Eksportowanie funkcji logicznej, aby była dostępna dla testów.
    // This is a bit of a workaround for modules, but allows testing.
    window.calculateStatutoryInterestLogic = calculateStatutoryInterestLogic;
    window.testRates = rates; // Exporting rates for tests

    const cleanup = () => {
        // EN: Remove the exported functions from window to avoid pollution.
        // PL: Usuń eksportowane funkcje z 'window', aby uniknąć zaśmiecenia.
        delete window.calculateStatutoryInterestLogic;
        delete window.testRates;
    }

    return [cleanup];
}
