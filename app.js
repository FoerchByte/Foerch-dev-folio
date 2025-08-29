/**
 * app.js - Główny skrypt aplikacji (kontroler/router)
 * Zarządza nawigacją, stanem globalnym i deleguje logikę do modułów.
 * WERSJA Z HISTORY API: Używa "czystych" URL-i bez znaku #.
 */

import { translations } from './modules/translations.js';

// --- Dane projektów (bez zmian) ---
const projectsData = [
    { id: 'tax-arrears-calculator', category: 'specialist', cardTitleKey: 'taxArrearsCardTitle', cardDescKey: 'taxArrearsCardDesc' },
    { id: 'statutory-interest-calculator', category: 'specialist', cardTitleKey: 'statutoryInterestCardTitle', cardDescKey: 'statutoryInterestCardDesc' },
    { id: 'budget-validator', category: 'specialist', cardTitleKey: 'budgetValidatorCardTitle', cardDescKey: 'budgetValidatorCardDesc' },
    { id: 'weather', category: 'tools', cardTitleKey: 'weatherCardTitle', cardDescKey: 'weatherCardDesc' },
    { id: 'todo', category: 'tools', cardTitleKey: 'todoCardTitle', cardDescKey: 'todoCardDesc' },
    { id: 'currency-calculator', category: 'tools', cardTitleKey: 'currencyCalcCardTitle', cardDescKey: 'currencyCalcCardDesc' },
    { id: 'pomodoro-timer', category: 'tools', cardTitleKey: 'pomodoroTimerCardTitle', cardDescKey: 'pomodoroTimerCardDesc' },
    { id: 'agency', category: 'creative', cardTitleKey: 'agencyCardTitle', cardDescKey: 'agencyCardDesc' },
    { id: 'markdown-editor', category: 'creative', cardTitleKey: 'markdownEditorCardTitle', cardDescKey: 'markdownEditorCardDesc' },
    { id: 'snake-game', category: 'games', cardTitleKey: 'snakeGameCardTitle', cardDescKey: 'snakeGameCardDesc' },
    { id: 'tic-tac-toe', category: 'games', cardTitleKey: 'ticTacToeCardTitle', cardDescKey: 'ticTacToeCardDesc' },
    { id: 'memory-game', category: 'games', cardTitleKey: 'memoryGameCardTitle', cardDescKey: 'memoryGameCardDesc' },
].sort((a, b) => {
    const order = { 'specialist': 1, 'tools': 2, 'creative': 3, 'games': 4 };
    return order[a.category] - order[b.category];
});

// --- Zmienne globalne (bez zmian) ---
let currentLang = localStorage.getItem('lang') || 'pl';
let currentTheme = localStorage.getItem('theme') || 'light';
let currentProjectFilter = 'all';
let activeCleanups = [];
let activeStyleId = null;

// --- Funkcje pomocnicze (bez zmian) ---
const t = (key, args) => {
    const translation = translations[currentLang][key];
    return typeof translation === 'function' ? translation(args) : translation || key;
}

const showConfirmationModal = (message, onConfirm) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <div class="modal-buttons">
                <button class="cancel-btn">${t('confirmNo')}</button>
                <button class="confirm-btn">${t('confirmYes')}</button>
            </div>
        </div>`;
    
    const removeModal = () => modalOverlay.remove();
    modalOverlay.querySelector('.confirm-btn').addEventListener('click', () => { onConfirm(); removeModal(); });
    modalOverlay.querySelector('.cancel-btn').addEventListener('click', removeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) removeModal(); });
    document.body.appendChild(modalOverlay);
}

async function fetchAndRenderTemplate(route) {
    try {
        const response = await fetch(`./pages/${route}.html`);
        if (!response.ok) throw new Error(`Nie można załadować szablonu: ${route}.html`);
        let html = await response.text();
        html = html.replace(/\{\{([^}]+)\}\}/g, (match, key) => t(key.trim()));
        return html;
    } catch (error) {
        console.error("Błąd ładowania szablonu:", error);
        return `<h2>Błąd 404</h2><p>Nie udało się załadować treści strony.</p>`;
    }
}

function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    const filteredProjects = projectsData.filter(p => filter === 'all' || p.category === filter);
    // ZMIANA: Linki w kartach projektów muszą teraz mieć pełną ścieżkę
    projectsGrid.innerHTML = filteredProjects.map(project => `
        <a href="/${project.id}" class="project-card">
            <h3>${t(project.cardTitleKey)}</h3>
            <p>${t(project.cardDescKey)}</p>
        </a>`).join('');
}

function loadStyle(path) {
    const styleId = `style-${path.split('/').pop().split('.')[0]}`;
    if (document.getElementById(styleId)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;
    link.id = styleId;
    document.head.appendChild(link);
    activeStyleId = styleId;
}

function unloadStyle(id) {
    if (!id) return;
    const link = document.getElementById(id);
    if (link) link.remove();
}

function renderStaticContent() {
    document.documentElement.lang = currentLang;
    document.querySelector('#site-title a').textContent = t('siteTitle');
    document.querySelectorAll('#main-nav a')[0].textContent = t('navAbout');
    document.querySelectorAll('#main-nav a')[1].textContent = t('navProjects');
    document.querySelectorAll('#main-nav a')[2].textContent = t('navContact');
    document.querySelectorAll('#lang-switcher button').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
}

/**
 * ZMIANA: Funkcja pobiera ścieżkę z `location.pathname`.
 * Zwraca nazwę pliku szablonu do wczytania.
 */
function getRouteFromPathname() {
    const path = window.location.pathname;
    // Jeśli ścieżka to '/', zwracamy 'about' jako stronę domyślną.
    // W przeciwnym razie usuwamy wiodący '/' (np. z '/projects' robi 'projects').
    return path === '/' ? 'about' : path.substring(1);
}

async function renderContent(isInitialLoad = false) {
    const contentContainer = document.getElementById('app-content');
    const route = getRouteFromPathname();

    // Animacja wyjścia, jeśli to nie jest pierwsze ładowanie strony
    if (!isInitialLoad) {
        contentContainer.classList.remove('fade-in');
        contentContainer.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Czyszczenie
    unloadStyle(activeStyleId);
    activeStyleId = null;
    activeCleanups.forEach(cleanup => cleanup());
    activeCleanups = [];

    // Ładowanie nowej treści
    contentContainer.innerHTML = await fetchAndRenderTemplate(route);
    loadModuleStyle(route);
    updateActiveNavLink(route);
    await attachEventListeners(route);

    // Animacja wejścia
    contentContainer.classList.remove('fade-out');
    contentContainer.classList.add('fade-in');
}

// ZMIANA: Usunięto funkcję `loadInitialContent`, jej logikę połączono z `renderContent`
// za pomocą flagi `isInitialLoad`.

function loadModuleStyle(route) {
    const projectRoutes = projectsData.map(p => p.id);
    let styleToLoad = null;
    if (projectRoutes.includes(route)) {
        if (route === 'statutory-interest-calculator') {
            styleToLoad = 'tax-arrears-calculator';
        } else {
            styleToLoad = route;
        }
    } else if (route === 'about') {
        styleToLoad = 'timeline';
    } else if (route === 'contact') {
        styleToLoad = 'contact';
    }
    if (styleToLoad) {
        loadStyle(`./modules/${styleToLoad}.css`);
    }
}

function initializeAboutPage() {
    const collapsibleSection = document.querySelector('.timeline-section.collapsible');
    if (collapsibleSection) {
        const header = collapsibleSection.querySelector('.collapsible-header');
        header.addEventListener('click', () => collapsibleSection.classList.toggle('active'));
    }
    document.querySelectorAll('.timeline-item').forEach(item => {
        const card = item.querySelector('.timeline-card');
        card.addEventListener('click', (e) => { e.stopPropagation(); item.classList.toggle('active'); });
    });
    return [];
}

async function attachEventListeners(route) {
    const dependencies = { t, showConfirmationModal };
    
    const routeInitializers = {
        'about': () => initializeAboutPage(),
        'projects': () => {
            const filters = document.querySelector('.project-filters');
            filters.addEventListener('click', e => {
                if (e.target.tagName === 'BUTTON') {
                    currentProjectFilter = e.target.dataset.filter;
                    document.querySelectorAll('.project-filters button').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    renderProjects(currentProjectFilter);
                }
            });
            renderProjects(currentProjectFilter);
            return [];
        },
        'todo': async () => { const { initializeTodoApp } = await import('./modules/todo.js'); return initializeTodoApp(dependencies); },
        'weather': async () => { const { initializeWeatherApp } = await import('./modules/weather.js'); return initializeWeatherApp(dependencies); },
        'currency-calculator': async () => { const { initializeCurrencyCalculator } = await import('./modules/currency.js'); return initializeCurrencyCalculator(dependencies); },
        'markdown-editor': async () => { const { initializeMarkdownEditor } = await import('./modules/markdown.js'); return initializeMarkdownEditor(dependencies); },
        'pomodoro-timer': async () => { const { initializePomodoroTimer } = await import('./modules/pomodoro.js'); return initializePomodoroTimer(dependencies); },
        'tic-tac-toe': async () => { const { initializeTicTacToeApp } = await import('./modules/tictactoe.js'); return initializeTicTacToeApp(dependencies); },
        'memory-game': async () => { const { initializeMemoryGame } = await import('./modules/memory.js'); return initializeMemoryGame(dependencies); },
        'snake-game': async () => { const { initializeSnakeGame } = await import('./modules/snake.js'); return initializeSnakeGame(dependencies); },
        'agency': async () => { const { initializeAgencyPage } = await import('./modules/agency.js'); return initializeAgencyPage(dependencies); },
        'contact': async () => { const { initializeContactPage } = await import('./modules/contact.js'); return initializeContactPage(dependencies); },
        'tax-arrears-calculator': async () => { const { initializeTaxArrearsCalculator } = await import('./modules/tax-arrears-calculator.js'); return initializeTaxArrearsCalculator(dependencies); },
        'statutory-interest-calculator': async () => { const { initializeStatutoryInterestCalculator } = await import('./modules/statutory-interest-calculator.js'); return initializeStatutoryInterestCalculator(dependencies); },
        'budget-validator': async () => { const { initializeBudgetValidator } = await import('./modules/budget-validator.js'); return initializeBudgetValidator(dependencies); },
    };

    if (routeInitializers[route]) {
        const cleanups = await routeInitializers[route]();
        if (Array.isArray(cleanups)) activeCleanups = cleanups;
    }
}

function updateActiveNavLink(activeRoute) {
    const projectRoutes = projectsData.map(p => p.id);
    document.querySelectorAll('.main-nav a, .project-card').forEach(link => {
        const linkRoute = new URL(link.href).pathname.substring(1);
        link.classList.remove('nav-active');
        if (linkRoute === activeRoute || (linkRoute === 'projects' && projectRoutes.includes(activeRoute))) {
            link.classList.add('nav-active');
        }
    });
}

/**
 * ZMIANA: Funkcja nawigująca, która używa History API.
 * @param {string} path - Ścieżka, na którą chcemy nawigować (np. '/projects').
 */
function navigate(path) {
    // Zmień URL w pasku adresu bez przeładowania strony
    window.history.pushState({}, '', path);
    // Ręcznie wywołaj renderowanie nowej treści
    renderContent();
}

function initializeApp() {
    // --- Inicjalizacja motywu i języka (bez zmian) ---
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    document.getElementById('theme-toggle').addEventListener('click', () => setTheme(currentTheme === 'light' ? 'dark' : 'light'));
    
    document.getElementById('lang-switcher').addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const lang = e.target.dataset.lang;
            if (lang !== currentLang) {
                currentLang = lang;
                localStorage.setItem('lang', lang);
                renderStaticContent();
                renderContent();
            }
        }
    });

    // --- ZMIANA: Logika obsługi nawigacji ---

    // 1. Nasłuchuj na zdarzenie 'popstate' (przyciski wstecz/dalej)
    window.addEventListener('popstate', () => renderContent());

    // 2. Przechwytuj kliknięcia w linki, aby zapobiec przeładowaniu strony
    document.addEventListener('click', e => {
        const link = e.target.closest('a');
        // Sprawdź, czy kliknięto link, czy prowadzi on do tej samej domeny
        // i czy nie jest to link do pobierania pliku (atrybut `download`)
        if (link && link.origin === window.location.origin && !link.hasAttribute('download')) {
            e.preventDefault(); // Zapobiegnij domyślnej akcji (przeładowaniu)
            navigate(link.pathname); // Użyj naszej funkcji nawigującej
        }
    });

    // 3. Renderuj treść na starcie aplikacji
    renderStaticContent();
    renderContent(true); // Przekaż flagę, że to pierwsze ładowanie

    // --- Obsługa menu mobilnego (bez zmian) ---
    const menuToggle = document.getElementById('menu-toggle');
    const siteHeader = document.querySelector('.site-header');
    const mainNav = document.getElementById('main-nav');
    menuToggle.addEventListener('click', () => {
        siteHeader.classList.toggle('nav-open');
        menuToggle.setAttribute('aria-expanded', siteHeader.classList.contains('nav-open'));
    });
    mainNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            siteHeader.classList.remove('nav-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

initializeApp();
