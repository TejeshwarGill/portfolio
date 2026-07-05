# Tejeshwar Singh Gill — Personal Website

Personal portfolio built with [Gatsby](https://www.gatsbyjs.com/). The design is
adapted from [Brittany Chiang's v4](https://github.com/bchiang7/v4) (MIT licensed).

## Run locally

This project uses an older Gatsby (v3). The `--openssl-legacy-provider` flag that
modern Node needs is already baked into the npm scripts, so the commands just work:

```bash
npm install --legacy-peer-deps
npm run develop   # dev server at http://localhost:8000
npm run build     # production build into public/
npm run serve     # serve the built site
```

If port 8000 is already in use, either stop the other process
(`lsof -ti :8000 | xargs kill`) or run `npm run develop -- -p 8001`.

## Where the content lives

| Section | File(s) |
| --- | --- |
| Name / tagline / intro | `src/components/sections/hero.js` |
| About + bio | `src/components/sections/about.js` |
| Experience | `content/jobs/*/index.md` |
| Featured Work | `content/featured/*/index.md` (+ `cover.png`) |
| Speaking & Thought Leadership | `content/mentorship/*/index.md` (+ `cover.png`) |
| Education & Certifications | `content/education/*/index.md` |
| Other Noteworthy Projects | `content/projects/*.md` |
| Email, social links, nav | `src/config.js` |
| Site title / SEO / domain | `gatsby-config.js` |

## Placeholders to replace

These were generated automatically and should be swapped for real assets:

- **`src/images/me.png`** — your headshot (currently a solid placeholder).
- **`content/featured/*/cover.png`** and **`content/mentorship/*/cover.png`** —
  cover images for each Featured Work / Speaking card.
- **`src/images/logo.png`** and **`src/images/favicons/`** — favicon/app icons
  (still the original template branding).
- **`static/demo.png`** — the social/OG share image.
- **`static/resume.pdf`** — currently your resume; update when it changes.
- **`gatsby-config.js`** — set `siteUrl` to your real domain. To re-enable
  Google Analytics, install `gatsby-plugin-google-analytics` and add a block
  with your own `trackingId`.
- **`src/components/head.js`** — add your Google Search Console verification
  token if you want one.
