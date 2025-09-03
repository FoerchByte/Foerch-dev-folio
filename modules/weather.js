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
  EN: REPLACEMENT: The previous animated SVG set was replaced with the 'Meteocons Fill'
  icon set for better visual consistency, clarity, and performance. This static set
  eliminates animation artifacts and provides a more professional look.
  PL: ZASTĄPIENIE: Poprzedni zestaw animowanych ikon SVG został zastąpiony zestawem
  'Meteocons Fill' w celu uzyskania lepszej spójności wizualnej, przejrzystości i wydajności.
  Ten statyczny zestaw eliminuje artefakty animacji i zapewnia bardziej profesjonalny wygląd.
*/
function getWeatherIcon(iconCode) {
    const iconBaseUrl = 'https://basmilius.github.io/weather-icons/production/fill/all/';
    const iconMap = {
        '01d': 'clear-day.svg',
        '01n': 'clear-night.svg',
        '02d': 'partly-cloudy-day.svg',
        '02n': 'partly-cloudy-night.svg',
        '03d': 'cloudy.svg',
        '03n': 'cloudy.svg',
        '04d': 'overcast-day.svg',
        '04n': 'overcast-night.svg',
        '09d': 'rain.svg',
        '09n': 'rain.svg',
        '10d': 'partly-cloudy-day-rain.svg',
        '10n': 'partly-cloudy-night-rain.svg',
        '11d': 'thunderstorms-day.svg',
        '11n': 'thunderstorms-night.svg',
        '13d': 'snow.svg',
        '13n': 'snow.svg',
        '50d': 'fog-day.svg',
        '50n': 'fog-night.svg',
    };
    const iconName = iconMap[iconCode] || 'not-available.svg';
    return `<img src="${iconBaseUrl}${iconName}" alt="Weather icon" class="weather-icon-img">`;
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

