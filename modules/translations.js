/*
  EN: This module serves as the central hub for all text translations in the
  application. It ensures a consistent, dual-language user experience and
  demonstrates a scalable approach to managing i18n (internationalization) in
  a web project.
  PL: Ten moduł pełni rolę centralnego centrum dla wszystkich tłumaczeń tekstów
  w aplikacji. Zapewnia spójne, dwujęzyczne doświadczenie użytkownika i
  demonstruje skalowalne podejrzenie do zarządzania i18n (internacjonalizacją)
  w projekcie webowym.
*/
export const translations = {
    pl: {
        siteTitle: "FoerchByte // Portfolio",
        navProjects: "Projekty", navChangelog: "Changelog", navContact: "Kontakt",
        
        heroSubtitle: "EXECUTIVE_ENGINEER",
        heroTitle: "Budowanie <span class=\"highlight\">Systemów</span> Które Skalują",
        heroDescription: "Architektura wysokowydajnych systemów rozproszonych i infrastruktury z precyzją inżynierią i podejmowaniem decyzji w oparciu o dane.",
        heroCta: "ZOBACZ_CASE_STUDIES",

        // --- Sekcja "O mnie" (Teraz /changelog) ---
        backToProjects: "‹ Wróć do projektów",
        aboutTitle: "Michał 'Foerch' Herbich",
        aboutSubtitle: "Specjalista ds. Automatyzacji Danych | Frontend Developer",
        aboutDesc1: "Jestem inżynierem, który nie godzi się na \"tak zawsze robiliśmy\". Specjalizuję się w identyfikacji wąskich gardeł w procesach biznesowych i ich bezlitosnej automatyzacji.",
        aboutDesc2: "Łączę twarde kompetencje analityczne (VBA, Power Query, Excel) z nowoczesnym stackiem webowym (JavaScript, API), tworząc narzędzia, które oszczędzają setki godzin pracy rocznie. Moim celem jest budowanie systemów, które działają dla ludzi, a nie odwrotnie.",
        aboutSkillsTitle: "Stack Technologiczny",
        skillsHeaderData: "// Automatyzacja i Analiza Danych",
        skillsHeaderFrontend: "// Frontend Development",

        aboutCtaProjects: "Zobacz Case Studies",
        aboutCtaCv: "Pobierz pełne CV",
        
        changelogTitle: "Przebieg Kariery (Changelog)",
        
        // v3.0.0 - Inspektor
        changelogV3Title: "Rewolucja Automatyzacji (Inspektor)",
        changelogV3Place: "Urząd Miasta Łodzi",
        changelogV3Date: "06.2023 - obecnie",
        changelogV3Desc: "Uzyskanie tytułu Magistra (AI). Wdrożenie pełnego ekosystemu automatyzacji: zastąpienie manualnych procesów skryptami VBA i potokami Power Query. KLUCZOWY WYNIK: Redukcja czasu rocznego rozliczenia 140+ projektów z 78 dni roboczych do zaledwie 3 dni.",
        changelogV3Tags: "<span style='color: var(--primary-color)'>[Magister (SI)]</span> [VBA] [Power Query] [Automatyzacja Procesów]",

        // v2.0.0 - Podinspektor
        changelogV2Title: "Inkubacja Techniczna (Podinspektor)",
        changelogV2Place: "Urząd Miasta Łodzi",
        changelogV2Date: "03.2021 - 05.2023",
        changelogV2Desc: "Etap budowania fundamentów. Uzyskanie tytułu Inżyniera Informatyki. Optymalizacja warsztatu pracy (setup 3-monitorowy) i wdrażanie pierwszych zaawansowanych modeli danych w Power Query do obsługi sprawozdań >40k wierszy.",
        changelogV2Tags: "<span style='color: var(--primary-color)'>[Inżynier (Informatyka)]</span> [Advanced Excel] [Hardware Setup]",

        // v1.5.0 - Referent
        changelogV15Title: "Optymalizacja Formułami (Referent)",
        changelogV15Place: "Urząd Miasta Łodzi",
        changelogV15Date: "11.2020 - 02.2021",
        changelogV15Desc: "Pierwsza iteracja usprawnień. Zastąpienie ręcznego sumowania danych dynamicznymi formułami (SUMIFS, VLOOKUP) w arkuszach zbiorczych.",

        // v1.0.0 - Młodszy Referent
        changelogV10Title: "Manualna Baza (Młodszy Referent)",
        changelogV10Place: "Urząd Miasta Łodzi",
        changelogV10Date: "11.2019 - 11.2020",
        changelogV10Desc: "Onboarding i analiza procesów legacy. Identyfikacja krytycznych ryzyk błędu ludzkiego w 100% manualnym procesie raportowania.",

        // v0.5.0 - Stażysta
        changelogV05Title: "Wersja Beta (Stażysta)",
        changelogV05Place: "Urząd Miasta Łodzi",
        changelogV05Date: "07.2019 - 11.2019",
        changelogV05Desc: "Wstępne rozpoznanie środowiska. Archiwizacja i podstawowe porządkowanie dokumentacji budżetowej.",


        // --- Strona Projektów (NOWA WERSJA) ---
        projectsTitle: "Rejestr Projektów",
        projectsSubtitle: "SELECT * FROM projects WHERE status IN ('Produkcja', 'Wdrożony', 'Aktywny') ORDER BY date DESC;",
        
        // Filtry (stare klucze, na razie zostają, ale nie będą używane w nowym UI)
        projectsCategoryAll: "WSZYSTKIE",
        projectsCategorySpecialist: "AUTOMATYZACJA",
        projectsCategoryTools: "NARZĘDZIA",
        projectsCategoryCreative: "FRONTEND",
        projectsCategoryGames: "GRY",
        
        // 1. Agregator
        aggregatorTitle: "Agregator Rozliczeń Projektowych",
        aggregatorDesc: "Narzędzie automatyzujące (JS/SheetJS) proces tworzenia rocznych zestawień finansowych z wielu plików Excel.",
        aggregatorStatus: "PRODUKCJA",
        aggregatorDate: "2023-Q4",
        aggregatorTags: "[JavaScript] [SheetJS] [Automatyzacja] [DOM]",

        // 2. Odsetki Podatkowe
        taxArrearsTitle: "Kalkulator Odsetek Podatkowych",
        taxArrearsDesc: "Narzędzie biznesowe odwzorowujące złożone przepisy podatkowe (Ordynacja Podatkowa) do obliczania odsetek.",
        taxArrearsStatus: "PRODUKCJA",
        taxArrearsDate: "2023-Q2",
        taxArrearsTags: "[JavaScript] [Logika Biznesowa] [Finanse]",
        
        // 3. Odsetki Ustawowe
        statutoryInterestTitle: "Kalkulator Odsetek Ustawowych",
        statutoryInterestDesc: "Obliczanie odsetek ustawowych i handlowych z pełną historią dynamicznie zmieniających się stawek.",
        statutoryInterestStatus: "PRODUKCJA",
        statutoryInterestDate: "2023-Q3",
        statutoryInterestTags: "[JavaScript] [Logika Biznesowa] [Finanse]",

        // 4. Walidator Budżetu
        budgetValidatorTitle: "Walidator Danych Budżetowych",
        budgetValidatorDesc: "Narzędzie do szybkiej weryfikacji spójności danych (liczby kolumn) skopiowanych bezpośrednio z Excela.",
        budgetValidatorStatus: "WDROŻONY",
        budgetValidatorDate: "2023-Q1",
        budgetValidatorTags: "[JavaScript] [DOM] [Narzędzie]",

        // 5. Stacja Pogody
        weatherTitle: "Stacja Pogody v2.1",
        // ZMIANA: Uproszczony opis, bo link będzie osobno
        weatherDesc: "Aplikacja pogodowa z prognozą, geolokalizacją i architekturą serverless (Netlify Functions) do ukrywania kluczy API.",
        // ZMIANA: Status z 'AKTYWNY' na 'KONCEPCJA'
        weatherStatus: "KONCEPCJA",
        weatherDate: "2024-Q1",
        weatherTags: "[JavaScript] [API] [Serverless] [Netlify]",
        // NOWY KLUCZ: Tekst dla linku do v2.1
        weatherLinkDesc: "Zobacz v2.1 (Interaktywny Radar) ↗",


        // 6. Lista Zadań
        todoTitle: "Aplikacja \"Lista Zadań\"",
        todoDesc: "Zaawansowana aplikacja To-Do z filtrowaniem, edycją, zapisem w localStorage i obsługą gestów dotykowych (drag-n-drop).",
        todoStatus: "AKTYWNY",
        todoDate: "2024-Q2",
        todoTags: "[JavaScript] [DOM] [UI/UX] [LocalStorage]",

        // 7. Kalkulator Walut
        currencyCalcTitle: "Kalkulator Walut",
        currencyCalcDesc: "Przelicznik walut korzystający z aktualnych kursów pobieranych na żywo z publicznego API (Frankfurter.app).",
        currencyCalcStatus: "WDROŻONY",
        currencyCalcDate: "2023-Q4",
        currencyCalcTags: "[JavaScript] [API] [Fetch]",

        // 8. Pomodoro
        pomodoroTimerTitle: "Asystent Pomodoro",
        pomodoroTimerDesc: "Narzędzie do zarządzania czasem pracy (technika Pomodoro) z konfigurowalnymi cyklami i powiadomieniami audio.",
        pomodoroTimerStatus: "WDROŻONY",
        pomodoroTimerDate: "2024-Q1",
        pomodoroTimerTags: "[JavaScript] [DOM] [Audio API]",

        // 9. Agency
        agencyTitle: "Projekt \"Creative Agency\"",
        agencyDesc: "Landing page demonstrujący nowoczesne i w pełni responsywne układy (CSS Grid/Flexbox) dla fikcyjnej agencji.",
        agencyStatus: "KONCEPCJA",
        agencyDate: "2023-Q3",
        agencyTags: "[HTML5] [CSS3] [Flexbox] [Grid]",

        // 10. Edytor Markdown
        markdownEditorTitle: "Edytor Markdown",
        markdownEditorDesc: "Edytor tekstu z podglądem na żywo (live-preview), analizą treści w czasie rzeczywistym i synchronizacją przewijania.",
        markdownEditorStatus: "AKTYWNY",
        markdownEditorDate: "2023-Q4",
        markdownEditorTags: "[JavaScript] [DOM] [Marked.js]",

        // 11. Snake
        snakeGameTitle: "Gra w Węża",
        snakeGameDesc: "Implementacja klasycznej gry zręcznościowej na elemencie HTML Canvas, z obsługą klawiatury i gestów mobilnych.",
        snakeGameStatus: "GRYWALNY",
        snakeGameDate: "2024-Q2",
        snakeGameTags: "[JavaScript] [HTML Canvas] [GameDev]",

        // 12. Tic-Tac-Toe
        ticTacToeTitle: "Kółko i Krzyżyk",
        ticTacToeDesc: "Klasyczna gra zaimplementowana w czystym JS, oferująca tryb Gracz vs Gracz oraz Gracz vs Komputer (proste AI).",
        ticTacToeStatus: "GRYWALNY",
        ticTacToeDate: "2024-Q1",
        ticTacToeTags: "[JavaScript] [GameDev] [AI]",

        // 13. Memory Game
        memoryGameTitle: "Gra Pamięciowa",
        memoryGameDesc: "Gra trenująca pamięć (dopasowywanie par) z licznikiem ruchów, timerem i dynamicznym generowaniem planszy.",
        memoryGameStatus: "GRYWALNY",
        memoryGameDate: "2024-Q1",
        memoryGameTags: "[JavaScript] [DOM] [GameDev]",

        // --- Strony Pojedynczych Projektów ---
        
        budgetValidatorTitle: "Walidator Danych Budżetowych",
        budgetValidatorSubtitle: "Wklej poniżej dane skopiowane np. z programu Excel (rozdzielane tabulatorami). Narzędzie sprawdzi, czy każdy wiersz ma taką samą liczbę kolumn.",
        budgetValidatorTextareaLabel: "Dane do walidacji",
        budgetValidatorValidateBtn: "Waliduj dane",
        budgetValidatorResultTitle: "Wynik walidacji",
        budgetValidatorSuccess: ({ rows }) => `Walidacja zakończona pomyślnie. Sprawdzono ${rows} wierszy. Wszystkie mają spójną liczbę kolumn.`,
        budgetValidatorError: "Znaleziono błędy w danych:",
        budgetValidatorErrorLine: ({ line, expected, found }) => `Błąd w wierszu ${line}: Oczekiwano ${expected} kolumn, znaleziono ${found}.`,
        budgetValidatorEmpty: "Pole z danymi jest puste.",
        
        statutoryInterestTitle: "Kalkulator Odsetek Ustawowych",
        statutoryInterestTypeLabel: "Rodzaj odsetek",
        statutoryInterestStandard: "Ustawowe za opóźnienie",
        statutoryInterestCommercial: "W transakcjach handlowych",
        statutoryInterestAmountLabel: "Kwota roszczenia (PLN)",
        statutoryInterestStartDateLabel: "Data wymagalności",
        statutoryInterestEndDateLabel: "Data zapłaty / dzień obliczenia",
        statutoryInterestDataSource: "Stawki odsetek zgodne z obwieszczeniami Ministra Sprawiedliwości i danymi NBP.",
        
        aggregatorTitle: "Agregator Rozliczeń Projektowych",
        aggregatorSubtitle: "Wersja demonstracyjna na potrzeby portfolio. Wgraj przykładowe pliki, aby wygenerować raport.",
        aggregatorStep1: "1. Wskaż źródła danych",
        aggregatorStep2: "2. Wprowadź informacje o projektach",
        aggregatorFilesLabel: "Pliki projektowe (.xlsx)",
        aggregatorDownloadSamples: "Pobierz przykładowe pliki",
        aggregatorBaseLabel: "Baza nazw projektów",
        aggregatorPlaceholder: "Wklej tutaj listę, aby aplikacja mogła dopasować nazwy do numerów znalezionych w plikach.\nPrzykład:\n938 PROFESSIONAL HOTELIER ACADEMY\n939 Educational Innovation Project",
        aggregatorGenerateReport: "Generuj Raport",
        aggregatorReportTitle: "Wygenerowany Raport",
        aggregatorColNumber: "Numer Projektu",
        aggregatorColName: "Nazwa Projektu",
        aggregatorColSum: "Suma Wartości Netto",
        aggregatorTotal: "RAZEM",
        aggregatorErrorFiles: "Proszę wybrać przynajmniej jeden plik .xlsx.",
        aggregatorErrorBase: "Proszę wprowadzić bazę nazw projektów.",
        aggregatorErrorNoData: "Nie znaleziono pasujących danych w przesłanych plikach.",
        
        todoTitle: "Lista Zadań", todoPlaceholder: "Co jest do zrobienia?", todoAddBtn: "Dodaj",
        todoCounter: (count) => `${count} zadań pozostało`,
        todoFilterAll: "Wszystkie", todoFilterActive: "Aktywne", todoFilterCompleted: "Ukończone",
        todoClearCompleted: "Wyczyść ukończone", todoConfirmClear: (count) => `Are you sure you want to delete ${count} completed tasks?`,
        confirmYes: "Tak", confirmNo: "Anuluj",
        
        weatherTitle: "Stacja Pogody", weatherPlaceholder: "Wpisz nazwę miasta...", weatherSearchBtn: "Szukaj",
        weatherGeoBtn: "Użyj mojej lokalizacji",
        weatherForecastTitle: "Prognoza na 5 dni",
        weatherHourlyForecastTitle: "Prognoza godzinowa",
        weatherRoadConditionTitle: "Stan nawierzchni",
        roadDry: "Sucha",
        roadWet: "Mokra",
        roadIcy: "Możliwe oblodzenie",
        weatherWind: "Wiatr",
        weatherPressure: "Ciśnienie",
        weatherSunrise: "Wschód słońca",
        weatherSunset: "Zachód słońca",
        
        currencyTitle: "Kalkulator Walut", currencyAmount: "Kwota", currencyFrom: "Z", currencyTo: "Na", currencyDataSource: "Kursy walut dostarczane przez Frankfurter.app",
        
        markdownEditorTitle: "Zaawansowany Edytor Markdown",
        markdownEditorSubtitle: "Skorzystaj z paska narzędzi, aby szybko formatować tekst. Podgląd aktualizuje się na żywo i synchronizuje z edytorem.",
        markdownHowToUse: "Wskazówka: Zaznacz tekst, a następnie kliknij przycisk, aby zastosować formatowanie.",
        markdownBold: "Pogrubienie",
        markdownItalic: "Kursywa",
        markdownLink: "Wstaw link",
        markdownList: "Lista punktowana",
        markdownCode: "Wstaw kod",
        markdownWords: "Słowa",
        markdownCharacters: "Znaki",
        
        pomodoroTimerTitle: "Asystent Pomodoro", pomodoroModeWork: "Praca", pomodoroModeShortBreak: "Krótka Przerwa", pomodoroModeLongBreak: "Długa Przerwa", pomodoroStart: "Start", pomodoroPause: "Pauza", pomodoroReset: "Reset",
        pomodoroSettingsTitle: "Ustawienia", pomodoroWorkLabel: "Czas pracy (min)", pomodoroShortBreakLabel: "Krótka przerwa (min)", pomodoroLongBreakLabel: "Długa przerwa (min)", pomodoroSaveSettings: "Zapisz",
        pomodoroSettingsSaved: "Zapisano!",
        pomodoroCyclesTitle: "Ukończone cykle (cel: 4)",
        
        ticTacToeTitle: "Gra w Kółko i Krzyżyk", ticTacToeTurn: (player) => `Ruch gracza: ${player}`, ticTacToeWinner: (player) => `Wygrywa gracz ${player}!`, ticTacToeDraw: "It's a draw!", ticTacToeRestart: "Play Again",
        ticTacToeModePVP: "Gracz vs Gracz", ticTacToeModePVC: "Gracz vs Komputer", ticTacToeScore: "Wynik", ticTacToeChooseSide: "Wybierz swoją stronę:", ticTacToePlay: "Start Game",
        
        memoryGameTitle: "Gra Pamięciowa", memoryGameMoves: "Ruchy", memoryGameTime: "Czas", memoryGameRestart: "Zagraj ponownie",
        memoryGameWin: ({ moves, time }) => `Gratulacje! Wygrałeś w ${moves} moves and ${time}s!`,
        
        snakeGameTitle: "Gra w Węża", snakeGameScore: "Score", snakeGameHighScore: "High Score", snakeGamePause: "PAUSED", snakeGameOver: "Game Over!", snakeGameRestart: "Zagraj ponownie",
        snakeGameStartMsg: "Naciśnij klawisz lub przesuń palcem, aby rozpocząć",
        snakeGameControls: "Sterowanie: Klawisze strzałek, WSAD lub gesty. Pauza: Spacja.",
        
        agencyTitle: "Kreatywna Agencja", agencyHeroTitle: "Tworzymy cyfrowe doświadczenia.", agencyHeroSubtitle: "Specjalizujemy się w projektowaniu stron internetowych, brandingu i marketingu online, które pomagają Twojej firmie rosnąć.",
        agencyServicesTitle: "Nasze Usługi", service1Title: "Web Design", service1Desc: "Nowoczesne i responsywne strony internetowe.", service2Title: "Branding", service2Desc: "Tworzenie silnej i spójnej tożsamości marki.", service3Title: "Marketing Online", service3Desc: "Zwiększanie widoczności w internecie.",
        agencyProcessTitle: "Nasz Proces Pracy", processStep1Title: "Odkrycie", processStep1Desc: "Analizujemy Twoje potrzeby i cele.", processStep2Title: "Projekt", processStep2Desc: "Tworzymy strategie i makiety.", processStep3Title: "Realizacja", processStep3Desc: "Budujemy i programujemy rozwiązanie.", processStep4Title: "Wdrożenie", processStep4Desc: "Uruchamiamy projekt i zapewniamy wsparcie.",
        agencyPortfolioTitle: "Nasze Portfolio", portfolioItem1: "Branding dla Firmy A", portfolioItem2: "Strona dla Firmy B", portfolioItem3: "Aplikacja dla Firmy C", portfolioItem4: "Marketing dla Firmy D", portfolioItem5: "Sklep E-commerce dla Firmy E", portfolioItem6: "Identyfikacja Wizualna dla Firmy F",
        agencyStatsTitle: "Zaufali nam w liczbach", statsClients: "Zadowolonych Klientów", statsProjects: "Ukończonych Projektów", statsCoffee: "Wypitych Kaw",
        agencyTeamTitle: "Nasz Zespół", teamMember1Name: "Piotr Wiśniewski", teamMember1Role: "CEO & Founder", teamMember2Name: "Jan Nowak", teamMember2Role: "Lead Designer", teamMember3Name: "Anna Kowalska", teamMember3Role: "Lead Developer",
        agencyTestimonialsTitle: "Opinie Klientów",
        testimonial1: "Niesamowita dbałość o szczegóły. Nasza nowa strona przerosła nasze oczekiwania!", testimonial1Author: "Janina z Firmy X",
        testimonial2: "Profesjonalizm i kreatywność na najwyższym poziomie. Polecam!", testimonial2Author: "Marek z Firmy Y",
        testimonial3: "Szybka realizacja i świetna komunikacja na każdym etapie projektu.", testimonial3Author: "Ewa z Firmy Z",
        testimonial4: "A team that really listens to the client. The results speak for themselves.", testimonial4Author: "Thomas from Company A",
        testimonial5: "Thanks to them, our online sales increased by 200%. Amazing!", testimonial5Author: "Catherine from Company B",
        testimonial6: "Full professionalism and commitment. We will definitely be back with more projects.", testimonial6Author: "Adam from Company C",
        agencyContactTitle: "Contact Us", formName: "Imię", formEmail: "Email", formMessage: "Wiadomość", formSend: "Wyślij", formSuccess: "Dziękujemy za wiadomość! Skontaktujemy się wkrótce.",
        
        // --- Strona Kontaktu (NOWA WERSJA) ---
        contactTitle: "Inicjalizacja Połączenia",
        contactContent: "Masz pytanie lub propozycję współpracy? Chętnie odpowiem na Twoją wiadomość. Znajdź mnie w sieci lub skorzystaj z bezpiecznego formularza poniżej.",
        contactFormTitle: "$ send-message --recipient FoerchByte",
        formName: "$ --name", 
        formEmail: "$ --email", 
        formMessage: "$ --message", 
        formSend: "EXECUTE_SEND",
        formSuccess: "Transmisja zakończona sukcesem. Oczekuj na odpowiedź.",
        geminiTitle: "AI Command Assistant",
        geminiContent: "Zoptymalizuj ładunek (treść) pod kątem profesjonalnego tonu.",
        geminiPlaceholder: "np. siema, chce pogadac o projekcie, kiedy masz czas?",
        geminiBtn: "RUN_OPTIMIZATION",
        
        // --- Błędy i inne ---
        loading: "Przetwarzanie...",
        taxArrearsTitle: "Kalkulator Odsetek za Zwłokę",
        taxArrearsAmountLabel: "Kwota zaległości (PLN)",
        taxArrearsStartDateLabel: "Termin płatności",
        taxArrearsEndDateLabel: "Data wpłaty / dzień obliczenia",
        taxArrearsCalculateBtn: "Oblicz odsetki",
        taxArrearsResultTitle: "Wynik obliczeń",
        taxArrearsInterestAmount: "Należne odsetki:",
        taxArrearsTotalAmount: "Łącznie do zapłaty:",
        taxArrearsCalculationDetails: "Szczegóły kalkulacji",
        taxArrearsPeriod: "Okres",
        taxArrearsDays: "Liczba dni",
        taxArrearsRate: "Stawka",
        taxArrearsInterest: "Odsetki",
        taxArrearsNoInterest: "Odsetki nie są naliczane (kwota poniżej progu).",
        taxArrearsErrorDate: "Data wpłaty musi być późniejsza niż termin płatności.",
        taxArrearsErrorAmount: "Proszę podać prawidłową kwotę zaległości.",
        taxArrearsDataSource: "Stawki odsetek zgodne z obwieszczeniami Ministra Finansów.",
        errorApiGeneric: "Wystąpił błąd. Spróbuj ponownie później.",
        errorApiWeather: "Nie udało się pobrać danych o pogodzie. Spróbuj ponownie.",
        errorApiCurrency: "Nie udało się pobrać kursów walut.",
        errorApiGemini: "Asystent AI jest chwilowo niedostępny.",
        errorGeo: "Nie udało się pobrać Twojej lokalizacji. Sprawdź ustawienia przeglądarki i zezwól na dostęp.",
        errorNotFound: "Nie znaleziono miasta.",
        errorAuth: "Błąd autoryzacji. Sprawdź klucz API.",
        errorServer: ({ status }) => `Błąd serwera (${status}). Spróbuj ponownie.`,
    },
    en: {
        siteTitle: "FoerchByte // Portfolio",
        navProjects: "Projects", navChangelog: "Changelog", navContact: "Contact",

        heroSubtitle: "EXECUTIVE_ENGINEER",
        heroTitle: "Building <span class=\"highlight\">Systems</span> That Scale",
        heroDescription: "Architecting high-performance distributed systems and infrastructure with precision engineering and data-driven decision making.",
        heroCta: "VIEW_CASE_STUDIES",

        // --- About Me Section (Now /changelog) ---
        backToProjects: "‹ Back to projects",
        aboutTitle: "Michael 'Foerch' Herbich",
        aboutSubtitle: "Data Automation Specialist | Frontend Developer",
        aboutDesc1: "I am an engineer who refuses to accept \"that's how we've always done it.\" I specialize in identifying bottlenecks in business processes and relentlessly automating them.",
        aboutDesc2: "I combine hard analytical skills (VBA, Power Query, Excel) with a modern web stack (JavaScript, APIs) to build tools that save hundreds of work hours annually. My goal is to build systems that work for people, not the other way around.",
        aboutSkillsTitle: "Tech Stack",
        skillsHeaderData: "// Data Automation & Analysis",
        skillsHeaderFrontend: "// Frontend Development",

        aboutCtaProjects: "View Case Studies",
        aboutCtaCv: "Download Full CV",

        changelogTitle: "Career Changelog (Version History)",

        // v3.0.0 - Inspector (Revolution + MSc)
        changelogV3Title: "Automation Revolution (Inspector)",
        changelogV3Place: "City of Łódź Office",
        changelogV3Date: "06.2023 - present",
        changelogV3Desc: "Obtained Master of Science (MSc) in AI. Implemented full automation ecosystem: replaced manual processes with VBA scripts and Power Query pipelines. KEY RESULT: Reduced annual settlement time for 140+ projects from 78 working days to just 3 days.",
        changelogV3Tags: "<span style='color: var(--primary-color)'>[MSc Degree (AI)]</span> [VBA] [Power Query] [Process Automation]",

        // v2.0.0 - Junior Inspector (Incubation)
        changelogV2Title: "Technical Incubation (Junior Inspector)",
        changelogV2Place: "City of Łódź Office",
        changelogV2Date: "03.2021 - 05.2023",
        changelogV2Desc: "Foundation building phase. Obtained Engineering degree in Computer Science. Optimized workspace (3-monitor setup) and implemented first advanced data models in Power Query for >40k row reports.",
        changelogV2Tags: "<span style='color: var(--primary-color)'>[BEng Degree (CS)]</span> [Advanced Excel] [Hardware Setup]",

        // v1.5.0 - Clerk (Optimization)
        changelogV15Title: "Formula Optimization (Clerk)",
        changelogV15Place: "City of Łódź Office",
        changelogV15Date: "11.2020 - 02.2021",
        changelogV15Desc: "First iteration of improvements. Replaced manual data totaling with dynamic formulas (SUMIFS, VLOOKUP) in master spreadsheets.",

        // v1.0.0 - Junior Clerk (Baseline)
        changelogV10Title: "Manual Baseline (Junior Clerk)",
        changelogV10Place: "City of Łódź Office",
        changelogV10Date: "11.2019 - 11.2020",
        changelogV10Desc: "Onboarding and analysis of legacy processes. Identified critical human error risks in 100% manual reporting workflows.",

        // v0.5.0 - Intern (Beta Release)
        changelogV05Title: "Beta Release (Intern)",
        changelogV05Place: "City of Łódź Office",
        changelogV05Date: "07.2019 - 11.2019",
        changelogV05Desc: "Initial environment reconnaissance. Archiving and basic organization of budget documentation.",

        // --- Projects Page (NEW VERSION) ---
        projectsTitle: "Project Registry",
        projectsSubtitle: "SELECT * FROM projects WHERE status IN ('Production', 'Deployed', 'Active') ORDER BY date DESC;",

        // Filters (old keys, kept for now but unused in new UI)
        projectsCategoryAll: "ALL",
        projectsCategorySpecialist: "AUTOMATION",
        projectsCategoryTools: "TOOLS",
        projectsCategoryCreative: "FRONTEND",
        projectsCategoryGames: "GAMES",
        
        // 1. Aggregator
        aggregatorTitle: "Project Settlement Aggregator",
        aggregatorDesc: "An automation tool (JS/SheetJS) for creating annual financial statements from multiple Excel files.",
        aggregatorStatus: "PRODUCTION",
        aggregatorDate: "2023-Q4",
        aggregatorTags: "[JavaScript] [SheetJS] [Automation] [DOM]",

        // 2. Tax Arrears
        taxArrearsTitle: "Tax Interest Calculator",
        taxArrearsDesc: "A business tool replicating complex tax regulations (Tax Ordinance) to calculate interest payments.",
        taxArrearsStatus: "PRODUCTION",
        taxArrearsDate: "2023-Q2",
        taxArrearsTags: "[JavaScript] [Business Logic] [Finance]",
        
        // 3. Statutory Interest
        statutoryInterestTitle: "Statutory Interest Calculator",
        statutoryInterestDesc: "Calculates statutory and commercial interest with a full history of dynamically changing rates.",
        statutoryInterestStatus: "PRODUCTION",
        statutoryInterestDate: "2023-Q3",
        statutoryInterestTags: "[JavaScript] [Business Logic] [Finance]",

        // 4. Budget Validator
        budgetValidatorTitle: "Budget Data Validator",
        budgetValidatorDesc: "A tool for quick consistency verification (column count) of data copied directly from Excel.",
        budgetValidatorStatus: "DEPLOYED",
        budgetValidatorDate: "2023-Q1",
        budgetValidatorTags: "[JavaScript] [DOM] [Utility]",

        // 5. Weather Station
        weatherTitle: "Weather Station v2.1",
        // CHANGE: Simplified description, link will be separate
        weatherDesc: "Weather app with forecasting, geolocation, and a serverless architecture (Netlify Functions) to secure API keys.",
        // CHANGE: Status from 'ACTIVE' to 'CONCEPT'
        weatherStatus: "CONCEPT",
        weatherDate: "2024-Q1",
        weatherTags: "[JavaScript] [API] [Serverless] [Netlify]",
        // NEW KEY: Text for the v2.1 link
        weatherLinkDesc: "See v2.1 (Interactive Radar) ↗",

        // 6. To-Do List
        todoTitle: "To-Do List App",
        todoDesc: "Advanced To-Do app with filtering, editing, localStorage persistence, and touch-enabled drag-n-drop reordering.",
        todoStatus: "ACTIVE",
        todoDate: "2024-Q2",
        todoTags: "[JavaScript] [DOM] [UI/UX] [LocalStorage]",

        // 7. Currency Calculator
        currencyCalcTitle: "Currency Calculator",
        currencyCalcDesc: "Currency converter using real-time rates fetched live from a public API (Frankfurter.app).",
        currencyCalcStatus: "DEPLOYED",
        currencyCalcDate: "2023-Q4",
        currencyCalcTags: "[JavaScript] [API] [Fetch]",

        // 8. Pomodoro
        pomodoroTimerTitle: "Pomodoro Assistant",
        pomodoroTimerDesc: "A time management tool (Pomodoro technique) with customizable cycles and audio notifications.",
        pomodoroTimerStatus: "DEPLOYED",
        pomodoroTimerDate: "2024-Q1",
        pomodoroTimerTags: "[JavaScript] [DOM] [Audio API]",

        // 9. Agency
        agencyTitle: "Project \"Creative Agency\"",
        agencyDesc: "A landing page demonstrating modern and fully responsive layouts (CSS Grid/Flexbox) for a fictional agency.",
        agencyStatus: "CONCEPT",
        agencyDate: "2023-Q3",
        agencyTags: "[HTML5] [CSS3] [Flexbox] [Grid]",

        // 10. Markdown Editor
        markdownEditorTitle: "Markdown Editor",
        markdownEditorDesc: "Text editor with a live preview, real-time content analysis, and synchronized scrolling.",
        markdownEditorStatus: "ACTIVE",
        markdownEditorDate: "2023-Q4",
        markdownEditorTags: "[JavaScript] [DOM] [Marked.js]",

        // 11. Snake
        snakeGameTitle: "Snake Game",
        snakeGameDesc: "A classic arcade game implementation on an HTML Canvas element, with support for keyboard and mobile swipe controls.",
        snakeGameStatus: "PLAYABLE",
        snakeGameDate: "2024-Q2",
        snakeGameTags: "[JavaScript] [HTML Canvas] [GameDev]",

        // 12. Tic-Tac-Toe
        ticTacToeTitle: "Tic-Tac-Toe",
        ticTacToeDesc: "Classic game implemented in pure JS, featuring Player vs. Player and Player vs. Computer (simple AI) modes.",
        ticTacToeStatus: "PLAYABLE",
        ticTacToeDate: "2024-Q1",
        ticTacToeTags: "[JavaScript] [GameDev] [AI]",

        // 13. Memory Game
        memoryGameTitle: "Memory Game",
        memoryGameDesc: "A pair-matching memory game with a move counter, timer, and dynamically generated board.",
        memoryGameStatus: "PLAYABLE",
        memoryGameDate: "2024-Q1",
        memoryGameTags: "[JavaScript] [DOM] [GameDev]",
        
        // --- Single Project Pages ---

        budgetValidatorTitle: "Budget Data Validator",
        budgetValidatorSubtitle: "Paste data copied from a program like Excel (tab-separated) below. The tool will check if each row has the same number of columns.",
        budgetValidatorTextareaLabel: "Data to validate",
        budgetValidatorValidateBtn: "Validate Data",
        budgetValidatorResultTitle: "Validation Result",
        budgetValidatorSuccess: ({ rows }) => `Validation successful. Checked ${rows} rows. All have a consistent number of columns.`,
        budgetValidatorError: "Errors found in the data:",
        budgetValidatorErrorLine: ({ line, expected, found }) => `Error in line ${line}: Expected ${expected} columns, found ${found}.`,
        budgetValidatorEmpty: "The data field is empty.",

        statutoryInterestTitle: "Statutory Interest Calculator",
        statutoryInterestTypeLabel: "Type of interest",
        statutoryInterestStandard: "Statutory for delay",
        statutoryInterestCommercial: "In commercial transactions",
        statutoryInterestAmountLabel: "Claim amount (PLN)",
        statutoryInterestStartDateLabel: "Due date",
        statutoryInterestEndDateLabel: "Date of payment / calculation",
        statutoryInterestDataSource: "Interest rates are in accordance with the announcements of the Minister of Justice and NBP data.",
        
        aggregatorTitle: "Project Settlement Aggregator",
        aggregatorSubtitle: "A demo version for portfolio purposes. Upload sample files to generate a report.",
        aggregatorStep1: "1. Provide Data Sources",
        aggregatorStep2: "2. Enter Project Information",
        aggregatorFilesLabel: "Project files (.xlsx)",
        aggregatorDownloadSamples: "Download sample files",
        aggregatorBaseLabel: "Project name database",
        aggregatorPlaceholder: "Paste the list here so the app can match names to the numbers found in the files.\nExample:\n938 PROFESSIONAL HOTELIER ACADEMY\n939 Educational Innovation Project",
        aggregatorGenerateReport: "Generate Report",
        aggregatorReportTitle: "Generated Report",
        aggregatorColNumber: "Project Number",
        aggregatorColName: "Project Name",
        aggregatorColSum: "Sum of Net Value",
        aggregatorTotal: "TOTAL",
        aggregatorErrorFiles: "Please select at least one .xlsx file.",
        aggregatorErrorBase: "Please provide the project name database.",
        aggregatorErrorNoData: "No matching data was found in the uploaded files.",
        
        todoTitle: "To-Do List", todoPlaceholder: "What needs to be done?", todoAddBtn: "Add",
        todoCounter: (count) => `${count} items left`,
        todoFilterAll: "All",
        todoFilterActive: "Active",
        todoFilterCompleted: "Completed",
        todoClearCompleted: "Clear completed", todoConfirmClear: (count) => `Are you sure you want to delete ${count} completed tasks?`,
        confirmYes: "Yes", confirmNo: "Cancel",
        
        weatherTitle: "Weather Station", weatherPlaceholder: "Enter city name...", weatherSearchBtn: "Search",
        weatherGeoBtn: "Use my location",
        weatherForecastTitle: "5-Day Forecast",
        weatherHourlyForecastTitle: "Hourly Forecast",
        weatherRoadConditionTitle: "Road Condition",
        roadDry: "Dry",
        roadWet: "Wet",
        roadIcy: "Icy conditions possible",
        weatherWind: "Wind",
        weatherPressure: "Pressure",
        weatherSunrise: "Sunrise",
        weatherSunset: "Sunset",
        
        currencyTitle: "Currency Calculator", currencyAmount: "Amount", currencyFrom: "From", currencyTo: "To", currencyDataSource: "Exchange rates provided by Frankfurter.app",
        
        markdownEditorTitle: "Advanced Markdown Editor",
        markdownEditorSubtitle: "Use the toolbar to quickly format text. The preview updates live and syncs with the editor.",
        markdownHowToUse: "Tip: Select text and then click a button to apply formatting.",
        markdownBold: "Bold",
        markdownItalic: "Italic",
        markdownLink: "Insert link",
        markdownList: "Bulleted list",
        markdownCode: "Insert code",
        markdownWords: "Words",
        markdownCharacters: "Characters",
        
        pomodoroTimerTitle: "Pomodoro Assistant", pomodoroModeWork: "Work", pomodoroModeShortBreak: "Short Break", pomodoroModeLongBreak: "Long Break", pomodoroStart: "Start", pomodoroPause: "Pause", pomodoroReset: "Reset",
        pomodoroSettingsTitle: "Settings", pomodoroWorkLabel: "Work time (min)", pomodoroShortBreakLabel: "Short break (min)", pomodoroLongBreakLabel: "Long break (min)", pomodoroSaveSettings: "Save",
        pomodoroSettingsSaved: "Saved!",
        pomodoroCyclesTitle: "Completed cycles (target: 4)",
        
        ticTacToeTitle: "Tic-Tac-Toe", ticTacToeTurn: (player) => `Player ${player}'s turn`, ticTacToeWinner: (player) => `Player ${player} wins!`, ticTacToeDraw: "It's a draw!", ticTacToeRestart: "Play Again",
        ticTacToeModePVP: "Player vs Player", ticTacToeModePVC: "Player vs Computer", ticTacToeScore: "Score", ticTacToeChooseSide: "Choose your side:", ticTacToePlay: "Start Game",
        
        memoryGameTitle: "Memory Game", memoryGameMoves: "Moves", memoryGameTime: "Time", memoryGameRestart: "Play Again",
        memoryGameWin: ({ moves, time }) => `Congratulations! You won in ${moves} moves and ${time}s!`,
        
        snakeGameTitle: "Snake Game", snakeGameScore: "Score", snakeGameHighScore: "High Score", snakeGamePause: "PAUSED", snakeGameOver: "Game Over!", snakeGameRestart: "Play Again",
        snakeGameStartMsg: "Press any key or swipe to start",
        snakeGameControls: "Controls: Arrow keys, WASD or swipe gestures. Pause: Spacebar.",
        
        agencyTitle: "Creative Agency", agencyHeroTitle: "We build digital experiences.", agencyHeroSubtitle: "We specialize in web design, branding, and online marketing to help your business grow.",
        agencyServicesTitle: "Our Services", service1Title: "Web Design", service1Desc: "Modern and responsive websites.", service2Title: "Branding", service2Desc: "Creating a strong and consistent brand identity.", service3Title: "Online Marketing", service3Desc: "Increasing your online visibility.",
        agencyProcessTitle: "Our Work Process", processStep1Title: "Discovery", processStep1Desc: "We analyze your needs and goals.", processStep2Title: "Design", processStep2Desc: "We create strategies and mockups.",
        processStep3Title: "Development", processStep3Desc: "We build and code the solution.", processStep4Title: "Deployment", processStep4Desc: "We launch the project and provide support.",
        agencyPortfolioTitle: "Our Portfolio", portfolioItem1: "Branding for Company A", portfolioItem2: "Website for Company B", portfolioItem3: "App for Company C", portfolioItem4: "Marketing for Company D", portfolioItem5: "E-commerce Store for Company E", portfolioItem6: "Visual Identity for Company F",
        agencyStatsTitle: "Trusted by the numbers", statsClients: "Happy Clients", statsProjects: "Completed Projects", statsCoffee: "Cups of Coffee",
        agencyTeamTitle: "Our Team", teamMember1Name: "Peter Jones", teamMember1Role: "CEO & Founder", teamMember2Name: "John Doe", teamMember2Role: "Lead Designer", teamMember3Name: "Anna Smith", teamMember3Role: "Lead Developer",
        agencyTestimonialsTitle: "Testimonials",
        testimonial1: "Incredible attention to detail. Our new website exceeded our expectations!", testimonial1Author: "Jane from Company X",
        testimonial2: "Professionalism and creativity at the highest level. Highly recommended!", testimonial2Author: "Mike from Company Y",
        testimonial3: "Fast delivery and great communication at every stage of the project.", testimonial3Author: "Eva from Company Z",
        testimonial4: "A team that really listens to the client. The results speak for themselves.", testimonial4Author: "Thomas from Company A",
        testimonial5: "Thanks to them, our online sales increased by 200%. Amazing!", testimonial5Author: "Catherine from Company B",
        testimonial6: "Full professionalism and commitment. We will definitely be back with more projects.", testimonial6Author: "Adam from Company C",
        agencyContactTitle: "Contact Us", formName: "Name", formEmail: "Email", formMessage: "Message", formSend: "Send", formSuccess: "Thank you for your message! We will get back to you shortly.",
        
        // --- Contact Page (NEW VERSION) ---
        contactTitle: "Initialize Connection",
        contactContent: "Have a question or a project proposal? I'd love to hear from you. Find me online or use the secure form below.",
        contactFormTitle: "$ send-message --recipient FoerchByte",
        formName: "$ --name", 
        formEmail: "$ --email", 
        formMessage: "$ --message", 
        formSend: "EXECUTE_SEND",
        formSuccess: "Transmission successful. Awaiting response.",
        geminiTitle: "AI Command Assistant",
        geminiContent: "Optimize payload (message) for professional tone.",
        geminiPlaceholder: "e.g., hey, got a question about project x, when can we talk?",
        geminiBtn: "RUN_OPTIMIZATION",
        
        // --- Errors & Misc ---
        loading: "Processing...",
        taxArrearsTitle: "Tax Interest Calculator",
        taxArrearsAmountLabel: "Arrears amount (PLN)",
        taxArrearsStartDateLabel: "Due date",
        taxArrearsEndDateLabel: "Date of payment / calculation",
        taxArrearsCalculateBtn: "Calculate Interest",
        taxArrearsResultTitle: "Calculation Result",
        taxArrearsInterestAmount: "Interest due:",
        taxArrearsTotalAmount: "Total amount to pay:",
        taxArrearsCalculationDetails: "Calculation Details",
        taxArrearsPeriod: "Period",
        taxArrearsDays: "Days",
        taxArrearsRate: "Rate",
        taxArrearsInterest: "Interest",
        taxArrearsNoInterest: "Interest is not charged (amount is below the threshold).",
        taxArrearsErrorDate: "The payment date must be later than the due date.",
        taxArrearsErrorAmount: "Please enter a valid arrears amount.",
        taxArrearsDataSource: "Interest rates are in accordance with the announcements of the Minister of Finance.",
        errorApiGeneric: "An error occurred. Please try again later.",
        errorApiWeather: "Failed to fetch weather data. Please try again.",
        errorApiCurrency: "Failed to fetch currency rates.",
        errorApiGemini: "The AI assistant is temporarily unavailable.",
        errorGeo: "Could not retrieve your location. Please check your browser settings and allow access.",
        errorNotFound: "City not found.",
        errorAuth: "Authorization error. Check your API key.",
        errorServer: ({ status }) => `Server error (${status}). Please try again.`,
    }
};
