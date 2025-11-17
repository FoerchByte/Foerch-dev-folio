/**
 * @file netlify/functions/weather.js
 * @description
 * EN: Serverless function (backend) for the OpenWeatherMap API.
 * Securely routes requests based on city or coordinates, adds the secret API key,
 * and returns the forecast data.
 * PL: Funkcja Serverless (backend) dla API OpenWeatherMap.
 * Bezpiecznie kieruje żądania na podstawie miasta lub współrzędnych, dodaje tajny klucz API
 * i zwraca dane prognozy.
 */

// Używamy składni CommonJS (require) dla spójności (zgodnie z gemini.js i package.json)
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Weather API key is not configured on the server.' }),
        };
    }

    const { city, lat, lon, lang } = event.queryStringParameters;

    let apiUrl;
    if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=${lang || 'pl'}`;
    } else if (lat && lon) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${lang || 'pl'}`;
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing city or coordinates' }),
        };
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
             return {
                statusCode: parseInt(data.cod) || 500,
                body: JSON.stringify(data),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Weather function error:", {
            message: error.message,
            url: apiUrl // Logujemy URL, który zawiódł
        });
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An internal error occurred in the serverless function.' }),
        };
    }
};
