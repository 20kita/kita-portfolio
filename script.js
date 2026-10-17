/* ---------- Logo: phone bar + browser tab icon (no extra files needed) ---------- */
const LOGO_PATHS =
    '<path transform="translate(33.9,730.9) scale(1,-1)" d="M494 -17Q477 -17 462.0 -9.5Q447 -2 434 10Q416 28 392.0 60.0Q368 92 343.5 129.5Q319 167 297.5 201.5Q276 236 263 260Q235 250 203.0 226.5Q171 203 143.5 170.5Q116 138 99.0 103.0Q82 68 84 35Q85 30 87.0 24.0Q89 18 96 18Q102 18 102 8Q102 4 99.5 -0.5Q97 -5 91 -5Q69 -5 60.0 10.5Q51 26 51 47Q51 80 66.0 127.5Q81 175 105.0 228.5Q129 282 156.0 334.5Q183 387 207.0 431.0Q231 475 247 502Q260 523 272.5 547.5Q285 572 300 591Q305 598 317.0 600.0Q329 602 336 602Q344 602 354.0 598.5Q364 595 365 584Q365 577 361.5 569.5Q358 562 354 556Q309 483 262.5 411.0Q216 339 181 260Q322 327 451.5 412.5Q581 498 710 583Q716 587 722.5 590.0Q729 593 736 593Q741 593 745.0 590.5Q749 588 750 583Q751 575 724.0 553.5Q697 532 653.0 503.0Q609 474 558.0 442.0Q507 410 458.0 380.5Q409 351 372.5 328.5Q336 306 322 296Q326 280 339.5 246.5Q353 213 373.0 173.0Q393 133 416.0 95.5Q439 58 461.5 34.0Q484 10 502 10Q519 10 528.5 22.5Q538 35 542.5 54.0Q547 73 548.0 91.5Q549 110 548 122Q548 124 547.5 126.0Q547 128 547 130Q547 137 553 137Q562 137 568.5 126.0Q575 115 579.5 102.0Q584 89 584 82Q586 57 573.5 34.5Q561 12 540.5 -2.5Q520 -17 494 -17Z"/>' +
    '<path transform="translate(619.9,730.9) scale(1,-1)" d="M134 4Q125 4 112.0 8.0Q99 12 99 26Q99 35 107.5 47.5Q116 60 128.0 69.5Q140 79 150 79Q158 79 165.5 72.0Q173 65 172 55Q172 50 164.5 37.5Q157 25 148.5 14.5Q140 4 134 4Z"/>';

// 1) logo inside the phone bar (takes the text colour, so it works in dark mode too)
document.querySelectorAll('.mobile-logo').forEach((link) => {
    link.innerHTML = '<svg viewBox="70 115 740 650" aria-hidden="true"><g fill="currentColor">' + LOGO_PATHS + '</g></svg>';
});

// 2) browser tab icon: white K on a purple rounded square
(function setFavicon() {
    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 877 877">' +
        '<rect width="877" height="877" rx="190" fill="#6D6EAA"/>' +
        '<g fill="#FFF9F2" transform="translate(438.5 438.5) scale(0.78) translate(-438.5 -438.5)">' + LOGO_PATHS + '</g></svg>';
    document.querySelectorAll('link[rel~="icon"]').forEach((el) => el.remove());
    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/svg+xml';
    icon.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
    document.head.appendChild(icon);
})();

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