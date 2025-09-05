Foerch-dev-folio
[🇵🇱](#polski) |  [🇺🇸](#english)
<a name="polski"></a>

Wersja Polska (Polish Version)

Witaj w moim cyfrowym świecie, Foerch-dev-folio!
Tutaj kod spotyka się z kreatywnością. To nie jest tylko portfolio, ale dowód na moją pasję do tworzenia użytecznych i estetycznych aplikacji internetowych. Od czystego kodu po integrację z API, każdy element tego projektu odzwierciedla moją filozofię pracy.

Co Wyróżnia Ten Projekt?
Zależało mi na tym, aby to portfolio było świadectwem moich umiejętności i filozofii pracy. Dlatego skupiłem się na kilku kluczowych aspektach:

Czysty kod i solidna architektura: Całość zbudowałem w czystym JavaScript (Vanilla JS), aby pokazać głębokie zrozumienie fundamentów web devu. Aplikacja działa jako SPA (Single Page Application), co zapewnia płynne i szybkie przejścia, a jej modularna budowa sprawia, że dodawanie nowych projektów jest proste i przyjemne.

Wydajność na pierwszym miejscu: Dzięki Lazy Loading (ładowaniu "leniwemu") aplikacja startuje błyskawicznie, pobierając tylko niezbędny kod. Reszta jest dociągana w tle, gdy jest potrzebna.

Dostępność dla każdego: Starałem się, aby strona była w pełni dostępna (a11y) dla osób korzystających z czytników ekranu oraz w pełni responsywna (RWD), niezależnie od urządzenia.

Bezpieczeństwo i nowoczesność: Wrażliwe dane, jak klucze API, są chronione po stronie serwera dzięki funkcjom bezserwerowym (Netlify Functions). Kluczowa logika jest natomiast objęta testami jednostkowymi (Vitest), co daje pewność, że wszystko działa jak należy.

Mój Warsztat Technologiczny
Podczas pracy nad tym projektem korzystałem z następujących narzędzi i technologii:

Frontend:

HTML5

CSS3 (zmienne, Flexbox, Grid)

Czysty JavaScript (ES6+ Modules, Async/Await)

Backend (Serverless):

Netlify Functions (Node.js)

Narzędzia i Biblioteki:

Vitest: Do testów jednostkowych

Marked.js: Do parsowania Markdown

Formspree: Do obsługi formularzy kontaktowych

API Zewnętrzne:

OpenWeatherMap API

Frankfurter.app API (kursy walut)

Google Gemini AI API

Struktura Projektu
Struktura folderów została zaprojektowana z myślą o przejrzystości i skalowalności:

/netlify/functions/: Funkcje serverless (backend)

/modules/: Moduły JS i CSS dla poszczególnych aplikacji

/pages/: Szablony HTML dla podstron

index.html: Główny plik HTML

app.js: Główny skrypt (router/kontroler)

style.css: Główne style

Uruchomienie Lokalne
Chcesz zajrzeć pod maskę? Nic prostszego:

Sklonuj repozytorium:

git clone [https://github.com/Foerch-Byte/foerch-dev-folio.git](https://github.com/Foerch-Byte/foerch-dev-folio.git)
cd foerch-dev-folio

Stwórz plik .env:
W głównym folderze projektu stwórz plik o nazwie .env i wklej do niego swoje klucze API, wzorując się na poniższym przykładzie:

WEATHER_API_KEY=twoj_klucz_do_pogody

GEMINI_API_KEY=twoj_klucz_do_gemini

Uwaga: Aby w pełni korzystać z funkcji lokalnie, potrzebujesz Netlify CLI. Bez tego, funkcje weather i gemini nie będą działać lokalnie, ale reszta aplikacji tak.

Otwórz index.html:
Najprostszym sposobem na uruchomienie jest użycie rozszerzenia Live Server w Visual Studio Code lub otwarcie pliku index.html bezpośrednio w przeglądarce.

Uruchamianie Testów
Pewność, że kod działa, jest dla mnie kluczowa. Dlatego projekt jest wyposażony w testy jednostkowe. Aby je uruchomić:

Zainstaluj zależności deweloperskie:

npm install

Uruchom testy:

npm test

Vitest automatycznie znajdzie i uruchomi wszystkie testy w projekcie.


<a name="english"></a>
English Version

Welcome to my digital world, Foerch-dev-folio!
Here, code meets creativity. This is not just a portfolio, but a testament to my passion for building useful and aesthetic web applications. From clean code to API integration, every element of this project reflects my work philosophy.

What Makes This Project Special?
I wanted this portfolio to be a testament to my skills and work philosophy. That's why I focused on a few key aspects:

Clean Code & Solid Architecture: I built the entire project in Vanilla JavaScript to demonstrate a deep understanding of web development fundamentals. The application runs as a SPA (Single Page Application), ensuring smooth and fast transitions, and its modular structure makes adding new projects simple and enjoyable.

Performance First: Thanks to Lazy Loading, the application starts up instantly by loading only the necessary code. The rest is fetched in the background when needed.

Accessibility for Everyone: I've made an effort to ensure the site is fully accessible (a11y) for users with screen readers and fully responsive (RWD), regardless of the device.

Security & Modern Practices: Sensitive data, like API keys, are protected on the server-side using Serverless Functions (Netlify Functions). The core business logic is covered by Unit Tests (Vitest), which ensures that everything works as expected.

My Tech Stack
While working on this project, I used the following tools and technologies:

Frontend:

HTML5

CSS3 (Variables, Flexbox, Grid)

Vanilla JavaScript (ES6+ Modules, Async/Await)

Backend (Serverless):

Netlify Functions (Node.js)

Tools & Libraries:

Vitest: For unit testing

Marked.js: For Markdown parsing

Formspree: For contact form handling

External APIs:

OpenWeatherMap API

Frankfurter.app API (currency rates)

Google Gemini AI API

Project Structure
The folder structure was designed for clarity and scalability:

/netlify/functions/: Serverless Functions (backend)

/modules/: JS and CSS modules for each app

/pages/: HTML templates for subpages

index.html: Main HTML file

app.js: Main script (router/controller)

style.css: Main stylesheet

Running Locally
Want to look under the hood? It's simple:

Clone the repository:

git clone [https://github.com/Foerch-Byte/foerch-dev-folio.git](https://github.com/Foerch-Byte/foerch-dev-folio.git)
cd foerch-dev-folio

Create a .env file:
In the root directory, create a file named .env and paste your API keys into it, using the example below:

WEATHER_API_KEY=your_weather_api_key

GEMINI_API_KEY=your_gemini_api_key

Note: To fully use the functions locally, you'll need the Netlify CLI. Without it, the weather and gemini functions won't work locally, but the rest of the app will.

Open index.html:
The easiest way to run the project is by using the Live Server extension in Visual Studio Code or by opening the index.html file directly in your browser.

Running Tests
Confidence in my code is key. That's why the project includes unit tests. To run them:

Install dev dependencies:

npm install

Run the tests:

npm test

Vitest will automatically find and run all tests in the project.
