# RusAndes Blockchain — Site Editing Guide

Static single-page website for RusAndes Blockchain, hosted on GitHub Pages.
No build tools. No frameworks. Edit files directly, verify locally, then commit and push to deploy.

Live: **https://rusandes.com** · Repo: `klientohq/RusAndes_Blockchain` (public)

---

## ⚠️ Read this before you touch anything

**The site files live in the `RusAndes Raw Website/` subfolder, NOT at the repo root.**

Branch-based GitHub Pages can only publish `/` or `/docs` — it cannot publish an arbitrary
subfolder. So this repo publishes through a **GitHub Actions workflow**
(`.github/workflows/deploy-pages.yml`) that uploads `RusAndes Raw Website/` as the site root.

Consequences you must respect:

1. **The folder name `RusAndes Raw Website` is load-bearing — it is hardcoded in the workflow.**
   If you rename or move the folder, update the `path:` value in
   `.github/workflows/deploy-pages.yml` in the same commit, or the site deploys empty.
2. **`index.html` and `CNAME` must stay at the top level of that folder** — it becomes the site root.
3. Because the folder is the site root, all links inside the site stay **relative**
   (`css/style.css`, not `/RusAndes Raw Website/css/style.css`).
4. **This repo is public.** Never commit secrets, tokens, or the private company-brain skill.
   `RusAndes-brain-for-Andres/` is gitignored for exactly this reason.

---

## Repository layout

```
<repo root>/
├── .github/workflows/deploy-pages.yml   ← publishes the folder below (do not break)
├── .claude/launch.json                  ← local preview config
├── .gitignore
└── RusAndes Raw Website/                ← THIS FOLDER IS THE PUBLISHED SITE ROOT
    ├── index.html          ← Main page (all sections)
    ├── privacy.html        ← Privacy policy page
    ├── terms.html          ← Terms of use page
    ├── 404.html            ← Custom 404 page
    ├── css/
    │   ├── style.css       ← All styles + design system variables
    │   └── legal.css       ← Styles for privacy.html + terms.html
    ├── js/main.js          ← All JS (particles, scroll, mobile menu, form)
    ├── assets/             ← ceo-photo.jpg, PHOTO_INSTRUCTIONS.txt
    ├── logo ideas/         ← Two logo concept PNGs (not final production logo)
    ├── CNAME               ← "rusandes.com" — do NOT delete
    ├── .nojekyll           ← do NOT delete
    ├── robots.txt, sitemap.xml
    ├── CLAUDE.md / AGENTS.md / HANDOFF.md
```

---

## Design System (`css/style.css` — `:root`, top of file)

The site uses a **light theme with a dark hero panel**. All colors are CSS custom
properties — change once, applies everywhere. Never hardcode a hex in a rule; use the variable.

```css
/* Surfaces (light) */
--bg-0: #F7F9FB;    --bg-1: #EEF3F5;
--bg-2: #E3EAED;    --bg-card: #FFFFFF;

/* Gold accent */
--gold: #D7B85F;         --gold-light: #F0CF72;    --gold-dark: #9E7F29;
--gold-subtle: rgba(215,184,95,0.1);
--gold-border: rgba(215,184,95,0.34);   --gold-border-hover: rgba(215,184,95,0.72);

/* Teal secondary */
--teal: #26B7C8;    --teal-dark: #0C7489;    --teal-subtle: rgba(38,183,200,0.1);

/* Text (dark on light) */
--text-0: #142033;  --text-1: #334257;  --text-2: #647184;  --text-3: #8C98A8;

/* Borders */
--border: rgba(20,32,51,0.09);   --border-strong: rgba(20,32,51,0.16);

/* Hero dark panel — intentionally stays dark on the light page */
--panel-bg: #050B1F;   --panel-bg2: #0A1730;
--panel-text: #F0F4FF; --panel-text2: #8B95B0;

/* Type */
--font-display: 'Cormorant Garamond', Georgia, serif;   /* headings */
--font-body: 'Inter', system-ui, sans-serif;            /* body */

/* Also available: --radius-sm/md/lg/xl, --shadow-sm/md/lg/gold, --ease, --ease-out */
```

> If you are writing text that sits on the hero, use `--panel-text` / `--panel-text2`,
> not `--text-0` — the hero is dark and normal text colors will be unreadable there.

---

## Section Map — `index.html` (663 lines)

| Section | Selector | Line |
|---|---|---|
| Navigation | `<nav class="navbar" id="navbar">` | 47 |
| Hero | `<section id="home" class="hero">` | 88 |
| Stats bar | `<div class="stats-bar">` | 131 |
| Three Divisions | `<section id="divisions">` | 158 |
| Flywheel model | `<section class="flywheel-section">` | 247 |
| Strategy / SWOT | `<section id="strategy">` | 289 |
| About / CEO | `<section id="about">` | 374 |
| Values | `<section id="values">` | 438 |
| Contact | `<section id="contact">` | 487 |
| Footer | `<footer class="footer">` | 589 |
| Footer nav | `<nav class="footer-nav">` | 605 |
| Legal disclaimer | `<div class="footer-disclaimer" id="disclaimer">` | 635 |
| Scroll-to-top | `<button class="scroll-top" id="scrollTop">` | 657 |

Line numbers drift as you edit — search by selector, don't trust the number blindly.

---

## Common Edits

### Update phone numbers or email
Search `index.html` for the number/email and change **both** the `href` and the display text.
Contact links currently in use: `mailto:RusAndiblockchain@gmail.com`, `wa.me/79961232427`,
`t.me/+17165443701`.

### Add a service/bullet to a division card
Find the card by its title (e.g. "Global Markets"), add an `<li>` inside that card's `<ul class="card-list">`.

### Change hero tagline
Search for `hero-description` — the paragraph under "International Services Group".

### Add a new section
1. Add the HTML block in `index.html` between existing sections, with an `id=""`.
2. Add a link in `<ul class="nav-links">` (navbar) and consider the footer nav too.
3. Style it in `css/style.css` following existing section patterns (`.divisions`, `.values`).

### Update the legal disclaimer
`<div class="footer-disclaimer" id="disclaimer">` near the bottom of `index.html`.
Full policies live in `privacy.html` and `terms.html`.

### Add/replace the CEO photo
Drop `ceo-photo.jpg` into `assets/`. No code change needed. Specs in `assets/PHOTO_INSTRUCTIONS.txt`.

### Update the Formspree form ID
Search `index.html` for `formspree.io/f/` and replace the ID after the last `/`.
Current ID: `mvzyjqlg`. To route submissions to a different inbox, create a form under the new
owner's Formspree account and swap this ID.

### Logo concepts
Concepts live in `logo ideas/`. Move a final, web-optimized logo into `assets/` only once a
direction is chosen.

---

## Contact Info (current, as published)

| Field | Value |
|---|---|
| CEO | Andres Felipe Parra Peña |
| HQ | Bogotá D.C., Colombia |
| Email | RusAndiblockchain@gmail.com |
| WhatsApp | +7 996 1232427 · https://wa.me/79961232427 |
| Telegram | +1 716 544 3701 · https://t.me/+17165443701 |

---

## Local Preview (always do this before deploying)

```bash
# from the repo root:
npx serve -p 3456 "RusAndes Raw Website"
# open http://localhost:3456
```

Or use the Codex preview — launch config is in `.claude/launch.json` (already points
at the subfolder).

Check both **desktop ~1280px** and **mobile ~390px**, and confirm no horizontal overflow.

---

## Deployment

**A push to `main` publishes the site publicly.** There is no staging environment.
Do not push unless the owner explicitly says to deploy.

```bash
git status                 # confirm you're only shipping what you intend
git add -A
git commit -m "describe what changed"
git push origin main       # ← this publishes it live
```

The Actions workflow builds and deploys in roughly 15–60 seconds.

Verify after deploying:

```bash
gh run watch $(gh run list --limit 1 --json databaseId -q '.[0].databaseId') --exit-status
curl -sI -L https://rusandes.com | head -1     # expect HTTP/2 200
```

Then hard-refresh in a browser (Cmd/Ctrl+Shift+R).

If a deploy fails, `gh run view --log-failed` shows why. The site keeps serving the last
successful deployment, so a failed build does not take the site down.

---

## Pages configuration (don't change casually)

- Build type: **`workflow`** (GitHub Actions). If this is ever flipped back to "Deploy from a
  branch", the site breaks, because there is no `index.html` at the repo root.
- Custom domain: `rusandes.com`, HTTPS enforced, cert covers apex + `www`.
- DNS lives at GoDaddy: four `A` records to GitHub Pages IPs, plus `CNAME www → klientohq.github.io.`
