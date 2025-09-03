/*
  EN: This module contains the logic for the Weather Station application. It
  demonstrates fetching and parsing data from the OpenWeatherMap API,
  handling geolocation, and dynamically rendering weather information,
  a 5-day forecast, and a new hourly forecast. It's a prime example of an API-driven, utility-focused app.
  PL: Ten moduł zawiera logikę dla aplikacji Stacja Pogody. Pokazuje, jak
  pobierać i przetwarzać dane z API OpenWeatherMap, obsługiwać geolokalizację
  oraz dynamicznie renderować informacje o pogodzie i prognozę na 5 dni
  oraz nową prognozę godzinową. To doskonały przykład aplikacji opartej na API i nastawionej na użyteczność.
*/

let weatherT; 

/*
  EN: REFACTOR: Replaced the old monochrome SVG icons with a new set of
  full-color, animated icons. This greatly improves the UI's visual appeal
  and makes weather conditions more intuitive for the user.
  PL: REFAKTORYZACJA: Zastąpiono stare, monochromatyczne ikony SVG nowym
  zestawem kolorowych, animowanych ikon. Znacząco poprawia to estetykę
  interfejsu użytkownika i sprawia, że warunki pogodowe są bardziej intuicyjne.
*/
function getWeatherIcon(iconCode) {
    const iconMap = {
        // Day Icons
        '01d': `<svg viewBox="0 0 64 64" class="weather-icon"><circle cx="32" cy="32" r="12" fill="#FFD700"><animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="10s" repeatCount="indefinite"/></circle><path d="M32 12 V4 M32 60 V52 M16 32 H8 M56 32 H48 M20 20 L14 14 M50 50 L44 44 M20 44 L14 50 M50 20 L44 14" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/></svg>`,
        '02d': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#E0E0E0"/><path d="M46.5 31.5c-8 0-12-8-12-8s4-8 12-8 12 8 12 8-4 8-12 8z" fill="#FFD700"/><animateTransform attributeName="transform" type="translate" from="-5" to="5" dur="3s" repeatCount="indefinite" additive="sum" values="-5; 5; -5" begin="0s"/></svg>`,
        '03d': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#B0B0B0"/><animateTransform attributeName="transform" type="translate" from="-3" to="3" dur="4s" repeatCount="indefinite" additive="sum" values="-3; 3; -3" begin="-2s"/></svg>`,
        '04d': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#9E9E9E"/><path d="M34.5 28.5h-17a8 8 0 0 0 0 16h17a8 8 0 0 0 0-16z" fill="#B0B0B0" transform="translate(8, 4)"/><animateTransform attributeName="transform" type="translate" from="-2" to="2" dur="5s" repeatCount="indefinite" additive="sum" values="-2; 2; -2"/></svg>`,
        '09d': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#757575"/><path d="M24 55 L22 62 M32 55 L30 62 M40 55 L38 62" stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><animate attributeName="d" from="M24 55 L22 62 M32 55 L30 62 M40 55 L38 62" to="M24 62 L22 69 M32 62 L30 69 M40 62 L38 69" dur="1s" repeatCount="indefinite"/></path></svg>`,
        '10d': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#757575"/><path d="M46.5 31.5c-8 0-12-8-12-8s4-8 12-8 12 8 12 8-4 8-12 8z" fill="#FFD700"/><path d="M24 55 L22 62 M32 55 L30 62 M40 55 L38 62" stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><animate attributeName="d" from="M24 55 L22 62 M32 55 L30 62 M40 55 L38 62" to="M24 62 L22 69 M32 62 L30 69 M40 62 L38 69" dur="1s" repeatCount="indefinite" begin="-0.5s"/></path></svg>`,
        '11d': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#424242"/><polygon points="32,48 26,58 38,58 32,68" fill="#FFC107"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/></polygon></svg>`,
        '13d': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#BDBDBD"/><path d="M24 55 l-2 2 l2 2 l2 -2 l-2 -2 m8 0 l-2 2 l2 2 l2 -2 l-2 -2 m8 0 l-2 2 l2 2 l2 -2 l-2 -2" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"><animateTransform attributeName="transform" type="translate" from="0 0" to="0 10" dur="2s" repeatCount="indefinite"/></path></svg>`,
        '50d': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M10 32 H54 M10 42 H54 M10 52 H54" stroke="#B0B0B0" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" values="0 44; 44 0; 0 44" dur="3s" repeatCount="indefinite" begin="-2s"/><animate attributeName="d" from="M10 32 H54 M10 42 H54 M10 52 H54" to="M15 32 H59 M5 42 H49 M15 52 H59" dur="3s" repeatCount="indefinite" alternate="true"/></svg>`,

        // Night Icons
        '01n': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M32 12 a 15 15 0 0 1 0 40 a 12 12 0 0 0 0-40" fill="#F5F5F5"/><path d="M45 18 l-1 1 l1 1 l1 -1z" fill="#F5F5F5"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></path></svg>`,
        '02n': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#E0E0E0"/><path d="M32 16 a 15 15 0 0 1 0 32 a 12 12 0 0 0 0 -32" fill="#F5F5F5" transform="translate(10, 0)"/><animateTransform attributeName="transform" type="translate" from="-5" to="5" dur="3s" repeatCount="indefinite" additive="sum" values="-5; 5; -5" begin="0s"/></svg>`,
        '10n': `<svg viewBox="0 0 64 64" class="weather-icon"><path d="M46.5 31.5h-29a10 10 0 0 0 0 20h29a10 10 0 0 0 0-20z" fill="#757575"/><path d="M32 16 a 15 15 0 0 1 0 32 a 12 12 0 0 0 0 -32" fill="#F5F5F5" transform="translate(10, 0)"/><path d="M24 55 L22 62 M32 55 L30 62 M40 55 L38 62" stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><animate attributeName="d" from="M24 55 L22 62 M32 55 L30 62 M40 55 L38 62" to="M24 62 L22 69 M32 62 L30 69 M40 62 L38 69" dur="1s" repeatCount="indefinite" begin="-0.5s"/></path></svg>`,
    };
    // Fallbacks for similar weather conditions
    iconMap['03n'] = iconMap['03d'];
    iconMap['04n'] = iconMap['04d'];
    iconMap['09n'] = iconMap['09d'];
    iconMap['11n'] = iconMap['11d'];
    iconMap['13n'] = iconMap['13d'];
    iconMap['50n'] = iconMap['50d'];

    return iconMap[iconCode] || iconMap['01d']; // Default to a sun icon if not found
}


async function handleWeatherSearch(query) {
    const resultContainer = document.getElementById('weather-result-container');
    const forecastWrapper = document.getElementById('forecast-container-wrapper');
    const forecastContainer = document.getElementById('forecast-container');
    const currentLang = localStorage.getItem('lang') || 'pl';
    const skeletonHTML = `
        <div class="weather-app__skeleton">
            <div class="skeleton" style="width: 200px; height: 2.2rem; margin-bottom: 1rem;"></div>
            <div class="skeleton" style="width: 150px; height: 4rem;"></div>
            <div class="weather-app__skeleton-details">
                ${Array(5).fill('<div class="skeleton" style="height: 4rem;"></div>').join('')}
            </div>
        </div>`;

    resultContainer.innerHTML = skeletonHTML;
    forecastWrapper.style.display = 'none';

    // Remove old hourly forecast if it exists
    const oldHourly = document.querySelector('.hourly-forecast__wrapper');
    if (oldHourly) oldHourly.remove();


    let url;
    if (typeof query === 'string') {
        url = `/.netlify/functions/weather?city=${encodeURIComponent(query)}&lang=${currentLang}`;
        localStorage.setItem('lastCity', query);
    } else if (typeof query === 'object' && query.latitude) {
        url = `/.netlify/functions/weather?lat=${query.latitude}&lon=${query.longitude}&lang=${currentLang}`;
        localStorage.removeItem('lastCity');
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            let errorKey;
            switch(response.status) {
                case 404: errorKey = 'errorNotFound'; break;
                case 401: errorKey = 'errorAuth'; break;
                default: errorKey = 'errorServer';
            }
            throw new Error(weatherT(errorKey, { status: response.status }));
        }

        const current = data.list[0];
        const today = new Date().toISOString().split('T')[0];
        
        // Find sunrise and sunset times for the current day from the API response
        const todayForecast = data.list.find(item => item.dt_txt.startsWith(today));
        const sunrise = new Date((data.city.sunrise + data.city.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        const sunset = new Date((data.city.sunset + data.city.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

        const roadCondition = current.main.temp > 2 && !['Rain', 'Snow', 'Drizzle'].includes(current.weather[0].main)
            ? { text: weatherT('roadDry'), class: 'roadDry' }
            : (current.main.temp <= 2 ? { text: weatherT('roadIcy'), class: 'roadIcy' } : { text: weatherT('roadWet'), class: 'roadWet' });

        resultContainer.innerHTML = `
            <h3 class="current-weather__city">${data.city.name}, ${data.city.country}</h3>
            <div class="current-weather__main">
                <div class="current-weather__icon">${getWeatherIcon(current.weather[0].icon)}</div>
                <div class="current-weather__details">
                    <span class="current-weather__temp">${Math.round(current.main.temp)}°C</span>
                    <span>${current.weather[0].description}</span>
                </div>
            </div>
            <div class="current-weather__extra-details">
                <div class="current-weather__detail-item detail-item--wind"><span>${weatherT('weatherWind')}</span><span>${current.wind.speed.toFixed(1)} m/s</span></div>
                <div class="current-weather__detail-item detail-item--pressure"><span>${weatherT('weatherPressure')}</span><span>${current.main.pressure} hPa</span></div>
                <div class="current-weather__detail-item detail-item--sunrise"><span>${weatherT('weatherSunrise')}</span><span>${sunrise}</span></div>
                <div class="current-weather__detail-item detail-item--sunset"><span>${weatherT('weatherSunset')}</span><span>${sunset}</span></div>
                <div class="road-condition__item"><span>${weatherT('weatherRoadConditionTitle')}</span><span class="road-condition-value road-condition--${roadCondition.class}">${roadCondition.text}</span></div>
            </div>`;
        
        // Render hourly forecast
        const hourlyForecastContainer = document.getElementById('hourly-forecast-container');
        if (!hourlyForecastContainer) {
            insertHourlyForecastHTML();
        }

        const hourlyContainer = document.getElementById('hourly-forecast-container');
        const hourlyWrapper = document.querySelector('.hourly-forecast__wrapper');
        const next8hours = data.list.slice(0, 8);
        hourlyContainer.innerHTML = next8hours.map(item => `
            <div class="hourly-forecast__item">
                <p class="hourly-forecast__time">${new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <div class="hourly-forecast__icon">${getWeatherIcon(item.weather[0].icon)}</div>
                <p class="hourly-forecast__temp">${Math.round(item.main.temp)}°C</p>
            </div>
        `).join('');
        hourlyWrapper.style.display = 'block';

        // Render 5-day forecast
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"))
            .slice(0, 5)
            .map(item => {
                const date = new Date(item.dt * 1000);
                const dayName = date.toLocaleDateString(currentLang, { weekday: 'long' });
                return `
                    <div class="weather-app__forecast-day">
                        <h4>${dayName}</h4>
                        <div class="weather-app__forecast-icon">${getWeatherIcon(item.weather[0].icon)}</div>
                        <p>${Math.round(item.main.temp)}°C</p>
                    </div>`;
            }).join('');
        
        forecastContainer.innerHTML = dailyForecasts;
        forecastWrapper.style.display = 'block';

    } catch (error) {
        resultContainer.innerHTML = `<p>${error.message || weatherT('errorApiWeather')}</p>`;
    }
}

export function initializeWeatherApp(dependencies) {
    weatherT = dependencies.t;

    // Helper to inject hourly forecast HTML structure
    function insertHourlyForecastHTML() {
        const hourlyForecastHTML = `
            <div class="hourly-forecast__wrapper" style="display: none;">
                <h3 class="hourly-forecast__title">${weatherT('weatherHourlyForecastTitle')}</h3>
                <div class="hourly-forecast__grid" id="hourly-forecast-container"></div>
            </div>`;
        const forecastWrapper = document.getElementById('forecast-container-wrapper');
        if (forecastWrapper) {
            forecastWrapper.insertAdjacentHTML('beforebegin', hourlyForecastHTML);
        }
    }

    const searchBtn = document.getElementById('search-weather-btn');
    const cityInput = document.getElementById('city-input');
    const geoBtn = document.getElementById('geolocation-btn');
    
    searchBtn?.addEventListener('click', () => handleWeatherSearch(cityInput.value.trim()));
    cityInput?.addEventListener('keyup', e => { if (e.key === 'Enter') handleWeatherSearch(cityInput.value.trim()); });
    geoBtn?.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => handleWeatherSearch({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
                () => { document.getElementById('weather-result-container').innerHTML = `<p>${weatherT('errorApiGeneric')}</p>`; }
            );
        }
    });

    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        handleWeatherSearch(lastCity);
    }

    return [];
}
