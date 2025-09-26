# Soccer Club Site (Static Starter)

A simple, modern static site powered by **HTML, CSS, and JavaScript**. Data lives in `/data/*.json` so you can update fixtures, league table, and news without touching markup.

## Quick start
1. Download and unzip this folder.
2. Open `index.html` in your browser (double‑click).
3. Edit JSON in `/data` to update content.
4. Replace images in `/images` with your own.

## Optional: Deploy
- Drag the folder into **Netlify Drop** or create a site on **Vercel**/**GitHub Pages**.

## Optional: Update from CSV using Python
- CSV → JSON converter: `csv_to_json.py`
- Example:
  ```bash
  python csv_to_json.py fixtures.csv data/fixtures.json --schema fixtures
  python csv_to_json.py table.csv    data/table.json    --schema table
  python csv_to_json.py news.csv     data/news.json     --schema news
  ```

## Customize
- Colors: edit `:root` variables in `style.css`.
- Club name/founded year: change in `script.js` (CLUB object).
- Form: update the `action` with your **Formspree** endpoint.

Enjoy! ⚽
