/**
 * @file netlify/functions/gemini.js
 * @description
 * EN: Serverless function (backend) for the Gemini AI API.
 * Securely forwards prompts from the client, adds the secret API key,
 * and returns the AI-generated response.
 * PL: Funkcja Serverless (backend) dla API Gemini AI.
 * Bezpiecznie przesyła zapytania od klienta, dodaje tajny klucz API
 * i zwraca odpowiedź wygenerowaną przez AI.
 */

// Używamy składni CommonJS (require), aby zachować spójność
// ze środowiskiem Netlify Functions i zależnościami.
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Gemini API key is not configured on the server.' }),
            };
        }
        
        const modelName = 'gemini-1.5-flash-latest';
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        
        const { prompt } = JSON.parse(event.body);

        if (!prompt) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Prompt is required' }) };
        }

        // Prompt systemowy dla Asystenta Komunikacji
        const requestBody = {
            contents: [{
                parts: [{
                    text: `Jesteś profesjonalnym asystentem do spraw komunikacji. Twoim zadaniem jest ulepszenie poniższego, roboczego e-maila. Zachowaj jego główny sens, ale nadaj mu bardziej profesjonalny, uprzejmy i klarowny ton. Nie dodawaj tematu ani podpisu, skup się tylko na treści. Oto robocza wersja: "${prompt}"`
                }]
            }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('Gemini API Error:', data);
            return { statusCode: response.status, body: JSON.stringify(data) };
        }
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
            console.error('Gemini API Error: Invalid response structure', data);
            throw new Error('Invalid response structure from Gemini API.');
        }

        const improvedText = data.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            body: JSON.stringify({ improvedText }),
        };

    } catch (error) {
        console.error('Serverless function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process request on server.' }),
        };
    }
};
