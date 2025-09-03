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

// Ikony pozostają bez zmian
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': `<svg viewBox="0 0 64 64"><path d="M32,16.21V10.5m0,43V47.79m11.25-26L47.5,16.5m-26,26L16.5,47.5m-5.75-11H5m43,0H47.79M16.5,16.5,21.75,21.75M47.5,47.5,42.25,42.25" fill="none" stroke="#f5c742" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><circle cx="32" cy="32" r="9" fill="none" stroke="#f5c742" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>`, // clear sky day
        '01n': `<svg viewBox="0 0 64 64"><path d="M32.01,48.2A16.2,16.2,0,0,1,19.25,18.8,15.76,15.76,0,0,1,32.01,16a15.82,15.82,0,0,0,0,32.2Z" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>`, // clear sky night
        '02d': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5l-2.07-.28a6.51,6.51,0,0,0-6.19,4.2,6.49,6.49,0,0,0,4.17,8.44,6.5,6.5,0,0,0,8.44-4.17,6.51,6.51,0,0,0-4-8.11Z" fill="#f5c742"/><path d="M46,36a14,14,0,1,1,2.29-27.71,14,14,0,0,1,11.42,25.42,13.91,13.91,0,0,1-11.72,2.29,1,1,0,0,1,0,0Z" fill="#f5c742" stroke="#f5c742" stroke-miterlimit="10" stroke-width="3"/><path d="M30.9,41.22a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M31,41.5A14,14,0,0,1,13.25,32.12,14,14,0,1,1,41.7,29.6,13.9,13.9,0,0,1,31,41.5Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/></svg>`, // few clouds day
        '02n': `<svg viewBox="0 0 64 64"><path d="M32.01,48.2A16.2,16.2,0,0,1,19.25,18.8,15.76,15.76,0,0,1,32.01,16a15.82,15.82,0,0,0,0,32.2Z" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path d="M42.2,42.2a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M42.3,42.5A14,14,0,0,1,24.55,33.12,14,14,0,1,1,53,30.6,13.9,13.9,0,0,1,42.3,42.5Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/></svg>`, // few clouds night
        '03d': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/></svg>`, // scattered clouds
        '03n': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/></svg>`, // scattered clouds night
        '04d': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><path d="M26.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/></svg>`, // broken clouds
        '04n': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><path d="M26.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/></svg>`, // broken clouds night
        '09d': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><path d="M26,52.1a3.17,3.17,0,0,1-3.15-3.15,3.08,3.08,0,0,1,.15-.9,3.16,3.16,0,0,1,5.85,1.57A3.16,3.16,0,0,1,26,52.1Zm10.1,0a3.17,3.17,0,0,1-3.15-3.15,3.08,3.08,0,0,1,.15-.9,3.16,3.16,0,0,1,5.85,1.57A3.16,3.16,0,0,1,36.1,52.1Z" fill="#75cff4"/></svg>`, // shower rain
        '09n': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><path d="M26,52.1a3.17,3.17,0,0,1-3.15-3.15,3.08,3.08,0,0,1,.15-.9,3.16,3.16,0,0,1,5.85,1.57A3.16,3.16,0,0,1,26,52.1Zm10.1,0a3.17,3.17,0,0,1-3.15-3.15,3.08,3.08,0,0,1,.15-.9,3.16,3.16,0,0,1,5.85,1.57A3.16,3.16,0,0,1,36.1,52.1Z" fill="#75cff4"/></svg>`, // shower rain night
        '10d': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5l-2.07-.28a6.51,6.51,0,0,0-6.19,4.2,6.49,6.49,0,0,0,4.17,8.44,6.5,6.5,0,0,0,8.44-4.17,6.51,6.51,0,0,0-4-8.11Z" fill="#f5c742"/><path d="M46,36a14,14,0,1,1,2.29-27.71,14,14,0,0,1,11.42,25.42,13.91,13.91,0,0,1-11.72,2.29,1,1,0,0,1,0,0Z" fill="#f5c742" stroke="#f5c742" stroke-miterlimit="10" stroke-width="3"/><path d="M30.9,41.22a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M31,41.5A14,14,0,0,1,13.25,32.12,14,14,0,1,1,41.7,29.6,13.9,13.9,0,0,1,31,41.5Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><path d="M26,52.1a3.17,3.17,0,0,1-3.15-3.15,3.08,3.08,0,0,1,.15-.9,3.16,3.16,0,0,1,5.85,1.57A3.16,3.16,0,0,1,26,52.1Zm10.1,0a3.17,3.17,0,0,1-3.15-3.15,3.08,3.08,0,0,1,.15-.9,3.16,3.16,0,0,1,5.85,1.57A3.16,3.16,0,0,1,36.1,52.1Z" fill="#75cff4"/></svg>`, // rain day
        '10n': `<svg viewBox="0 0 64 64"><path d="M32.01,48.2A16.2,16.2,0,0,1,19.25,18.8,15.76,15.76,0,0,1,32.01,16a15.82,15.82,0,0,0,0,32.2Z" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path d="M42.2,42.2a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M42.3,42.5A14,14,0,0,1,24.55,33.12,14,14,0,1,1,53,30.6,13.9,13.9,0,0,1,42.3,42.5Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><path d="M26,52.1a3.17,3.17,0,0,1-3.15-3.15,3.08,3.08,0,0,1,.15-.9,3.16,3.16,0,0,1,5.85,1.57A3.16,3.16,0,0,1,26,52.1Zm10.1,0a3.17,3.17,0,0,1-3.15-3.15,3.08,3.08,0,0,1,.15-.9,3.16,3.16,0,0,1,5.85,1.57A3.16,3.16,0,0,1,36.1,52.1Z" fill="#75cff4"/></svg>`, // rain night
        '11d': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><polygon points="32.5 48.5 28.5 52.5 31.5 52.5 29.5 56.5 35.5 50.5 32.5 50.5 32.5 48.5" fill="#f5c742"/></svg>`, // thunderstorm
        '11n': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><polygon points="32.5 48.5 28.5 52.5 31.5 52.5 29.5 56.5 35.5 50.5 32.5 50.5 32.5 48.5" fill="#f5c742"/></svg>`, // thunderstorm night
        '13d': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><path d="M32,54.5a2.4,2.4,0,0,1-1.7-.7l-4-4a2.4,2.4,0,1,1,3.4-3.4l2.3,2.3,2.3-2.3a2.4,2.4,0,1,1,3.4,3.4l-4,4A2.4,2.4,0,0,1,32,54.5Zm-8-6a2.4,2.4,0,0,1-1.7-.7l-4-4a2.4,2.4,0,0,1,3.4-3.4l2.3,2.3,2.3-2.3a2.4,2.4,0,0,1,3.4,3.4l-4,4A2.4,2.4,0,0,1,24,48.5Zm16,0a2.4,2.4,0,0,1-1.7-.7l-4-4a2.4,2.4,0,0,1,3.4-3.4l2.3,2.3,2.3-2.3a2.4,2.4,0,0,1,3.4,3.4l-4,4A2.4,2.4,0,0,1,40,48.5Z" fill="#75cff4"/></svg>`, // snow
        '13n': `<svg viewBox="0 0 64 64"><path d="M41.5,41.5a14,14,0,1,0-15-24.65,14,14,0,0,0,15,24.65Z" fill="#b2d7f4"/><path d="M41.6,41.8A14,14,0,0,1,23.85,32.42,14,14,0,1,1,52.3,29.9a13.9,13.9,0,0,1-10.7,11.9Z" fill="none" stroke="#75cff4" stroke-linejoin="round" stroke-width="3"/><path d="M32,54.5a2.4,2.4,0,0,1-1.7-.7l-4-4a2.4,2.4,0,1,1,3.4-3.4l2.3,2.3,2.3-2.3a2.4,2.4,0,1,1,3.4,3.4l-4,4A2.4,2.4,0,0,1,32,54.5Zm-8-6a2.4,2.4,0,0,1-1.7-.7l-4-4a2.4,2.4,0,0,1,3.4-3.4l2.3,2.3,2.3-2.3a2.4,2.4,0,0,1,3.4,3.4l-4,4A2.4,2.4,0,0,1,24,48.5Zm16,0a2.4,2.4,0,0,1-1.7-.7l-4-4a2.4,2.4,0,0,1,3.4-3.4l2.3,2.3,2.3-2.3a2.4,2.4,0,0,1,3.4,3.4l-4,4A2.4,2.4,0,0,1,40,48.5Z" fill="#75cff4"/></svg>`, // snow night
        '50d': `<svg viewBox="0 0 64 64"><path d="M19.5,41.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,46.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,36.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,31.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,26.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,21.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/></svg>`, // mist
        '50n': `<svg viewBox="0 0 64 64"><path d="M19.5,41.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,46.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,36.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,31.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,26.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path d="M19.5,21.5H44.5" fill="none" stroke="#75cff4" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/></svg>`, // mist night
    };
    return iconMap[iconCode] || iconMap['01d'];
}

// Funkcja szacująca stan nawierzchni
function getRoadCondition(weather) {
    const id = weather.id;
    const temp = weather.temp;

    // Śnieg lub marznący deszcz
    if ((id >= 600 && id < 700) || id === 511) {
        return temp <= 0.5 ? 'roadIcy' : 'roadWet';
    }
    // Deszcz, mżawka, burza
    if ((id >= 200 && id < 600)) {
        return 'roadWet';
    }
    // Domyślnie sucho
    return 'roadDry';
}

function renderWeatherData(data, container) {
    const current = data.list[0];
    const { city } = data;
    const sunrise = new Date(city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const roadConditionKey = getRoadCondition({ id: current.weather[0].id, temp: current.main.temp });

    container.innerHTML = `
        <div class="current-weather">
            <h3 class="current-weather__city">${city.name}, ${city.country}</h3>
            <div class="current-weather__main">
                <div class="current-weather__icon" aria-label="${current.weather[0].description}">
                    ${getWeatherIcon(current.weather[0].icon)}
                </div>
                <div class="current-weather__details">
                    <span class="current-weather__temp">${Math.round(current.main.temp)}°C</span>
                    <span>${current.weather[0].description}</span>
                </div>
            </div>
            <!-- UPDATE: Road condition moved inside this grid -->
            <div class="current-weather__extra-details">
                <div class="current-weather__detail-item">
                    <span>${weatherT('weatherWind')}</span>
                    <span>${current.wind.speed.toFixed(1)} m/s</span>
                </div>
                <div class="current-weather__detail-item">
                    <span>${weatherT('weatherPressure')}</span>
                    <span>${current.main.pressure} hPa</span>
                </div>
                <div class="current-weather__detail-item">
                    <span>${weatherT('weatherSunrise')}</span>
                    <span>${sunrise}</span>
                </div>
                <div class="current-weather__detail-item">
                    <span>${weatherT('weatherSunset')}</span>
                    <span>${sunset}</span>
                </div>
                <!-- UPDATE: Road condition is now an item in the grid -->
                <div class="current-weather__detail-item road-condition__item">
                    <span>${weatherT('weatherRoadConditionTitle')}: <strong class="road-condition-value road-condition--${roadConditionKey}">${weatherT(roadConditionKey)}</strong></span>
                </div>
            </div>
        </div>
    `;
}

async function handleWeatherSearch(query) {
    const resultContainer = document.getElementById('weather-result-container');
    const hourlyForecastWrapper = document.getElementById('hourly-forecast-wrapper');
    const hourlyForecastContainer = document.getElementById('hourly-forecast-container');
    const forecastContainerWrapper = document.getElementById('forecast-container-wrapper');
    const forecastContainer = document.getElementById('forecast-container');
    const currentLang = localStorage.getItem('lang') || 'pl';

    resultContainer.innerHTML = fetchSkeletonHTML();
    hourlyForecastWrapper.style.display = 'none';
    forecastContainerWrapper.style.display = 'none';

    try {
        let url;
        if (typeof query === 'string' && query) {
            url = `/.netlify/functions/weather?city=${query}&lang=${currentLang}`;
        } else if (typeof query === 'object' && query.latitude) {
            url = `/.netlify/functions/weather?lat=${query.latitude}&lon=${query.longitude}&lang=${currentLang}`;
        } else {
            resultContainer.innerHTML = `<p>${weatherT('errorApiGeneric')}</p>`;
            return;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== "200") {
             const errorMessage = data.cod === "404" ? weatherT('errorNotFound') : weatherT('errorServer', { status: data.cod });
             throw new Error(errorMessage);
        }
        
        if (typeof query === 'string' && query) {
            localStorage.setItem('lastCity', query);
        } else {
            localStorage.setItem('lastCity', data.city.name);
        }

        renderWeatherData(data, resultContainer);
        
        const hourlyForecasts = data.list.slice(1, 9); 
        hourlyForecastContainer.innerHTML = hourlyForecasts.map(item => `
            <div class="hourly-forecast__item">
                <p class="hourly-forecast__time">${new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <div class="hourly-forecast__icon" aria-label="${item.weather[0].description}">
                    ${getWeatherIcon(item.weather[0].icon)}
                </div>
                <p class="hourly-forecast__temp">${Math.round(item.main.temp)}°C</p>
            </div>
        `).join('');
        hourlyForecastWrapper.style.display = 'block';

        renderForecastData(data, forecastContainer, forecastContainerWrapper);

    } catch (error) {
        resultContainer.innerHTML = `<p class="error-message">${error.message || weatherT('errorApiWeather')}</p>`;
    }
}

function renderForecastData(data, container, wrapper) {
    const dailyForecasts = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
    const currentLang = localStorage.getItem('lang') || 'pl';

    if (dailyForecasts.length > 0) {
        wrapper.style.display = 'block';
        container.innerHTML = dailyForecasts.map(day => `
            <div class="weather-app__forecast-day">
                <h4>${new Date(day.dt * 1000).toLocaleDateString(currentLang === 'pl' ? 'pl-PL' : 'en-US', { weekday: 'long' })}</h4>
                <div class="weather-app__forecast-icon" aria-label="${day.weather[0].description}">
                    ${getWeatherIcon(day.weather[0].icon)}
                </div>
                <p><strong>${Math.round(day.main.temp)}°C</strong></p>
            </div>`).join('');
    }
}

function fetchSkeletonHTML() {
    return `
    <div class="weather-app__skeleton">
        <div class="skeleton" style="height: 2.5rem; width: 60%; margin-bottom: 1rem;"></div>
        <div class="skeleton" style="height: 4rem; width: 80%; margin-bottom: 0.75rem;"></div>
        <div class="weather-app__skeleton-details">
            <div class="skeleton" style="height: 3rem; width: 100%;"></div>
            <div class="skeleton" style="height: 3rem; width: 100%;"></div>
            <div class="skeleton" style="height: 3rem; width: 100%;"></div>
            <div class="skeleton" style="height: 3rem; width: 100%;"></div>
            <div class="skeleton" style="height: 3rem; width: 100%;"></div>
        </div>
    </div>`;
}

export function initializeWeatherApp(dependencies) {
    weatherT = dependencies.t;

    const weatherAppContainer = document.querySelector('.weather-app');
    if (weatherAppContainer) {
        const hourlyForecastHTML = `
            <div id="hourly-forecast-wrapper" class="hourly-forecast__wrapper" style="display: none;">
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

