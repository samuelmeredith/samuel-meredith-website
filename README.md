# Handoff — Samuel Meredith · Web Designer Site

## Overview

Five-page personal-brand website for **Samuel Meredith** — a freelance web designer based on the Central Coast, NSW (Australia). The site targets local small businesses, tradies, and personal brands.

**Pages:** Home · Services · Portfolio · About · Contact
**Tone:** Relaxed, professional, kind — high-end freelancer, not agency.
**Aesthetic:** Warm editorial — magazine-quality, asymmetric, type-driven.

---

## About the Design Files

The files in this bundle are **design references created in static HTML/CSS/vanilla JS** — prototypes showing intended look and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, Astro, SvelteKit, Next.js, WordPress theme, SwiftUI, etc.) using its established patterns, libraries, and conventions. If no environment exists yet, pick the right framework for the project — for a marketing site like this, **Astro** or **Next.js (static export)** is recommended (fast, SEO-friendly, easy to host).

The HTML files **can be opened directly in a browser** for reference. Start with `Home.html`.

---

## Fidelity

**High-fidelity (hi-fi).** Final colors, typography, spacing, layouts, and interactions are all locked in. Recreate pixel-perfectly using the codebase's existing libraries and patterns. The placeholder portfolio screenshots (`pf-browser__chrome` wireframes) **must be replaced** with real client screenshots when those become available — the markup pattern is documented below so swapping in `<img>` tags is straightforward.

---

## Tech Stack Used in the Prototype

- Pure HTML / CSS / vanilla JS — no build step.
- Google Fonts: **DM Serif Display** (display serif, italic + roman) and **DM Sans** (body sans, weights 300/400/500/600).
- One shared photo asset: `images/samuel-hero.jpg` (Samuel sitting on stone steps in Matera — supplied by client).
- Shared chrome (nav + footer + buttons + reveal animation + page header + CTA band) lives in `styles/site.css`; shared JS (nav scroll state + IntersectionObserver reveal) lives in `styles/site.js`.
- `Home.html` has its own inline styles for now because it was built first; the other four pages all pull from `styles/site.css`.

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#FAF7F2` | Primary background — dominant surface |
| `--cream-2` | `#F2EDE6` | Secondary background — alternating sections |
| `--ink` | `#1C1814` | Primary text — warm near-black |
| `--ink-soft` | `#423A30` | Secondary text — muted warm |
| `--choco` | `#2C1F14` | Dark sections (CTA band, name band) |
| `--choco-deep` | `#1A1209` | Hero background, footer |
| `--terra` | `#C4622D` | Primary accent — terracotta, used sparingly |
| `--terra-hover` | `#A8521F` | Terra hover/active state |
| `--sand` | `#C9B99A` | Warm taupe — eyebrow text on dark, dividers |
| `--rule` | `rgba(28,24,20,0.18)` | 1px rule lines on cream surfaces |
| `--rule-cream` | `rgba(250,247,242,0.22)` | 1px rule lines on dark surfaces |

**Rule:** No cool greys, no blues, no purple. Every tone has a warm undertone. Selection highlight is `--terra` on `--cream`.

### Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display | **DM Serif Display** | 400 | Hero headlines, section titles, name band, large editorial moments. Includes italic at weight 400. |
| Body & UI | **DM Sans** | 300 / 400 / 500 / 600 | Body copy, captions, eyebrows, buttons, UI labels |
| Mono | JetBrains Mono / Courier (system) | — | Browser-chrome URLs in the Portfolio mocks only |

**The signature typographic move:** mix italic serif + uppercase sans + roman serif in the same headline. Example:

```html
<h1>
  <span class="italic">websites that work</span>
  <span class="caps">AS HARD AS</span>
  <span class="caps" style="color:var(--terra)">YOU DO.</span>
</h1>
```

CSS pattern:
```css
.headline .italic { font-style: italic; font-weight: 400; }
.headline .caps {
  font-family: var(--sans);      /* DM Sans */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.005em;
  font-size: 0.78em;             /* slightly smaller than the serif baseline */
}
```

**Scale:** Headlines are large and unapologetic — `clamp(48px, 6vw, 124px)` for hero, `clamp(40px, 5vw, 84px)` for section titles, never scale them down. Body stays small and light (15–17px) — the contrast is intentional.

### Spacing

| Token | Value | Usage |
|---|---|---|
| Section padding (vertical) | `120px–140px` | Standard section spacing |
| Section padding (mobile) | `60px–80px` | Same sections at < 760px |
| `.wrap` container | `max-width: 1440px; padding: 0 56px` | All content. Mobile: `padding: 0 24px` |
| Grid gaps | `40px` (mobile) → `80px` (desktop) | Editorial breathing room |

### Border radius

- Buttons: `6–7px`
- Images, cards, image frames: **0** (sharp corners)
- Form inputs: **0** (underline-only, no boxed inputs)
- Round indicators (dots, toggle circles): `50%`

### Rules / dividers

- Thin 1px horizontal rules in `--rule` between service items and value items.
- Section borders are 1px rules; **no decorative dividers**.
- **No shadows, no gradients.** (One exception: subtle scrim gradient over the hero photo placeholder — see Hero section.)

---

## Site Architecture

```
/
├── Home.html             — Hero, Who I Help, Services snapshot, Name band, About teaser, Final CTA
├── Services.html         — Page header, expandable services list (5), Custom Projects, Final CTA
├── Portfolio.html        — Page header, 6-card asymmetric grid, In-progress note, Final CTA
├── About.html            — Oversized opener, Story + portrait, Values list, Stack grid, Final CTA
├── Contact.html          — Dark hero, Editorial form, Client quote, Direct contact grid
├── styles/
│   ├── site.css          — Shared chrome: nav, footer, buttons, reveals, page header, CTA band
│   └── site.js           — Shared JS: nav scroll-state, reveal-on-scroll IntersectionObserver
├── images/
│   └── samuel-hero.jpg   — Client portrait, used on Home (hero + about teaser) and About (story)
└── source-brief/
    ├── design-brief.pdf  — Original design brief from the client
    └── website-copy.pdf  — Full website copy (all 5 pages)
```

---

## Global Components

### Navigation (`.nav`)

**Sticky top nav.** Two visual states:

1. **Over hero (transparent):** background transparent, text color matches hero — `cream` over dark hero (Home, Contact) OR `ink` over cream page headers (Services, Portfolio, About). The `on-light` class on `.nav` switches to the cream-page mode.
2. **Scrolled:** background becomes `--cream`, text becomes `--ink`, 1px bottom border in `--rule`, padding reduces from 22px to 14px vertically. Triggered by adding `.scrolled` when `window.scrollY > 60`.

**Structure (left → right):**
- **Wordmark:** `Samuel <em>Meredith</em>` — DM Serif Display 20px, the "Meredith" italic. `white-space: nowrap`.
- **Links:** Home · Services · Portfolio · About · Contact — DM Sans 12px, uppercase, letter-spacing 0.18em. Underline animates in on hover (transform: scaleX 0→1, left origin). Active page gets `.is-active` which forces opacity 1 and persistent underline.
- **CTA pill:** "Get in touch" — `padding 10px 18px`, `border-radius 6px`. Outline style over dark hero, solid terracotta when scrolled or on `on-light` pages.

At `< 920px` only the first 3 links show. At `< 620px` all links hide (a mobile menu would need to be added).

### Buttons (`.btn`)

Pattern: `padding: 16px 26px`, `border-radius: 7px`, `1px border`, `font: DM Sans 12px / 500 / uppercase / letter-spacing 0.2em`. All have a `.arrow` child that translates 4px on hover.

| Class | Default | Hover |
|---|---|---|
| `.btn--terra` | terra bg, cream text | terra-hover bg |
| `.btn--ink` | ink bg, cream text | choco bg |
| `.btn--outline-ink` | transparent, ink border + text | ink bg, cream text |
| `.btn--ghost` | transparent, cream border + text (for dark sections) | cream bg, choco text |
| `.btn--cream-ghost` | same as ghost — alias used on dark hero | |

### Page Header (`.pagehead`)

Used by Services, Portfolio, About (heavy variants), and as a base on Contact (dark variant). Structure:

```html
<header class="pagehead">
  <div class="wrap">
    <div class="pagehead__row">
      <div>
        <span class="eyebrow">— Services · 02 / 05</span>
      </div>
      <h1 class="pagehead__title">
        <span class="italic">Simple, honest</span>
        <span class="caps">services.</span>
        <br/>
        <span class="italic">No fluff.</span>
      </h1>
    </div>
    <!-- optional sub-row / metadata plate -->
  </div>
</header>
```

`grid-template-columns: 1fr 1.6fr` puts the eyebrow on the left, the giant title on the right, both bottom-aligned. Title scales `clamp(54px, 7vw, 116px)`.

### Final CTA Band (`.cta-band`)

The recurring chocolate-brown band that appears at the bottom of all four non-Home pages.

```html
<section class="cta-band">
  <div class="cta-band__corner">
    <span class="dot"></span>
    <span>Currently booking</span>
  </div>
  <div class="wrap">
    <div class="cta-band__grid">
      <div>
        <span class="eyebrow on-dark">— Final word</span>
        <h2 class="cta-band__title">Title<span class="italic">italic</span></h2>
      </div>
      <div>
        <p class="cta-band__body">...</p>
        <a class="btn btn--terra">CTA →</a>
        <div class="cta-band__direct">or email <a>hello@...</a></div>
      </div>
    </div>
  </div>
</section>
```

- Background `--choco`, text `--cream`, `padding: 130px 0 120px`.
- A small `.cta-band__corner` floats top-right with a terra dot + "Currently booking" label.
- `grid-template-columns: 1.4fr 1fr` — title left, body+CTA right.

### Footer (`.foot`)

Three-column grid (`1.4fr 1fr 1fr`) on `--choco-deep`. Brand name in `--cream` with italic "Meredith", muted sand-colored body. H4 column headers are terra `font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase`. Copyright row sits above a 1px top border in `--rule-cream`. Identical across all 5 pages.

### Reveal animation

`.reveal` class on any element fades + translates up 24px when scrolled into view (700ms ease). Driven by `IntersectionObserver` in `site.js`. Threshold 0.12, rootMargin `0 0 -40px 0`. Once visible, observer unsubscribes.

---

## Screens

### 01 · Home (`Home.html`)

**Purpose:** Establish the brand, communicate who Samuel helps, surface services, build trust, drive to contact.

**Sections, top to bottom:**

1. **Sticky nav** (transparent over dark hero, cream when scrolled).
2. **Dark cinematic hero** — split `1.05fr 1fr` grid: portrait photo (full-bleed left), content (right). Min-height `100vh`. Background `--choco-deep`. On mobile (`< 980px`) collapses to stacked: photo on top (`56vw` tall), content below.
   - **Top of content panel:** small terra dot + "Central Coast, NSW — Est. 2019" eyebrow.
   - **Headline:** `<h1>` mixing italic serif + uppercase sans + terra accent. Three lines: *"websites that work"* (italic), `AS HARD AS` (caps), `YOU DO.` (caps in terra). Size `clamp(54px, 7.6vw, 124px)`.
   - **Sub:** 17px DM Sans 300, color `#E8E0D2`, max-width 480px.
   - **CTA row:** ghost button "Let's talk about your project" + small underlined "See services" link in sand.
   - **Bottom row:** italic "— Issue 01 / Personal Brand" left, "Scroll ↓" right.
3. **Trust bar** — cream strip with locations in italic serif, separated by sand-colored dots: "Gosford · Terrigal · The Entrance · Woy Woy · Erina · Avoca".
4. **Who I Help** — 3-column ruled grid (1px rules between columns). Each column: italic numbered eyebrow ("— 01 /") in terra, then large display title with one italic word ("Tradies *&* Service Providers"), then 15px body in `--ink-soft`. Section opens with a lede paragraph in 22px DM Serif Display 300 weight, italic phrase "easy, affordable".
5. **Services snapshot** — line-list of 5 services (Landing Pages / Website Redesigns / SEO / Logo & Branding / Care Plans) with `+` expand. See `.svc` pattern below.
6. **Name Band** — full-width chocolate band with **SAMUEL** (left-aligned roman) on one line and ***Meredith*** (right-aligned italic, slight negative top margin so the two rows overlap by ~4%) on the next. Font-size `clamp(72px, 14.5vw, 240px)`. Below: 3-column meta row with "Currently / Based / Reply within" labels in sand + values in cream serif.
7. **About teaser** — asymmetric grid `0.85fr 1fr`. Portrait left (4:5 aspect ratio), with a smaller floating "detail" crop overlapping bottom-right (the floating crop uses the same photo with a different `background-position`). Copy right: kicker line + line-color terra, "A real *person,* not an *agency.*" headline, two short paragraphs, italic signature "— Samuel" + meta.
8. **Final CTA band** — chocolate band, "Ready to *get* STARTED?" + terra button. Same structure as the shared `.cta-band` but lives inline in Home.

**Hero portrait CSS:** uses `background-image: url('images/samuel-hero.jpg')`, `background-size: cover`, `background-position: 50% 28%` to keep Samuel's face in frame even at narrow widths.

### 02 · Services (`Services.html`)

**Purpose:** Detailed view of all 5 services with descriptions, inclusions, and pricing.

1. **Sticky nav** (`on-light` variant — ink text).
2. **Page header** with eyebrow "— Services · 02 / 05" + title "*Simple, honest* SERVICES. *No fluff.*"
3. **Pricing plate** (3-cell grid below the title): "Starting prices · From $99/mo to $1,200+" · "Typical turnaround · 1–3 weeks per project" · "How it works · Flat fees · no surprises".
4. **Trust strip** — single thin cream strip with italic line + bullets ("Quote in 24 hours · 1 business day reply · No upsells").
5. **Services list** (the centrepiece) — uses the `.svc` pattern from Home but **fuller content** in each expanded panel:
   - Row layout: grid `64px 1fr auto 56px` — italic number, big serif name (with mixed italic + uppercase), small caps price, circular `+` toggle.
   - Click any to expand. **First item open by default on this page** (Landing Pages).
   - Expanded panel layout: grid `64px 1fr 1fr` — italic terra aside label ("— Best for first sites"), 2-paragraph description, "What's included" list with em-dash bullets (the `::before` 12×1px terra rectangle).
   - Open state: toggle circle fills to ink with cream + icon, rotates +45° (becomes ×).
   - All 5 items: Landing Pages (from $699) · Website Redesigns (from $1,200) · Search Engine Optimisation (from $499) · Logo & Basic Branding (from $299) · Website Care Plans (from $99/month).
6. **Custom Projects** — light asymmetric block. "Need something *a bit different?*" title left, body copy + "Get a custom quote →" button right.
7. **Final CTA band** (shared `.cta-band`).
8. **Footer.**

### 03 · Portfolio (`Portfolio.html`)

**Purpose:** Show recent client projects.

1. **Sticky nav** (`on-light`).
2. **Page header** — "*Some* OF MY *work.*" — with a 3-cell metadata note below (Sectors · Stack · Recent).
3. **Portfolio intro** — `1.2fr 1fr` grid: left has a 36–64px serif subhead "I'm *always* building. Here's a look at some *recent* projects.", right has a right-aligned italic-serif tagline.
4. **Asymmetric 12-column project grid** (`.pf-grid`) — 6 cards, each placed manually with explicit `grid-column` and varying `margin-top` to create a staggered editorial feel:
   - Card 1 (Coast Electric, wide): `grid-column: 1 / 8`
   - Card 2 (Terrigal South Café, tall 4:5): `grid-column: 9 / 13; margin-top: 90px`
   - Card 3 (CC Plumbing): `grid-column: 2 / 7; margin-top: 30px`
   - Card 4 (Linden Studio Salon, square): `grid-column: 8 / 13`
   - Card 5 (Marley Parker Coach): `grid-column: 1 / 6; margin-top: 40px`
   - Card 6 (Heggie Build Co., wide): `grid-column: 7 / 13; margin-top: 80px`
   - Mobile (`< 860px`): all stack to single column.
   - Aspect ratios vary by class: default `4/3`, `.pf--tall` is `4/5`, `.pf--wide` is `16/10`, `.pf--square` is `1/1`.
5. **Each card** uses a **placeholder browser mock** in `.pf-media` until real screenshots arrive:
   - `.pf-browser` flexbox column inside the aspect-ratio frame.
   - `.pf-browser__chrome` (32px tall, `--cream-2` bg) with three traffic-light dots + a centred URL pill in monospace.
   - `.pf-browser__body` colored panel (per-project class like `.pf--electric`, `.pf--cafe`, etc. — each defines a `linear-gradient` background in the warm palette).
   - Inside the body: `.pf-sketch` — wireframe of the project's hero (small nav bits at top, headline + sub + faux button bar at center).
   - **TO REPLACE WITH REAL SCREENSHOTS:** swap the entire `.pf-browser` element with an `<img src="..." alt="...">` filling the same aspect-ratio frame. Keep the `.pf-media` wrapper (hover lifts -6px on parent hover).
6. **Below each card:** `.pf-meta` block — small caps tags row (`— 01 · Landing page · WordPress · SEO`), display-serif project name with one italic word, 2-sentence description, "View case study →" link with bottom border.
7. **In-progress note** — `.progress` section on `--cream-2`. Two-column row explaining that more work is done quietly for local clients.
8. **Final CTA band.**
9. **Footer.**

**Project content (placeholders, edit as needed):**
- Coast Electric (sparky landing page)
- Terrigal South (café redesign)
- CC Plumbing (emergency-services landing page)
- Linden Studio (salon brand + 5-page site)
- Marley Parker (coach personal brand)
- Heggie Build Co. (builder redesign)

### 04 · About (`About.html`)

**Purpose:** Tell Samuel's story, build personal trust.

1. **Sticky nav** (`on-light`).
2. **Oversized opener** — *"Hey,* I'm" on line 1 (italic serif + roman), `SAMUEL.` on line 2 (uppercase DM Sans, terra-colored full stop). Font-size `clamp(72px, 12vw, 200px)`. Below: a 2-column subhead block — left has the italic-mixed subhead "*Web designer.* Central Coast local. *Genuinely happy to help.*", right has a two-row meta block (Based · Practicing · Studio · Reply within).
3. **Story section** (`.story`) on `--cream-2`. Two-column `1fr 1.1fr`:
   - **Left column:** sticky portrait (4:5, sticky-top 110px so it scrolls alongside the prose). Small cream tag overlay top-left ("Samuel — *at home, Central Coast*").
   - **Right column:** large 28–40px serif lede ("I started building websites because I love the moment…"). Then 4 paragraphs of 17px body, including a serif **callout** ("I'm not the flashiest option out there…") with a 1px terra left border.
4. **How I work** (`.values`) — section on `--cream`. Heading "Four *things* I won't BUDGE ON." + italic-serif lede. Then a 4-item list:
   - `.values__list` border-top 1px ink, each `.value` grid `80px 1fr 2fr 60px` (number / name / desc / icon).
   - Each row has a terra italic number, large serif name with one italic, body copy with `<strong>` highlights, and a circular arrow icon (1px rule, ink-soft) that fills to ink-bg on hover.
   - Hover effect: row gains 12px left padding (sliding feel).
   - The four values: **Honest** (italic), **Clear**, **Local** (italic), **Affordable**.
5. **Stack section** (`.tools`) on `--cream-2`. Two-col `1fr 2.2fr` — left label "— Stack" + "What I *build with.*" title, right is a 3-column grid of 6 tools. Each tool has a 1px top rule, large serif name (with optional italic word), and a 14px ink-soft use-case caption. Tools listed: WordPress · Shopify · *Custom HTML* · Figma · Google *Search Console* · A *phone call.*
6. **Final CTA band.**
7. **Footer.**

### 05 · Contact (`Contact.html`)

**Purpose:** Drive the actual inbound — primary form, secondary email path.

1. **Sticky nav** (default — transparent over dark hero, becomes cream on scroll). Note this is the **only inner page** that uses the default dark-hero nav variant rather than `on-light`.
2. **Dark hero band** (`.c-hero`) on `--choco-deep`.
   - **Eyebrow row:** "— Contact · 05 / 05" (sand) and italic "Currently booking — Q3 / 2025" (cream).
   - **Title:** *"Let's"* (italic) on line 1, `TALK.` (uppercase, terra dot) on line 2. Size `clamp(80px, 13vw, 220px)`.
   - **Bottom row:** 3-col `1.4fr 1fr 1fr` — large serif sub with strong/italic accents on left, two compact meta blocks (Response time, Location) on right.
3. **Form section** (`.form-section`) on `--cream`.
   - Header: two-col `1.1fr 1fr` — "The *whole thing,* on ONE FORM." title left, italic-serif guide right.
   - **The form itself uses an editorial underline pattern** rather than boxed inputs:
     - `<form>` is a 12-col grid with `gap: 30px 28px`.
     - Each `.field` has a `.field__label` row (number + label + optional/required tag) above an input.
     - Inputs are background `transparent`, `border: none`, `border-bottom: 1px solid var(--rule)`, padding `8px 0 14px`, font `DM Serif Display 22px`. Focus shifts the border-bottom to `--ink`.
     - Textarea uses DM Sans 18px with `min-height: 140px` and a 14px top/bottom padding inside the underline.
     - Selects use the same underline + a custom CSS arrow drawn with two rotated 1.5px borders, positioned at right 6px bottom 22px.
   - **Field grid:**
     - Row 1 — Name (6 col) · Email (6 col)
     - Row 2 — Phone (4 col, optional) · Project type select (4 col) · Budget select (4 col)
     - Row 3 — Message textarea (12 col)
     - Foot — `1px var(--rule)` top border, italic note left ("I'll reply within 1 business day — usually faster."), ink submit button right.
   - **Submit:** `.submit` button — ink bg, cream text, `padding 18px 32px`, `border-radius 7px`. On form submit, the JS prevents default and replaces the button text with "Sent — talk soon →" (placeholder behaviour; replace with real form handler).
4. **Aside quote** — centered serif client-quote block on `--cream`.
5. **Direct contact** (`.direct`) on `--cream-2`. 3-cell ruled grid:
   - **Email** — `hello@samuelmeredith.com.au` (linkified, bottom border).
   - **Location** — *Central Coast,* NSW.
   - **Response time** — Usually *within 1* business day.
6. **Footer.**

---

## Interactions & Behavior

### Nav scroll-state
- Listener: `window.scroll` (passive).
- Adds `.scrolled` class to `#nav` when `scrollY > 60`.
- CSS transitions: `background 240ms ease, padding 240ms ease, border-color 240ms ease, color 240ms ease`.

### Reveal-on-scroll
- `IntersectionObserver` with `threshold: 0.12, rootMargin: '0px 0px -40px 0px'`.
- Elements with `.reveal` start at `opacity: 0; transform: translateY(24px)`.
- On intersect → add `.in` → CSS transitions to visible (`opacity 700ms, transform 700ms`).
- Observer unsubscribes after first reveal.
- Graceful fallback for non-IO browsers: all `.reveal` elements get `.in` immediately.

### Services accordion (`.svc`)
- Single-open on Home (`Home.html`'s embedded list closes siblings when one opens).
- Multi-open allowed on Services page; first item open by default.
- Implementation: `max-height` transition (CSS) from 0 to `panel.scrollHeight` set inline; on close, set back to `0px`.
- Transition: `max-height 380ms ease` (420ms on Services page).
- Toggle circle: `+` rotates 45° to become `×` when expanded; background fills to `--ink`.

### Hover states
- Button: `arrow` element translates `+4px` on hover. Backgrounds transition 220ms.
- Nav links: underline scales `0→1` from the left (220ms ease).
- Service rows: text color shifts to `--terra`.
- Portfolio cards: lift `-6px` on hover, border darkens from `--rule` to `--ink`.
- Value rows: gain 12px left padding (slide-in feel).
- Direct-contact email link: underline + text both shift to terra.

### Form submission
- Currently `event.preventDefault()` and a text-replace on the submit button — **placeholder only**.
- Recreate with the codebase's form pattern (server action, fetch, Formspree, etc.).
- Validate: name and email required; phone optional; selects optional; message optional but recommended.

### Responsive breakpoints used in the prototype

| Breakpoint | Effect |
|---|---|
| `< 980px` | Home hero collapses to stacked (photo on top, content below) |
| `< 940px` | About teaser + Story grids collapse to single column |
| `< 920px` | Nav links gap shrinks; links 4+ hide |
| `< 860px` | Most 2-col content grids collapse to 1 col |
| `< 760px` | `.wrap` padding goes 56px → 24px; many 3-col grids collapse |
| `< 620px` | Nav links hide entirely (mobile menu needed) |
| `< 560px` | Footer collapses to single column |

A proper mobile menu / drawer was **not built** — that's a known gap for implementation.

---

## State Management

For a static marketing site there's almost none, but if you build with a framework:

- **Active nav state** — currently hardcoded via `class="is-active"` per file. In a router-driven SPA, compute from `useRouter()` / `usePathname()`.
- **Accordion open state** — derive from a `useState<number | null>` on Services. Use a ref + `getBoundingClientRect` or CSS `grid-template-rows: 0fr / 1fr` for the smooth height transition (better than `max-height` in modern browsers).
- **Form submission** — needs real handler. Replace inline `onsubmit` with a proper async handler + success / error UI states.
- **Scroll-state nav** — same pattern (IntersectionObserver on a sentinel `<div>` near the top works better than scroll listeners in framework code).

---

## Assets

- **`images/samuel-hero.jpg`** — Samuel's portrait, supplied by client. Used as background-image on:
  - Home hero portrait (left half, `background-position: 50% 28%`)
  - Home about-teaser portrait (4:5, same position)
  - Home about-teaser floating detail crop (3:4, `background-position: 56% 70%` for a tighter crop)
  - About story portrait (sticky, 4:5, `50% 28%`)

  **More photos needed:** the design contemplates additional editorial photos (workspace details, the Central Coast environment, hands at a keyboard, etc.). When more are supplied, swap the duplicated `samuel-hero.jpg` usages for variety.

- **Portfolio screenshots** — currently all six are CSS-drawn browser-mock wireframes. **Must be replaced** with real client screenshots. Aspect ratios per card are set on `.pf-media` — match them when sizing images.

- **Fonts** — loaded from Google Fonts CDN via `<link>` tags in each HTML head. In production, prefer self-hosting (download from Google Fonts, host alongside the build, use `font-display: swap`).

---

## Brand Identity

- **Name:** Samuel Meredith — Web Designer
- **Tagline:** *"websites that work as hard as you do"*
- **Email:** hello@samuelmeredith.com.au
- **Location:** Central Coast, NSW (Australia)
- **Service area:** Gosford · Terrigal · The Entrance · Woy Woy · Erina · Avoca

---

## Files in this handoff

```
design_handoff_samuel_meredith_website/
├── README.md                  — this file
├── Home.html                  — Home page (inline styles, ~1240 lines)
├── Services.html              — Services page (uses styles/site.css)
├── Portfolio.html             — Portfolio page (uses styles/site.css)
├── About.html                 — About page (uses styles/site.css)
├── Contact.html               — Contact page (uses styles/site.css)
├── styles/
│   ├── site.css               — Shared chrome (nav, footer, buttons, page header, CTA band)
│   └── site.js                — Shared JS (nav scroll, reveal observer)
├── images/
│   └── samuel-hero.jpg        — Client portrait
└── source-brief/
    ├── design-brief.pdf       — Original written brief
    └── website-copy.pdf       — Full copy for all 5 pages
```

---

## Known gaps to address in implementation

1. **Mobile nav** — below 620px the nav links hide entirely with no fallback. Add a hamburger / drawer.
2. **Form handler** — submission is a placeholder. Wire to a real backend (Formspree, Netlify Forms, server action, etc.).
3. **Portfolio screenshots** — browser-mock placeholders need to be replaced with real images.
4. **Additional photography** — the design uses a single photo across multiple slots. Variety would strengthen the site.
5. **Home.html still has inline styles.** When porting to a framework, fold its styles into the shared system the same way Services/Portfolio/About/Contact already do.
6. **SEO meta** — the `<title>` and `<meta description>` are set per page, but no Open Graph / Twitter card tags, no JSON-LD structured data, no sitemap. Add these.
7. **Accessibility audit** — color contrasts have been kept conservative (warm-on-warm at 4.5:1+ for body, but headlines on cream pass AA at large sizes). Verify with axe / Lighthouse before launch. Form labels are properly associated; the accordion `aria-expanded` is set; the menu button on Contact has no aria yet.
8. **Favicons** — none included.

---

## Implementation recommendations

- **Framework choice:** Astro (preferred — content-driven, MDX support, ships zero JS by default) or Next.js with static export. For a WordPress build, the team can recreate this as a block theme.
- **CSS approach:** Keep `:root` custom properties as the single source of truth for tokens. Tailwind would work but you'd need to register the custom palette and disable the default neutrals so the warm tones don't compete.
- **Don't change:** the type pairing (DM Serif Display + DM Sans), the palette tokens, the italic + uppercase + roman headline pattern, or the no-shadows / no-gradients rule.
- **Feel free to change:** the placeholder portfolio mocks, the placeholder client quote on Contact, and any of the copy that needs adjusting based on real client feedback.

— End of handoff.
