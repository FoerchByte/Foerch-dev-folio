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

package.json: Zależności deweloperskie (dla testów)

README.md: Ten plik

Uruchomienie Lokalne
Chcesz zajrzeć pod maskę? Nic prostszego:

Sklonuj repozytorium:
git clone https://github.com/Foerch-Byte/foerch-dev-folio.git
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