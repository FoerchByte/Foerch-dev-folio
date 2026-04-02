// ... existing code ...
// PL: Stan kalkulatora i zmienna do płynnej animacji odliczania wartości
let currentYearlyCost = 0;
let roiState = { hours: 10, rate: 80, team: 2, yearly: 0, fiveYear: 0 };
let t = (key) => key; // Opcja zapasowa, gdyby wstrzykiwanie zawiodło

/**
 * PL: Inicjalizacja modułu - musi być wywoływana, gdy widok wyląduje w DOM.
 */
export function initRoiCalculator(dependencies) {
    console.log('Inicjalizacja modułu ROI Calculator');
    
    // Wstrzyknięcie globalnego systemu tłumaczeń
    if (dependencies && dependencies.t) {
        t = dependencies.t;
    }
    
    // Oblicz wartość inicjalną
    calculateROI();
// ... existing code ...
    window.requestAnimationFrame(step);
}

/**
 * PL: Moduł schowka i powiadomień. 
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
    helper.value = reportText;
    helper.select();
    helper.setSelectionRange(0, 99999); // Kompatybilność mobilna
    
    try {
        document.execCommand('copy');
        showToast(t('roiToastCopied'));
    } catch (err) {
        console.error('Błąd kopiowania:', err);
        showToast(t('roiToastFailed'));
    }
}

/**
 * PL: CTA - Otwiera lokalnego klienta pocztowego.
 * Upewnij się, że dodajesz swój docelowy e-mail tutaj!
 */
function generateEmail() {
    const subject = encodeURIComponent(`${t('roiEmailSubject')} ${roiState.team}`);
    const body = encodeURIComponent(
        `${t('roiEmailBody1')}${roiState.team}${t('roiEmailBody2')}${roiState.hours}${t('roiEmailBody3')}${formatCurrency(roiState.yearly)}${t('roiEmailBody4')}`
    );
    
    // PL: Możesz edytować ten mail na docelowy, np. adres powiązany z Upwork/Useme
    window.location.href = `mailto:tomasz.foerch@gmail.com?subject=${subject}&body=${body}`;
}

/**
 * PL: Obsługa wysuwanego komunikatu typu "Toast".
 */
function showToast(message) {
// ... existing code ...
