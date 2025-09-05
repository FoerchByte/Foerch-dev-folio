import { describe, test, expect } from 'vitest';
import { calculateStatutoryInterestLogic } from './statutory-interest-calculator.js';

// Przykładowe stawki do testów, aby uniezależnić testy od zmian w głównym pliku
const testRates = {
    standard: [
        { startDate: "2022-09-08", rate: 12.25 },
        { startDate: "2023-09-07", rate: 11.25 }
    ],
    commercial: [
        { startDate: "2023-07-01", rate: 14.75 },
        { startDate: "2024-01-01", rate: 11.50 }
    ]
};

describe('calculateStatutoryInterestLogic', () => {

    test('powinien poprawnie obliczyć odsetki standardowe w jednym okresie', () => {
        const result = calculateStatutoryInterestLogic(
            1000, 
            new Date('2022-10-01'), 
            new Date('2022-10-31'), 
            'standard', 
            testRates
        );
        // 30 dni * (1000 * 12.25% / 365)
        expect(result.totalInterest).toBeCloseTo(10.07, 2);
    });

    test('powinien poprawnie obliczyć odsetki handlowe w jednym okresie', () => {
        const result = calculateStatutoryInterestLogic(
            2500, 
            new Date('2023-08-01'), 
            new Date('2023-08-31'), 
            'commercial', 
            testRates
        );
        // 30 dni * (2500 * 14.75% / 365)
        expect(result.totalInterest).toBeCloseTo(30.29, 2);
    });

    test('powinien poprawnie obsłużyć okres przechodzący przez zmianę stawki standardowej', () => {
        const result = calculateStatutoryInterestLogic(
            5000, 
            new Date('2023-09-01'), 
            new Date('2023-09-15'), 
            'standard', 
            testRates
        );
        // Okres 1: 5 dni @ 12.25% = 5 * (5000 * 12.25% / 365) = 8.39
        // Okres 2: 9 dni @ 11.25% = 9 * (5000 * 11.25% / 365) = 13.87
        // Razem = 22.26
        expect(result.totalInterest).toBeCloseTo(22.26, 2);
    });
    
    test('powinien zwrócić 0 dla niepoprawnych danych wejściowych', () => {
        // Data końcowa przed początkową
        let result = calculateStatutoryInterestLogic(1000, new Date('2023-02-01'), new Date('2023-01-01'), 'standard', testRates);
        expect(result.totalInterest).toBe(0);
        // Kwota 0
        result = calculateStatutoryInterestLogic(0, new Date('2023-01-01'), new Date('2023-02-01'), 'standard', testRates);
        expect(result.totalInterest).toBe(0);
    });
});
