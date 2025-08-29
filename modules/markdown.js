/*
  EN: This module powers the Markdown Editor. It demonstrates the ability to
  dynamically parse Markdown content and render it as HTML in real time.
  The module also includes a spellcheck toggle to showcase advanced text
  manipulation and UI control.
  PL: Ten moduł zasila edytor Markdown. Pokazuje, jak dynamicznie parsować
  treść Markdown i renderować ją jako HTML w czasie rzeczywistym. Moduł
  zawiera również przełącznik sprawdzania pisowni, aby zademonstrować
  zaawansowaną manipulację tekstem i kontrolę interfejsu użytkownika.
*/
export function initializeMarkdownEditor(dependencies) {
    const { t } = dependencies;

    const markdownInput = document.getElementById('markdown-input');
    const markdownOutput = document.getElementById('markdown-output');
    const spellcheckBtn = document.getElementById('spellcheck-toggle-btn');
    
    // Funkcja do aktualizacji podglądu
    const updatePreview = () => {
        if (window.marked) {
            markdownOutput.innerHTML = window.marked.parse(markdownInput.value);
        }
    };

    // Funkcja do przełączania sprawdzania pisowni
    const toggleSpellcheck = () => {
        const isEnabled = markdownInput.spellcheck;
        markdownInput.spellcheck = !isEnabled;
        
        // Zaktualizuj wygląd i tekst przycisku
        spellcheckBtn.classList.toggle('active', !isEnabled);
        spellcheckBtn.textContent = !isEnabled 
            ? t('markdownSpellcheckDisable') 
            : t('markdownSpellcheckEnable');
        
        // Ponownie ustaw focus na polu tekstowym, aby zmiany były widoczne
        markdownInput.focus();
    };

    // Dodanie nasłuchiwaczy
    markdownInput.addEventListener('input', updatePreview);
    spellcheckBtn.addEventListener('click', toggleSpellcheck);
    
    // Wstępne renderowanie podglądu
    updatePreview();

    return []; // Brak funkcji czyszczących
}
