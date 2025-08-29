/*
  EN: This serverless function securely handles requests for weather data from the
  OpenWeatherMap API. It protects your API key by managing it on the backend,
  and it intelligently routes requests based on either a city name or
  geographical coordinates. This is a crucial component for the Weather Station
  application, ensuring its functionality is both safe and reliable.
  PL: Ta funkcja bezserwerowa bezpiecznie obsługuje żądania dotyczące danych
  pogodowych z API OpenWeatherMap. Chroni Twój klucz API, zarządzając nim
  po stronie serwera i inteligentnie kieruje żądania na podstawie nazwy miasta
  lub współrzędnych geograficznych. Jest to kluczowy element dla aplikacji
  Stacja Pogody, zapewniając jej funkcjonalność i bezpieczeństwo.
*/
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
        console.error("Weather function error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An internal error occurred in the serverless function.' }),
        };
    }
};
