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

```
index.html          ← the whole main page, all sections
privacy.html        ← privacy policy
terms.html          ← terms of use
404.html            ← custom not-found page
css/style.css       ← all styles + the design-system color/font variables (top of file)
css/legal.css       ← styles for privacy.html + terms.html
js/main.js          ← all JS (particles, scroll, mobile menu, contact form)
assets/             ← ceo-photo.jpg and image assets
logo ideas/         ← two logo concept PNGs (not yet the final production logo)
CNAME               ← contains "rusandes.com" — tells GitHub Pages the custom domain (do NOT delete)
.nojekyll           ← required so GitHub Pages serves files as-is (do NOT delete)
robots.txt, sitemap.xml   ← SEO/indexing
CLAUDE.md           ← detailed site-editing guide (section map, common edits) — READ THIS for edits
AGENTS.md           ← same guide, for Codex
HANDOFF.md          ← this file
```

**Detailed editing instructions (where each section lives, how to change phones/email/copy, the color system) are in [`CLAUDE.md`](CLAUDE.md).** This handoff covers ownership, access, and deployment; `CLAUDE.md` covers day-to-day edits.

> Note: `CLAUDE.md` still references an old local folder name (`@# parra website`). That's cosmetic — ignore the folder name; the file/section map is accurate.

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
# from inside the repo folder:
npx serve -p 3456 .
# then open http://localhost:3456
```

Always look at the site locally (and check mobile width ~390px and desktop ~1280px) before pushing.

---

## 5. Deploy = commit + push (that's the whole pipeline)

GitHub Pages redeploys automatically within ~1 minute of a push to `main`. There is no separate build/deploy step.

```bash
git status                       # see what changed
git add .
git commit -m "describe what changed"
git push origin main             # ← this publishes it live
```

Verify it went live:
```bash
curl -I -L https://rusandes.com
```
Then hard-refresh the site in a browser (Cmd/Ctrl+Shift+R).

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

In the repo's **Settings → Pages**: custom domain is `rusandes.com`, and **Enforce HTTPS** should be ON (enable it once GitHub finishes provisioning the certificate). The domain and DNS stay as-is — nothing to change on GoDaddy.

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

The deep strategic knowledge about RusAndes — the three divisions, positioning, regulatory notes, competitor intel, SWOT, 90-day priorities — lives in a **Claude/Codex "skill"** that makes your AI a fully-briefed co-founder for this company. Because this repo is public, that skill is **NOT stored here**. It is handed to you privately as a folder.

To install it (once you receive the `rusandes-2brain-handoff` folder):
1. Copy the `rusandes-2brain` folder into `~/.claude/skills/` on your machine.
2. Open Claude Code in this project and it will auto-load whenever you mention RusAndes.
3. See the `INSTALL.md` inside that folder for exact steps.

---

## 11. First things your Claude should do (new owner checklist)

1. Confirm GitHub access is granted (Section 7) and `gh auth login` works.
2. `gh repo clone` the repo and `npx serve` it locally (Sections 3–4).
3. Read `CLAUDE.md` for the section map and common edits.
4. Install the private company-brain skill (Section 10).
5. Make one tiny test edit → preview → commit → push → confirm it goes live (Section 5).
6. In repo Settings → Pages, verify custom domain `rusandes.com` and Enforce HTTPS.
