/*
  EN: This module handles the logic for the "Agency" page. It demonstrates a dynamic
  carousel for testimonials and form submission using an external service (Formspree).
  It highlights skills in event handling, DOM manipulation, and efficient resource
  management with the ResizeObserver API.
  PL: Ten moduł obsługuje logikę strony "Agencja". Pokazuje, jak stworzyć dynamiczny
  karuzelę dla referencji oraz jak obsługiwać wysyłanie formularza przy użyciu
  zewnętrznej usługi (Formspree). Podkreśla umiejętności w obsłudze zdarzeń,
  manipulacji DOM i efektywnym zarządzaniu zasobami za pomocą API ResizeObserver.
*/
let t;
let autoSlideInterval;
let slider, track;
let currentIndex = 0;
let totalSlides = 0;
let resizeObserver; // Zmienna dla ResizeObserver

const formspreeEndpoint = 'https://formspree.io/f/mdkdvvvj';

/**
 * Ustawia szerokość slajdów i pozycję slidera na podstawie aktualnego rozmiaru kontenera.
 * Ta funkcja jest teraz wywoływana przez ResizeObserver, co gwarantuje jej działanie w odpowiednim momencie.
 */
function updateSliderGeometry() {
    if (!slider || !track) return;

    const slideWidth = slider.offsetWidth;
    totalSlides = track.children.length;

    // Ustawia szerokość każdego slajdu, aby idealnie pasował do kontenera
    for (let i = 0; i < totalSlides; i++) {
        track.children[i].style.width = `${slideWidth}px`;
    }
    
    // Przesuwa slider do aktualnego slajdu bez animacji, aby uniknąć "przeskoków"
    goToSlide(currentIndex, false);
}

/**
 * Centralna funkcja do przesuwania slidera na określony slajd.
 * @param {number} slideIndex - Indeks slajdu, na który ma się przesunąć.
 * @param {boolean} animated - Czy przejście ma być animowane.
 */
function goToSlide(slideIndex, animated = true) {
    if (track && slider) {
        const slideWidth = slider.offsetWidth;
        const offset = -slideIndex * slideWidth;

        if (animated) {
            track.style.transition = 'transform 0.5s ease-in-out';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(${offset}px)`;
        currentIndex = slideIndex;
    }
}

/**
 * Przesuwa na następny slajd z animacją.
 */
function nextSlide() {
    // Upewniamy się, że totalSlides jest aktualne
    if (totalSlides > 0) {
        const newIndex = (currentIndex + 1) % totalSlides;
        goToSlide(newIndex, true);
    }
}

/**
 * Przesuwa na poprzedni slajd z animacją.
 */
function prevSlide() {
    if (totalSlides > 0) {
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(newIndex, true);
    }
}

function startAutoSlide() {
    stopAutoSlide(); 
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

async function handleAgencyFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formWrapper = document.getElementById('agency-form-wrapper');

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="loader"></span> ${t('loading')}`;
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formWrapper.innerHTML = `<div id="form-success-message">${t('formSuccess')}</div>`;
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Błąd podczas wysyłania formularza agencji:', error);
        alert('Wystąpił błąd. Spróbuj ponownie.');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

export function initializeAgencyPage(dependencies) {
    t = dependencies.t;

    slider = document.querySelector('.testimonial-slider');
    track = document.getElementById('testimonial-track');
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');
    const agencyForm = document.getElementById('agency-form');

    if (!slider || !track || !nextBtn || !prevBtn || !agencyForm) {
        console.error("Nie znaleziono wszystkich elementów na stronie agencji.");
        return [];
    }
    
    // Inicjalizacja ResizeObserver
    resizeObserver = new ResizeObserver(entries => {
        // Ta funkcja będzie wywoływana automatycznie, gdy rozmiar slidera się zmieni
        updateSliderGeometry();
    });

    // Rozpocznij obserwowanie kontenera slidera
    resizeObserver.observe(slider);

    startAutoSlide(); 

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide(); // Resetuje interwał po ręcznej zmianie
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide(); // Resetuje interwał po ręcznej zmianie
    });

    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    agencyForm.action = formspreeEndpoint;
    agencyForm.method = 'POST';
    agencyForm.addEventListener('submit', handleAgencyFormSubmit);

    const cleanup = () => {
        stopAutoSlide();
        // Ważne: Przestań obserwować element przy opuszczaniu strony, aby uniknąć wycieków pamięci
        if (resizeObserver && slider) {
            resizeObserver.unobserve(slider);
        }
    };

    return [cleanup];
}
