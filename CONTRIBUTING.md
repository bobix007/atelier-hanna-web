# Contributing — Atelier Hanna website

Static site (plain HTML / CSS / vanilla JS — **no framework, no build step**), deployed by Cloudflare Pages from this repository. Read this once before your first push; the two things people break most often are the **English translations** (§5) and the **cache-buster** (§6).

---

## 1. Workflow — never push to `main`

`main` **deploys straight to the live website** (atelierhanna.com) within ~1 minute. So:

1. Create a branch for your work:
   ```bash
   git checkout -b content/your-topic
   ```
2. Push it. Cloudflare automatically builds a **live preview URL** for every branch
   (visible in the GitHub PR checks, or in the Cloudflare Pages → Deployments tab).
3. Open a **pull request**. Review happens on the preview URL.
4. The owner merges into `main` → the live site updates automatically.

Direct pushes to `main` are not technically blocked — please just don't.

## 2. Repository map

```
index.html                 Homepage
maison/ savoir-faire/ processus/ private-label/
expertise/ creations/ journal/ contact/      → one folder per page (index.html inside)
assets/css/style.css       All styling (design tokens at the top in :root)
assets/js/main.js          All interactions + the FR→EN translation dictionary
assets/img/                Photos, logo, posters
assets/video/              Background videos (muted mp4 loops)
_headers / _redirects      Cloudflare config — don't touch without asking
functions/api/contact.js   Contact-form email function (inactive until a key is configured)
```

## 3. Adding images

- Put them in `assets/img/`, named in **semantic kebab-case French** like the existing ones
  (`bague-finie.jpg`, `sertissage-etau.jpg`), never `IMG_1234.jpg`.
- **Compress for web**: max 1600 px on the long side, JPEG quality ~70–75, target **under 300 KB**.
  On macOS: `sips -Z 1600 --setProperty formatOptions 72 in.jpg --out out.jpg`
- Never commit RAW files or original camera exports.
- In HTML, images live inside the site's framed figure pattern (gold inset border + grain come free):

  ```html
  <div class="ph t-velours"><img class="real" src="/assets/img/your-photo.jpg"
       alt="Short French description" loading="lazy"></div>
  ```
  Keep `loading="lazy"` (except above-the-fold) and write the `alt` in French.

### Gallery item (Créations page)

```html
<figure class="h-m" data-cat="bagues" data-reveal>
  <div class="ph t-velours"><img class="real" src="/assets/img/your-photo.jpg" alt="…" loading="lazy"></div>
  <figcaption>Caption in French · materials</figcaption>
</figure>
```
`h-s` / `h-m` / `h-l` sets the tile height; `data-cat` is one of
`bagues | bracelets | boucles` (used by the filter buttons). Adding a new category
(e.g. `colliers`) also needs its `<button data-filter="…">` in the `.filters` bar.
**The caption needs an English entry in the dictionary — see §5.**

## 4. Adding videos

Hard limits: Cloudflare Pages refuses files **over 25 MiB** (and 20,000 files total). But aim much lower:

- Target **2–5 MB** per clip. The current hero video is 2 MB for 18 s.
- Format: **mp4 / H.264, no audio track**, 810–1080 px wide is plenty.
- Trim off any title cards so the loop is seamless, and extract a poster frame.
- Example (ffmpeg):
  ```bash
  ffmpeg -i source.mp4 -t 15 -vf "scale=1080:-2" -c:v libx264 -crf 31 -preset slow -an -movflags +faststart out.mp4
  ffmpeg -ss 5 -i out.mp4 -frames:v 1 -q:v 4 poster.jpg
  ```
- Embed pattern (autoplay requires `muted` + `playsinline`):
  ```html
  <video autoplay muted loop playsinline preload="metadata" poster="/assets/img/poster.jpg">
    <source src="/assets/video/clip.mp4" type="video/mp4">
  </video>
  ```
- Short animations further down a page (Savoir-faire gestes, Créations): use the
  **lazy** pattern — the video only downloads when it scrolls into view, plays while
  visible and pauses off-screen (handled by `main.js`):
  ```html
  <video class="real" data-lazy muted loop playsinline preload="none"
         poster="/assets/img/gestes/geste-09-sertissage.jpg" aria-label="French description">
    <source data-src="/assets/video/gestes/geste-09-sertissage.mp4" type="video/mp4">
  </video>
  ```
  The `aria-label` needs an English entry in the dictionary (§5).
- Long videos (> 5 s, autoplay): add `data-pausable` on the `<video>` — `main.js` adds a
  play/pause button (accessibility requirement).
- Anything genuinely large (full films): host externally and embed; don't commit it.

## 5. ⚠️ Translations — every new text needs a dictionary entry

The site is bilingual via the FR/EN toggle. **French text in the HTML is the source of truth**; English comes from the `DICT` object in [assets/js/main.js](assets/js/main.js).

When you add or change ANY visible text (headings, paragraphs, captions, buttons, form labels):

1. Open `assets/js/main.js`, find `var DICT = {`.
2. Add a line: `"Your exact French text": "Your English translation",`
3. The key must match the rendered text **exactly** (accents, punctuation like `«` `»` `—` `·`),
   except whitespace: `&nbsp;` and line breaks count as single spaces in the key.
4. Text split by inline tags (`<br>`, `<strong>`, `<em>`) produces **separate keys** for each fragment.
5. New pages also need their `<title>` added to the `TITLES` object.

**Test it**: open the page, click `EN` in the header. Anything still in French is missing from the dictionary.

## 6. ⚠️ Cache-buster — when you touch `style.css` or `main.js`

Every page references `style.css?v=N` and `main.js?v=N`. If you edit **either file**, bump the version in **all 12 HTML files**, or visitors keep their cached copy. Check the current number, then replace it everywhere (example: 8 → 9):

```bash
grep -o 'v=[0-9]*' index.html | sort -u
grep -rl 'style.css?v=8' --include='*.html' . | xargs sed -i '' 's/style.css?v=8/style.css?v=9/; s/main.js?v=8/main.js?v=9/'
```

Editing HTML or adding images/videos does **not** require a bump.

## 7. Testing locally

The site uses root-absolute paths (`/assets/…`), so opening files directly (`file://`) shows a broken page. Serve it:

```bash
python3 -m http.server 4321
# → http://localhost:4321
```

## 8. Don'ts

- No frameworks, bundlers, npm, or build steps — the repo deploys as-is.
- Don't edit `_headers`, `_redirects`, or `functions/` without asking
  (in particular: never add `immutable` caching — unversioned filenames freeze for a year).
- Don't commit secrets of any kind. The repo has none; keep it that way.
- Don't rename `assets/css/style.css` / `assets/js/main.js` (referenced everywhere).
- Design system (colors, type, spacing) lives in `:root` at the top of `style.css` —
  use the existing CSS variables and classes; don't introduce new colors or fonts.
