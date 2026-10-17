# Kita – Portfolio

My personal portfolio website. It introduces me, shows the projects I've worked on (web, Python, UI/UX and SQL), and has a contact form.

The site is available in **Polish** and **English**, and has a **light and dark theme**.

**Live site:** <https://20kita.github.io/kita-portfolio/>

- **GitHub:** [20kita](https://github.com/20kita)
- **LinkedIn:** [Natalia Cieszyńska](https://www.linkedin.com/in/natalia-cieszy%C5%84ska-065638272)

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Project structure](#project-structure)
3. [Pages](#pages)
4. [Featured projects](#featured-projects)
5. [Features](#features)
6. [Styling and themes](#styling-and-themes)
7. [Responsive design](#responsive-design)

---

## Tech stack

| Part        | Technology |
|-------------|------------|
| Markup      | HTML5 (separate page for each view and each language) |
| Styling     | CSS3 (`style.css`): CSS Grid, Flexbox, custom properties (variables), media queries |
| JavaScript  | Vanilla JS (`script.js`), no frameworks |
| Fonts       | Google Fonts: **Poppins** |
| Icons       | [Font Awesome 6](https://fontawesome.com/) |
| Contact form| [Formspree](https://formspree.io/) |
| Hosting     | GitHub Pages |

---

## Project structure

```
kita-portfolio/
├── index.html / index-en.html                 # Home page
├── projects.html / projects-en.html           # List of projects
├── contact.html / contact-en.html             # Contact form
├── project-weather.html / -en.html            # Weather AI Assistant
├── project-crochet.html / -en.html            # Kita Crochet
├── project-python-game.html / -en.html        # Snake Game
├── project-vape.html / -en.html               # Vape MaNiAcY
├── project-teamtrees.html / -en.html          # Team Trees
├── project-sql.html                           # (empty – planned SQL project page)
├── style.css                                  # All styles, shared by every page
├── script.js                                  # All scripts, shared by every page
├── profile-photo.jpg                          # Photo on the home page
└── K-logo.svg                                 # Logo source file
```

Every page has a Polish version (`name.html`) and an English version (`name-en.html`). The **EN** / **PL** button in the top corner switches between them.

---

## Pages

All pages share the same layout: a **sidebar** on the left (navigation, social links, copyright) and the **main content** on the right.

| Page | What it contains |
|------|------------------|
| **Home** (`index.html`) | Profile photo, location (Toruń), and a heading styled like lines of code with line numbers. A button leads to the contact page. |
| **Projects** (`projects.html`) | Cards for each project, with a short description and a technology tag. Clicking a card opens that project's page. |
| **Project pages** (`project-*.html`) | A live preview of the project in an `<iframe>`, buttons for **Documentation** (GitHub repo or Figma) and **Full screen**, and an "About the project" description. A back arrow returns to the project list. |
| **Contact** (`contact.html`) | A form with name, e-mail and message, sent through Formspree. A pop-up confirms that the message was sent. |

---

## Featured projects

| Project | Type | Technologies | Links |
|---------|------|--------------|-------|
| **Weather AI Assistant** | Chatbot web app that shows the current weather and suggests what to wear | JavaScript, OpenWeather API | [Repo](https://github.com/20kita/weather-chatbot) · [Live](https://20kita.github.io/weather-chatbot/) |
| **Kita Crochet** | Responsive one-page website for a crochet brand | HTML, CSS (Flexbox, Grid) | [Repo](https://github.com/20kita/kitacrochet) · [Live](https://20kita.github.io/kitacrochet/) |
| **Snake Game** | Arcade game | Python | [Repo](https://github.com/20kita/snake-python) · [Live](https://20kita.github.io/snake-python/) |
| **Vape MaNiAcY** | UI/UX storyboard and prototype of a catalogue app | Figma | Figma prototype (embedded on the page) |
| **Team Trees** | UI/UX interface design and interactive prototype | Figma | Figma prototype (embedded on the page) |
| **SQL Databases** | Scripts, T-SQL queries, JOINs and subqueries | MS SQL Server | Card only, no page yet |

---

## Features

All the JavaScript is in one file, `script.js`, which every page loads. Each part only runs if the page has the elements it needs.

### Light / dark theme
- The moon / sun button switches the theme by adding or removing the `dark-theme` class on `<body>`.
- The choice is saved in `localStorage`, so it stays the same on every page and after a refresh.
- If the browser blocks storage, the site still works; the theme just isn't remembered.

### Contact form
- Validates the fields before sending:
  - e-mail must have a correct format,
  - message must be at least **20 characters** long.
- Both error messages can show at the same time, and wrong fields get a red border.
- The form is sent with `fetch()` to Formspree, so the page doesn't reload.
- While sending, the button is disabled, so the message can't be sent twice.
- After success, the form is cleared and a pop-up appears. It closes with the **OK** button, by clicking outside it, or with **Escape**.
- Error messages are shown in Polish or English depending on the page language.

### Phone menu
- On narrow screens, the sidebar turns into a top bar with a **hamburger** button and the logo.
- The menu closes when you click outside it or press **Escape**.
- On phones, the language and theme buttons move into the menu, so the top of the page stays clean. When the screen gets wider again, they move back.

### Logo and favicon
- The "K" logo is drawn as an SVG directly by `script.js`, so no extra image files are needed.
- In the phone bar, the logo takes the text colour, so it looks right in both themes.
- The browser tab icon is a white "K" on a purple rounded square.

### Accessibility
- `aria-label`s on icon buttons and links, `aria-current="page"` on the active menu link, and `aria-expanded` on the menu button.
- Form fields have `<label>`s, and error messages use `role="alert"` so screen readers read them.
- The pop-up is marked as a dialog, and focus moves to its **OK** button.
- External links open in a new tab with `rel="noopener noreferrer"`.

---

## Styling and themes

All colours are CSS variables defined at the top of `style.css`. The dark theme only overrides their values, so the rest of the CSS doesn't need to know which theme is on.

| Variable          | Light     | Dark      |
|-------------------|-----------|-----------|
| `--primary-color` | `#6D6EAA` | `#AD49E1` |
| `--bg-color`      | `#FFF2E0` | `#12021A` |
| `--surface`       | `#FFF9F2` | `#2E073F` |
| `--sidebar-bg`    | `#C0C9EE` | dark transparent |
| `--text-dark`     | `#2B2A4A` | `#EBD3F8` |
| `--text-muted`    | `#6B6A8A` | `#C77DFF` |

The light theme uses soft lavender and cream colours, and the dark theme uses deep purple. Two blurred background shapes (`.bg-shape`) add depth behind the content.

---

## Responsive design

| Screen width | Layout |
|--------------|--------|
| 1441px and wider | Content uses up to 90% of the screen width; bigger project previews. |
| 1025–1440px | Sidebar 280px wide; projects in **3 columns**. |
| 769–1024px | Narrower sidebar (220px); projects in **2 columns**. |
| 500–768px | One column: navigation at the top, content in the middle, socials and copyright at the bottom. Projects in **1 column**. |
| up to 499px | Top bar with the hamburger menu and logo; language and theme buttons move into the menu. |

There is also a rule for short, wide screens (like a laptop window that isn't very tall), so the sidebar content doesn't overlap.

---

© 2026 Natalia Cieszyńska
