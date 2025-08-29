/*
  EN: This module contains the logic for the Budget Validator, a tool that
  validates data integrity based on a simple column count. It demonstrates
  a practical use of string manipulation, data validation, and clear error
  handling, all essential skills for building robust web applications.
  PL: Ten moduł zawiera logikę dla walidatora budżetu, narzędzia, które
  sprawdza spójność danych na podstawie prostej liczby kolumn. Pokazuje
  praktyczne zastosowanie manipulacji ciągami znaków, walidacji danych i
  przejrzystej obsługi błędów, co jest kluczowe w budowaniu solidnych
  aplikacji internetowych.
*/
export function initializeBudgetValidator(dependencies) {
    const { t } = dependencies;

    const dataInput = document.getElementById('data-input');
    const validateBtn = document.getElementById('validate-btn');
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');

    function validateData() {
        const rawData = dataInput.value;
        resultContainer.style.display = 'none';
        resultContent.innerHTML = '';

        if (!rawData.trim()) {
            showResult(t('budgetValidatorEmpty'), 'error');
            return;
        }

        const lines = rawData.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('#'));

        if (lines.length === 0) {
            showResult(t('budgetValidatorEmpty'), 'error');
            return;
        }

        const errors = [];
        const expectedColumns = lines[0].split('\t').length;

        for (let i = 0; i < lines.length; i++) {
            const columns = lines[i].split('\t').length;
            if (columns !== expectedColumns) {
                const originalLineNumber = rawData.split('\n').indexOf(lines[i]) + 1;
                errors.push({
                    line: originalLineNumber,
                    expected: expectedColumns,
                    found: columns
                });
            }
        }

        if (errors.length > 0) {
            let errorHTML = `<ul class="budget-validator__error-list">`;
            errors.forEach(err => {
                // POPRAWKA: Przekazujemy dane jako obiekt
                errorHTML += `<li class="budget-validator__error-item">${t('budgetValidatorErrorLine', { line: err.line, expected: err.expected, found: err.found })}</li>`;
            });
            errorHTML += `</ul>`;
            showResult(t('budgetValidatorError'), 'error', errorHTML);
        } else {
            showResult(t('budgetValidatorSuccess', { rows: lines.length }), 'success');
        }
    }

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

    return [];
}
