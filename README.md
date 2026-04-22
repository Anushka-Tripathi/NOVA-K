# Nova-K — Orbital Vacations

A luxury space tourism landing page featuring an animated star field, parallax hero, interactive flight schedule, seat map, and booking modal. Built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required.

---

## Project Structure

```
nova-k/
├── index.html      # Main page markup
├── nova-k.css      # All styles and design tokens
└── nova-k.js       # All interactivity and animations
```

---

## Features

### Visual & Animation
- **Animated star canvas** — procedurally generated twinkling stars with gold, teal, and white colour variants
- **Custom cursor** — dot + trailing ring that follows the pointer with a smooth lag effect
- **Nebula background** — subtle ambient blobs with CSS keyframe animation
- **Parallax hero** — Earth planet and spacecraft move at different scroll rates; the spacecraft also rotates slightly on scroll
- **Scroll reveal** — sections and cards fade/slide into view using `IntersectionObserver`
- **Experience card spotlight** — each card tracks the mouse position to render a radial highlight at the cursor

### Navigation
- Sticky navbar that gains a glass-morphism backdrop on scroll
- Mobile fullscreen hamburger menu with ARIA state management (`aria-expanded`, `aria-hidden`)
- Smooth scroll to anchor sections for all internal links

### Destinations
- Tab switcher for **Earth Orbit**, **The Moon**, and **Mars** destination panels
- Each panel shows mission details, pricing, and a "Reserve" CTA

### Flight Schedule
- Six pre-loaded flights across three destination categories
- Filter buttons (`All`, `Orbit`, `Moon`, `Mars`) dynamically re-render the table
- Each row shows: flight ID, destination, departure date, duration, cabin class, price, and a seat availability progress bar (turns red when ≤ 2 seats remain)

### Seat Map
- Three cabin sections: **First Class** (2-row, 2+2), **Business** (4-row, 3+3), **Economy Plus** (5-row, 3+3+3)
- Pre-booked seats rendered as non-interactive; available seats toggle a selected state on click
- Sidebar panel updates in real time: selected seat ID, class, and price
- Proceed button is disabled until a seat is selected

### Booking Modal
- Opens from flight table Reserve buttons, seat map Proceed button, or the footer "Talk to an Advisor" link
- Auto-selects the correct destination in the dropdown based on context
- Validates name and email before confirming; on success, replaces form content with a confirmation message
- Closes on backdrop click or `Escape` key; body scroll is locked while open

### Launch Countdown
- Live countdown to the first scheduled flight (`NK-EO-2607`, 26 July 2026 06:00 UTC), updating every second

### Footer
- Newsletter signup field
- FAA Licensed / ISO 9001 / IATA Member badges
- Social links (X, LinkedIn, Instagram, YouTube)

---

## Design Tokens

All visual constants are defined as CSS custom properties in `:root` inside `nova-k.css`:

| Token group | Examples |
|---|---|
| Palette | `--void`, `--deep` |
| Gold system | `--gold`, `--gold-light`, `--gold-glow` |
| Teal system | `--teal`, `--teal-dim`, `--teal-glow` |
| Accent colours | `--blue`, `--mars`, `--moon` |
| Glass system | `--glass-bg`, `--glass-blur`, `--glass-border` |
| Typography | `--font-d` (Cormorant Garamond), `--font-u` (Outfit) |
| Layout | `--nav-h`, `--max-w`, `--r`, `--ease` |

---

## Typography

Loaded from Google Fonts:

- **Cormorant Garamond** — display headings (weights 300, 400, 600, 700 + italic variants)
- **Outfit** — UI text (weights 200–600)

---

## SEO & Metadata

`index.html` includes:
- Primary meta tags (`description`, `keywords`, `robots`)
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data (`TravelAgency` schema) for search engines

---

## Getting Started

No build step needed. Just open `index.html` in a browser, or serve the folder with any static file server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

All three files must be in the same directory.

---

## Browser Support

Uses standard modern APIs (`IntersectionObserver`, `requestAnimationFrame`, CSS custom properties, `backdrop-filter`). Targets evergreen browsers (Chrome, Firefox, Safari, Edge).

---

## Pricing Reference

| Destination | Cabin | Starting Price |
|---|---|---|
| Earth Orbit | Economy Plus | $180,000 |
| Earth Orbit | First Class | $240,000 |
| The Moon | Business | $1,400,000 |
| The Moon | First Class | $1,800,000 |
| Mars | First Class | $12,000,000 |
| Titan | — | Enquire |

Booking requires a **$10,000 refundable deposit**. All voyages subject to FAA mission clearance.

---

## License

© 2026 Nova-K Space Tourism Inc. All rights reserved.
