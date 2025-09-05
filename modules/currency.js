/*
  EN: This module is the engine behind the Currency Converter, showcasing how to
  fetch real-time data from an external API and present it in a user-friendly
  interface. It demonstrates skills in asynchronous programming and DOM manipulation.
  PL: Ten moduł to serce kalkulatora walut, pokazujące, jak pobierać dane w czasie
  rzeczywistym z zewnętrznego API i prezentować je w przyjaznym dla użytkownika
  interfejsie. Demonstruje on umiejętności w programowaniu asynchronicznym i
  manipulacji DOM.
*/
let currencyT;

async function handleCurrencyConversion() {
    const amount = document.getElementById('amount-input').value;
    const fromCurrency = document.getElementById('from-currency-select').value;
    const toCurrency = document.getElementById('to-currency-select').value;
    const totalResultEl = document.getElementById('total-conversion-result');

    if (amount <= 0 || !fromCurrency || !toCurrency) {
        totalResultEl.textContent = '';
        return;
    }
    
    if (fromCurrency === toCurrency) {
        totalResultEl.textContent = `${Number(amount).toFixed(2)} ${toCurrency}`;
        return;
    }

    // Wyświetl szkielet interfejsu podczas ładowania
    totalResultEl.innerHTML = '<div class="skeleton skeleton-text" style="width: 250px; height: 2rem; margin: 0 auto;"></div>';
    try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        const result = data.rates[toCurrency];
        
        totalResultEl.textContent = `${Number(amount)} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;

    } catch (error) {
        totalResultEl.textContent = currencyT('errorApiCurrency');
        console.error("Błąd przeliczania walut:", error);
    }
}

export async function initializeCurrencyCalculator(dependencies) {
    currencyT = dependencies.t;
    
    const fromSelect = document.getElementById('from-currency-select');
    const toSelect = document.getElementById('to-currency-select');
    const amountInput = document.getElementById('amount-input');
    const swapBtn = document.getElementById('swap-currency-btn');
    const currentLang = localStorage.getItem('lang') || 'pl';

    try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        const currencies = await response.json();
        const currencyOptions = Object.keys(currencies).map(code => 
            `<option value="${code}">${code} - ${currencies[code]}</option>`
        ).join('');
        
        fromSelect.innerHTML = currencyOptions;
        toSelect.innerHTML = currencyOptions;

        fromSelect.value = 'EUR';
        toSelect.value = (currentLang === 'pl') ? 'PLN' : 'USD';

        const calculate = () => handleCurrencyConversion();
        amountInput.addEventListener('input', calculate);
        fromSelect.addEventListener('change', calculate);
        toSelect.addEventListener('change', calculate);
        swapBtn.addEventListener('click', () => {
            const temp = fromSelect.value;
            fromSelect.value = toSelect.value;
            toSelect.value = temp;
            calculate();
        });

        calculate();
    } catch (error) {
        document.getElementById('total-conversion-result').textContent = currencyT('errorApiCurrency');
        console.error("Błąd API walut:", error);
    }
    
    return [];
}

