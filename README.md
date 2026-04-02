

>_ FoerchByte // Engineering Portfolio

[🇵🇱](#polski) |  [🇺🇸](#english)
<a name="polski"></a>

Wersja Polska (Polish Version)

> Czym jest ten projekt?

To nie jest "portfolio". To jest centrum operacyjne i studium przypadku dla mojej marki jako Executive Engineer: specjalisty, który łączy świat analizy finansowej z inżynierią frontendową.

Ten projekt to moja teza: dowód na to, jak przekładam złożoną logikę biznesową (VBA, Excel, finanse) na skalowalne, bezpieczne i wydajne narzędzia webowe (Vanilla JS, API, Serverless).

> Filozofia i Główne Założenia

Zbudowałem ten projekt w oparciu o cztery kluczowe filary, które definiują moją pracę:

Most Między Światami (The "Bridge")
Moją unikalną wartością jest płynne poruszanie się między Excelem a kodem. Identyfikuję "procesy legacy" i wąskie gardła w operacjach biznesowych, a następnie projektuję i dostarczam cyfrowe rozwiązania, które automatyzują te procesy, oszczędzając setki godzin pracy rocznie.

Inżynieria, Nie Frameworki (Engineering over Frameworks)
Dlaczego Czysty JavaScript (Vanilla JS)? Ponieważ to świadomy wybór inżynierski. Zamiast ciężkich frameworków (jak React czy Angular) dla prostych narzędzi, dostarczam błyskawicznie ładujące się, niezawodne aplikacje bez żadnych zależności. To gwarantuje minimalny koszt utrzymania, maksymalną wydajność i pełną kontrolę nad kodem.

Architektura Serverless i Bezpieczeństwo (Serverless & Secure)
Wrażliwe dane, takie jak klucze API (dla Pogody czy Gemini AI), nigdy nie są ujawniane po stronie klienta. Są bezpiecznie zarządzane na backendzie przy użyciu funkcji bezserwerowych (Netlify Functions), co jest absolutną podstawą profesjonalnych wdrożeń.

Niezawodność Klasy Biznesowej (Business-Grade Reliability)
Logika finansowa nie może sobie pozwolić na błędy. Dlatego kluczowe moduły obliczeniowe (jak kalkulatory odsetek) są objęte testami jednostkowymi (Vitest), aby zapewnić, że każdy wynik jest precyzyjny i zgodny z wymogami biznesowymi.

> Prezentowany Stack Technologiczny

Stack tego projektu odzwierciedla moją rolę "mostu" między dwoma światami:

// Automatyzacja i Analiza Danych

Zaawansowany MS Excel (Formuły, Tabele Przestawne)

VBA (Automatyzacja procesów w środowisku MS Office)

Power Query (Transformacja i czyszczenie danych)

// Frontend Development i Inżynieria

JavaScript (ES6+ Modules, Async/Await): Czysty, modularny kod.

HTML5 (Semantyka, Dostępność - a11y)

CSS3 (Flexbox, Grid, Zmienne, RWD)

API (Integracja z REST API, Fetch)

Serverless (Netlify Functions, Node.js)

Testowanie (Vitest do testów jednostkowych)

Git Flow (Zarządzanie wersjami i wdrożeniami)

> Wybrane Studia Przypadków (Case Studies)

Ten projekt zawiera 13 działających aplikacji. Poniższe trzy najlepiej demonstrują moją unikalną wartość:

Kalkulatory Finansowe (Podatkowe i Ustawowe)

Wyzwanie: Przełożenie skomplikowanej, zmiennej w czasie logiki biznesowej (Ordynacja Podatkowa, dane NBP) na niezawodny kod.

Rozwiązanie: Aplikacja w Vanilla JS, która precyzyjnie oblicza odsetki, dynamicznie wybierając odpowiednie stawki na podstawie dat. Logika jest w 100% pokryta testami jednostkowymi.

Agregator Rozliczeń Projektowych

Wyzwanie: Zautomatyzowanie manualnego procesu księgowego polegającego na kopiowaniu danych z dziesiątek arkuszy Excel.

Rozwiązanie: Narzędzie klienckie (SheetJS), które parsuje pliki .xlsx w przeglądarce. Jest to bezpośrednia translacja logiki VBA na JavaScript, eliminująca potrzebę pracy w Excelu.

Stacja Pogody (Architektura Serverless)

Wyzwanie: Bezpieczne korzystanie z zewnętrznego API (OpenWeatherMap) bez ujawniania prywatnego klucza API.

Rozwiązanie: Aplikacja kliencka komunikuje się tylko z moją własną funkcją Netlify, która działa jako bezpieczny pośrednik, dodaje klucz API po stronie serwera i przekazuje zapytanie.

> Uruchomienie Lokalne i Testowanie

Chcesz zajrzeć pod maskę?

Sklonuj repozytorium:

git clone [https://github.com/FoerchByte/foerch-dev-folio-v2.git](https://github.com/FoerchByte/Foerch-dev-folio.git)
cd foerch-dev-folio-v2


Stwórz plik .env:
W głównym folderze stwórz plik .env i dodaj swoje klucze API:

WEATHER_API_KEY=twoj_klucz_pogodowy
GEMINI_API_KEY=twoj_klucz_gemini


(Do pełnego uruchomienia funkcji serverless lokalnie wymagany jest Netlify CLI. Bez tego, reszta aplikacji nadal działa.)

Otwórz index.html:
Użyj rozszerzenia "Live Server" w VS Code lub po prostu otwórz plik w przeglądarce.

Uruchamianie Testów (Wymagany Node.js):

# Zainstaluj zależności deweloperskie (głównie Vitest)
npm install

# Uruchom testy
npm test


<a name="english"></a>

English Version

> What is this project?

This is not a "portfolio". This is the operations center and case study for my brand as an Executive Engineer: a specialist who bridges the world of financial analysis with frontend engineering.

This project is my thesis: proof of how I translate complex business logic (VBA, Excel, finance) into scalable, secure, and efficient web tools (Vanilla JS, API, Serverless).

> Philosophy & Core Principles

I built this project based on four key pillars that define my work:

The "Bridge" Between Worlds
My unique value proposition is the ability to move fluidly between Excel and code. I identify legacy processes and bottlenecks in business operations, then design and deliver digital solutions that automate those processes, saving hundreds of work-hours annually.

Engineering, Not Frameworks
Why Vanilla JavaScript? Because it's a deliberate engineering choice. Instead of heavy frameworks (like React or Angular) for simple tools, I deliver instantly-loading, reliable applications with zero dependencies. This guarantees minimal maintenance overhead, maximum performance, and full control over the code.

Serverless & Secure Architecture
Sensitive data, such as API keys (for Weather or Gemini AI), is never exposed on the client side. It is securely managed on the backend using Serverless Functions (Netlify Functions), which is an absolute best practice for professional deployments.

Business-Grade Reliability
Financial logic cannot afford errors. That's why the core calculation modules (like the interest calculators) are covered by Unit Tests (Vitest) to ensure every result is precise and compliant with business requirements.

> Featured Tech Stack

The project's stack reflects my role as a "bridge" between two worlds:

// Data Automation & Analysis

Advanced MS Excel (Formulas, Pivot Tables)

VBA (Process automation within the MS Office suite)

Power Query (Data transformation and cleansing)

// Frontend Development & Engineering

JavaScript (ES6+ Modules, Async/Await): Clean, modular code.

HTML5 (Semantics, Accessibility - a11y)

CSS3 (Flexbox, Grid, Variables, RWD)

API (REST API Integration, Fetch)

Serverless (Netlify Functions, Node.js)

Testing (Vitest for Unit Tests)

Git Flow (Version control and deployment management)

> Featured Case Studies

This project contains 13 functional applications. The following three best demonstrate my unique value:

Financial Calculators (Tax & Statutory)

Challenge: Translate complex, time-variable business logic (Polish Tax Ordinance, NBP data) into reliable code.

Solution: A Vanilla JS application that precisely calculates interest, dynamically selecting the correct rates based on date ranges. The logic is 100% covered by unit tests.

Project Settlement Aggregator

Challenge: Automate a manual accounting process of copying data from dozens of separate Excel spreadsheets.

Solution: A client-side tool (SheetJS) that parses .xlsx files in the browser. It's a direct translation of VBA logic into JavaScript, eliminating the need for Excel.

Weather Station (Serverless Architecture)

Challenge: Securely use an external API (OpenWeatherMap) without exposing the private API key.

Solution: The client app communicates only with my own Netlify Function, which acts as a secure proxy, attaches the API key on the server, and forwards the request.

> Local Setup & Testing

Want to look under the hood?

Clone the repository:

git clone [https://github.com/FoerchByte/foerch-dev-folio-v2.git](https://github.com/FoerchByte/Foerch-dev-folio.git)
cd foerch-dev-folio-v2


Create a .env file:
In the root folder, create a .env file and add your API keys:

WEATHER_API_KEY=your_weather_key
GEMINI_API_KEY=your_gemini_key


(Running serverless functions locally requires the Netlify CLI. The rest of the app will work without it.)

Open index.html:
Use the "Live Server" extension in VS Code or simply open the file in your browser.

Running Tests (Node.js required):

# Install dev dependencies (mainly Vitest)
npm install

# Run tests
npm test
