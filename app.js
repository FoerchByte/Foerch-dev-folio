/**
 * app.js - Główny skrypt aplikacji (kontroler/router)
 * Zarządza nawigacją, stanem globalnym i deleguje logikę do modułów.
 * WERSJA Z HISTORY API: Używa "czystych" URL-i bez znaku #.
 */

import { translations } from './modules/translations.js';

// --- NOWY MODEL DANYCH PROJEKTÓW ---
// ZMIANA FAZY 4:
// 1. "Stacja Pogody" (weather) jest teraz pierwszym elementem, aby stać się 'featured'.
// 2. Usunięto "przekłamany" klucz `dateKey` ze wszystkich obiektów.
const projectsData = [
    // --- WYRÓŻNIONY (FEATURED) ---
    { 
        id: 'weather', 
        category: 'tools',
        titleKey: 'weatherTitle',
        descKey: 'weatherDesc',
        statusKey: 'weatherStatus',
        tagsKey: 'weatherTags',
        externalUrl: 'https://foerch-weather-station.netlify.app',
        linkDescKey: 'weatherLinkDesc'
    },
    // --- Specjalistyczne ---
    { 
        id: 'project-aggregator', 
        category: 'specialist',
        titleKey: 'aggregatorTitle',
        descKey: 'aggregatorDesc',
        statusKey: 'aggregatorStatus',
        tagsKey: 'aggregatorTags'
    },
    { 
        id: 'tax-arrears-calculator', 
        category: 'specialist',
        titleKey: 'taxArrearsTitle',
        descKey: 'taxArrearsDesc',
        statusKey: 'taxArrearsStatus',
        tagsKey: 'taxArrearsTags'
    },
    { 
        id: 'statutory-interest-calculator', 
        category: 'specialist',
        titleKey: 'statutoryInterestTitle',
        descKey: 'statutoryInterestDesc',
        statusKey: 'statutoryInterestStatus',
        tagsKey: 'statutoryInterestTags'
    },
    { 
        id: 'budget-validator', 
        category: 'specialist',
        titleKey: 'budgetValidatorTitle',
        descKey: 'budgetValidatorDesc',
        statusKey: 'budgetValidatorStatus',
        tagsKey: 'budgetValidatorTags'
    },
    // --- Narzędzia ---
    { 
        id: 'todo', 
        category: 'tools',
        titleKey: 'todoTitle',
        descKey: 'todoDesc',
        statusKey: 'todoStatus',
        tagsKey: 'todoTags'
    },
    { 
        id: 'currency-calculator', 
        category: 'tools',
        titleKey: 'currencyCalcTitle',
        descKey: 'currencyCalcDesc',
        statusKey: 'currencyCalcStatus',
        tagsKey: 'currencyCalcTags'
    },
    { 
        id: 'pomodoro-timer', 
        category: 'tools',
        titleKey: 'pomodoroTimerTitle',
        descKey: 'pomodoroTimerDesc',
        statusKey: 'pomodoroTimerStatus',
        tagsKey: 'pomodoroTimerTags'
    },
    // --- Kreatywne (Frontend) ---
    { 
        id: 'agency', 
        category: 'creative',
        titleKey: 'agencyTitle',
        descKey: 'agencyDesc',
        statusKey: 'agencyStatus',
        tagsKey: 'agencyTags'
    },
    { 
        id: 'markdown-editor', 
        category: 'creative',
        titleKey: 'markdownEditorTitle',
        descKey: 'markdownEditorDesc',
        statusKey: 'markdownEditorStatus',
        tagsKey: 'markdownEditorTags'
    },
    // --- Gry ---
    { 
        id: 'snake-game', 
        category: 'games',
        titleKey: 'snakeGameTitle',
        descKey: 'snakeGameDesc',
        statusKey: 'snakeGameStatus',
        tagsKey: 'snakeGameTags'
    },
    { 
        id: 'tic-tac-toe', 
        category: 'games',
        titleKey: 'ticTacToeTitle',
        descKey: 'ticTacToeDesc',
        statusKey: 'ticTacToeStatus',
        tagsKey: 'ticTacToeTags'
    },
    { 
        id: 'memory-game', 
        category: 'games',
        titleKey: 'memoryGameTitle',
        descKey: 'memoryGameDesc',
        statusKey: 'memoryGameStatus',
        tagsKey: 'memoryGameTags'
    },
];

// --- Zmienne globalne ---
let currentLang = localStorage.getItem('lang') || 'pl';
let currentTheme = localStorage.getItem('theme') || 'light';
let activeCleanups = [];
let activeStyleId = null;
// ZMIANA: Dodano stan dla filtra projektów
let currentProjectFilter = 'all'; 

// ========================================================================
// Centralny moduł do obsługi dźwięków
// ========================================================================
let synth;

function initializeAudio() {
// ... existing code ...
    if (typeof Tone !== 'undefined' && !synth) {
        synth = new Tone.PolySynth(Tone.Synth, {
            volume: -12,
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.2 }
        }).toDestination();
    }
}

async function playSound(type = 'click') {
// ... existing code ...
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
// ... existing code ...
    const langSet = translations[currentLang] || translations['pl'];
    const translation = langSet[key];
    return typeof translation === 'function' ? translation(args) : translation || key;
}

const showConfirmationModal = (message, onConfirm) => {
// ... existing code ...
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
// ... existing code ...
    let templateFile = route;
    
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
// ... existing code ...
    document.body.classList.toggle('light-mode', theme === 'light');
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

/**
 * ZMIANA FAZY 4:
 * Przepisanie funkcji renderProjects, aby:
 * 1. Renderowała do `#project-grid` (DIV) zamiast `#project-registry-list` (UL).
 * 2. Obsługiwała filtrowanie na podstawie `currentProjectFilter`.
 * 3. Nadawała klasy `.project-item--featured` i `.project-item--small`.
 * 4. Usunęła renderowanie `project-date` (klucz `dateKey` został usunięty z danych).
 */
function renderProjects() {
    const projectsGrid = document.getElementById('project-grid');
    if (!projectsGrid) return;

    // 1. Logika filtrowania
    const filteredProjects = projectsData.filter(p => 
        currentProjectFilter === 'all' || p.category === currentProjectFilter
    );

    projectsGrid.innerHTML = filteredProjects.map((project, index) => {
        const statusKey = project.statusKey || '';
        const statusClass = t(statusKey).toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        const tags = t(project.tagsKey)
            .split(' ')
            .map(tag => `<span class="tag">${tag}</span>`)
            .join(' ');

        const externalLink = project.externalUrl
            ? `<a href="${project.externalUrl}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="project-external-link" 
                 onclick="event.stopPropagation()">
                 ${t(project.linkDescKey)}
               </a>`
            : '';

        // 2. Logika klas (Siatka Asymetryczna)
        // Jeśli filtr jest "all", pierwszy element (Stacja Pogody) jest wyróżniony.
        // Jeśli aktywny jest jakikolwiek inny filtr, wszystkie są małe.
        const itemClass = (index === 0 && currentProjectFilter === 'all') 
            ? 'project-item--featured' 
            : 'project-item--small';

        // 3. Renderowanie HTML (DIV zamiast LI, usunięta data)
        return `
            <div class="project-item ${itemClass}">
                <div class="project-card-content"> 
                    <div class="project-header">
                        <span class="project-status status-${statusClass}">${t(project.statusKey)}</span>
                    </div>
                    
                    <a href="/${project.id}" class="project-title-link">
                        <h3 class="project-title">${t(project.titleKey)}</h3>
                    </a>

                    <p class="project-description">${t(project.descKey)}</p>
                    
                    <div class="project-footer">
                        <div class="project-tags">
                            ${tags}
                        </div>
                        <div class="project-external-link-wrapper">
                            ${externalLink}
                        </div>
                    </div>
                </div> 
            </div>
        `;
    }).join('');
}


function loadStyle(path) {
// ... existing code ...
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
// ... existing code ...
    if (!id) return;
    const link = document.getElementById(id);
    if (link) link.remove();
}

function renderStaticContent() {
// ... existing code ...
    document.documentElement.lang = currentLang;
    
    document.querySelectorAll('#main-nav a[data-i18n]').forEach(link => {
        const key = link.dataset.i18n;
        link.textContent = t(key);
    });
    
    document.querySelectorAll('#lang-switcher button').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
}

function getRouteFromPathname() {
// ... existing code ...
    const path = window.location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') {
        window.history.replaceState({}, '', '/changelog'); 
        return 'changelog';
    }
    return path.substring(1);
}

async function renderContent(isInitialLoad = false) {
// ... existing code ...
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
// ... existing code ...
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
    } else if (route === 'projects') { 
        styleToLoad = 'projects';
    }
    if (styleToLoad) {
        loadStyle(`./modules/${styleToLoad}.css`);
    }
}

function initializeChangelogPage() {
// ... existing code ...
    return [];
}

async function attachEventListeners(route) {
    const dependencies = { t, showConfirmationModal, playSound };
    
    const routeInitializers = {
        'home': () => { return []; }, 
        'changelog': () => initializeChangelogPage(),
        
        // ZMIANA FAZY 4: Nowa logika dla strony /projects
        'projects': () => {
            // 1. Renderuj wstępną siatkę (domyślnie 'all')
            renderProjects(); 
            
            // 2. Dodaj logikę do kontenera filtrów
            const filtersContainer = document.querySelector('.project-filters');
            if (filtersContainer) {
                filtersContainer.addEventListener('click', e => {
                    if (e.target.tagName === 'BUTTON') {
                        playSound('click');
                        // Pobierz nowy filtr
                        currentProjectFilter = e.target.dataset.filter;
                        
                        // Zaktualizuj aktywny przycisk
                        filtersContainer.querySelector('button.active').classList.remove('active');
                        e.target.classList.add('active');
                        
                        // Przerenderuj siatkę z nowym filtrem
                        renderProjects();
                    }
                });
            }
            return []; // Nie ma potrzeby czyszczenia listenera, bo jest na #app-content
        },
        
        'todo': async () => { const { initializeTodoApp } = await import('./modules/todo.js'); return initializeTodoApp(dependencies); },
// ... existing code ...
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
// ... existing code ...
        const cleanups = await routeInitializers[route]();
        if (Array.isArray(cleanups)) activeCleanups = cleanups;
    }
}

function updateActiveNavLink(activeRoute) {
// ... existing code ...
    const projectRoutes = projectsData.map(p => p.id);
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        const linkPath = new URL(link.href).pathname;
        let linkRoute = linkPath === '/' ? 'home' : linkPath.substring(1);
        
        link.classList.remove('nav-active');
        
        if (linkRoute === activeRoute) {
            link.classList.add('nav-active');
        } else if (linkRoute === 'projects' && projectRoutes.includes(activeRoute)) {
            link.classList.add('nav-active');
        }
    });
}

function navigate(path) {
// ... existing code ...
    if (window.location.pathname === path) return;
    
    window.history.pushState({}, '', path);
    renderContent();
}

function initializeApp() {
// ... existing code ...
    const savedTheme = localStorage.getItem('theme');
    const defaultTheme = 'dark'; 
    setTheme(savedTheme || defaultTheme);

    document.getElementById('theme-toggle').addEventListener('click', () => {
        playSound('click');
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
    
    document.getElementById('lang-switcher').addEventListener('click', e => {
// ... existing code ...
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
// ... existing code ...
        const link = e.target.closest('a');
        if (link && 
            link.origin === window.location.origin && 
            !link.hasAttribute('download') &&
            !e.ctrlKey && !e.metaKey && 
            link.target !== '_blank') 
        {
            if (link.classList.contains('project-external-link')) {
                return; 
            }
            
            e.preventDefault();
            navigate(link.pathname);
        }
    });

    renderStaticContent();
// ... existing code ...
    renderContent(true);

    const menuToggle = document.getElementById('menu-toggle');
    const siteHeader = document.querySelector('.site-header');
    const navWrapper = document.getElementById('nav-wrapper');
    menuToggle.addEventListener('click', () => {
// ... existing code ...
        siteHeader.classList.toggle('nav-open');
        menuToggle.setAttribute('aria-expanded', siteHeader.classList.contains('nav-open'));
    });
    navWrapper.addEventListener('click', (e) => {
// ... existing code ...
        if (e.target.tagName === 'A' || e.target.closest('button')) {
            siteHeader.classList.remove('nav-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

initializeApp();
