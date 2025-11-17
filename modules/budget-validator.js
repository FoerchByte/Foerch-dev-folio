/**
 * @file modules/budget-validator.js
 * @description
 * EN: Core logic for the Budget Data Validator (Case Study).
 * Validates the column consistency of tab-separated data pasted from Excel.
 * PL: Kluczowa logika dla Walidatora Danych Budżetowych (Case Study).
 * Weryfikuje spójność kolumn danych rozdzielanych tabulatorami, wklejonych z Excela.
 */

/**
 * @description
 * EN: "Pure" business logic function for data validation.
 * Separated for testability (see .test.js).
 * PL: "Czysta" funkcja logiki biznesowej do walidacji danych.
 * Wydzielona dla zapewnienia testowalności (zobacz .test.js).
 */
export function validateBudgetDataLogic(rawData) {
    if (!rawData || !rawData.trim()) {
        return { isValid: false, messageKey: 'budgetValidatorEmpty', errors: [], linesChecked: 0 };
    }

    const lines = rawData.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('#'));

    if (lines.length === 0) {
        return { isValid: false, messageKey: 'budgetValidatorEmpty', errors: [], linesChecked: 0 };
    }

    const errors = [];
    const expectedColumns = lines[0].split('\t').length;

    for (let i = 0; i < lines.length; i++) {
        const columns = lines[i].split('\t').length;
        if (columns !== expectedColumns) {
            // EN: Find the original line number (including empty lines/comments) for a user-friendly error.
            // PL: Znajdź oryginalny numer linii (wliczając puste linie/komentarze) dla błędu zrozumiałego dla użytkownika.
            const originalLineNumber = rawData.split('\n').indexOf(lines[i]) + 1;
            errors.push({
                line: originalLineNumber,
                expected: expectedColumns,
                found: columns
            });
        }
    }

    if (errors.length > 0) {
        return { isValid: false, messageKey: 'budgetValidatorError', errors: errors, linesChecked: lines.length };
    }

    return { isValid: true, messageKey: 'budgetValidatorSuccess', errors: [], linesChecked: lines.length };
}


/**
 * @description
 * EN: Initializes the Budget Validator module, handling DOM interactions.
 * PL: Inicjalizuje moduł Walidatora Budżetu, obsługując interakcje z DOM.
 */
export function initializeBudgetValidator(dependencies) {
    const { t } = dependencies;

    const dataInput = document.getElementById('data-input');
    const validateBtn = document.getElementById('validate-btn');
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');

    /**
     * @description
     * EN: Handles the click event, runs validation, and renders the result to the DOM.
     * PL: Obsługuje zdarzenie kliknięcia, uruchamia walidację i renderuje wynik w DOM.
     */
    function validateData() {
        const rawData = dataInput.value;
        resultContainer.style.display = 'none';
        resultContent.innerHTML = '';

        const result = validateBudgetDataLogic(rawData);

        if (result.isValid) {
            showResult(t(result.messageKey, { rows: result.linesChecked }), 'success');
        } else {
            let detailsHTML = '';
            if (result.errors.length > 0) {
                detailsHTML = `<ul class="budget-validator__error-list">`;
                result.errors.forEach(err => {
                    detailsHTML += `<li class="budget-validator__error-item">${t('budgetValidatorErrorLine', { line: err.line, expected: err.expected, found: err.found })}</li>`;
                });
                detailsHTML += `</ul>`;
            }
            showResult(t(result.messageKey), 'error', detailsHTML);
        }
    }

    /**
     * @description
     * EN: Renders the validation result (success or error) into the result container.
     * PL: Renderuje wynik walidacji (sukces lub błąd) w kontenerze wyników.
     */
    function showResult(message, type, detailsHTML = '') {
        const messageClass = type === 'success' 
            ? 'budget-validator__result-message--success' 
            : 'budget-validator__result-message--error';
        
        resultContent.innerHTML = `
            <div class="budget-validator__result-message ${messageClass}">
                ${message}
            </div>
            ${detailsHTML}
        `;
        resultContainer.style.display = 'block';
    }

    validateBtn.addEventListener('click', validateData);

    // EN: Export logic function for testing.
    // PL: Eksportuj funkcję logiki na potrzeby testów.
    window.validateBudgetDataLogic = validateBudgetDataLogic;

    const cleanup = () => {
        delete window.validateBudgetDataLogic;
    }

    return [cleanup];
}
