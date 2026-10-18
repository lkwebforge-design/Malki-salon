# Malki Bridal & Beauty — website concept
Website concept by WebForge Signature. Demonstration only; not yet approved or operated by the salon.

Static site (HTML, CSS, JavaScript). No build step, no dependencies.

## Run locally
    python3 -m http.server 8000     # then open http://localhost:8000

## Edit content
- `js/content.js` — business details, bridal looks, services (add `price:` per item once confirmed), gallery images and categories.
- `index.html` — headings and body copy (the About paragraph is marked EDITABLE).
- `css/styles.css` — design tokens (colours, fonts, spacing) in `:root`.

## Replace the temporary images
Placeholders live in `assets/img/` (SVG). Drop authorised photographs in (JPG/WebP, ~1600px wide), then update the `src` paths in `js/content.js` and the `<img>` tags in `index.html` (hero, intro, philosophy, about). Update each `alt` to describe the real photo.

## WhatsApp enquiry
The form builds a prefilled message to https://wa.me/94772780838 and opens it; nothing is sent until the visitor presses send in WhatsApp. No backend, prices, hours, email or social links are invented.

## Deploy to GitHub Pages
All paths are relative, so it works at `https://<user>.github.io/<repo>/`.
1. Push these files to the repository root (branch `main`).
2. Repo Settings > Pages > Deploy from a branch > `main` / root.
3. Before launch: add the real domain to the canonical tag, add `og:image`/`og:url` in `index.html`.

## Colour note
Buttons and small text use a deeper rose (`--rose-deep #9C5C66`) so contrast passes WCAG AA; the proposed dusty rose `#B87980` is used for decorative accents.
