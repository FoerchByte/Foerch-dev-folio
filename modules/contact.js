/*
  EN: This module manages the interactive elements of the Contact page (Phase 5).
  It handles both Formspree submission and the AI assistant (Gemini API)
  using a tabbed interface within the terminal.
  PL: Ten moduł zarządza interaktywnymi elementami na stronie Kontakt (Faza 5).
  Obsługuje wysyłanie formularza Formspree oraz asystenta AI (API Gemini)
  używając interfejsu zakładek w terminalu.
*/
let contactT;
const contactFormspreeEndpoint = 'https://formspree.io/f/mdkdvvvj';

// === Logika Formularza Formspree (Bez zmian) ===

function validateField(field) {
// ... existing code ...
    const errorEl = field.nextElementSibling;
    let isValid = true;
    if (field.value.trim() === '') {
        errorEl.textContent = contactT('formErrorEmpty');
        field.parentElement.classList.add('error');
        isValid = false;
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        errorEl.textContent = contactT('formErrorEmail');
        field.parentElement.classList.add('error');
        isValid = false;
    } else {
        errorEl.textContent = '';
        field.parentElement.classList.remove('error');
    }
    return isValid;
}

async function handleFormSubmit(e) {
// ... existing code ...
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const fields = ['name', 'email', 'message'].map(id => form.querySelector(`#${id}`));
    const isFormValid = fields.reduce((valid, field) => validateField(field) && valid, true);

    if (!isFormValid) return;

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="loader"></span> ${contactT('loading')}`;
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
// ... existing code ...
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            form.style.display = 'none';
            document.getElementById('form-success-message').classList.remove('hidden');
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Błąd podczas wysyłania formularza:', error);
        alert(contactT('errorApiGeneric'));
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

/* === ZMIANA FAZY 5: Przywrócono logikę Asystenta AI ===
  (Skopiowano z ...c8017add.../modules/contact.js)
*/
async function handleGenerateEmail() {
    const draftInput = document.getElementById('email-draft');
    const resultContainer = document.getElementById('gemini-result-container');
    const resultEl = document.getElementById('gemini-result');
    const generateBtn = document.getElementById('generate-email-btn');
    const prompt = draftInput.value.trim();

    if (!prompt) return;

    // ZMIANA: Dostosowano ładowarkę do nowego przycisku
    const originalBtnHTML = generateBtn.innerHTML;
    generateBtn.innerHTML = `<span class="loader"></span>`;
    generateBtn.disabled = true;
    resultContainer.classList.add('hidden'); // Używamy .hidden

    try {
        const response = await fetch('/.netlify/functions/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            throw new Error(`Błąd serwera: ${response.statusText}`);
        }

        const data = await response.json();
        resultEl.textContent = data.improvedText;
        resultContainer.classList.remove('hidden'); // Używamy .hidden

    } catch (error) {
        console.error("Błąd podczas generowania e-maila:", error);
        resultEl.textContent = contactT('errorApiGemini');
        resultContainer.classList.remove('hidden'); // Używamy .hidden
    } finally {
        generateBtn.innerHTML = originalBtnHTML;
        generateBtn.disabled = false;
    }
}

/* === ZMIANA FAZY 5: Nowa funkcja do przełączania zakładek ===
*/
function handleTabSwitch(e, tabsContainer, formContent, aiContent) {
    const clickedTab = e.target.closest('button');
    if (!clickedTab) return;

    const activeTab = tabsContainer.querySelector('button.active');
    if (clickedTab === activeTab) return;

    // Przełącz stan aktywny
    activeTab.classList.remove('active');
    clickedTab.classList.add('active');

    // Przełącz widoczność kontenerów
    if (clickedTab.dataset.tab === 'ai') {
        formContent.setAttribute('hidden', true);
        aiContent.removeAttribute('hidden');
    } else {
        aiContent.setAttribute('hidden', true);
        formContent.removeAttribute('hidden');
    }
}

export function initializeContactPage(dependencies) {
    contactT = dependencies.t;
    const contactForm = document.getElementById('contact-form');
    
    // === ZMIANA FAZY 5: Elementy Asystenta i Zakładek ===
    const generateEmailBtn = document.getElementById('generate-email-btn');
    const tabsContainer = document.getElementById('terminal-tabs');
    const formContent = document.getElementById('form-content');
    const aiContent = document.getElementById('ai-content');
    
    // Upewniamy się, że główne elementy istnieją
    if (!contactForm || !generateEmailBtn || !tabsContainer || !formContent || !aiContent) {
        console.warn('Nie znaleziono wszystkich elementów na stronie Kontakt.');
        return [];
    }

    // --- Inicjalizacja Formularza (bez zmian) ---
    contactForm.action = contactFormspreeEndpoint;
    contactForm.method = 'POST';

    const fields = ['name', 'email', 'message'].map(id => contactForm.querySelector(`#${id}`));
    fields.forEach(field => {
        if (field) {
            field.addEventListener('blur', () => validateField(field));
        }
    });
    contactForm.addEventListener('submit', handleFormSubmit);

    // --- ZMIANA FAZY 5: Inicjalizacja Asystenta i Zakładek ---
    generateEmailBtn.addEventListener('click', handleGenerateEmail);
    tabsContainer.addEventListener('click', (e) => handleTabSwitch(e, tabsContainer, formContent, aiContent));

    return [];
}
