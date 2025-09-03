/*
  EN: This module contains the logic for the Weather Station application. It
  demonstrates fetching and parsing data from the OpenWeatherMap API,
  handling geolocation, and dynamically rendering weather information
  and a 5-day forecast. It's a prime example of an API-driven, utility-focused app.
  PL: Ten moduł zawiera logikę dla aplikacji Stacja Pogody. Pokazuje, jak
  pobierać i przetwarzać dane z API OpenWeatherMap, obsługiwać geolokalizację
  oraz dynamicznie renderować informacje o pogodzie i prognozę na 5 dni.
  To doskonały przykład aplikacji opartej na API i nastawionej na użyteczność.
*/

let weatherT; 

// UPDATE: Replaced the SVG icons with more intuitive ones from the Feather Icons set
// to improve user recognition while maintaining a clean, minimalist aesthetic.
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>', // Sun
        '01n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>', // Moon
        '02d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>', // Cloud Sun
        '02n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>', // Cloud Moon
        '03d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>', // Cloud
        '03n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>', // Cloud
        '04d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" opacity="0.6"></path></svg>', // Heavy Cloud
        '04n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" opacity="0.6"></path></svg>', // Heavy Cloud
        '09d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15c0-1.66-1.34-3-3-3h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 3-8z"></path><path d="M8 17.01V17"></path><path d="M12 17.01V17"></path><path d="M16 17.01V17"></path></svg>', // Cloud Drizzle
        '09n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15c0-1.66-1.34-3-3-3h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 3-8z"></path><path d="M8 17.01V17"></path><path d="M12 17.01V17"></path><path d="M16 17.01V17"></path></svg>', // Cloud Drizzle
        '10d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15c0-1.66-1.34-3-3-3h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 3-8z"></path><path d="M8 17.01V17"></path><path d="M12 17.01V17"></path><path d="M16 17.01V17"></path><path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M2 12h2"></path></svg>', // Cloud Rain Sun
        '10n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15c0-1.66-1.34-3-3-3h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 3-8z"></path><path d="M8 17.01V17"></path><path d="M12 17.01V17"></path><path d="M16 17.01V17"></path><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" opacity="0.5"></path></svg>', // Cloud Rain Moon
        '11d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16.92A8 8 0 0 0 12 4h-1.26a8 8 0 1 0-7.48 12.48"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>', // Cloud Lightning
        '11n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16.92A8 8 0 0 0 12 4h-1.26a8 8 0 1 0-7.48 12.48"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>', // Cloud Lightning
        '13d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 15 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="8" y1="20" x2="8" y2="20"></line><line x1="12" y1="18" x2="12" y2="18"></line><line x1="12" y1="22" x2="12" y2="22"></line><line x1="16" y1="16" x2="16" y2="16"></line><line x1="16" y1="20" x2="16" y2="20"></line></svg>', // Cloud Snow
        '13n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 15 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="8" y1="20" x2="8" y2="20"></line><line x1="12" y1="18" x2="12" y2="18"></line><line x1="12" y1="22" x2="12" y2="22"></line><line x1="16" y1="16" x2="16" y2="16"></line><line x1="16" y1="20" x2="16" y2="20"></line></svg>', // Cloud Snow
        '50d': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>', // Fog
        '50n': '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>', // Fog
    };
    return iconMap[iconCode] || iconMap['01d'];
}



async function fetchWeatherData(url, container) {
    const skeletonHTML = `
        <div class="weather-app__skeleton">
            <div class="skeleton" style="height: 2.5rem; width: 60%; margin-bottom: 1rem;"></div>
            <div class="skeleton" style="height: 1.2em; width: 80%; margin-bottom: 0.75em;"></div>
            <div class="skeleton" style="height: 1.2em; width: 80%;"></div>
            <div class="weather-app__skeleton-details">
                <div class="skeleton" style="height: 60px;"></div>
                <div class="skeleton" style="height: 60px;"></div>
                <div class="skeleton" style="height: 60px;"></div>
                <div class="skeleton" style="height: 60px;"></div>
            </div>
        </div>
    `;
    container.innerHTML = skeletonHTML;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 404) throw new Error(weatherT('errorNotFound'));
            throw new Error(errorData.message || weatherT('errorServer', { status: response.status }));
        }
        return await response.json();
    } catch (error) {
        container.innerHTML = `<p style="color: red;">Błąd: ${error.message}</p>`;
        document.getElementById('forecast-container-wrapper').style.display = 'none';
        return null;
    }
}

async function handleWeatherSearch(cityOrCoords) {
    const resultContainer = document.getElementById('weather-result-container');
    const forecastWrapper = document.getElementById('forecast-container-wrapper');
    const forecastContainer = document.getElementById('forecast-container');
    const currentLang = localStorage.getItem('lang') || 'pl';

    let url;
    if (typeof cityOrCoords === 'string') {
        if (!cityOrCoords) return;
        url = `/.netlify/functions/weather?city=${cityOrCoords}&lang=${currentLang}`;
        localStorage.setItem('lastCity', cityOrCoords);
    } else {
        url = `/.netlify/functions/weather?lat=${cityOrCoords.latitude}&lon=${cityOrCoords.longitude}&lang=${currentLang}`;
        localStorage.removeItem('lastCity');
    }
    
    const data = await fetchWeatherData(url, resultContainer);

    if (data && data.list) {
        const current = data.list[0];
        resultContainer.innerHTML = `
            <div class="current-weather">
                <h3 class="current-weather__city">${data.city.name}, ${data.city.country}</h3>
                <div class="current-weather__details">
                    <div class="current-weather__icon" aria-label="${current.weather[0].description}">
                        ${getWeatherIcon(current.weather[0].icon)}
                    </div>
                    <strong class="current-weather__temp">${Math.round(current.main.temp)}°C</strong>
                    <span>${current.weather[0].description}</span>
                </div>
                <div class="current-weather__extra-details">
                    <div class="current-weather__detail-item"><span>${weatherT('weatherWind')}</span><span>${current.wind.speed.toFixed(1)} m/s</span></div>
                    <div class="current-weather__detail-item"><span>${weatherT('weatherPressure')}</span><span>${current.main.pressure} hPa</span></div>
                    <div class="current-weather__detail-item"><span>${weatherT('weatherSunrise')}</span><span>${new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                    <div class="current-weather__detail-item"><span>${weatherT('weatherSunset')}</span><span>${new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                </div>
            </div>`;
        
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        forecastWrapper.style.display = 'block';
        forecastContainer.innerHTML = dailyForecasts.map(day => `
            <div class="weather-app__forecast-day">
                <h4>${new Date(day.dt * 1000).toLocaleDateString(currentLang === 'pl' ? 'pl-PL' : 'en-US', { weekday: 'short' })}</h4>
                <div class="weather-app__forecast-icon" aria-label="${day.weather[0].description}">
                    ${getWeatherIcon(day.weather[0].icon)}
                </div>
                <p><strong>${Math.round(day.main.temp)}°C</strong></p>
            </div>`).join('');
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
            navigator.geolocation.getCurrentPosition(position => handleWeatherSearch({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
        }
    });

    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        handleWeatherSearch(lastCity);
    }

    return [];
}
