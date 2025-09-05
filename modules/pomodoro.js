// modules/pomodoro.js - Logika dla Asystenta Pomodoro

let pomodoroT; // Funkcja tłumacząca

// --- Zmienne stanu licznika ---
let settings = {};
let currentMode = 'work';
let remainingTime; // w sekundach
let totalTime; // w sekundach
let isPaused = true;
let timerInterval = null;
let pomodoroCycle = 0; // Licznik ukończonych sesji pracy
const CYCLES_BEFORE_LONG_BREAK = 4;

// --- Dźwięki ---
let synth = null;

// --- Elementy DOM ---
let timeDisplay, startPauseBtn, resetBtn, saveBtn;
let workInput, shortBreakInput, longBreakInput;
let progressCircle, radius, circumference;
let announcer, cyclesContainer;

/**
 * ZMIANA: Funkcja do odtwarzania dźwięku na koniec sesji.
 */
function playSound() {
    if (typeof Tone !== 'undefined') {
        if (!synth) {
            synth = new Tone.Synth().toDestination();
        }
        // Używamy prostego, miłego dla ucha dźwięku
        synth.triggerAttackRelease("C5", "8n", Tone.now());
    }
}

/**
 * ZMIANA: Rysuje wskaźniki cykli (kropki).
 */
function renderCycles() {
    cyclesContainer.innerHTML = '';
    for (let i = 0; i < CYCLES_BEFORE_LONG_BREAK; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'cycle-indicator';
        if (i < pomodoroCycle) {
            indicator.classList.add('completed');
        }
        cyclesContainer.appendChild(indicator);
    }
}

function saveSettings() {
    settings.work = parseInt(workInput.value, 10);
    settings.shortBreak = parseInt(shortBreakInput.value, 10);
    settings.longBreak = parseInt(longBreakInput.value, 10);

    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));

    if (!isPaused) {
        pauseTimer();
    }
    switchMode(currentMode, true);
    
    saveBtn.textContent = pomodoroT('pomodoroSettingsSaved');
    saveBtn.classList.add('saved');
    if (announcer) announcer.textContent = pomodoroT('pomodoroSettingsSaved');
    setTimeout(() => {
        saveBtn.textContent = pomodoroT('pomodoroSaveSettings');
        saveBtn.classList.remove('saved');
    }, 1500);
}

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

function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    timeDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - ${pomodoroT('pomodoroTimerTitle')}`;
    updateProgressCircle();
}

function updateProgressCircle() {
    const progress = (totalTime - remainingTime) / totalTime;
    const offset = circumference * (1 - progress);
    progressCircle.style.strokeDashoffset = offset;
}

/**
 * ZMIANA: Logika automatycznego przełączania trybów po zakończeniu odliczania.
 */
function handleTimerCompletion() {
    playSound();

    if (currentMode === 'work') {
        pomodoroCycle++;
        if (pomodoroCycle >= CYCLES_BEFORE_LONG_BREAK) {
            switchMode('longBreak');
        } else {
            switchMode('shortBreak');
        }
    } else {
        // Po przerwie zawsze wracamy do pracy
        if (currentMode === 'longBreak') {
            pomodoroCycle = 0; // Resetujemy cykl po długiej przerwie
        }
        switchMode('work');
    }
    renderCycles();
    // Opcjonalnie: automatycznie startuj następny timer
    // startTimer(); 
}

function switchMode(mode, forceReset = false) {
    if (!forceReset && mode === currentMode) return;
    
    currentMode = mode;
    pauseTimer();
    totalTime = settings[mode] * 60;
    remainingTime = totalTime;

    document.querySelectorAll('.pomodoro-modes button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    if (announcer) {
        const modeKeyMap = {
            work: 'pomodoroModeWork',
            shortBreak: 'pomodoroModeShortBreak',
            longBreak: 'pomodoroModeLongBreak'
        };
        announcer.textContent = `${pomodoroT(modeKeyMap[mode])}: ${settings[mode]} minut.`;
    }
    updateDisplay();
}

function startTimer() {
    // Zapewnienie, że kontekst audio jest aktywowany przez interakcję użytkownika
    if (typeof Tone !== 'undefined' && Tone.context.state !== 'running') {
        Tone.start();
    }
    isPaused = false;
    startPauseBtn.textContent = pomodoroT('pomodoroPause');
    if (announcer) announcer.textContent = "Licznik uruchomiony.";
    
    timerInterval = setInterval(() => {
        remainingTime--;
        updateDisplay();
        if (remainingTime <= 0) {
            pauseTimer();
            handleTimerCompletion();
        }
    }, 1000);
}

function pauseTimer() {
    if (!isPaused && announcer) announcer.textContent = "Licznik zatrzymany.";
    isPaused = true;
    startPauseBtn.textContent = pomodoroT('pomodoroStart');
    clearInterval(timerInterval);
    document.title = pomodoroT('pomodoroTimerTitle');
}

function resetTimer() {
    pauseTimer();
    pomodoroCycle = 0; // Resetujemy również cykle
    switchMode('work', true);
    renderCycles();
    if (announcer) announcer.textContent = "Licznik zresetowany.";
}

export function initializePomodoroTimer(dependencies) {
    pomodoroT = dependencies.t;

    timeDisplay = document.getElementById('pomodoro-time-display');
    startPauseBtn = document.getElementById('pomodoro-start-pause-btn');
    resetBtn = document.getElementById('pomodoro-reset-btn');
    saveBtn = document.getElementById('pomodoro-save-btn');
    workInput = document.getElementById('work-duration');
    shortBreakInput = document.getElementById('short-break-duration');
    longBreakInput = document.getElementById('long-break-duration');
    progressCircle = document.querySelector('.progress-ring-circle');
    announcer = document.getElementById('pomodoro-announcer');
    cyclesContainer = document.getElementById('pomodoro-cycles');
    
    radius = progressCircle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;

    loadSettings();
    switchMode('work', true);
    renderCycles();

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

    const cleanup = () => {
        pauseTimer();
        document.title = pomodoroT('siteTitle');
    };
    return [cleanup];
}
