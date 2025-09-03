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

function getWeatherIcon(iconCode) {
    const iconBaseUrl = 'https://basmilius.github.io/weather-icons/production/fill/all/';
    const iconMap = {
        '01d': 'clear-day.svg', '01n': 'clear-night.svg',
        '02d': 'partly-cloudy-day.svg', '02n': 'partly-cloudy-night.svg',
        '03d': 'cloudy.svg', '03n': 'cloudy.svg',
        '04d': 'overcast-day.svg', '04n': 'overcast-night.svg',
        '09d': 'rain.svg', '09n': 'rain.svg',
        '10d': 'partly-cloudy-day-rain.svg', '10n': 'partly-cloudy-night-rain.svg',
        '11d': 'thunderstorms-day.svg', '11n': 'thunderstorms-night.svg',
        '13d': 'snow.svg', '13n': 'snow.svg',
        '50d': 'fog-day.svg', '50n': 'fog-night.svg',
    };
    const iconName = iconMap[iconCode] || 'not-available.svg';
    return `<img src="${iconBaseUrl}${iconName}" alt="Weather icon" class="weather-icon-img">`;
}

/*
  EN: REFACTOR: This function now dynamically injects a full forecast container structure,
  including a mobile-only switcher. This centralizes the DOM manipulation and makes
  the feature self-contained within the weather module.
  PL: REFAKTORYZACJA: Ta funkcja dynamicznie wstrzykuje teraz pełną strukturę kontenera prognoz,
  włączając w to przełącznik widoczny tylko na mobile. Centralizuje to manipulację DOM
  i sprawia, że funkcjonalność jest w pełni zawarta w module pogodowym.
*/
function insertForecastContainers() {
    const resultContainer = document.getElementById('weather-result-container');
    if (!resultContainer || document.getElementById('forecasts-container')) return;

    const forecastHTML = `
        <div class="forecast-switcher" id="forecast-switcher">
            <button data-forecast="hourly" class="active">${weatherT('weatherHourlyForecastTitle')}</button>
            <button data-forecast="daily">${weatherT('weatherForecastTitle')}</button>
        </div>
        <div id="forecasts-container" class="show-hourly">
            <div class="hourly-forecast__wrapper">
                <h3 class="hourly-forecast__title">${weatherT('weatherHourlyForecastTitle')}</h3>
                <div class="hourly-forecast__grid" id="hourly-forecast-container"></div>
            </div>
            <div class="weather-app__forecast-wrapper">
                <h3 class="weather-app__forecast-title">${weatherT('weatherForecastTitle')}</h3>
                <div class="weather-app__forecast-grid" id="forecast-container"></div>
            </div>
        </div>`;
    resultContainer.insertAdjacentHTML('afterend', forecastHTML);
}

async function handleWeatherSearch(query) {
    const resultContainer = document.getElementById('weather-result-container');
    const currentLang = localStorage.getItem('lang') || 'pl';
    const skeletonHTML = `...`; // Skeleton HTML remains the same

    resultContainer.innerHTML = skeletonHTML;
    
    // Ensure forecast containers exist
    insertForecastContainers();

    const hourlyWrapper = document.querySelector('.hourly-forecast__wrapper');
    const forecastWrapper = document.querySelector('.weather-app__forecast-wrapper');
    if (hourlyWrapper) hourlyWrapper.style.display = 'none';
    if (forecastWrapper) forecastWrapper.style.display = 'none';


    let url;
    if (typeof query === 'string' && query) {
        url = `/.netlify/functions/weather?city=${encodeURIComponent(query)}&lang=${currentLang}`;
        localStorage.setItem('lastCity', query);
    } else if (typeof query === 'object' && query.latitude) {
        url = `/.netlify/functions/weather?lat=${query.latitude}&lon=${query.longitude}&lang=${currentLang}`;
        localStorage.removeItem('lastCity');
    } else {
        return;
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
        const sunrise = new Date((data.city.sunrise + data.city.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        const sunset = new Date((data.city.sunset + data.city.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        const roadCondition = current.main.temp > 2 && !['Rain', 'Snow', 'Drizzle'].includes(current.weather[0].main)
            ? { text: weatherT('roadDry'), class: 'roadDry' }
            : (current.main.temp <= 2 ? { text: weatherT('roadIcy'), class: 'roadIcy' } : { text: weatherT('roadWet'), class: 'roadWet' });

        resultContainer.innerHTML = `...`; // Main weather display remains the same

        // Render hourly forecast
        const hourlyContainer = document.getElementById('hourly-forecast-container');
        const next8hours = data.list.slice(0, 8);
        hourlyContainer.innerHTML = next8hours.map(item => `...`).join(''); // Hourly forecast item remains the same
        if(hourlyWrapper) hourlyWrapper.style.display = 'block';

        // Render 5-day forecast
        const forecastContainer = document.getElementById('forecast-container');
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5)
            .map(item => `...`).join(''); // Daily forecast item remains the same
        
        if(forecastContainer) forecastContainer.innerHTML = dailyForecasts;
        if(forecastWrapper) forecastWrapper.style.display = 'block';

    } catch (error) {
        resultContainer.innerHTML = `<p>${error.message || weatherT('errorApiWeather')}</p>`;
    }
}

/*
  EN: NEW: This function sets up the event listeners for the mobile forecast switcher.
  It's called once when the app initializes.
  PL: NOWOŚĆ: Ta funkcja konfiguruje nasłuchiwacze zdarzeń dla mobilnego przełącznika prognoz.
  Jest wywoływana jednorazowo podczas inicjalizacji aplikacji.
*/
function setupForecastSwitcher() {
    // Use event delegation on the body, as the switcher is created dynamically
    document.body.addEventListener('click', function(e) {
        const switcher = e.target.closest('#forecast-switcher');
        if (!switcher) return;

        const button = e.target.closest('button');
        if (!button) return;

        const forecastType = button.dataset.forecast;
        const forecastsContainer = document.getElementById('forecasts-container');
        
        if (forecastsContainer) {
            forecastsContainer.className = `show-${forecastType}`;
            switcher.querySelector('.active').classList.remove('active');
            button.classList.add('active');
        }
    });
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
    
    // Setup the switcher logic once
    setupForecastSwitcher();

    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        handleWeatherSearch(lastCity);
    }

    return [];
}

