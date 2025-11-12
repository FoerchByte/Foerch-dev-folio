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
        siteTitle: "FoerchByte // Engineering Portfolio",
        
        // --- Nowa strona główna (Hero) ---
        heroSubtitle: "EXECUTIVE_ENGINEER",
        heroTitle: "Od <span class=\"highlight\">Analityki</span><br>do Aplikacji",
        heroDescription: "Moja wartość leży na styku logiki biznesowej i inżynierii oprogramowania. Wykorzystuję analityczne myślenie (Excel, VBA) i precyzję dewelopera (JavaScript, API), aby architektonicznie rozwiązywać złożone problemy z danymi – nie tylko budować aplikacje.",
        heroCta: "ZOBACZ_CASE_STUDIES",
        heroCtaContact: "Skontaktuj się",

        // Statystyki na stronie głównej (NOWE)
        heroStatExperience: "LAT DOŚWIADCZENIA (Finanse/VBA)",
        heroStatProjects: "WDROŻONYCH PROJEKTÓW",
        heroStatCommits: "COMMITÓW (Ostatni Rok)",
        heroStatAutomations: "ZAUTOMATYZOWANE PROCESY",

        // --- Nawigacja (zgodna z mockupem) ---
        navProjects: "Projekty",
        navChangelog: "Changelog",
        navContact: "Kontakt",
        
        backToProjects: "‹ Wróć do rejestru",
        
        // --- Sekcja "Changelog" (dawne "O mnie") ---
        aboutTitle: "Michał 'Foerch' Herbich",
        aboutSubtitle: "Specjalista ds. Automatyzacji Danych | Frontend Developer",
        aboutDesc1: "Jestem inżynierem, który nie godzi się na \"tak zawsze robiliśmy\". Specjalizuję się w identyfikacji wąskich gardeł w procesach biznesowych i ich bezlitosnej automatyzacji.",
        aboutDesc2: "Łączę twarde kompetencje analityczne (VBA, Power Query, Excel) z nowoczesnym stackiem webowym (JavaScript, API), tworząc narzędzia, które oszczędzają setki godzin pracy rocznie. Moim celem jest budowanie systemów, które działają dla ludzi, a nie odwrotnie.",
        aboutSkillsTitle: "Stack Technologiczny",
        skillsHeaderData: "// Automatyzja i Analiza Danych",
        skillsHeaderFrontend: "// Frontend Development",

        aboutCtaProjects: "ZOBACZ_CASE_STUDIES",
        aboutCtaCv: "Pobierz pełne CV",
        
        changelogTitle: "Przebieg Kariery (Changelog)",
        
        // v3.0.0 - Inspektor
        changelogV3Title: "Rewolucja Automatyzacji (Inspektor)",
        changelogV3Place: "Urząd Miasta Łodzi",
        changelogV3Date: "06.2023 - obecnie",
        changelogV3Desc: "Uzyskanie tytułu Magistra (AI). Wdrożenie pełnego ekosystemu automatyzacji: zastąpienie manualnych procesów skryptami VBA, potokami Power Query oraz formularzami Power Automate/SharePoint. KLUCZOWY WYNIK: Redukcja czasu rocznego rozliczenia 140+ projektów z 78 dni roboczych do zaledwie 10 dni.",
        changelogV3Tags: "<span style='color: var(--primary-color)'>[Magister (SI)]</span> [VBA] [Power Query] [Automatyzacja Procesów] [SharePoint] [Power Automate]",

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
        changelogV15Tags: "[Excel Formuły] [SUMIFS] [VLOOKUP]",

        // v1.0.0 - Młodszy Referent
        changelogV10Title: "Manualna Baza (Młodszy Referent)",
        changelogV10Place: "Urząd Miasta Łodzi",
        changelogV10Date: "11.2019 - 11.2020",
        changelogV10Desc: "Onboarding i analiza procesów legacy. Identyfikacja krytycznych ryzyk błędu ludzkiego w 100% manualnym procesie raportowania.",
        changelogV10Tags: "[Analiza Procesów] [Data Entry]",

        // v0.5.0 - Stażysta
        changelogV05Title: "Wersja Beta (Stażysta)",
        changelogV05Place: "Urząd Miasta Łodzi",
        changelogV05Date: "07.2019 - 11.2019",
        changelogV05Desc: "Wstępne rozpoznanie środowiska. Archiwizacja i podstawowe porządkowanie dokumentacji budżetowej.",
        changelogV05Tags: "[Archiwizacja] [Excel]",

        // --- Strona Projektów (Project Registry) ---
        projectsTitle: "Rejestr Projektów",
        projectsSubtitle: "SELECT * FROM projects WHERE status IN ('Produkcja', 'Wdrożony', 'Koncepcja') ORDER BY impact DESC;",

        // === ZMIANA: Zredagowane, "mięsiste" opisy ===

        // 1. Agregator
        aggregatorTitle: "Agregator Rozliczeń Projektowych",
        aggregatorDesc: "Narzędzie klienckie (JS/SheetJS) automatyzujące proces agregacji danych z wielu plików `.xlsx`. Odwzorowuje logikę biznesową procesów księgowych.",
        aggregatorStatus: "PRODUKCJA",
        aggregatorDate: "2023-Q4", // USUNIEMY TEN KLUCZ W NASTĘPNYM KROKU
        aggregatorTags: "JavaScript SheetJS Automatyzacja DOM",

        // 2. Odsetki Podatkowe
        taxArrearsTitle: "Kalkulator Odsetek Podatkowych",
        taxArrearsDesc: "Implementacja logiki biznesowej (Ordynacja Podatkowa) do precyzyjnego obliczania odsetek podatkowych ze zmiennymi stawkami.",
        taxArrearsStatus: "PRODUKCJA",
        taxArrearsDate: "2023-Q2",
        taxArrearsTags: "JavaScript Logika-Biznesowa Finanse",
        
        // 3. Odsetki Ustawowe
        statutoryInterestTitle: "Kalkulator Odsetek Ustawowych",
        statutoryInterestDesc: "Kalkulator odsetek ustawowych i handlowych z pełną historią dynamicznie zmieniających się stawek (dane NBP).",
        statutoryInterestStatus: "PRODUKCJA",
        statutoryInterestDate: "2023-Q3",
        statutoryInterestTags: "JavaScript Logika-Biznesowa Finanse",

        // 4. Walidator Budżetu
        budgetValidatorTitle: "Walidator Danych Budżetowych",
        budgetValidatorDesc: "Narzędzie do szybkiej weryfikacji spójności danych (liczby kolumn) skopiowanych bezpośrednio z Excela. Oszczędza czas na manualnym debugowaniu.",
        budgetValidatorStatus: "WDROŻONY",
        budgetValidatorDate: "2023-Q1",
        budgetValidatorTags: "JavaScript DOM Narzędzie",

        // 5. Stacja Pogody
        weatherTitle: "Stacja Pogody",
        weatherDesc: "Aplikacja z prognozą 5-dniową/24h. Wykorzystuje geolokalizację oraz architekturę serverless (Netlify Functions) do bezpiecznego ukrywania kluczy API.",
        weatherStatus: "PRODUKCJA", // ZMIANA STATUSU
        weatherDate: "2024-Q1",
        weatherTags: "JavaScript API Serverless Netlify",
        weatherLinkDesc: "Zobacz Wdrożenie Live ↗",

        // 6. Lista Zadań
        todoTitle: "Aplikacja \"Lista Zadań\"",
        todoDesc: "Zaawansowane To-Do z filtrowaniem, edycją, zapisem w `localStorage` oraz pełną obsługą gestów mobilnych (touch drag-n-drop).",
        todoStatus: "WDROŻONY", // ZMIANA STATUSU
        todoDate: "2024-Q2",
        todoTags: "JavaScript DOM UI/UX LocalStorage",

        // 7. Kalkulator Walut
        currencyCalcTitle: "Kalkulator Walut",
        currencyCalcDesc: "Przelicznik walut pobierający kursy na żywo z publicznego API (Frankfurter.app) i obsługujący błędy sieciowe.",
        currencyCalcStatus: "WDROŻONY",
        currencyCalcDate: "2023-Q4",
        currencyCalcTags: "JavaScript API Fetch",

        // 8. Pomodoro
        pomodoroTimerTitle: "Asystent Pomodoro",
        pomodoroTimerDesc: "Narzędzie do zarządzania czasem (technika Pomodoro) z konfigurowalnymi cyklami, stanem w `localStorage` i powiadomieniami audio (Tone.js).",
        pomodoroTimerStatus: "WDROŻONY",
        pomodoroTimerDate: "2024-Q1",
        pomodoroTimerTags: "JavaScript DOM Audio-API",

        // 9. Agency
        agencyTitle: "Projekt \"Creative Agency\"",
        agencyDesc: "Techniczne demo demonstrujące zaawansowane, w pełni responsywne układy (CSS Grid/Flexbox) oraz dynamiczny slider JS.",
        agencyStatus: "KONCEPCJA",
        agencyDate: "2023-Q3",
        agencyTags: "HTML5 CSS3 Flexbox Grid",

        // 10. Edytor Markdown
        markdownEditorTitle: "Edytor Markdown",
        markdownEditorDesc: "Edytor tekstu z podglądem na żywo (Marked.js), analizą treści w czasie rzeczywistym i synchronizacją przewijania.",
        markdownEditorStatus: "WDROŻONY", // ZMIANA STATUSU
        markdownEditorDate: "2023-Q4",
        markdownEditorTags: "JavaScript DOM Marked.js",

        // 11. Snake
        snakeGameTitle: "Gra w Węża",
        snakeGameDesc: "Implementacja klasycznej pętli gry (game loop) i detekcji kolizji na elemencie HTML Canvas. Obsługuje klawiaturę i gesty mobilne.",
        snakeGameStatus: "GRYWALNY",
        snakeGameDate: "2024-Q2",
        snakeGameTags: "JavaScript HTML-Canvas GameDev",

        // 12. Tic-Tac-Toe
        ticTacToeTitle: "Kółko i Krzyżyk",
        ticTacToeDesc: "Implementacja logiki gry z zarządzaniem stanem, oferująca tryb Gracz vs Gracz oraz Gracz vs Komputer (proste AI).",
        ticTacToeStatus: "GRYWALNY",
        ticTacToeDate: "2024-Q1",
        ticTacToeTags: "JavaScript GameDev AI",

        // 13. Memory Game
        memoryGameTitle: "Gra Pamięciowa",
        memoryGameDesc: "Gra trenująca pamięć (dopasowywanie par) z licznikiem ruchów, timerem, dźwiękami (Tone.js) i dynamicznym generowaniem planszy.",
        memoryGameStatus: "GRYWALNY",
        memoryGameDate: "2024-Q1",
        memoryGameTags: "JavaScript DOM GameDev",

        
        // --- Strony Pojedynczych Projektów ---
        
        projectsCategoryAll: "Wszystkie",
        projectsCategorySpecialist: "Specjalistyczne",
        projectsCategoryTools: "Narzędzia",
        projectsCategoryCreative: "Kreatywne",
        projectsCategoryGames: "Gry",
        
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
        todoClearCompleted: "Wyczyść ukończone", todoConfirmClear: (count) => `Czy na pewno chcesz usunąć ${count} ukończonych zadań?`,
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
        
        ticTacToeTitle: "Gra w Kółko i Krzyżyk", ticTacToeTurn: (player) => `Ruch gracza: ${player}`, ticTacToeWinner: (player) => `Wygrywa gracz ${player}!`, ticTacToeDraw: "Remis!", ticTacToeRestart: "Zagraj ponownie",
        ticTacToeModePVP: "Gracz vs Gracz", ticTacToeModePVC: "Gracz vs Komputer", ticTacToeScore: "Wynik", ticTacToeChooseSide: "Wybierz swoją stronę:", ticTacToePlay: "Rozpocznij grę",
        
        memoryGameTitle: "Gra Pamięciowa", memoryGameMoves: "Ruchy", memoryGameTime: "Czas", memoryGameRestart: "Zagraj ponownie",
        memoryGameWin: ({ moves, time }) => `Gratulacje! Wygrałeś w ${moves} ruchach i czasie ${time}s!`,
        
        snakeGameTitle: "Gra w Węża", snakeGameScore: "Wynik", snakeGameHighScore: "Najlepszy wynik", snakeGamePause: "PAUZA", snakeGameOver: "Koniec gry!", snakeGameRestart: "Zagraj ponownie",
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
        
        // --- Strona Kontaktowa (Terminal) ---
        contactTitle: "Inicjalizacja Połączenia",
        contactContent: "$ polecenie: send-message --recipient:foerchbyte --priority:high",
        contactFormTitle: "Formularz Transmisji",
        formName: "$ --imie:",
        formEmail: "$ --email:",
        formMessage: "$ --wiadomosc:",
        formSend: "WYKONAJ",
        formSuccess: "Transmisja zakończona sukcesem. Oczekuj na odpowiedź.",
        formErrorEmpty: "Błąd: Pole jest wymagane.",
        formErrorEmail: "Błąd: Wymagany poprawny format adresu e-mail.",
        
        geminiTitle: "Asystent Komunikacji (AI)",
        geminiContent: "// Wpisz roboczą wersję wiadomości, a system zoptymalizuje ją pod kątem profesjonalnego tonu.",
        geminiPlaceholder: "np. siema, chce pogadac o projekcie, kiedy masz czas?",
        geminiBtn: "OPTYMIZUJ",
        
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
        errorServer: ({ status }) => `Server error (${status}). Please try again.`,
    },
    en: {
        siteTitle: "FoerchByte // Engineering Portfolio",

        // --- New Hero Page ---
        heroSubtitle: "EXECUTIVE_ENGINEER",
        heroTitle: "From <span class=\"highlight\">Analytics</span><br>to Applications",
        heroDescription: "My value is at the intersection of business logic and software engineering. I leverage analytical thinking (Excel, VBA) and developer precision (JavaScript, API) to architect solutions for complex data problems—not just build applications.",
        heroCta: "VIEW_CASE_STUDIES",
        heroCtaContact: "Get in Touch",

        // Homepage Stats (NEW)
        heroStatExperience: "YEARS OF EXPERIENCE (Finance/VBA)",
        heroStatProjects: "PROJECTS SHIPPED",
        heroStatCommits: "COMMITS (Last Year)",
        heroStatAutomations: "AUTOMATED PROCESSES",

        // --- Navigation (Mockup Compliant) ---
        navProjects: "Projects",
        navChangelog: "Changelog",
        navContact: "Contact",

        backToProjects: "‹ Back to registry",

        // --- "Changelog" Section (formerly "About") ---
        aboutTitle: "Michael 'Foerch' Herbich",
        aboutSubtitle: "Data Automation Specialist | Frontend Developer",
        aboutDesc1: "I am an engineer who refuses to accept \"that's how we've always done it.\" I specialize in identifying bottlenecks in business processes and relentlessly automating them.",
        aboutDesc2: "I combine hard analytical skills (VBA, Power Query, Excel) with a modern web stack (JavaScript, APIs) to build tools that save hundreds of work hours annually. My goal is to build systems that work for people, not the other way around.",
        aboutSkillsTitle: "Tech Stack",
        skillsHeaderData: "// Data Automation & Analysis",
        skillsHeaderFrontend: "// Frontend Development",

        aboutCtaProjects: "VIEW_CASE_STUDIES",
        aboutCtaCv: "Download Full CV",

        changelogTitle: "Career Changelog (Version History)",

        // v3.0.0 - Inspector (Revolution + MSc)
        changelogV3Title: "Automation Revolution (Inspector)",
        changelogV3Place: "City of Łódź Office",
        changelogV3Date: "06.2023 - present",
        changelogV3Desc: "Obtained Master of Science (MSc) in AI. Implemented full automation ecosystem: replaced manual processes with VBA scripts, Power Query pipelines, and Power Automate/SharePoint forms. KEY RESULT: Reduced annual settlement time for 140+ projects from 78 working days to just 10 days.",
        changelogV3Tags: "<span style='color: var(--primary-color)'>[MSc Degree (AI)]</span> [VBA] [Power Query] [Process Automation] [SharePoint] [Power Automate]",

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
        changelogV15Tags: "[Excel Formulas] [SUMIFS] [VLOOKUP]",

        // v1.0.0 - Junior Clerk (Baseline)
        changelogV10Title: "Manual Baseline (Junior Clerk)",
        changelogV10Place: "City of Łódź Office",
        changelogV10Date: "11.2019 - 11.2020",
        changelogV10Desc: "Onboarding and analysis of legacy processes. Identified critical human error risks in 100% manual reporting workflows.",
        changelogV10Tags: "[Process Analysis] [Data Entry]",

        // v0.5.0 - Intern (Beta Release)
        changelogV05Title: "Beta Release (Intern)",
        changelogV05Place: "City of Łódź Office",
        changelogV05Date: "07.2019 - 11.2019",
        changelogV05Desc: "Initial environment reconnaissance. Archiving and basic organization of budget documentation.",
        changelogV05Tags: "[Archiving] [Excel]",

        // --- Projects Page (Project Registry) ---
        projectsTitle: "Project Registry",
        projectsSubtitle: "SELECT * FROM projects WHERE status IN ('Production', 'Deployed', 'Concept') ORDER BY impact DESC;",
        
        // === ZMIANA: Zredagowane, "mięsiste" opisy (EN) ===

        // 1. Aggregator
        aggregatorTitle: "Project Settlement Aggregator",
        aggregatorDesc: "Client-side tool (JS/SheetJS) automating data aggregation from multiple `.xlsx` files. Replicates business logic of accounting processes.",
        aggregatorStatus: "PRODUCTION",
        aggregatorDate: "2023-Q4", // USUNIEMY TEN KLUCZ W NASTĘPNYM KROKU
        aggregatorTags: "JavaScript SheetJS Automation DOM",

        // 2. Tax Arrears
        taxArrearsTitle: "Tax Interest Calculator",
        taxArrearsDesc: "Implementation of business logic (Tax Ordinance) for precise calculation of tax interest with variable historical rates.",
        taxArrearsStatus: "PRODUCTION",
        taxArrearsDate: "2023-Q2",
        taxArrearsTags: "JavaScript Business-Logic Finance",
        
        // 3. Statutory Interest
        statutoryInterestTitle: "Statutory Interest Calculator",
        statutoryInterestDesc: "Calculates statutory and commercial interest with a full history of dynamically changing rates (NBP data).",
        statutoryInterestStatus: "PRODUCTION",
        statutoryInterestDate: "2023-Q3",
        statutoryInterestTags: "JavaScript Business-Logic Finance",

        // 4. Budget Validator
        budgetValidatorTitle: "Budget Data Validator",
        budgetValidatorDesc: "A utility tool for rapid consistency verification (column count) of data copied directly from Excel. Saves time on manual debugging.",
        budgetValidatorStatus: "DEPLOYED",
        budgetValidatorDate: "2023-Q1",
        budgetValidatorTags: "JavaScript DOM Utility",

        // 5. Weather Station
        weatherTitle: "Weather Station",
        weatherDesc: "5-day/24h forecast app. Utilizes geolocation and a serverless architecture (Netlify Functions) for secure API key management.",
        weatherStatus: "PRODUCTION", // ZMIANA STATUSU
        weatherDate: "2024-Q1",
        weatherTags: "JavaScript API Serverless Netlify",
        weatherLinkDesc: "See Live Deployment ↗",

        // 6. To-Do List
        todoTitle: "To-Do List App",
        todoDesc: "Advanced To-Do with filtering, editing, `localStorage` persistence, and full mobile touch gesture support (touch drag-n-drop).",
        todoStatus: "DEPLOYED", // ZMIANA STATUSU
        todoDate: "2024-Q2",
        todoTags: "JavaScript DOM UI/UX LocalStorage",

        // 7. Currency Calculator
        currencyCalcTitle: "Currency Calculator",
        currencyCalcDesc: "Currency converter fetching live rates from a public API (Frankfurter.app) and handling network errors.",
        currencyCalcStatus: "DEPLOYED",
        currencyCalcDate: "2023-Q4",
        currencyCalcTags: "JavaScript API Fetch",

        // 8. Pomodoro
        pomodoroTimerTitle: "Pomodoro Assistant",
        pomodoroTimerDesc: "Time management tool (Pomodoro technique) with configurable cycles, `localStorage` state, and audio cues (Tone.js).",
        pomodoroTimerStatus: "DEPLOYED",
        pomodoroTimerDate: "2024-Q1",
        pomodoroTimerTags: "JavaScript DOM Audio-API",

        // 9. Agency
        agencyTitle: "Project \"Creative Agency\"",
        agencyDesc: "A technical demo showcasing advanced, fully responsive layouts (CSS Grid/Flexbox) and a dynamic JS slider.",
        agencyStatus: "CONCEPT",
        agencyDate: "2023-Q3",
        agencyTags: "HTML5 CSS3 Flexbox Grid",

        // 10. Markdown Editor
        markdownEditorTitle: "Markdown Editor",
        markdownEditorDesc: "Text editor with a live preview (Marked.js), real-time content analysis, and synchronized scrolling.",
        markdownEditorStatus: "DEPLOYED", // ZMIANA STATUSU
        markdownEditorDate: "2023-Q4",
        markdownEditorTags: "JavaScript DOM Marked.js",

        // 11. Snake
        snakeGameTitle: "Snake Game",
        snakeGameDesc: "Implementation of a classic game loop and collision detection on an HTML Canvas element. Supports keyboard and mobile swipe controls.",
        snakeGameStatus: "PLAYABLE",
        snakeGameDate: "2024-Q2",
        snakeGameTags: "JavaScript HTML-Canvas GameDev",

        // 12. Tic-Tac-Toe
        ticTacToeTitle: "Tic-Tac-Toe",
        ticTacToeDesc: "Implementation of game logic with state management, featuring Player vs. Player and Player vs. Computer (simple AI) modes.",
        ticTacToeStatus: "PLAYABLE",
        ticTacToeDate: "2024-Q1",
        ticTacToeTags: "JavaScript GameDev AI",

        // 13. Memory Game
        memoryGameTitle: "Memory Game",
        memoryGameDesc: "A pair-matching memory game with a move counter, timer, audio cues (Tone.js), and dynamic board generation.",
        memoryGameStatus: "PLAYABLE",
        memoryGameDate: "2024-Q1",
        memoryGameTags: "JavaScript DOM GameDev",
        
        // --- Single Project Pages ---
        
        projectsCategoryAll: "All",
        projectsCategorySpecialist: "Specialist",
        projectsCategoryTools: "Tools",
        projectsCategoryCreative: "Creative",
        projectsCategoryGames: "Games",

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
        pomodoroSettingsTitle: "Settings", pomodoroWorkLabel: "Work time (min)", pomodoroShortBreakLabel: "Short break (min)", pomodoroLongBreakLabel: "Long break (min)", pomdoroSaveSettings: "Save",
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
        
        // --- Contact Page (Terminal) ---
        contactTitle: "Initialize Connection",
        contactContent: "$ command: send-message --recipient:foerchbyte --priority:high",
        contactFormTitle: "Transmission Form",
        formName: "$ --name:",
        formEmail: "$ --email:",
        formMessage: "$ --payload:",
        formSend: "EXECUTE",
        formSuccess: "Transmission successful. Awaiting response.",
        formErrorEmpty: "Error: Field is required.",
        formErrorEmail: "Error: Valid email address required.",

        geminiTitle: "Comms Assistant (AI)",
        geminiContent: "// Input message draft. System will optimize for professional tone.",
        geminiPlaceholder: "e.g., hey, need to talk about the project, when are you free?",
        geminiBtn: "OPTIMIZE",
        
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
