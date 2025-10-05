/**
 * app.js - Główny skrypt aplikacji (kontroler/router)
 * Zarządza nawigacją, stanem globalnym i deleguje logikę do modułów.
 * WERSJA Z HISTORY API: Używa "czystych" URL-i bez znaku #.
 */

import { translations } from './modules/translations.js';

// --- Dane projektów (bez zmian) ---
const projectsData = [
    { id: 'project-aggregator', category: 'specialist', cardTitleKey: 'aggregatorCardTitle', cardDescKey: 'aggregatorCardDesc' },
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

// --- Zmienne globalne ---
let currentLang = localStorage.getItem('lang') || 'pl';
let currentTheme = localStorage.getItem('theme') || 'light';
let currentProjectFilter = 'all';
let activeCleanups = [];
let activeStyleId = null;

// ========================================================================
// Centralny moduł do obsługi dźwięków
// ========================================================================
let synth;

function initializeAudio() {
    if (typeof Tone !== 'undefined' && !synth) {
        // ZMIANA: Obniżamy głośność całego syntezatora dla subtelniejszego efektu
        synth = new Tone.PolySynth(Tone.Synth, {
            volume: -12, // Obniżenie głośności o 12 decybeli
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
                // ZMIANA: Delikatniejszy, krótszy i cichszy dźwięk
                synth.triggerAttackRelease("C4", "16n", now, 0.6); // Niższa nuta, krótszy czas, mniejsza siła ataku
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

function getRouteFromPathname() {
    const path = window.location.pathname;
    return path === '/' ? 'about' : path.substring(1);
}

async function renderContent(isInitialLoad = false) {
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
    const dependencies = { t, showConfirmationModal, playSound };
    
    const routeInitializers = {
        'about': () => initializeAboutPage(),
        'projects': () => {
            const filters = document.querySelector('.project-filters');
            filters.addEventListener('click', e => {
                if (e.target.tagName === 'BUTTON') {
                    playSound('click');
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
        'project-aggregator': async () => { const { initializeProjectAggregator } = await import('./modules/project-aggregator.js'); return initializeProjectAggregator(dependencies); },
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

function navigate(path) {
    window.history.pushState({}, '', path);
    renderContent();
}

function initializeApp() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
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

