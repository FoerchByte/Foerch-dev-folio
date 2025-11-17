/**
 * @file app.js
 * @description
 * EN: Main application controller (router). Manages navigation, global state 
 * (language, theme), and module lazy loading. Uses History API for clean URLs.
 * PL: Główny kontroler (router) aplikacji. Zarządza nawigacją, stanem globalnym 
 * (język, motyw) oraz leniwym ładowaniem modułów. Używa History API dla czystych URL-i.
 */

import { translations } from './modules/translations.js';

// EN: Defines the data model for all projects listed in the registry.
// PL: Definiuje model danych dla wszystkich projektów w rejestrze.
const projectsData = [
    // EN: The first item is automatically "featured" on the "all" filter.
    // PL: Pierwszy element jest automatycznie "wyróżniony" na filtrze "all".
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
// EN: Stores the currently active filter for the project registry (e.g., 'all', 'specialist').
// PL: Przechowuje aktualnie aktywny filtr dla rejestru projektów (np. 'all', 'specialist').
let currentProjectFilter = 'all'; 

// ========================================================================
// Centralny moduł do obsługi dźwięków
// ========================================================================
let synth;

function initializeAudio() {
    if (typeof Tone !== 'undefined' && !synth) {
        synth = new Tone.PolySynth(Tone.Synth, {
            volume: -12,
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.2 }
        }).toDestination();
    }
}

async function playSound(type = 'click') {
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
    const langSet = translations[currentLang] || translations['pl'];
    const translation = langSet[key];
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
    document.body.classList.toggle('light-mode', theme === 'light');
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

/**
 * @description
 * EN: Renders the project grid based on the `currentProjectFilter`.
 * The first item in the 'all' view is given a 'featured' class.
 * PL: Renderuje siatkę projektów na podstawie `currentProjectFilter`.
 * Pierwszy element w widoku 'all' otrzymuje klasę 'featured'.
 */
function renderProjects() {
    const projectsGrid = document.getElementById('project-grid');
    if (!projectsGrid) return;

    // EN: Filter projects based on the global state.
    // PL: Filtrowanie projektów na podstawie stanu globalnego.
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

        // EN: Asymmetric grid logic: first item is 'featured' only on 'all' filter.
        // PL: Logika siatki asymetrycznej: pierwszy element jest 'wyróżniony' tylko na filtrze 'all'.
        const itemClass = (index === 0 && currentProjectFilter === 'all') 
            ? 'project-item--featured' 
            : 'project-item--small';

        // EN: Render the project card HTML.
        // PL: Renderowanie HTML karty projektu.
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
    
    document.querySelectorAll('#main-nav a[data-i18n]').forEach(link => {
        const key = link.dataset.i18n;
        link.textContent = t(key);
    });
    
    document.querySelectorAll('#lang-switcher button').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
}

function getRouteFromPathname() {
    const path = window.location.pathname;
    if (path === '/') return 'home';
    // EN: Redirect old '/about' route to new '/changelog' route.
    // PL: Przekieruj stary link '/about' na nowy '/changelog'.
    if (path === '/about') {
        window.history.replaceState({}, '', '/changelog'); 
        return 'changelog';
    }
    return path.substring(1);
}

async function renderContent(isInitialLoad = false) {
    const contentContainer = document.getElementById('app-content');
    const route = getRouteFromPathname();

    if (!isInitialLoad) {
        contentContainer.classList.remove('fade-in');
        contentContainer.classList.add('fade-out');
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    // EN: Cleanup old module styles and event listeners.
    // PL: Czyszczenie starych stylów modułu i nasłuchiwaczy zdarzeń.
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
    const projectRoutes = projectsData.map(p => p.id);
    let styleToLoad = null;

    if (projectRoutes.includes(route)) {
        // EN: Special case: statutory interest calculator reuses tax calculator styles.
        // PL: Przypadek specjalny: kalkulator odsetek ustawowych używa stylów kalkulatora podatkowego.
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
    // EN: Event listeners for the changelog page (bio section).
    // PL: Nasłuchiwacze zdarzeń dla strony changelog (sekcja bio).
    return [];
}

async function attachEventListeners(route) {
    // EN: Dependencies injected into each module.
    // PL: Zależności wstrzykiwane do każdego modułu.
    const dependencies = { t, showConfirmationModal, playSound };
    
    // EN: Module loader map.
    // PL: Mapa ładowania modułów.
    const routeInitializers = {
        'home': () => { return []; }, 
        'changelog': () => initializeChangelogPage(),
        
        'projects': () => {
            // EN: Initial render of the project grid.
            // PL: Wstępne renderowanie siatki projektów.
            renderProjects(); 
            
            // EN: Attach listener to the filter container.
            // PL: Podpięcie nasłuchiwacza do kontenera filtrów.
            const filtersContainer = document.querySelector('.project-filters');
            if (filtersContainer) {
                filtersContainer.addEventListener('click', e => {
                    if (e.target.tagName === 'BUTTON') {
                        playSound('click');
                        currentProjectFilter = e.target.dataset.filter;
                        
                        filtersContainer.querySelector('button.active').classList.remove('active');
                        e.target.classList.add('active');
                        
                        // EN: Re-render the grid with the new filter.
                        // PL: Ponowne renderowanie siatki z nowym filtrem.
                        renderProjects();
                    }
                });
            }
            return [];
        },
        
        // --- Lazy-loaded project modules ---
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
    const projectRoutes = projectsData.map(p => p.id);
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        const linkPath = new URL(link.href).pathname;
        let linkRoute = linkPath === '/' ? 'home' : linkPath.substring(1);
        
        link.classList.remove('nav-active');
        
        if (linkRoute === activeRoute) {
            link.classList.add('nav-active');
        } else if (linkRoute === 'projects' && projectRoutes.includes(activeRoute)) {
            // EN: Keep 'Projects' link active when viewing a single project.
            // PL: Utrzymaj link 'Projekty' aktywny podczas oglądania pojedynczego projektu.
            link.classList.add('nav-active');
        }
    });
}

function navigate(path) {
    if (window.location.pathname === path) return;
    
    window.history.pushState({}, '', path);
    renderContent();
}

function initializeApp() {
    // EN: Set theme based on localStorage or system preference (defaults to dark).
    // PL: Ustaw motyw na podstawie localStorage lub preferencji systemowych (domyślnie ciemny).
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

    // EN: Handle browser back/forward navigation.
    // PL: Obsługa nawigacji wstecz/do przodu w przeglądarce.
    window.addEventListener('popstate', () => renderContent());

    // EN: Hijack local links to use the SPA router.
    // PL: Przechwytywanie lokalnych linków, aby użyć routera SPA.
    document.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && 
            link.origin === window.location.origin && 
            !link.hasAttribute('download') &&
            !e.ctrlKey && !e.metaKey && 
            link.target !== '_blank') 
        {
            // EN: Exception for external links in project cards.
            // PL: Wyjątek dla zewnętrznych linków na kartach projektów.
            if (link.classList.contains('project-external-link')) {
                return; 
            }
            
            e.preventDefault();
            navigate(link.pathname);
        }
    });

    // EN: Initial render on page load.
    // PL: Pierwsze renderowanie po załadowaniu strony.
    renderStaticContent();
    renderContent(true);

    // EN: Mobile menu logic.
    // PL: Logika menu mobilnego.
    const menuToggle = document.getElementById('menu-toggle');
    const siteHeader = document.querySelector('.site-header');
    const navWrapper = document.getElementById('nav-wrapper');
    menuToggle.addEventListener('click', () => {
        siteHeader.classList.toggle('nav-open');
        menuToggle.setAttribute('aria-expanded', siteHeader.classList.contains('nav-open'));
    });
    navWrapper.addEventListener('click', (e) => {
        // EN: Close mobile menu on link or button click.
        // PL: Zamknij menu mobilne po kliknięciu linku lub przycisku.
        if (e.target.tagName === 'A' || e.target.closest('button')) {
            siteHeader.classList.remove('nav-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// --- Uruchomienie aplikacji ---
initializeApp();
