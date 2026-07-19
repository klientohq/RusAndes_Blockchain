# RusAndes Website — Owner Handoff

**Purpose:** Everything a new owner (Andres) and their Claude/Codex need to fully run, edit, and deploy this website — with no prior context. Read this file top to bottom first.

> This repo is **public**. Nothing secret goes in here (no passwords, tokens, private strategy). Company strategy and the "second brain" are delivered **separately and privately** — see [The Company Brain](#the-company-brain-delivered-separately) below.

---

## 1. What this is

- **Site:** RusAndes Blockchain — a static, single-page marketing website.
- **Stack:** Plain HTML + CSS + JavaScript. **No build tools, no frameworks.** You edit files directly and push.
- **Hosting:** GitHub Pages (free static hosting served straight from this repo's `main` branch).
- **Live URLs:**
  - Custom domain: **https://rusandes.com** (and `www.rusandes.com`)
  - GitHub Pages fallback: `https://klientohq.github.io/RusAndes_Blockchain/`
- **Repo:** `https://github.com/klientohq/RusAndes_Blockchain`

The site has these sections (all in `index.html`): Home/Hero, Stats bar, Three Divisions, Flywheel model, Strategy/SWOT, About/CEO, Values, Contact, Footer + legal disclaimer. Plus standalone `privacy.html`, `terms.html`, and `404.html`.

---

## 2. Repo layout (what you get when you clone)

**The website files are in the `RusAndes Raw Website/` subfolder, not at the repo root.**

```
<repo root>/
├── .github/workflows/deploy-pages.yml  ← publishes the folder below (see §5)
├── .claude/launch.json                 ← local preview config
├── CLAUDE.md                           ← root pointer: explains this layout
├── .gitignore
└── RusAndes Raw Website/               ← THIS FOLDER IS THE PUBLISHED SITE ROOT
    ├── index.html          ← the whole main page, all sections
    ├── privacy.html        ← privacy policy
    ├── terms.html          ← terms of use
    ├── 404.html            ← custom not-found page
    ├── css/style.css       ← all styles + design-system color/font variables (top of file)
    ├── css/legal.css       ← styles for privacy.html + terms.html
    ├── js/main.js          ← all JS (particles, scroll, mobile menu, contact form)
    ├── assets/             ← ceo-photo.jpg and image assets
    ├── logo ideas/         ← two logo concept PNGs (not yet the final production logo)
    ├── CNAME               ← "rusandes.com" — tells Pages the custom domain (do NOT delete)
    ├── .nojekyll           ← serves files as-is (do NOT delete)
    ├── robots.txt, sitemap.xml   ← SEO/indexing
    ├── CLAUDE.md           ← detailed site-editing guide — READ THIS for edits
    ├── AGENTS.md           ← same guide, for Codex
    └── HANDOFF.md          ← this file
```

**Detailed editing instructions (where each section lives, how to change phones/email/copy, the color system) are in [`CLAUDE.md`](CLAUDE.md).** This handoff covers ownership, access, and deployment; `CLAUDE.md` covers day-to-day edits.

> ⚠️ The folder name `RusAndes Raw Website` is hardcoded in the deploy workflow. If you rename or
> move it, update `path:` in `.github/workflows/deploy-pages.yml` in the same commit, or the site
> will deploy empty.

---

## 3. Getting the code onto your machine

You need: **git**, and either the **GitHub CLI (`gh`)** or an SSH key. Easiest is `gh`.

```bash
# one-time: authenticate as yourself (opens browser, no tokens to copy by hand)
gh auth login          # choose GitHub.com → HTTPS → login with browser

# clone the repo
gh repo clone klientohq/RusAndes_Blockchain

cd RusAndes_Blockchain
```

**Important about access:** this repo lives in the `klientohq` GitHub organization (the owner's account). You are added as a **collaborator on this one repo only** — you can do everything here (edit, commit, push, manage Pages for this repo) but you have **no access to the rest of the account or other repos**. Cloning to *read* works for anyone (it's public); *pushing* requires that you've accepted the collaborator invite — see [Section 7](#7-github-access-do-this-first).

---

## 4. Preview locally before you deploy

```bash
# from the repo root — note the folder argument:
npx serve -p 3456 "RusAndes Raw Website"
# then open http://localhost:3456
```

Always look at the site locally (and check mobile width ~390px and desktop ~1280px) before pushing.

---

## 5. Deploy = commit + push (that's the whole pipeline)

A push to `main` triggers the GitHub Actions workflow `.github/workflows/deploy-pages.yml`,
which uploads the `RusAndes Raw Website/` folder as the site root and publishes it — typically
in 15–60 seconds. You never run a build yourself.

```bash
git status                       # see what changed
git add -A
git commit -m "describe what changed"
git push origin main             # ← this publishes it live
```

Verify it went live:
```bash
gh run watch $(gh run list --limit 1 --json databaseId -q '.[0].databaseId') --exit-status
curl -sI -L https://rusandes.com | head -1        # expect HTTP/2 200
```
Then hard-refresh the site in a browser (Cmd/Ctrl+Shift+R).

If the workflow fails, `gh run view --log-failed` shows why. A failed build does **not** take the
site down — Pages keeps serving the last successful deployment.

> **Why Actions instead of the simple branch deploy?** Branch-based Pages can only publish the
> repo root (`/`) or `/docs`. The site lives in `RusAndes Raw Website/`, so it needs a workflow.
> Do not switch Pages back to "Deploy from a branch" — there is no `index.html` at the repo root,
> so the site would 404.

**Rule of thumb:** edit → preview locally → commit → push. Nothing is live until you `git push`.

---

## 6. Domain & HTTPS (GoDaddy → GitHub Pages)

The domain **rusandes.com** was purchased on **GoDaddy**. It points at GitHub Pages via these DNS records (already configured):

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  klientohq.github.io.
```
GoDaddy nameservers stay `ns37.domaincontrol.com` / `ns38.domaincontrol.com`.

In the repo's **Settings → Pages** (all of this is already configured and verified live):

| Setting | Value |
|---|---|
| Source / build type | **GitHub Actions** (not "Deploy from a branch") |
| Custom domain | `rusandes.com` |
| Enforce HTTPS | ON — certificate covers `rusandes.com` and `www.rusandes.com` |

The domain and DNS stay as-is — nothing to change on GoDaddy.

---

## 7. GitHub access (DO THIS FIRST)

A document can't grant access — the account owner does it once from GitHub. The chosen route is **repo-only collaborator access**: you get to do everything on *this* repo and nothing else in the owner's account.

**Owner's steps (one time):**
1. Go to `https://github.com/klientohq/RusAndes_Blockchain` → **Settings → Collaborators and teams**.
2. **Add people** → enter Andres's GitHub username (or email) → give **Write** (or Admin, if he should also manage repo settings/Pages) access.
3. Andres accepts the email invite.

**Andres's steps:**
1. Create a free GitHub account if you don't have one, and tell the owner your username.
2. Accept the collaborator invite (check email / GitHub notifications).
3. Run `gh auth login` as yourself (Section 3), clone, make a tiny test edit, and push to confirm it works.

This scopes your access to **only this repo** — you can't see or touch any other project in the account.

> Never share GitHub passwords or personal access tokens in a file or chat. Each person authenticates as themselves with `gh auth login`.

---

## 8. The contact form (Formspree)

The contact form submits to **Formspree**. The form ID is in `index.html` — search for `formspree.io/f/`. To route form submissions to a different inbox, create a Formspree form under the new owner's account and replace the ID after the last `/`.

---

## 9. Contact / site facts (already public on the site)

| Field | Value |
|---|---|
| CEO | Andres Felipe Parra Peña |
| HQ | Bogotá D.C., Colombia |
| Email (site) | RusAndiblockchain@gmail.com |
| WhatsApp | +7 996 1232427 · https://wa.me/79961232427 |
| Telegram | +1 716 544 3701 · https://t.me/+17165443701 |

---

## 10. The company brain (delivered separately)

You are handed **two Claude/Codex "skills"** privately, as a folder. Because this repo is public, neither is stored here.

| Skill | What it knows |
|---|---|
| `rusandes-2brain` | Company strategy — the three divisions, positioning, regulatory notes, competitor intel, SWOT, 90-day priorities. Makes your AI a briefed co-founder. |
| `rusandes-website` | How to edit and publish this website — repo layout, the subfolder/workflow rule, design tokens, section map, preview + deploy + verify. |

To install (once you receive the handoff folder):
1. Copy **both** skill folders into `~/.claude/skills/` on your machine.
2. Restart Claude Code. They auto-load when you open this project or mention RusAndes.
3. See `INSTALL.md` inside that folder for exact steps.

---

## 11. First things your Claude should do (new owner checklist)

1. Confirm GitHub access is granted (Section 7) and `gh auth login` works.
2. `gh repo clone` the repo and `npx serve` it locally (Sections 3–4).
3. Read `CLAUDE.md` for the section map and common edits.
4. Install the private company-brain skill (Section 10).
5. Make one tiny test edit → preview → commit → push → confirm it goes live (Section 5).
6. In repo Settings → Pages, verify custom domain `rusandes.com` and Enforce HTTPS.
