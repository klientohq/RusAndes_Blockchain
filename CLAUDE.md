# RusAndes Blockchain — repo root

This repository publishes **https://rusandes.com** (GitHub Pages, public repo).

## The one thing to know first

**The website is NOT at this repo root. It lives in `RusAndes Raw Website/`.**

That folder is published as the site root by the GitHub Actions workflow at
`.github/workflows/deploy-pages.yml`. The folder name is hardcoded in that workflow's
`path:` value — **rename or move the folder and the site deploys empty** unless you update
the workflow in the same commit.

Branch-based Pages cannot publish an arbitrary subfolder (only `/` or `/docs`), which is why
this repo deploys via Actions rather than the default branch build. Do not switch Pages back
to "Deploy from a branch" — there is no `index.html` at this root, so the site would 404.

## Where to go next

**→ Read [`RusAndes Raw Website/CLAUDE.md`](RusAndes%20Raw%20Website/CLAUDE.md)** for the full
site-editing guide: section map, design tokens, common edits, preview, and deploy steps.

- `RusAndes Raw Website/HANDOFF.md` — ownership, GitHub access, domain/DNS, Formspree.
- `RusAndes Raw Website/AGENTS.md` — the same editing guide, for Codex.

## Non-negotiables

1. **This repo is public.** Never commit secrets, tokens, or the private company-brain skill.
   `RusAndes-brain-for-Andres/` is gitignored — keep it that way.
2. **A push to `main` publishes to the live site immediately.** There is no staging.
   Preview locally first, and don't push unless the owner explicitly says to deploy.
3. `index.html`, `CNAME`, and `.nojekyll` must stay at the top level of `RusAndes Raw Website/`.

## Quick commands

```bash
npx serve -p 3456 "RusAndes Raw Website"   # local preview → http://localhost:3456
git add -A && git commit -m "..." && git push origin main   # deploy (~15-60s)
curl -sI -L https://rusandes.com | head -1                  # verify → HTTP/2 200
```
