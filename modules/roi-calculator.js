// PL: Stan kalkulatora i zmienna do płynnej animacji odliczania wartości
let currentYearlyCost = 0;
let roiState = { hours: 10, rate: 80, team: 2, yearly: 0, fiveYear: 0 };

/**
 * PL: Inicjalizacja modułu - musi być wywoływana, gdy widok wyląduje w DOM.
 */
export function initRoiCalculator() {
    console.log('Inicjalizacja modułu ROI Calculator');
    
    // Oblicz wartość inicjalną
    calculateROI();

    // Dodanie event listenerów do inputów zamiast używać oninput inline w HTML
    const hoursInput = document.getElementById('hoursInput');
    const rateInput = document.getElementById('rateInput');
    const teamInput = document.getElementById('teamInput');
    
    // Upewniamy się, że kontrolki istnieją na stronie zanim coś z nimi zrobimy
    if (hoursInput && rateInput && teamInput) {
        hoursInput.addEventListener('input', calculateROI);
        rateInput.addEventListener('input', calculateROI);
        teamInput.addEventListener('input', calculateROI);
    }
    
    // Dodanie podpięć pod przyciski
    const btnCopy = document.getElementById('btn-copy');
    if (btnCopy) btnCopy.addEventListener('click', copyReport);

    const btnEmail = document.getElementById('btn-email');
    if (btnEmail) btnEmail.addEventListener('click', generateEmail);
}

/**
 * PL: Główna logika kalkulatora - oblicza roczny koszy na podstawie 52 tyg/rok
 */
function calculateROI() {
    roiState.hours = parseInt(document.getElementById('hoursInput').value);
    roiState.rate = parseInt(document.getElementById('rateInput').value);
    roiState.team = parseInt(document.getElementById('teamInput').value);

    document.getElementById('hoursVal').textContent = roiState.hours;
    document.getElementById('rateVal').textContent = roiState.rate;
    document.getElementById('teamVal').textContent = roiState.team;

    const weeklyCost = roiState.hours * roiState.team * roiState.rate;
    roiState.yearly = weeklyCost * 52;
    roiState.fiveYear = roiState.yearly * 5;

    animateValue("yearlyCost", currentYearlyCost, roiState.yearly, 400);
    currentYearlyCost = roiState.yearly;

    document.getElementById('fiveYearCost').textContent = formatCurrency(roiState.fiveYear) + " PLN";

    // Dynamiczna aktualizacja słupków: rok 1, 3 i 5
    const maxCost = 40 * 20 * 300 * 52 * 5; 
    const height1 = Math.max(10, (roiState.yearly / (maxCost/5)) * 100);
    
    document.getElementById('bar1').style.height = `${Math.min(100, height1 * 0.3)}%`;
    document.getElementById('bar2').style.height = `${Math.min(100, height1 * 0.6)}%`;
    document.getElementById('bar3').style.height = `${Math.min(100, height1)}%`;
}

/**
 * PL: Formatowanie waluty z separatorem spacji dla lepszej czytelności tysięcy
 */
function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * PL: Efekt animacji narastania/malenia liczb przy przeciąganiu suwaków
 */
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOut = progress * (2 - progress);
        const currentVal = Math.floor(start + (end - start) * easeOut);
        
        obj.innerHTML = formatCurrency(currentVal);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * PL: Moduł schowka i powiadomień. 
 */
function copyReport() {
    const reportText = `ANALIZA KOSZTÓW BRAKU AUTOMATYZACJI\n` +
                       `-----------------------------------\n` +
                       `Wielkość zespołu: ${roiState.team} os.\n` +
                       `Czas na ręczne zadania: ${roiState.hours}h / tydzień na osobę\n` +
                       `Średnia stawka brutto: ${roiState.rate} PLN / h\n\n` +
                       `Roczny koszt operacyjny: ${formatCurrency(roiState.yearly)} PLN\n` +
                       `Prognozowana strata (5 lat): ${formatCurrency(roiState.fiveYear)} PLN\n\n` +
                       `Wygenerowano przez: Kalkulator ROI Automatyzacji`;

    const helper = document.getElementById('clipboardHelper');
    helper.value = reportText;
    helper.select();
    helper.setSelectionRange(0, 99999); // Kompatybilność mobilna
    
    try {
        document.execCommand('copy');
        showToast("Raport skopiowany do schowka!");
    } catch (err) {
        console.error('Błąd kopiowania:', err);
        showToast("Nie udało się skopiować raportu.");
    }
}

/**
 * PL: CTA - Otwiera lokalnego klienta pocztowego.
 * Upewnij się, że dodajesz swój docelowy e-mail tutaj!
 */
function generateEmail() {
    const subject = encodeURIComponent("Zapytanie o automatyzację procesów - Zespół " + roiState.team + " os.");
    const body = encodeURIComponent(
        "Dzień dobry,\n\n" +
        "Skorzystałem z Kalkulatora ROI. Obecnie nasz zespół (" + roiState.team + " os.) spędza około " + roiState.hours + " godzin tygodniowo na powtarzalnych zadaniach w Excelu/systemach.\n\n" +
        "Kalkulator wskazał roczny koszt tej pracy na poziomie " + formatCurrency(roiState.yearly) + " PLN.\n\n" +
        "Chciałbym porozmawiać o możliwości zautomatyzowania tych procesów przy użyciu skryptu Python lub Google Apps Script.\n\n" +
        "Pozdrawiam,"
    );
    
    // PL: Możesz edytować ten mail na docelowy, np. adres powiązany z Upwork/Useme
    window.location.href = `mailto:tomasz.foerch@gmail.com?subject=${subject}&body=${body}`;
}

/**
 * PL: Obsługa wysuwanego komunikatu typu "Toast".
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
