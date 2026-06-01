# RusAndes Blockchain — Site Editing Guide

Static single-page website for RusAndes Blockchain, hosted on GitHub Pages.
No build tools. No frameworks. Edit files directly and push to GitHub.

---

## File Structure

```
parra website/
├── index.html          ← Main page (all sections)
├── privacy.html        ← Privacy policy page
├── terms.html          ← Terms of use page
├── 404.html            ← Custom 404 error page
├── css/
│   ├── style.css       ← All styles + design system variables
│   └── legal.css       ← Styles shared by privacy.html and terms.html
├── js/
│   └── main.js         ← All JavaScript (particles, scroll, mobile menu, form)
├── assets/
│   └── ceo-photo.jpg   ← DROP THE CEO PHOTO HERE (see PHOTO_INSTRUCTIONS.txt)
├── .nojekyll           ← Required for GitHub Pages (do not delete)
└── .gitignore
```

---

## Design System (css/style.css — top of file)

All colors and fonts are CSS custom properties. Change once, applies everywhere:

```css
--gold: #c9a84c          /* Primary gold accent */
--gold-light: #e8c97a    /* Hover/highlight gold */
--bg-0: #05081a          /* Darkest background */
--bg-1: #0a0e26          /* Secondary background */
--bg-card: #111827       /* Card backgrounds */
--text-0: #f0f4ff        /* Primary text */
--text-2: #8b95b0        /* Secondary/muted text */
--font-display: 'Cormorant Garamond'  /* All headings */
--font-body: 'Inter'                  /* All body text */
```

---

## Section Map — index.html

| Section | HTML id / class | Approx line |
|---|---|---|
| `<head>` meta + fonts | `<head>` | 1–20 |
| Navigation | `<nav class="navbar">` | ~22 |
| Hero | `<section id="home">` | ~55 |
| Stats bar | `<div class="stats-bar">` | ~115 |
| Three Divisions | `<section id="divisions">` | ~140 |
| Flywheel model | `<section class="flywheel-section">` | ~228 |
| About / CEO | `<section id="about">` | ~278 |
| Values | `<section id="values">` | ~340 |
| Contact | `<section id="contact">` | ~385 |
| Footer + Disclaimer | `<footer class="footer">` | ~490 |
| Scroll-to-top button | `<button class="scroll-top">` | ~555 |

---

## Common Edits

### Update phone numbers or email
Search `index.html` for the phone number or email and change both the `href` and the display text.
Phones appear in two places: the contact section and can optionally be in the footer.

### Add a new service or bullet point to a division card
Find the card in `index.html` by searching for the division title (e.g. "Global Markets").
Add an `<li>` item inside the `<ul class="card-list">` of that card.

### Change hero tagline
Search `index.html` for `hero-description` — it's the paragraph just below the "International Services Group" line.

### Add a new section
1. Add the HTML block in `index.html` between existing sections.
2. Add a `<li>` link for it in the `<ul class="nav-links">` navbar.
3. Style it in `css/style.css` — follow the pattern of existing sections (`.divisions`, `.values`, etc.).
4. Give the section an `id=""` so the nav link can anchor to it.

### Update the legal disclaimer
The full disclaimer is in `<div class="footer-disclaimer">` near the bottom of `index.html`.
Full privacy policy is in `privacy.html`. Full terms are in `terms.html`.

### Add CEO photo
Drop `ceo-photo.jpg` into the `assets/` folder. Done — no code change needed.
See `assets/PHOTO_INSTRUCTIONS.txt` for specs.

### Update Formspree form ID
In `index.html`, search for `formspree.io/f/` — replace the ID after the last `/`.
Current ID: `mvzyjqlg`

---

## Contact Info (current)

| Field | Value |
|---|---|
| Email | parrapenaandresfelipe13@gmail.com |
| Colombia phone | +57 311-616-1398 |
| US phone | +1 716-249-9613 |
| Russia phone | +7 996-123-2427 |
| WhatsApp link | https://wa.me/573116161398 |
| HQ | Bogotá D.C., Colombia |
| CEO | Andres Felipe Parra Peña |

---

## GitHub Pages Deployment

```bash
cd "/Users/camilorivas/parra website"
git init
git add .
git commit -m "Initial deploy"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

Then: GitHub repo → Settings → Pages → Deploy from branch → main / root → Save.

Live URL: `https://USERNAME.github.io/REPO`

To deploy future updates:
```bash
git add .
git commit -m "describe what changed"
git push
```
GitHub Pages auto-updates within ~60 seconds.

---

## Local Preview

```bash
cd "/Users/camilorivas/parra website"
npx serve -p 3456 .
```
Then open http://localhost:3456

Or use the Claude Code preview: launch config is in `.claude/launch.json`.
