// PL: Stan kalkulatora i zmienna do płynnej animacji odliczania wartości
let currentYearlyCost = 0;
let roiState = { hours: 10, rate: 80, team: 2, yearly: 0, fiveYear: 0 };
let t = (key) => key; // Opcja zapasowa, gdyby wstrzykiwanie zawiodło

/**
 * PL: Inicjalizacja modułu - musi być wywoływana, gdy widok wyląduje w DOM.
 */
export function initRoiCalculator(dependencies) {
    console.log('Inicjalizacja modułu ROI Calculator');
    
    // Wstrzyknięcie globalnego systemu tłumaczeń z app.js
    if (dependencies && dependencies.t) {
        t = dependencies.t;
    }
    
    // Zapięcie nasłuchiwaczy (zamiast używania inline oninput w HTML)
    const hoursInput = document.getElementById('hoursInput');
    const rateInput = document.getElementById('rateInput');
    const teamInput = document.getElementById('teamInput');
    
    if (hoursInput && rateInput && teamInput) {
        hoursInput.addEventListener('input', calculateROI);
        rateInput.addEventListener('input', calculateROI);
        teamInput.addEventListener('input', calculateROI);
    }
    
    const btnCopy = document.getElementById('btn-copy');
    if (btnCopy) btnCopy.addEventListener('click', copyReport);

    const btnEmail = document.getElementById('btn-email');
    if (btnEmail) btnEmail.addEventListener('click', generateEmail);

    // Oblicz wartość inicjalną od razu po załadowaniu DOM
    calculateROI();
}

/**
 * PL: Główna logika obliczeniowa i rysowanie wykresów
 */
function calculateROI() {
    const hoursInput = document.getElementById('hoursInput');
    const rateInput = document.getElementById('rateInput');
    const teamInput = document.getElementById('teamInput');
    
    if (!hoursInput || !rateInput || !teamInput) return;

    roiState.hours = parseInt(hoursInput.value) || 0;
    roiState.rate = parseInt(rateInput.value) || 0;
    roiState.team = parseInt(teamInput.value) || 0;

    const hoursVal = document.getElementById('hoursVal');
    const rateVal = document.getElementById('rateVal');
    const teamVal = document.getElementById('teamVal');
    
    if (hoursVal) hoursVal.textContent = roiState.hours;
    if (rateVal) rateVal.textContent = roiState.rate;
    if (teamVal) teamVal.textContent = roiState.team;

    const weeklyCost = roiState.hours * roiState.team * roiState.rate;
    roiState.yearly = weeklyCost * 52;
    roiState.fiveYear = roiState.yearly * 5;

    animateValue("yearlyCost", currentYearlyCost, roiState.yearly, 400);
    currentYearlyCost = roiState.yearly;

    const fiveYearCostEl = document.getElementById('fiveYearCost');
    if (fiveYearCostEl) {
        fiveYearCostEl.textContent = formatCurrency(roiState.fiveYear) + " PLN";
    }

    const maxCost = 40 * 20 * 300 * 52 * 5; 
    const height1 = Math.max(10, (roiState.yearly / (maxCost/5)) * 100);
    
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    
    if (bar1) bar1.style.height = `${Math.min(100, height1 * 0.3)}%`;
    if (bar2) bar2.style.height = `${Math.min(100, height1 * 0.6)}%`;
    if (bar3) bar3.style.height = `${Math.min(100, height1)}%`;
}

function formatCurrency(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * PL: Odliczanie numeryczne głównej kwoty
 */
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
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
 * PL: Moduł schowka i powiadomień (z tłumaczeniami)
 */
function copyReport() {
    const reportText = `${t('roiReportTitle')}\n` +
                       `-----------------------------------\n` +
                       `${t('roiReportTeamSize')} ${roiState.team}\n` +
                       `${t('roiReportHours')} ${roiState.hours}h\n` +
                       `${t('roiReportRate')} ${roiState.rate} PLN / h\n\n` +
                       `${t('roiReportYearly')} ${formatCurrency(roiState.yearly)} PLN\n` +
                       `${t('roiReportFiveYear')} ${formatCurrency(roiState.fiveYear)} PLN\n\n` +
                       `${t('roiReportGeneratedBy')}`;

    const helper = document.getElementById('clipboardHelper');
    if (!helper) return;
    
    helper.value = reportText;
    helper.select();
    helper.setSelectionRange(0, 99999); 
    
    try {
        document.execCommand('copy');
        showToast(t('roiToastCopied'));
    } catch (err) {
        console.error('Błąd kopiowania:', err);
        showToast(t('roiToastFailed'));
    }
}

/**
 * PL: CTA - Otwiera lokalnego klienta pocztowego (z tłumaczeniami)
 */
function generateEmail() {
    const subject = encodeURIComponent(`${t('roiEmailSubject')} ${roiState.team}`);
    const body = encodeURIComponent(
        `${t('roiEmailBody1')}${roiState.team}${t('roiEmailBody2')}${roiState.hours}${t('roiEmailBody3')}${formatCurrency(roiState.yearly)}${t('roiEmailBody4')}`
    );
    window.location.href = `mailto:tomasz.foerch@gmail.com?subject=${subject}&body=${body}`;
}

/**
 * PL: Obsługa wysuwanego komunikatu typu "Toast".
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
