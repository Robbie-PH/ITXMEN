const DISCLAIMER_TEXT = "THIS IS A DEMO WEBSITE PREPARED BY ROBBIE AND IS NOT AUTHORIZED BY ITXMEN OR STEPHEN NOLAN. This is a sales pitch site.";

const headerHTML = `
    <div class="disclaimer-banner">
        <strong>⚠️ DEMO/PITCH SITE:</strong> ${DISCLAIMER_TEXT}
    </div>
    <header class="site-header">
        <nav class="nav-container">
            <a href="index.html" class="logo">ITX<span>MEN</span>.</a>
            <ul class="nav-links">
                <li><a href="index.html" id="nav-home">Home</a></li>
                <li><a href="services.html" id="nav-services">Services</a></li>
                <li><a href="contact.html" id="nav-contact">Contact & Consult</a></li>
            </ul>
        </nav>
    </header>
`;

const footerHTML = `
    <footer class="site-footer">
        <div class="footer-grid">
            <div class="footer-col">
                <a href="index.html" class="logo">ITX<span>MEN</span>.</a>
                <p style="margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                    Expert IT Guidance at the Intersection of Tech and Growth.
                </p>
            </div>
            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact Info</h4>
                <ul>
                    <li><a href="mailto:hello@itxmen.com">hello@itxmen.com</a></li>
                </ul>
            </div>
        </div>
        <div class="disclaimer-banner footer-disclaimer">
            <strong>⚠️ DEMO/PITCH SITE:</strong> ${DISCLAIMER_TEXT}
        </div>
        <div style="text-align: center; margin-top: 2rem; color: #555; font-size: 0.8rem;">
            &copy; 2026 Pitch Demo by ROBBIE
        </div>
    </footer>
`;

document.addEventListener("DOMContentLoaded", () => {
    // Inject Header and Footer
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

    // Set active nav link
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    let activeId = 'nav-home';
    if (pageName.includes('services')) activeId = 'nav-services';
    if (pageName.includes('contact')) activeId = 'nav-contact';
    
    const activeLink = document.getElementById(activeId);
    if (activeLink) activeLink.classList.add('active');

    // Initialize Animations
    initScrollAnimations();

    // Inject GitHub Link
    const githubLinkHTML = `
        <a href="https://github.com/Robbie-PH" target="_blank" rel="noopener noreferrer" class="github-float">
            <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span>Robbie-PH</span>
        </a>
    `;
    document.body.insertAdjacentHTML('beforeend', githubLinkHTML);

    // Inject Feedback Widget
    const feedbackHTML = `
        <button id="feedback-btn" class="feedback-float" aria-label="Open feedback form">
            <span class="icon">💬</span> Feedback
        </button>
        <div id="feedback-modal" class="feedback-overlay hidden">
            <div class="feedback-panel glass-panel">
                <button id="feedback-close" class="close-btn" aria-label="Close">&times;</button>
                <h3>We value your thoughts</h3>
                <p class="subtitle" style="margin-bottom: 1rem; font-size: 0.95rem;">Have a suggestion or found a bug? Let us know.</p>
                <form id="feedback-form" class="styled-form">
                    <div class="form-group">
                        <label for="feedback-type">Topic</label>
                        <select id="feedback-type" required>
                            <option value="suggestion">Suggestion</option>
                            <option value="bug">Report a Bug</option>
                            <option value="other">Other Feedback</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="feedback-message">Details</label>
                        <textarea id="feedback-message" rows="4" placeholder="Tell us more..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-full">Send Feedback</button>
                </form>
                <div id="feedback-success" class="hidden">
                    <div class="success-icon">✨</div>
                    <h4>Thank you!</h4>
                    <p>Your feedback helps us improve.</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', feedbackHTML);

    // Feedback Logic
    const fbBtn = document.getElementById('feedback-btn');
    const fbModal = document.getElementById('feedback-modal');
    const fbClose = document.getElementById('feedback-close');
    const fbForm = document.getElementById('feedback-form');
    const fbSuccess = document.getElementById('feedback-success');

    if(fbBtn && fbModal && fbClose) {
        fbBtn.addEventListener('click', () => {
            fbModal.classList.remove('hidden');
            fbModal.classList.add('visible');
        });
        
        fbClose.addEventListener('click', () => {
            fbModal.classList.remove('visible');
            setTimeout(() => fbModal.classList.add('hidden'), 400); // match transition
        });

        fbModal.addEventListener('click', (e) => {
            if(e.target === fbModal) {
                fbModal.classList.remove('visible');
                setTimeout(() => fbModal.classList.add('hidden'), 400); 
            }
        });
    }

    if(fbForm) {
        fbForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Mock submission
            fbForm.style.display = 'none';
            fbSuccess.classList.remove('hidden');
            fbSuccess.classList.add('success-anim');
            setTimeout(() => {
                fbModal.classList.remove('visible');
                setTimeout(() => {
                    fbModal.classList.add('hidden');
                    fbForm.style.display = 'block';
                    fbSuccess.classList.add('hidden');
                    fbSuccess.classList.remove('success-anim');
                    fbForm.reset();
                }, 400);
            }, 3000);
        });
    }
});

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-stagger');
    revealElements.forEach(el => observer.observe(el));
    
    // Typewriter effect handler for hero spans
    const typeEffect = document.querySelector('.type-effect');
    if (typeEffect) {
        // very simple animation that just stays static for now, real typing requires text-content manipulation
        // left as static since CSS gradient is already applied via classes.
    }
}
