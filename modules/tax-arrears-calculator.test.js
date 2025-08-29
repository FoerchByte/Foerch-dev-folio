/*
  EN: This file contains unit tests for the Tax Arrears Calculator module. Using
  Vitest, it ensures the core calculation logic is robust and produces correct
  results under various scenarios. It is a critical part of the project's
  commitment to quality and reliability.
  PL: Ten plik zawiera testy jednostkowe dla modułu kalkulatora zaległości
  podatkowych. Za pomocą Vitest, zapewnia, że główna logika obliczeniowa jest
  solidna i generuje poprawne wyniki w różnych scenariuszach. To kluczowy
  element zaangażowania projektu w jakość i niezawodność.
*/

import { describe, test, expect } from 'vitest';
import { calculateTaxInterestLogic as calcTax } from './tax-arrears-calculator.js';

describe('calculateTaxInterestLogic', () => {
    test('powinien poprawnie obliczyć odsetki dla okresu ze zmianą stawki', () => {
        const amount = 1000;
        const startDate = new Date('2023-09-01');
        const endDate = new Date('2023-09-30');
        const result = calcTax(amount, startDate, endDate);
        expect(result.totalInterest).toBeCloseTo(12.12, 2);
    });

    test('powinien poprawnie zsumować odsetki z wielu różnych okresów', () => {
        const amount = 5000;
        const startDate = new Date('2022-08-31');
        const endDate = new Date('2023-09-10');
        const result = calcTax(amount, startDate, endDate);
        expect(result.totalInterest).toBeCloseTo(845.34, 2);
    });

    test('powinien zwrócić 0 odsetek, jeśli data końcowa jest przed początkową', () => {
        const amount = 1000;
        const startDate = new Date('2023-01-15');
        const endDate = new Date('2023-01-10');
        const result = calcTax(amount, startDate, endDate);
        expect(result.totalInterest).toBe(0);
    });
});
