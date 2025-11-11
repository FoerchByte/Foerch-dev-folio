/**
 * app.js - Główny skrypt aplikacji (kontroler/router)
 * Zarządza nawigacją, stanem globalnym i deleguje logikę do modułów.
 * WERSJA Z HISTORY API: Używa "czystych" URL-i bez znaku #.
 */

import { translations } from './modules/translations.js';

// --- NOWY MODEL DANYCH PROJEKTÓW ---
// Zastępuje starą, prostą tablicę. Teraz zawiera klucze do wszystkich
// danych potrzebnych do zbudowania widoku "Project Registry".
const projectsData = [
// ... (bez zmian dla aggregator, tax-arrears, statutory-interest, budget-validator) ...
    { 
        id: 'project-aggregator', 
        category: 'specialist',
        titleKey: 'aggregatorTitle',
        descKey: 'aggregatorDesc',
        statusKey: 'aggregatorStatus',
        dateKey: 'aggregatorDate',
        tagsKey: 'aggregatorTags'
    },
    { 
        id: 'tax-arrears-calculator', 
        category: 'specialist',
        titleKey: 'taxArrearsTitle',
        descKey: 'taxArrearsDesc',
        statusKey: 'taxArrearsStatus',
        dateKey: 'taxArrearsDate',
        tagsKey: 'taxArrearsTags'
    },
    { 
        id: 'statutory-interest-calculator', 
        category: 'specialist',
        titleKey: 'statutoryInterestTitle',
        descKey: 'statutoryInterestDesc',
        statusKey: 'statutoryInterestStatus',
        dateKey: 'statutoryInterestDate',
        tagsKey: 'statutoryInterestTags'
    },
    { 
        id: 'budget-validator', 
        category: 'specialist',
        titleKey: 'budgetValidatorTitle',
        descKey: 'budgetValidatorDesc',
        statusKey: 'budgetValidatorStatus',
        dateKey: 'budgetValidatorDate',
        tagsKey: 'budgetValidatorTags'
    },
    // --- Narzędzia ---
    { 
        id: 'weather', 
        category: 'tools',
        titleKey: 'weatherTitle',
        descKey: 'weatherDesc',
        statusKey: 'weatherStatus',
        dateKey: 'weatherDate',
        tagsKey: 'weatherTags',
        // ZMIANA: Dodano link zewnętrzny i klucz do jego opisu
        externalUrl: 'https://foerch-weather-station.netlify.app',
        linkDescKey: 'weatherLinkDesc'
    },
    { 
        id: 'todo', 
        category: 'tools',
        titleKey: 'todoTitle',
        descKey: 'todoDesc',
        statusKey: 'todoStatus',
// ... (bez zmian dla reszty projektów) ...
        tagsKey: 'todoTags'
    },
    { 
        id: 'currency-calculator', 
        category: 'tools',
        titleKey: 'currencyCalcTitle',
        descKey: 'currencyCalcDesc',
        statusKey: 'currencyCalcStatus',
        dateKey: 'currencyCalcDate',
        tagsKey: 'currencyCalcTags'
    },
    { 
        id: 'pomodoro-timer', 
        category: 'tools',
        titleKey: 'pomodoroTimerTitle',
        descKey: 'pomodoroTimerDesc',
        statusKey: 'pomodoroTimerStatus',
        dateKey: 'pomodoroTimerDate',
        tagsKey: 'pomodoroTimerTags'
    },
    // --- Kreatywne (Frontend) ---
    { 
        id: 'agency', 
        category: 'creative',
        titleKey: 'agencyTitle',
        descKey: 'agencyDesc',
        statusKey: 'agencyStatus',
        dateKey: 'agencyDate',
        tagsKey: 'agencyTags'
    },
    { 
        id: 'markdown-editor', 
        category: 'creative',
        titleKey: 'markdownEditorTitle',
        descKey: 'markdownEditorDesc',
        statusKey: 'markdownEditorStatus',
        dateKey: 'markdownEditorDate',
        tagsKey: 'markdownEditorTags'
    },
    // --- Gry ---
    { 
        id: 'snake-game', 
        category: 'games',
        titleKey: 'snakeGameTitle',
        descKey: 'snakeGameDesc',
        statusKey: 'snakeGameStatus',
        dateKey: 'snakeGameDate',
        tagsKey: 'snakeGameTags'
    },
    { 
        id: 'tic-tac-toe', 
        category: 'games',
        titleKey: 'ticTacToeTitle',
        descKey: 'ticTacToeDesc',
        statusKey: 'ticTacToeStatus',
        dateKey: 'ticTacToeDate',
        tagsKey: 'ticTacToeTags'
    },
    { 
        id: 'memory-game', 
        category: 'games',
        titleKey: 'memoryGameTitle',
        descKey: 'memoryGameDesc',
        statusKey: 'memoryGameStatus',
        dateKey: 'memoryGameDate',
        tagsKey: 'memoryGameTags'
    },
];
// ... (reszta pliku bez zmian) ...


// --- Zmienne globalne ---
let currentLang = localStorage.getItem('lang') || 'pl';
let currentTheme = localStorage.getItem('theme') || 'light';
let activeCleanups = [];
let activeStyleId = null;

// ========================================================================
// Centralny moduł do obsługi dźwięków
// ========================================================================
let synth;

function initializeAudio() {
// ... (bez zmian) ...
    if (typeof Tone !== 'undefined' && !synth) {
        synth = new Tone.PolySynth(Tone.Synth, {
            volume: -12,
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.2 }
        }).toDestination();
    }
}

async function playSound(type = 'click') {
// ... (bez zmian) ...
    if (typeof Tone !== 'undefined' && Tone.context.state !== 'running') {
        await Tone.start();
        initializeAudio();
    }
    
    if (!synth) return;

    try {
        const now = Tone.now();
        switch (type) {
            case 'click':
                synth.triggerAttackRelease("C4", "16n", now, 0.6);
                break;
            case 'complete':
                synth.triggerAttackRelease("E5", "8n", now);
                break;
            case 'flip':
                synth.triggerAttackRelease("A4", "16n", now);
                break;
            case 'match':
                synth.triggerAttackRelease(["C5", "E5", "G5"], "8n", now);
                break;
        }
    } catch (error) {
        console.error("Błąd odtwarzania dźwięku:", error);
    }
}

// --- Funkcje pomocnicze ---
const t = (key, args) => {
// ... (bez zmian) ...
    const langSet = translations[currentLang] || translations['pl'];
    const translation = langSet[key];
    return typeof translation === 'function' ? translation(args) : translation || key;
}

const showConfirmationModal = (message, onConfirm) => {
// ... (bez zmian) ...
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
// ... (bez zmian) ...
    const templateFile = route;

    try {
        const response = await fetch(`./pages/${templateFile}.html`);
        if (!response.ok) throw new Error(`Nie można załadować szablonu: ${templateFile}.html`);
        let html = await response.text();
        html = html.replace(/\{\{([^}]+)\}\}/g, (match, key) => t(key.trim()));
        return html;
    } catch (error) {
        console.error("Błąd ładowania szablonu:", error);
        if (route === 'home') {
            console.warn("Nie znaleziono home.html, ładowanie changelog jako fallback.");
            return await fetchAndRenderTemplate('changelog');
        }
        return `<h2>Błąd 404</h2><p>Nie udało się załadować treści strony.</p>`;
    }
}

function setTheme(theme) {
// ... (bez zmian) ...
    document.body.classList.toggle('light-mode', theme === 'light');
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

/**
 * ZMIANA: Całkowicie nowa funkcja renderująca.
 * Renderuje listę projektów w stylu "Project Registry" zamiast siatki.
 */
function renderProjects() {
    const projectsList = document.getElementById('project-registry-list');
    if (!projectsList) return;

    // Budowanie HTML na podstawie nowego modelu danych `projectsData`
    projectsList.innerHTML = projectsData.map(project => {
        const statusKey = project.statusKey || '';
        const statusClass = statusKey.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        // Dzielimy tagi i opakowujemy każdy w <span>
        const tags = t(project.tagsKey)
            .split(' ')
            .map(tag => `<span class="tag">${tag}</span>`)
            .join(' ');

        // ZMIANA: Dodano logikę renderowania linku zewnętrznego
        const externalLink = project.externalUrl
            ? `<a href="${project.externalUrl}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="project-external-link" 
                 onclick="event.stopPropagation()">
                 ${t(project.linkDescKey)}
               </a>`
            : '';

        return `
            <li class="project-item">
                <a href="/${project.id}" class="project-link">
                    <div class="project-header">
                        <span class="project-date">${t(project.dateKey)}</span>
                        <span class="project-status status-${statusClass}">${t(project.statusKey)}</span>
                    </div>
                    <h3 class="project-title">${t(project.titleKey)}</h3>
                    <p class="project-description">${t(project.descKey)}</p>
                    <div class="project-tags">
                        ${tags}
                    </div>
                    <!-- ZMIANA: Dodano kontener na link zewnętrzny -->
                    <div class="project-external-link-wrapper">
                        ${externalLink}
                    </div>
                </a>
            </li>
        `;
    }).join('');
}


function loadStyle(path) {
// ... (bez zmian) ...
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
// ... (bez zmian) ...
    if (!id) return;
    const link = document.getElementById(id);
    if (link) link.remove();
}

function renderStaticContent() {
// ... (bez zmian) ...
    document.documentElement.lang = currentLang;
    
    document.querySelectorAll('#main-nav a')[0].textContent = t('navProjects');
    document.querySelectorAll('#main-nav a')[1].textContent = t('navChangelog');
    document.querySelectorAll('#main-nav a')[2].textContent = t('navContact');
    
    document.querySelectorAll('#lang-switcher button').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
}

function getRouteFromPathname() {
// ... (bez zmian) ...
    const path = window.location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') {
        window.history.replaceState({}, '', '/changelog'); 
        return 'changelog';
    }
    return path.substring(1);
}

async function renderContent(isInitialLoad = false) {
// ... (bez zmian) ...
    const contentContainer = document.getElementById('app-content');
    const route = getRouteFromPathname();

    if (!isInitialLoad) {
        contentContainer.classList.remove('fade-in');
        contentContainer.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    unloadStyle(activeStyleId);
    activeStyleId = null;
    activeCleanups.forEach(cleanup => cleanup());
    activeCleanups = [];

    contentContainer.innerHTML = await fetchAndRenderTemplate(route);
    loadModuleStyle(route);
    updateActiveNavLink(route);
    await attachEventListeners(route);

    contentContainer.classList.remove('fade-out');
    contentContainer.classList.add('fade-in');
}

function loadModuleStyle(route) {
// ... (bez zmian) ...
    const projectRoutes = projectsData.map(p => p.id);
    let styleToLoad = null;
    if (projectRoutes.includes(route)) {
        if (route === 'statutory-interest-calculator') {
            styleToLoad = 'tax-arrears-calculator';
        } else {
            styleToLoad = route;
        }
    } else if (route === 'changelog') {
        styleToLoad = 'changelog';
    } else if (route === 'contact') {
        styleToLoad = 'contact';
    } else if (route === 'home') {
        styleToLoad = 'home'; 
    // ZMIANA: Strona 'projects' (lista) potrzebuje teraz własnego, dedykowanego pliku CSS
    } else if (route === 'projects') {
        styleToLoad = 'projects';
    }
    if (styleToLoad) {
        loadStyle(`./modules/${styleToLoad}.css`);
    }
}

function initializeChangelogPage() {
// ... (bez zmian) ...
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
// ... (bez zmian) ...
    const dependencies = { t, showConfirmationModal, playSound };
    
    const routeInitializers = {
        'home': () => { return []; },
        'changelog': () => initializeChangelogPage(),
        
        // ZMIANA: Logika dla 'projects' jest teraz znacznie prostsza.
        // Usuwamy stare nasłuchiwacze na filtry.
        'projects': () => {
            renderProjects(); // Po prostu renderujemy listę
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
        'project-aggregator': async () => { const { initializeProjectAggregator } = await import('./modules/project-aggregator.js'); return initializeProjectAggregator(dependencies); },
    };

    if (routeInitializers[route]) {
        const cleanups = await routeInitializers[route]();
        if (Array.isArray(cleanups)) activeCleanups = cleanups;
    }
}

function updateActiveNavLink(activeRoute) {
// ... (bez zmian) ...
    const projectRoutes = projectsData.map(p => p.id);
    document.querySelectorAll('.main-nav a, .project-card').forEach(link => {
        const linkRoute = new URL(link.href).pathname.substring(1);
        link.classList.remove('nav-active');
        if (activeRoute !== 'home' && (linkRoute === activeRoute || (linkRoute === 'projects' && projectRoutes.includes(activeRoute)))) {
            link.classList.add('nav-active');
        }
    });
}

function navigate(path) {
// ... (bez zmian) ...
    window.history.pushState({}, '', path);
    renderContent();
}

function initializeApp() {
// ... (bez zmian) ...
    const savedTheme = localStorage.getItem('theme');
    const defaultTheme = 'dark'; 
    setTheme(savedTheme || defaultTheme);

    document.getElementById('theme-toggle').addEventListener('click', () => {
        playSound('click');
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
    
    document.getElementById('lang-switcher').addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const lang = e.target.dataset.lang;
            if (lang !== currentLang) {
                playSound('click');
                currentLang = lang;
                localStorage.setItem('lang', lang);
                renderStaticContent();
                renderContent();
            }
        }
    });

    window.addEventListener('popstate', () => renderContent());

    document.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && link.origin === window.location.origin && !link.hasAttribute('download')) {
            e.preventDefault();
            navigate(link.pathname);
        }
    });

    renderStaticContent();
    renderContent(true);

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
