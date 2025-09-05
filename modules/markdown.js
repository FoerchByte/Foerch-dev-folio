/*
  EN: This module powers the Markdown Editor. It demonstrates the ability to
  dynamically parse Markdown content and render it as HTML in real time.
  The module also includes a spellcheck toggle to showcase advanced text
  manipulation and UI control.
  PL: Ten moduł napędza Edytor Markdown. Demonstruje zdolność do
  dynamicznego parsowania treści Markdown i renderowania jej jako HTML w czasie
  rzeczywistym. Moduł zawiera również przełącznik sprawdzania pisowni, aby
  zaprezentować zaawansowaną manipulację tekstem i kontrolę UI.
*/
export function initializeMarkdownEditor(dependencies) {
    const { t } = dependencies;

    const markdownInput = document.getElementById('markdown-input');
    const markdownOutput = document.getElementById('markdown-output');
    const toolbar = document.getElementById('markdown-toolbar');
    const wordCountEl = document.getElementById('word-count');
    const charCountEl = document.getElementById('char-count');
    
    // Funkcja do aktualizacji podglądu
    const updatePreview = () => {
        if (window.marked) {
            markdownOutput.innerHTML = window.marked.parse(markdownInput.value);
        }
    };

    // ZMIANA: Funkcja do aktualizacji licznika słów i znaków
    const updateStats = () => {
        const text = markdownInput.value;
        charCountEl.textContent = text.length;
        wordCountEl.textContent = text.trim().split(/\s+/).filter(Boolean).length;
    };

    // ZMIANA: Funkcja do synchronizacji przewijania
    const syncScroll = () => {
        const scrollPercentage = markdownInput.scrollTop / (markdownInput.scrollHeight - markdownInput.clientHeight);
        markdownOutput.scrollTop = scrollPercentage * (markdownOutput.scrollHeight - markdownOutput.clientHeight);
    };
    
    // ZMIANA: Funkcja do wstawiania formatowania
    const applyFormat = (format) => {
        const start = markdownInput.selectionStart;
        const end = markdownInput.selectionEnd;
        const selectedText = markdownInput.value.substring(start, end);
        let replacement = selectedText;

        switch (format) {
            case 'bold':
                replacement = `**${selectedText}**`;
                break;
            case 'italic':
                replacement = `*${selectedText}*`;
                break;
            case 'code':
                replacement = `\`${selectedText}\``;
                break;
            case 'link':
                const url = prompt("Wprowadź adres URL:");
                if (url) replacement = `[${selectedText}](${url})`;
                break;
            case 'list':
                replacement = selectedText.split('\n').map(line => `- ${line}`).join('\n');
                break;
        }

        markdownInput.setRangeText(replacement, start, end, 'end');
        markdownInput.focus();
        updatePreview(); // Aktualizuj podgląd po zmianie
    };
    
    // ZMIANA: Obsługa kliknięć na pasku narzędzi
    const handleToolbarClick = (e) => {
        const button = e.target.closest('button');
        if (button && button.dataset.format) {
            applyFormat(button.dataset.format);
        }
    };
    
    // ZMIANA: Połączone nasłuchiwacze
    const handleInput = () => {
        updatePreview();
        updateStats();
    };

    // Dodanie nasłuchiwaczy
    markdownInput.addEventListener('input', handleInput);
    markdownInput.addEventListener('scroll', syncScroll);
    toolbar.addEventListener('click', handleToolbarClick);
    
    // Wstępne renderowanie i zliczenie statystyk
    handleInput();

    // Funkcja czyszcząca
    const cleanup = () => {
        markdownInput.removeEventListener('input', handleInput);
        markdownInput.removeEventListener('scroll', syncScroll);
        toolbar.removeEventListener('click', handleToolbarClick);
    };

    return [cleanup];
}
