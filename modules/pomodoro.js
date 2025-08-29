// modules/pomodoro.js - Logika dla licznika Pomodoro z zapisem ustawień

let pomodoroT; // Funkcja tłumacząca

// --- Zmienne stanu licznika ---
let settings = {};
let currentMode = 'work';
let remainingTime; // w sekundach
let totalTime; // w sekundach
let isPaused = true;
let timerInterval = null;

// --- Elementy DOM ---
let timeDisplay, startPauseBtn, resetBtn, saveBtn;
let workInput, shortBreakInput, longBreakInput;
let progressCircle;
let radius, circumference;
let announcer; // ZMIANA: Dodano zmienną dla "ogłaszacza"

/**
 * Zapisuje aktualne ustawienia czasu do localStorage.
 */
function saveSettings() {
    settings.work = parseInt(workInput.value, 10);
    settings.shortBreak = parseInt(shortBreakInput.value, 10);
    settings.longBreak = parseInt(longBreakInput.value, 10);

    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));

    // Aktualizuj timer, jeśli zmieniono czas dla aktywnego trybu
    if (!isPaused) {
        pauseTimer();
    }
    switchMode(currentMode, true); // Zresetuj timer z nowymi wartościami
    
    // Informacja zwrotna dla użytkownika
    saveBtn.textContent = pomodoroT('pomodoroSettingsSaved');
    saveBtn.classList.add('saved');
    if (announcer) announcer.textContent = pomodoroT('pomodoroSettingsSaved'); // ZMIANA: Ogłoś zapisanie
    setTimeout(() => {
        saveBtn.textContent = pomodoroT('pomodoroSaveSettings');
        saveBtn.classList.remove('saved');
    }, 1500);
}

/**
 * Wczytuje ustawienia z localStorage lub ustawia domyślne.
 */
function loadSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings'));
    
    settings = {
        work: savedSettings?.work || 25,
        shortBreak: savedSettings?.shortBreak || 5,
        longBreak: savedSettings?.longBreak || 15,
    };

    workInput.value = settings.work;
    shortBreakInput.value = settings.shortBreak;
    longBreakInput.value = settings.longBreak;
}

/**
 * Aktualizuje wyświetlacz czasu i tytuł strony.
 */
function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    timeDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - ${pomodoroT('pomodoroTimerTitle')}`;
    updateProgressCircle();
}

/**
 * Aktualizuje wizualny postęp na okręgu SVG.
 */
function updateProgressCircle() {
    const elapsedTime = totalTime - remainingTime;
    const progress = elapsedTime / totalTime;
    const offset = circumference * progress;
    progressCircle.style.strokeDashoffset = offset;
}

/**
 * Przełącza tryb licznika (praca, krótka/długa przerwa).
 * @param {string} mode - Nazwa trybu ('work', 'shortBreak', 'longBreak')
 * @param {boolean} forceReset - Czy wymusić zresetowanie timera
 */
function switchMode(mode, forceReset = false) {
    if (!forceReset && mode === currentMode) return;
    
    currentMode = mode;
    pauseTimer();
    totalTime = settings[mode] * 60;
    remainingTime = totalTime;

    document.querySelectorAll('.pomodoro-modes button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // ZMIANA: Ogłoś zmianę trybu dla czytników ekranu
    if (announcer) {
        let modeKey;
        if (mode === 'work') modeKey = 'pomodoroModeWork';
        else if (mode === 'shortBreak') modeKey = 'pomodoroModeShortBreak';
        else modeKey = 'pomodoroModeLongBreak';
        announcer.textContent = `${pomodoroT(modeKey)}: ${settings[mode]} minut.`;
    }

    updateDisplay();
}

/**
 * Rozpoczyna odliczanie.
 */
function startTimer() {
    isPaused = false;
    startPauseBtn.textContent = pomodoroT('pomodoroPause');
    if (announcer) announcer.textContent = "Licznik uruchomiony."; // ZMIANA: Ogłoś start
    
    timerInterval = setInterval(() => {
        remainingTime--;
        updateDisplay();
        if (remainingTime <= 0) {
            pauseTimer();
            if (announcer) announcer.textContent = "Czas minął."; // ZMIANA: Ogłoś koniec
        }
    }, 1000);
}

/**
 * Pauzuje odliczanie.
 */
function pauseTimer() {
    if (!isPaused) { // Ogłoś pauzę tylko jeśli timer był aktywny
        if (announcer) announcer.textContent = "Licznik zatrzymany."; // ZMIANA: Ogłoś pauzę
    }
    isPaused = true;
    startPauseBtn.textContent = pomodoroT('pomodoroStart');
    clearInterval(timerInterval);
    document.title = pomodoroT('pomodoroTimerTitle');
}

/**
 * Resetuje licznik do wartości początkowej dla danego trybu.
 */
function resetTimer() {
    pauseTimer();
    remainingTime = settings[currentMode] * 60;
    if (announcer) announcer.textContent = "Licznik zresetowany."; // ZMIANA: Ogłoś reset
    updateDisplay();
}

/**
 * Główna funkcja inicjalizująca licznik Pomodoro.
 * @param {object} dependencies - Zależności (np. funkcja t)
 * @returns {Array<Function>} - Tablica funkcji czyszczących
 */
export function initializePomodoroTimer(dependencies) {
    pomodoroT = dependencies.t;

    // Pobranie elementów DOM
    timeDisplay = document.getElementById('pomodoro-time-display');
    startPauseBtn = document.getElementById('pomodoro-start-pause-btn');
    resetBtn = document.getElementById('pomodoro-reset-btn');
    saveBtn = document.getElementById('pomodoro-save-btn');
    workInput = document.getElementById('work-duration');
    shortBreakInput = document.getElementById('short-break-duration');
    longBreakInput = document.getElementById('long-break-duration');
    progressCircle = document.querySelector('.progress-ring-circle');
    announcer = document.getElementById('pomodoro-announcer'); // ZMIANA: Pobierz "ogłaszacza"
    
    // Konfiguracja okręgu postępu
    radius = progressCircle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = 0;

    // Wczytanie ustawień i inicjalizacja
    loadSettings();
    switchMode('work', true);

    // Dodanie nasłuchiwania na zdarzenia
    startPauseBtn.addEventListener('click', () => {
        isPaused ? startTimer() : pauseTimer();
    });
    resetBtn.addEventListener('click', resetTimer);
    saveBtn.addEventListener('click', saveSettings);
    document.querySelector('.pomodoro-modes').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            switchMode(e.target.dataset.mode);
        }
    });

    // Funkcja czyszcząca
    const cleanup = () => {
        pauseTimer();
        document.title = pomodoroT('siteTitle');
    };

    return [cleanup];
}