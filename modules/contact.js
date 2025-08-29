/*
  EN: This module manages the interactive elements of the Contact page. It handles
  form submission using Formspree and features an AI assistant powered by the Gemini API.
  This is a great example of combining static form handling with dynamic
  serverless functions to create a more engaging user experience.
  PL: Ten moduł zarządza interaktywnymi elementami na stronie Kontakt. Obsługuje
  wysyłanie formularza za pomocą Formspree oraz zawiera asystenta AI opartego na
  API Gemini. To doskonały przykład łączenia statycznej obsługi formularzy
  z dynamicznymi funkcjami bezserwerowymi, aby stworzyć bardziej angażujące
  doświadczenie użytkownika.
*/
let contactT;
const contactFormspreeEndpoint = 'https://formspree.io/f/mdkdvvvj';

function validateField(field) {
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
        // ZMIANA: Używamy nowego, bardziej szczegółowego klucza tłumaczenia
        alert(contactT('errorApiGeneric'));
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

async function handleGenerateEmail() {
    const draftInput = document.getElementById('email-draft');
    const resultContainer = document.getElementById('gemini-result-container');
    const resultEl = document.getElementById('gemini-result');
    const generateBtn = document.getElementById('generate-email-btn');
    const prompt = draftInput.value.trim();

    if (!prompt) return;

    const originalBtnText = generateBtn.innerHTML;
    generateBtn.innerHTML = `<span><span class="loader"></span></span>`;
    generateBtn.disabled = true;
    resultContainer.style.display = 'none';

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
        resultContainer.style.display = 'block';

    } catch (error) {
        console.error("Błąd podczas generowania e-maila:", error);
        // ZMIANA: Używamy nowego, bardziej szczegółowego klucza tłumaczenia
        resultEl.textContent = contactT('errorApiGemini');
        resultContainer.style.display = 'block';
    } finally {
        generateBtn.innerHTML = originalBtnText;
        generateBtn.disabled = false;
    }
}

export function initializeContactPage(dependencies) {
    contactT = dependencies.t;
    const contactForm = document.getElementById('contact-form');
    const generateEmailBtn = document.getElementById('generate-email-btn');
    
    if (!contactForm) return [];

    contactForm.action = contactFormspreeEndpoint;
    contactForm.method = 'POST';

    const fields = ['name', 'email', 'message'].map(id => contactForm.querySelector(`#${id}`));
    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });

    contactForm.addEventListener('submit', handleFormSubmit);
    generateEmailBtn.addEventListener('click', handleGenerateEmail);

    return [];
}
