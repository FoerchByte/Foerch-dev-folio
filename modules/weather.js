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
  EN: FINAL REFACTOR & FIX: The entire icon set has been revised and expanded.
  Missing icons for overcast, fog, and other conditions have been added.
  The geometry for the sun icon ('01d') has been corrected for perfect alignment.
  This version ensures a consistent and accurate visual representation for all weather codes.
  PL: FINALNA REFAKTORYZACJA I POPRAWKA: Cały zestaw ikon został zweryfikowany i rozszerzony.
  Dodano brakujące ikony dla pochmurnego nieba, mgły i innych warunków.
  Poprawiono geometrię ikony słońca ('01d'), aby zapewnić idealne wyrównanie.
  Ta wersja gwarantuje spójną i dokładną reprezentację wizualną dla wszystkich kodów pogodowych.
*/
function getWeatherIcon(iconCode) {
    const iconMap = {
        // Day Icons
        '01d': `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="12" fill="#FFD700"/><g stroke="#FFD700" stroke-width="3" stroke-linecap="round"><line x1="32" y1="12" x2="32" y2="4"/><line x1="32" y1="60" x2="32" y2="52"/><line x1="16" y1="32" x2="8" y2="32"/><line x1="56" y1="32" x2="48" y2="32"/><line x1="20" y1="20" x2="14" y2="14"/><line x1="50" y1="50" x2="44" y2="44"/><line x1="20" y1="44" x2="14" y2="50"/><line x1="50" y1="20" x2="44" y2="14"/></g><animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="10s" repeatCount="indefinite"/></svg>`,
        '02d': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#E0E0E0"/><path d="M32 21.5c-8 0-12-8-12-8s4-8 12-8 12 8 12 8-4 8-12 8z" fill="#FFD700"/><animateTransform attributeName="transform" type="translate" from="-5 5" to="5 5" dur="3s" repeatCount="indefinite" additive="sum" values="-5 5; 5 5; -5 5" begin="0s"/></svg>`,
        '03d': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#B0B0B0"/><animateTransform attributeName="transform" type="translate" from="-3" to="3" dur="4s" repeatCount="indefinite" additive="sum" values="-3; 3; -3" begin="-2s"/></svg>`,
        '04d': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#9E9E9E"/><path d="M34.5 28.5h-17a8 8 0 0 0 0 16h17a8 8 0 0 0 0-16z" fill="#B0B0B0" transform="translate(8, 4)"/><animateTransform attributeName="transform" type="translate" from="-2" to="2" dur="5s" repeatCount="indefinite" additive="sum" values="-2; 2; -2"/></svg>`,
        '09d': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#757575"/><g stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><line y1="55" y2="62" x1="24" x2="22"><animate attributeName="y1" values="55;62;55" dur="1.5s" repeatCount="indefinite"/><animate attributeName="y2" values="62;69;62" dur="1.5s" repeatCount="indefinite"/></line><line y1="55" y2="62" x1="32" x2="30"><animate attributeName="y1" values="55;62;55" dur="1.5s" begin="-0.5s" repeatCount="indefinite"/><animate attributeName="y2" values="62;69;62" dur="1.5s" begin="-0.5s" repeatCount="indefinite"/></line><line y1="55" y2="62" x1="40" x2="38"><animate attributeName="y1" values="55;62;55" dur="1.5s" begin="-1s" repeatCount="indefinite"/><animate attributeName="y2" values="62;69;62" dur="1.5s" begin="-1s" repeatCount="indefinite"/></line></g></svg>`,
        '10d': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#757575"/><path d="M32 21.5c-8 0-12-8-12-8s4-8 12-8 12 8 12 8-4 8-12 8z" fill="#FFD700"/><g stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><line y1="55" y2="62" x1="32" x2="30"><animate attributeName="y1" values="55;62;55" dur="1.5s" repeatCount="indefinite"/><animate attributeName="y2" values="62;69;62" dur="1.5s" repeatCount="indefinite"/></line></g></svg>`,
        '11d': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#424242"/><polygon points="32,48 26,58 38,58 32,68" fill="#FFC107"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/></polygon></svg>`,
        '13d': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#BDBDBD"/><g fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"><path d="M24 55 l-2 2 l2 2 l2 -2 z m8 0 l-2 2 l2 2 l2 -2 z m8 0 l-2 2 l2 2 l2 -2 z"><animateTransform attributeName="transform" type="translate" from="0 0" to="0 10" dur="2s" repeatCount="indefinite"/></path></g></svg>`,
        '50d': `<svg viewBox="0 0 64 64"><g stroke="#B0B0B0" stroke-width="4" stroke-linecap="round"><line x1="10" y1="32" x2="54"><animate attributeName="x1" values="10;15;10" dur="3s" repeatCount="indefinite"/></line><line x1="10" y1="42" x2="54"><animate attributeName="x2" values="54;49;54" dur="3s" repeatCount="indefinite"/></line><line x1="10" y1="52" x2="54"><animate attributeName="x1" values="10;15;10" dur="3s" begin="-1.5s" repeatCount="indefinite"/></line></g></svg>`,

        // Night Icons
        '01n': `<svg viewBox="0 0 64 64"><path d="M32 12 a 15 15 0 0 1 0 40 a 12 12 0 0 0 0-40" fill="#F5F5F5"/><path d="M45 18 l-1 1 l1 1 l1 -1z" fill="#F5F5F5"><animate attributeName="opacity" values="0;1;0;0" dur="4s" repeatCount="indefinite"/></path><path d="M40 10 l-1 1 l1 1 l1 -1z" fill="#F5F5F5"><animate attributeName="opacity" values="0;1;0;0" dur="4s" begin="2s" repeatCount="indefinite"/></path></svg>`,
        '02n': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#E0E0E0"/><path d="M26 16 a 15 15 0 0 1 0 32 a 12 12 0 0 0 0 -32" fill="#F5F5F5"/><animateTransform attributeName="transform" type="translate" from="-5 5" to="5 5" dur="3s" repeatCount="indefinite" additive="sum" values="-5 5; 5 5; -5 5" begin="0s"/></svg>`,
        '03n': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#B0B0B0"/><animateTransform attributeName="transform" type="translate" from="-3" to="3" dur="4s" repeatCount="indefinite" additive="sum" values="-3; 3; -3" begin="-2s"/></svg>`,
        '04n': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#9E9E9E"/><path d="M34.5 28.5h-17a8 8 0 0 0 0 16h17a8 8 0 0 0 0-16z" fill="#B0B0B0" transform="translate(8, 4)"/><animateTransform attributeName="transform" type="translate" from="-2" to="2" dur="5s" repeatCount="indefinite" additive="sum" values="-2; 2; -2"/></svg>`,
        '09n': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#757575"/><g stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><line y1="55" y2="62" x1="24" x2="22"><animate attributeName="y1" values="55;62;55" dur="1.5s" repeatCount="indefinite"/><animate attributeName="y2" values="62;69;62" dur="1.5s" repeatCount="indefinite"/></line><line y1="55" y2="62" x1="32" x2="30"><animate attributeName="y1" values="55;62;55" dur="1.5s" begin="-0.5s" repeatCount="indefinite"/><animate attributeName="y2" values="62;69;62" dur="1.5s" begin="-0.5s" repeatCount="indefinite"/></line><line y1="55" y2="62" x1="40" x2="38"><animate attributeName="y1" values="55;62;55" dur="1.5s" begin="-1s" repeatCount="indefinite"/><animate attributeName="y2" values="62;69;62" dur="1.5s" begin="-1s" repeatCount="indefinite"/></line></g></svg>`,
        '10n': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#757575"/><path d="M26 16 a 15 15 0 0 1 0 32 a 12 12 0 0 0 0 -32" fill="#F5F5F5"/><g stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><line y1="55" y2="62" x1="32" x2="30"><animate attributeName="y1" values="55;62;55" dur="1.5s" repeatCount="indefinite"/><animate attributeName="y2" values="62;69;62" dur="1.5s" repeatCount="indefinite"/></line></g></svg>`,
        '11n': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#424242"/><polygon points="32,48 26,58 38,58 32,68" fill="#FFC107"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/></polygon></svg>`,
        '13n': `<svg viewBox="0 0 64 64"><path d="M46.5 31.5A10 10 0 0 0 36.5 21.5a12 12 0 0 0-23 5.5A10 10 0 0 0 17.5 41.5h29a10 10 0 0 0 0-20z" fill="#BDBDBD"/><g fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"><path d="M24 55 l-2 2 l2 2 l2 -2 z m8 0 l-2 2 l2 2 l2 -2 z m8 0 l-2 2 l2 2 l2 -2 z"><animateTransform attributeName="transform" type="translate" from="0 0" to="0 10" dur="2s" repeatCount="indefinite"/></path></g></svg>`,
        '50n': `<svg viewBox="0 0 64 64"><g stroke="#B0B0B0" stroke-width="4" stroke-linecap="round"><line x1="10" y1="32" x2="54"><animate attributeName="x1" values="10;15;10" dur="3s" repeatCount="indefinite"/></line><line x1="10" y1="42" x2="54"><animate attributeName="x2" values="54;49;54" dur="3s" repeatCount="indefinite"/></line><line x1="10" y1="52" x2="54"><animate attributeName="x1" values="10;15;10" dur="3s" begin="-1.5s" repeatCount="indefinite"/></line></g></svg>`,
    };
    return iconMap[iconCode] || iconMap['01d'];
}


/*
  EN: BUGFIX: Moved the helper function to the top level of the module scope.
  This makes it accessible to all other functions within this module,
  resolving the "is not defined" reference error.
  PL: POPRAWKA BŁĘDU: Przeniesiono funkcję pomocniczą na najwyższy poziom
  zakresu modułu. Dzięki temu jest ona dostępna dla wszystkich innych funkcji
  w tym module, co rozwiązuje błąd odwołania "is not defined".
*/
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
    if(forecastWrapper) forecastWrapper.style.display = 'none';

    // Remove old hourly forecast if it exists
    const oldHourly = document.querySelector('.hourly-forecast__wrapper');
    if (oldHourly) oldHourly.remove();


    let url;
    if (typeof query === 'string' && query) {
        url = `/.netlify/functions/weather?city=${encodeURIComponent(query)}&lang=${currentLang}`;
        localStorage.setItem('lastCity', query);
    } else if (typeof query === 'object' && query.latitude) {
        url = `/.netlify/functions/weather?lat=${query.latitude}&lon=${query.longitude}&lang=${currentLang}`;
        localStorage.removeItem('lastCity');
    } else {
        return; // Do nothing if query is empty
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
        if (!document.getElementById('hourly-forecast-container')) {
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
        if(hourlyWrapper) hourlyWrapper.style.display = 'block';

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
        
        if(forecastContainer) forecastContainer.innerHTML = dailyForecasts;
        if(forecastWrapper) forecastWrapper.style.display = 'block';

    } catch (error) {
        resultContainer.innerHTML = `<p>${error.message || weatherT('errorApiWeather')}</p>`;
    }
}

export function initializeWeatherApp(dependencies) {
    weatherT = dependencies.t;

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

