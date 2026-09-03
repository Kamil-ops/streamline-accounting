---
name: mulberry-design
description: Mulberry's design system - typography, color, spacing, and component rules. Use whenever creating or modifying UI in this theme (new pages, sections, components) so the result matches Mulberry's visual language.
---

# Mulberry design system

Mulberry is an accounting / professional-services marketing theme with an
editorial, print-like feel: serif display type over a warm stone neutral
palette, flat tinted panels, a single terracotta accent, and no shadows
anywhere. New UI here should be indistinguishable from the existing pages.

## Design personality

- Editorial and trustworthy: serif headlines (EB Garamond), disciplined
  grids, hairline dividers instead of boxes.
- Warm and flat: warm-gray "stone" neutrals and soft `bg-base-50` panels do
  the separation work - there is not a single `shadow-*` class in `src`.
- One accent, used sparingly: terracotta (`accent-*`) appears on a highlight
  card, hover states, and the accent button - never as a section background.

## Typography

Two fonts, both set in `src/styles/global.css` under `@theme`:

- **EB Garamond** (`--font-display`, serif) for display type. `Text` does
  NOT add it automatically - every heading must add `font-display`
  explicitly in its class list.
- **Inter / InterVariable** (`--font-sans`) for everything else, with
  `tabular-nums` and `liga`/`calt` enabled on `:root`.

Never introduce another font.

Always use the `Text` component (`@/components/fundations/elements/Text.astro`)
instead of raw tags with ad-hoc sizes. Variants: `display6XL`-`displayXS`
and `textXL`-`textXS`. The house patterns:

- Page hero title: `tag="h1" variant="displayLG"` +
  `text-base-900 text-balance font-medium tracking-tight font-display`.
- Section heading: `tag="h2" variant="displayMD"` + the same class recipe.
- Card title: `tag="h3" variant="displaySM"` (big cards) or `textLG`
  (feature list items) + `font-display`, no tracking classes.
- Lead paragraph: `variant="textLG" class="text-base-900"`; body:
  `textBase` in `text-base-600` or `text-base-700`; supporting/meta copy:
  `textSM text-base-600`; uppercase labels: `textXS`/`textSM` +
  `uppercase font-medium`.

Display weight never exceeds `font-medium`. No `font-bold` headings; bold
is reserved for `prose` strong text.

## Color system

Only two scales exist, defined as oklch tokens in `src/styles/global.css`
`@theme`: the warm neutral `base` scale (stone, hue ~106) and the
terracotta `accent` scale (hue ~38), plus `--color-black`
(`oklch(0.145 0 0)`). Use only these - never default Tailwind palettes
(`gray`, `red`, `slate`...), never hex values in markup.

Usage rules (real counts from `src`, system pages excluded):

- `bg-white` and `bg-base-50` are the workhorses (32 uses each). Sections
  sit on white; grouped content sits in a flat `bg-base-50` panel with
  white cards inside.
- `bg-black` (7 uses) makes full-bleed statement panels (`MainCta`, split
  hero halves) with white text and a white `Shield` logo mark.
- Accent is rationed: `bg-accent-500` (6 uses) is for one highlight card
  per grid (see `ServicesPreview`), `text-accent-600` for hover states
  (`group-hover:text-accent-600` on card links), and the `accent` Button
  variant. Never tint a whole section with accent.
- Headings are `text-base-900` (occasionally `-950`); body `text-base-600`
  or `-700`; hairline rules `border-base-100`.
- There is **no dark mode**. Don't add `dark:` classes.

## Layout and spacing

- Every section is `<section>` wrapping a `Wrapper`
  (`@/components/fundations/containers/Wrapper.astro`): `standard`
  (max-w-7xl, `px-8`, `2xl:max-w-[100rem]`) for almost everything,
  `paddingLess` for full-bleed images and edge-to-edge split panels,
  `prose` for markdown bodies (it carries the whole typographic recipe,
  including serif prose headings and `first-letter:text-2xl`), `megamenu`
  for the nav.
- Section rhythm is `class="py-12"` on the Wrapper (32 occurrences), with
  `lg:py-24` for airier sections. The hero uses `pt-24` (the nav does not
  float).
- Tinted panels are `p-8 lg:p-12 bg-base-50` inside the Wrapper.
- The signature section header is a 5-column editorial split:
  `grid grid-cols-1 lg:grid-cols-5 gap-8 items-start` with the Kicker in
  column 1, the `h2` at `lg:col-span-2 lg:-mt-2`, and a two-paragraph stack
  (`textLG` lead + `textSM mt-4`) in the last `lg:col-span-2`. See
  `Stats1.astro` and `TestimonialsPreview.astro`.
- Vertical rhythm inside a section: Kicker to heading `mt-8`; heading to
  paragraph `mt-4` (tight pairs `mt-2`); header block to content grid
  `mt-12` (or `mt-12 lg:mt-24` for big sections).
- Grids: content grids use `gap-8`; card mosaics inside a `bg-base-50`
  panel use tight `gap-2` so the panel color reads as grout lines between
  white cards.
- Images are flat and full-bleed: `object-cover`, explicit
  `width`/`height`, no rounding, no shadow; hero art runs in a
  `paddingLess` Wrapper with `max-h-200 object-top`.

## Components

Reuse these before writing anything new:

- **Button** (`fundations/elements/Button.astro`): variants `default`
  (black / white text), `accent` (`accent-500`), `muted` (`base-50`),
  `mutedDark` (`base-900`, for use on black panels), `none`; sizes
  `xxs`-`xl`. **Radius is baked into the size** (`xxs` = `rounded-sm`,
  `xs`-`md` = `rounded-md`, `lg`/`xl` = `rounded-lg`) - never add your own
  `rounded-*`. Supports `isLink` + `href`, `iconOnly` (+ icon in the
  `icon` slot), and a `gap` prop for icon spacing.
  **Width is a per-call-site decision** - the component renders a
  block-level `flex` that stretches to its container: standalone CTAs get
  `w-fit`; pricing-card CTAs get `w-full mt-8`; paired CTAs on panels get
  `w-full lg:w-fit` (stacked on mobile, inline on desktop). Real sections
  almost always use `size="xs"` or `"sm"` - the larger sizes exist but are
  only showcased in `src/pages/system/`.
- **Text**: the only sanctioned type scale (see Typography).
- **Kicker** (`fundations/elements/Kicker.astro`): a plain uppercase
  `textSM font-medium` text label (not a chip): `default` = `text-base-600`
  on light, `dark` = `text-base-300` on black panels.
- **Wrapper**: the only page-width container. Don't hand-roll
  `max-w-* mx-auto` wrappers.
- **Uppercase micro-links**: cards use an uppercase `textSM font-medium`
  label ("Read further") with `group-hover:text-accent-600` and a
  stretched absolute-inset anchor, instead of buttons.
- Icons live in `fundations/icons/` as individual stroke-style Astro
  components (`ArrowRight`, `Check`, `Plus`, ...); add new ones there
  rather than importing icon packs. The `Shield` brand mark is in
  `components/assets/`.
- Interactive flourishes are dependency-free inline scripts (see the
  count-up `IntersectionObserver` in `Stats1.astro`).

## Corners, borders, shadows

- Radius belongs to the Button component only (its size map accounts for
  every `rounded-md`/`rounded-lg`/`rounded-sm` in `src` outside prose
  styles and one form checkbox). **Never round panels, cards, or images.**
- **Zero shadows**: `rg 'shadow'` over `src` returns nothing. Keep it that
  way - contrast between `bg-white`, `bg-base-50`, and `bg-black` is the
  only elevation cue.
- Dividers are hairlines: `border-t border-base-100` above stat labels,
  `lg:border-l border-base-100` between columns. No heavy borders, no
  rings around cards.

## Voice and copy

Copy is professional and reassuring, aimed at business owners: concrete
benefits ("Maximize profits, minimize complexity"), proof numbers ("500+
Happy Clients", "98% Client Satisfaction"), and plain-spoken service
descriptions. Headlines are declarative statements, never questions;
kickers and card labels use Title Case ("Proven Track Record"); no
exclamation marks, no emoji.

## Do / Don't

Do:

- Copy an existing section's structure (especially the 5-column editorial
  header) before inventing a new layout.
- Add `font-display` to every heading - the serif is the theme's identity.
- Use `text-balance` on headings and `max-w-xl`/`max-w-2xl` to keep hero
  line lengths short.
- Put white cards on `bg-base-50` panels with `gap-2` mosaics.

Don't:

- Don't add `shadow-*` or `rounded-*` to panels, cards, or images.
- Don't introduce new fonts, colors outside `@theme`, gradients, or
  `dark:` classes.
- Don't exceed `font-medium` on display type.
- Don't use default Tailwind `gray`/`slate`/`stone` classes - the neutral
  scale here is `base-*`.
- Don't use accent as a background outside a single highlight card or the
  `accent` Button variant.
- Don't inline a heading with raw classes when `Text` has a variant for it.

## Quality check before finishing

1. Fonts, colors, and spacing all come from existing tokens and match a
   sibling section; headings carry `font-display`.
2. New section reads correctly at `sm`, `md`, and `lg` breakpoints.
3. Headings use `Text` variants; buttons use `Button` variants with an
   explicit width decision (`w-fit`, `w-full`, or `w-full lg:w-fit`).
4. No new dependencies, no shadows, no stray rounded corners, minimal diff.
