/*
  EN: This serverless function acts as a secure intermediary for the Gemini AI API.
  It protects the API key by keeping it on the server-side, a crucial practice for
  security. The function processes a user's text prompt, sends it to the AI, and
  returns a professionally rephrased response, powering the email assistant feature
  on the contact page.
  PL: Ta funkcja bezserwerowa pełni rolę bezpiecznego pośrednika dla API Gemini AI.
  Chronione są klucze API, co jest kluczową praktyką w zakresie bezpieczeństwa.
  Funkcja przetwarza zapytanie tekstowe użytkownika, wysyła je do AI i zwraca
  profesjonalnie przeformułowaną odpowiedź, zasilając funkcję asystenta e-mail
  na stronie kontaktowej.
*/

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
        
        const improvedText = data.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            body: JSON.stringify({ improvedText }),
        };

    } catch (error) {
        console.error('Serverless function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process request' }),
        };
    }
};
