import { describe, test, expect } from 'vitest';
import { validateBudgetDataLogic } from './budget-validator.js';

describe('validateBudgetDataLogic', () => {

    test('powinien zwrócić sukces dla poprawnych danych', () => {
        const data = "Kolumna1\tKolumna2\tKolumna3\n" +
                     "Wartość1\tWartość2\tWartość3\n" +
                     "Inna1\tInna2\tInna3";
        const result = validateBudgetDataLogic(data);
        expect(result.isValid).toBe(true);
        expect(result.linesChecked).toBe(3);
        expect(result.errors.length).toBe(0);
        expect(result.messageKey).toBe('budgetValidatorSuccess');
    });

    test('powinien wykryć błędy w danych z różną liczbą kolumn', () => {
        const data = "A\tB\tC\n" +
                     "1\t2\t3\n" +
                     "X\tY"; // Ten wiersz ma błąd
        const result = validateBudgetDataLogic(data);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBe(1);
        expect(result.errors[0]).toEqual({ line: 3, expected: 3, found: 2 });
        expect(result.messageKey).toBe('budgetValidatorError');
    });

    test('powinien zignorować puste linie i komentarze', () => {
        const data = "# To jest komentarz\n" +
                     "A\tB\n\n" + // Pusta linia
                     "1\t2\n" +
                     "# Inny komentarz";
        const result = validateBudgetDataLogic(data);
        expect(result.isValid).toBe(true);
        expect(result.linesChecked).toBe(2);
    });

    test('powinien zwrócić błąd dla pustego wejścia', () => {
        const result = validateBudgetDataLogic("   \n   \t   ");
        expect(result.isValid).toBe(false);
        expect(result.messageKey).toBe('budgetValidatorEmpty');
    });

    test('powinien zwrócić błąd dla wejścia zawierającego tylko komentarze', () => {
        const data = "# Komentarz 1\n# Komentarz 2";
        const result = validateBudgetDataLogic(data);
        expect(result.isValid).toBe(false);
        expect(result.messageKey).toBe('budgetValidatorEmpty');
    });
});
