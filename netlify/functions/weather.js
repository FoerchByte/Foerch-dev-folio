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

// EN: The top-level 'require' has been removed. We are now using a dynamic import inside the handler for better compatibility with different Node.js environments on Netlify.
// PL: Usunięto 'require' z najwyższego poziomu. Teraz używamy dynamicznego importu wewnątrz funkcji handler, aby zapewnić lepszą kompatybilność z różnymi środowiskami Node.js na Netlify.

exports.handler = async function (event, context) {
    // EN: Dynamically import the 'node-fetch' library. This modern approach works reliably in ES Modules environments.
    // PL: Dynamiczny import biblioteki 'node-fetch'. To nowoczesne podejście, które działa niezawodnie w środowiskach ES Modules.
    const fetch = (await import('node-fetch')).default;
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
        // EN: Enhanced error logging to provide more context for debugging, including the URL that was called.
        // PL: Rozszerzone logowanie błędów, aby zapewnić więcej kontekstu podczas debugowania, włączając w to URL, który był wywoływany.
        console.error("Weather function error:", {
            message: error.message,
            stack: error.stack,
            url: apiUrl
        });
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An internal error occurred in the serverless function.' }),
        };
    }
};
