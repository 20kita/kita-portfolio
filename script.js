/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function applyTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    themeIcon.classList.toggle('fa-sun', isDark);
    themeIcon.classList.toggle('fa-moon', !isDark);
}

function readSavedTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (e) {
        return null; // storage blocked - fall back to light
    }
}

function saveTheme(isDark) {
    try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) { /* theme just won't be remembered */ }
}

applyTheme(readSavedTheme() === 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    applyTheme(isDark);
    saveTheme(isDark);
});

/* ---------- Contact form (only runs on the contact pages) ---------- */
const form = document.getElementById('contactForm');

if (form) {
    const isPolish = document.documentElement.lang === 'pl';
    const text = isPolish
        ? {
            sendError: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.',
            networkError: 'Błąd połączenia z serwerem.'
        }
        : {
            sendError: 'Something went wrong while sending your message. Please try again later.',
            networkError: 'Could not connect to the server.'
        };

    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submitBtn = form.querySelector('button[type="submit"]');
    const popup = document.getElementById('successPopup');
    const closeBtn = document.getElementById('closePopupBtn');

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_MESSAGE_LENGTH = 20;

    // Shows or hides one field's error and returns whether the field is valid
    function validate(input, errorEl, isValid) {
        errorEl.hidden = isValid;
        input.classList.toggle('input-error', !isValid);
        return isValid;
    }

    function closePopup() {
        popup.hidden = true;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check both fields (no short-circuit) so both errors can show at once
        const emailOk = validate(emailInput, emailError, EMAIL_PATTERN.test(emailInput.value.trim()));
        const messageOk = validate(messageInput, messageError, messageInput.value.trim().length >= MIN_MESSAGE_LENGTH);
        if (!emailOk || !messageOk) return;

        submitBtn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                form.reset();
                popup.hidden = false;
                closeBtn.focus();
            } else {
                alert(text.sendError);
            }
        } catch (error) {
            alert(text.networkError);
        } finally {
            submitBtn.disabled = false;
        }
    });

    closeBtn.addEventListener('click', closePopup);

    // Close by clicking the dark backdrop or pressing Escape
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });
}
/* ---------- Phone menu (hamburger) ---------- */
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.menu-toggle');

if (sidebar && menuToggle) {
    function setMenu(open) {
        sidebar.classList.toggle('menu-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.querySelector('i').classList.toggle('fa-bars', !open);
        menuToggle.querySelector('i').classList.toggle('fa-xmark', open);
    }

    menuToggle.addEventListener('click', () => {
        setMenu(!sidebar.classList.contains('menu-open'));
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-bar') && !e.target.closest('.side-nav')) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
    });
}
const menuNav = document.querySelector('.side-nav');
const movable = [...document.querySelectorAll('a[hreflang="en"].icon-btn, a[hreflang="pl"].icon-btn, #theme-toggle')];

if (menuNav && movable.length) {
    // remember where each button lives on bigger screens
    const origins = movable.map((el) => ({ el, parent: el.parentElement, next: el.nextSibling }));
    const drawerActions = document.createElement('div');
    drawerActions.className = 'drawer-actions';
    const phone = window.matchMedia('(max-width: 499px)');

    function placeActions() {
        if (phone.matches) {
            movable.forEach((el) => drawerActions.appendChild(el));
            menuNav.appendChild(drawerActions);
        } else {
            origins.slice().reverse().forEach(({ el, parent, next }) => parent.insertBefore(el, next));
            drawerActions.remove();
        }
    }

    placeActions();
    phone.addEventListener('change', placeActions);
}