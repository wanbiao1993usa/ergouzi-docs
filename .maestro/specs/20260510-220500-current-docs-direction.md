# Ergouzi Docs Current Direction Spec

## 1. Purpose

This file is the single active spec for the current docs rebuild.

It reflects the project as it exists now in code:

- the React + Vite foundation already exists
- the site is already moving to route-driven content structure
- the layout has already shifted toward a top-header, single-column reading experience
- the visual direction is now Neoblo / new brutalism, not the earlier soft product-site style

Archived specs remain as history only. They should not override this file.

## 2. Current Problem

The main problem is no longer "how to start the rebuild".

That part is already underway.

The real problem now is consistency:

1. content structure, layout structure, and visual language were previously written in separate specs
2. some of those specs still describe an older visual direction
3. if we keep multiple active specs, future page work will keep drifting

So the goal now is to reduce ambiguity, not to produce more planning files.

## 3. Stable Decisions

These decisions are considered current and valid.

### 3.1 Migration strategy

Use gradual migration.

- keep legacy files available as reference
- keep `assets/` reusable
- continue moving tutorial content into Markdown
- do not force a one-shot rewrite

### 3.2 Information architecture

The site is a tutorial entry product, not a raw documentation tree and not a marketing landing page.

The information hierarchy should stay:

1. homepage for routing and orientation
2. category pages for grouped discovery
3. article pages for complete tutorial steps

Homepage should answer:

- where should a new user start
- which route matches the user's scenario
- what is the fastest path for common setup tasks such as `CC Switch -> Codex`

Homepage should not become a long tutorial dump.

### 3.3 Routing boundary

Use route boundaries for real tutorial boundaries.

Examples:

- `/apps/cc-switch`
- `/apps/cherry-studio`
- `/api/openai-compatible`
- `/sdk/openai`

Use in-page switching only for local differences inside one tutorial, such as:

- platform differences like Windows vs macOS
- code language examples
- small model/provider variants inside the same flow

Do not use tabs to hide what should really be separate documents.

### 3.4 Layout boundary

The active layout direction is:

- top fixed header for global navigation
- single main reading column
- category navigation presented as lightweight in-page entry points
- no permanent left-side documentation shell as the primary layout

Reason:

- this project is tutorial-first
- screenshot-driven step content reads better in a focused main column
- mobile behavior is simpler and cleaner with top navigation

### 3.5 Visual direction

The active visual direction is Neoblo / new brutalism, based on the `.agents` skill reference.

This means:

- bold blocks instead of soft panels
- high-contrast borders and directional shadows
- clear section boundaries
- stronger homepage "entry page" feeling
- concise but expressive cards and buttons

This does **not** mean:

- going back to the older soft, low-contrast, glassy product-site style
- using decorative effects that weaken readability
- turning tutorial pages into marketing copy pages

Visual priority order:

1. readable tutorial flow
2. strong entry and category recognition
3. consistent Neoblo component language
4. motion only where it helps orientation

## 4. Current Code Alignment

The current codebase already reflects this direction in principle:

- `src/app/layout/AppLayout.tsx` uses top-header + main content composition
- `src/components/navigation/Header.tsx` and `SideNav.tsx` already implement top navigation
- `src/pages/home/HomePage.tsx` already treats the homepage as a route hub
- `src/styles/tokens.css` and `src/styles/layout.css` already lean toward Neoblo styling

So future work should refine this direction, not reopen the old left-sidebar-vs-header debate.

## 5. What To Keep Simple

At the current stage, do not expand complexity without proof of need.

Keep simple:

- one active spec
- route-driven content grouping
- markdown-first tutorial migration
- lightweight category pages
- focused article pages

Delay until truly needed:

- complex search system
- automated migration scripts
- heavy content management workflows
- parallel visual systems for different page types

## 6. Working Rule

When a future decision conflicts with archived specs, use this order:

1. current code reality
2. this current direction spec
3. archived specs as background only

If the direction changes again, update this file instead of creating another competing active spec.
