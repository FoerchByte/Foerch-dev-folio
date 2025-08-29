/*
  EN: This module is a practical application of business logic and complex calculations.
  It computes statutory interest, showcasing the ability to handle financial
  data, manage date-based calculations, and present detailed results in a
  clear and structured manner.
  PL: Ten moduł to praktyczne zastosowanie logiki biznesowej i złożonych obliczeń.
  Oblicza odsetki ustawowe, demonstrując umiejętność obsługi danych finansowych,
  wykonywania obliczeń opartych na datach i prezentowania szczegółowych wyników
  w jasny i zorganizowany sposób.
*/
export function initializeStatutoryInterestCalculator(dependencies) {
    const { t } = dependencies;

    const amountInput = document.getElementById('amount');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    const errorContainer = document.getElementById('error-container');
    const interestAmountEl = document.getElementById('interest-amount');
    const totalAmountEl = document.getElementById('total-amount');
    const detailsTbody = document.getElementById('details-tbody');

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
            { startDate: "2023-09-07", rate: 11.25 }
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
            { startDate: "2024-01-01", rate: 11.50 }
        ]
    };

    // Sortowanie stawek od najstarszej do najnowszej
    for (const key in rates) {
        rates[key].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    endDateInput.value = new Date().toISOString().split('T')[0];

    function calculateInterest() {
        errorContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        detailsTbody.innerHTML = '';

        const amount = parseFloat(amountInput.value);
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const interestType = document.querySelector('input[name="interest-type"]:checked').value;
        const interestRates = rates[interestType];

        if (isNaN(amount) || amount <= 0) {
            showError(t('taxArrearsErrorAmount')); // Używamy tych samych kluczy tłumaczeń
            return;
        }
        if (!startDateInput.value || !endDateInput.value || startDate >= endDate) {
            showError(t('taxArrearsErrorDate'));
            return;
        }

        let totalInterest = 0;
        const details = [];
        const calculationStart = new Date(startDate);
        calculationStart.setDate(calculationStart.getDate() + 1);

        for (let i = 0; i < interestRates.length; i++) {
            const rateInfo = interestRates[i];
            const rateStartDate = new Date(rateInfo.startDate);
            let rateEndDate;

            if (i + 1 < interestRates.length) {
                rateEndDate = new Date(interestRates[i + 1].startDate);
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
        
        // W odsetkach ustawowych zaokrągla się do groszy
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

    calculateBtn.addEventListener('click', calculateInterest);

    return [];
}
