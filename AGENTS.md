# RusAndes Blockchain — Site Editing Guide

Static single-page website for RusAndes Blockchain, hosted on GitHub Pages.
No build tools. No frameworks. Edit files directly, verify locally, then commit and push to deploy.

---

## File Structure

```
@# parra website/
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
│   ├── ceo-photo.jpg
│   └── PHOTO_INSTRUCTIONS.txt
├── AGENTS.md           ← Codex site-editing instructions
├── CLAUDE.md           ← Claude site-editing instructions
├── .claude/
│   └── launch.json     ← Local preview launch config
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
| Strategy / SWOT | `<section id="strategy">` | ~265 |
| About / CEO | `<section id="about">` | ~355 |
| Values | `<section id="values">` | ~420 |
| Contact | `<section id="contact">` | ~485 |
| Footer + Disclaimer | `<footer class="footer">` | ~575 |
| Scroll-to-top button | `<button class="scroll-top">` | ~640 |

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
| Email | RusAndiblockchain@gmail.com |
| WhatsApp | +7 996 1232427 |
| Telegram | +1 7165443701 |
| WhatsApp link | https://wa.me/79961232427 |
| Telegram link | https://t.me/+17165443701 |
| HQ | Bogotá D.C., Colombia |
| CEO | Andres Felipe Parra Peña |

---

## GitHub Pages Deployment

Current repo:

- GitHub repo: `git@github.com:klientohq/RusAndes_Blockchain.git`
- Branch: `main`
- Live site: `https://klientohq.github.io/RusAndes_Blockchain/`

Do not push automatically unless the user explicitly says to deploy.

Deploy flow:

```bash
cd "/Users/camilorivas/Documents/AI/@# parra website"
git status --short --branch
git add .
git commit -m "describe what changed"
git push origin main
```

GitHub Pages auto-updates after the push, usually within about a minute. Verify after deploy:

```bash
curl -I -L https://klientohq.github.io/RusAndes_Blockchain/
```

---

## Local Preview

```bash
cd "/Users/camilorivas/Documents/AI/@# parra website"
npx serve -p 3456 .
```
Then open http://localhost:3456

Or use the Codex preview: launch config is in `.Codex/launch.json`.
