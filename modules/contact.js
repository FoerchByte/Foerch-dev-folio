<!--
  EN: The Contact hub, reimagined as a command terminal.
  It maintains full functionality (Formspree + Gemini AI) but presents it
  in a stark, "hacker-like" interface that fits the engineering persona.
  PL: Centrum kontaktu, przeobrażone w terminal poleceń.
  Zachowuje pełną funkcjonalność (Formspree + Gemini AI), ale prezentuje ją
  w surowym interfejsie, pasującym do wizerunku inżyniera.
-->
<h2 class="section-title">{{contactTitle}}</h2>
<p class="about-description" style="margin-bottom: 3rem;">{{contactContent}}</p>

<div class="contact-layout fade-in">
    
    <div class="contact-form-wrapper">
        <h3>> {{contactFormTitle}}</h3>
        <form id="contact-form">
            <div class="form-group">
                <label for="name">$ {{formName}}:</label>
                <input type="text" id="name" name="name" autocomplete="name" required>
                <small class="error-message"></small>
            </div>
            <div class="form-group">
                <label for="email">$ {{formEmail}}:</label>
                <input type="email" id="email" name="email" autocomplete="email" required>
                <small class="error-message"></small>
            </div>
            <div class="form-group">
                <label for="message">$ {{formMessage}}:</label>
                <textarea id="message" name="message" rows="6" required></textarea>
                <small class="error-message"></small>
            </div>
            <button type="submit">[ {{formSend}} ]</button>
        </form>
        <div id="form-success-message" class="hidden">{{formSuccess}}</div>
    </div>

    <div class="contact-sidebar">
         <div class="contact-info">
            <p><strong>Email:</strong> <a href="mailto:michal.herbich@gmail.com">michal.herbich@gmail.com</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/michał-herbich-783a7237a" target="_blank">/in/michal-herbich</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/FoerchByte" target="_blank">@FoerchByte</a></p>
        </div>
        
        <div class="gemini-assistant">
            <h3>> {{geminiTitle}}</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">// {{geminiContent}}</p>
            <textarea id="email-draft" rows="4" placeholder="{{geminiPlaceholder}}"></textarea>
            <button id="generate-email-btn"><span>[ {{geminiBtn}} ]</span></button>
            <div id="gemini-result-container" style="display: none;" aria-live="polite">
                <pre id="gemini-result"></pre>
            </div>
        </div>
    </div>

</div>
