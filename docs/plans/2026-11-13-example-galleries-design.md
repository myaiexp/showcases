# Example galleries — repo pattern design

Date: 2026-11-13. Step one of the showcases rebuild (brief from Mase, via Helm). Revised
after one spec review.

## Goal

Turn the showcases repo from 15 hand-written single-page demos into a gallery of
**packages**, each holding its **own gallery of many examples** (hundreds for rich
libraries such as anime.js). Weighted toward visual and newer libraries; anything goes.

Hard requirements from the brief:

1. **Pure examples.** A package's examples are built only from that package's official
   documentation, vendored into the repo — never from other people's examples.
2. **Vendored docs per package**, which builders read instead of the web.
3. **A place for comparisons**: a later phase sets our examples beside notable community
   examples, with source links. Comparisons never feed back into the examples.

Plus repo par (`~/.helm/kelo-repo-par.md`) adapted to a static site: strict TS + Vite,
pnpm, vitest, base.css, CLAUDE.md as a map with depth in `docs/`, one-line file headers,
≤300 lines per file, Forgejo `origin` on `master`.

## Hosting and git

`origin` is Forgejo (`mase/showcases`), `github` is the GitHub remote, branch `master` on
both (GitHub's `main` is renamed). `deploy` pushes both. A GitHub Actions workflow on
`master` type-checks, tests, builds and publishes Pages; the Pages source switches from
"branch" to "GitHub Actions". `base: './'` + hash routing means the build works under any
subpath (Pages today, a `mase.fi/showcases/` copy later if wanted) with no rewrites.

## Architecture

One Vite single-page app with hash routes:

| Hash | View |
|---|---|
| `#/` | Home — package cards: name, tagline, category, example count; filter by category, sort newest / name / most examples |
| `#/<pkg>` | Package gallery — examples grouped by docs section, each card a live preview mounted while on screen |
| `#/<pkg>/<example>` | Example view — full-size mount, summary, the docs pages it was built from, and its source files |

One SPA, not a page per example: thousands of HTML entries would be unmanageable, and
lazy `import.meta.glob` already gives one chunk per example.

### Layout

```
index.html                         the one HTML entry
src/                               app shell: router, registry, views, preview host, styles
packages/<pkg>/
  package.ts                       definePackage({...}) — metadata, docs-section order
  docs/
    SOURCE.json                    where the official docs come from (hand-written)
    MANIFEST.json                  what vendoring fetched (generated, always tracked)
    ...                            vendored docs as markdown
  examples/<example>/
    meta.ts                        defineMeta({...}) — imports only types
    main.ts                        export default mount — the running code
    *.ts, style.css                optional helpers and scoped styles
  comparisons/<entry>.ts           defineComparison({...}) — one community example each
scripts/                           vendor-docs, new-package, new-example
```

Slugs come from directory names (`<pkg>`, `<example>`), kebab-case, and are permanent
once published: URLs and comparison `ours` lists point at them.

### Contracts (`src/types.ts`)

```ts
definePackage({
  name: 'anime.js', npm: 'animejs', tagline, category: 'Animation',
  homepage: 'https://animejs.com', docsUrl, repo: 'https://github.com/juliangarnier/anime',
  added: '2026-11-13',
  sections: ['Timer', 'Animation', 'Timeline', …],   // docs order; examples group by these
})

defineMeta({
  title, summary, section: 'Stagger', tags: ['grid'],
  docs: ['pages/stagger.md'],     // provenance: files in this package's MANIFEST
  provenance: 'pure',             // 'pure' | 'legacy'
  added: '2026-11-13',
  audio?: true,                   // preview shows a static card, never mounts
})

// main.ts
export default function mount(el: HTMLElement, ctx: MountContext): Cleanup | Promise<Cleanup>
// MountContext = { preview: boolean; signal: AbortSignal }
```

- `mount` builds into `el` and returns a cleanup stopping timers, loops, audio and
  listeners. It may be async; the host passes an `AbortSignal` that fires on unmount and
  runs the cleanup if the mount resolves after it.
- Metadata lives in `meta.ts`, apart from `mount`, so listing a package never loads an
  example's code or its library.
- **The shown source is the running source**: the example view shows every file in the
  example folder via `?raw`. Folders let a rich example split into helpers and still stay
  under 300 lines per file without losing "source = what runs".
- `provenance: 'legacy'` marks the 15 migrated demos, which predate the docs-only rule.
  They show a badge and get replaced when their package gets a pure gallery.

### Discovery (`src/registry.ts`)

- `import.meta.glob('/packages/*/package.ts', { eager: true })` — package metadata, tiny.
- `import.meta.glob('/packages/*/examples/*/meta.ts')` — lazy. Home counts examples from
  the glob's keys without loading anything. A rolldown `codeSplitting` group bundles each
  package's metas into one chunk (`meta-<pkg>`), so opening a package is one request.
- `import.meta.glob('/packages/*/examples/*/main.ts')` — lazy, one chunk per example.
- `import.meta.glob('/packages/*/examples/*/*', { query: '?raw' })` — lazy, for the source view.

### Preview host (`src/preview/`)

One shared `IntersectionObserver` (rootMargin 200px). A mount queue caps live previews at
6 — under the browser's ~16 WebGL contexts — and mounts nearest-to-viewport first.
Leaving the viewport schedules unmount after 800 ms, cancelled on return, so fast scroll
does not thrash. Each card is an error boundary: a thrown or rejected mount shows the
error in that card only. `audio: true` examples never mount in preview. The page renders
cards in batches as the user scrolls (sentinel element), so a 500-example package does
not create 500 cards up front.

### Example CSS

`style.css` is global once loaded, so every rule must sit under the example's own
attribute: the host sets `data-example="<pkg>/<example>"` on the mount element and the
file nests everything under `[data-example="<pkg>/<example>"] { … }`. A test checks it.

## Vendored docs (`scripts/vendor-docs.ts`)

`SOURCE.json`:

```json
{
  "license": "MIT", "redistribute": true,
  "sources": [
    { "kind": "git", "repo": "https://github.com/…", "ref": "v1.0.0", "paths": ["README.md", "docs"] },
    { "kind": "pages", "urls": ["https://…/a", "https://…/b"] },
    { "kind": "crawl", "start": "https://animejs.com/documentation/", "prefix": "https://animejs.com/documentation/", "max": 400 }
  ]
}
```

- `git`: shallow sparse clone at `ref`; copies `paths` into `docs/repo/`.
- `pages` / `crawl`: `tfish fetch` as markdown, one file per page under `docs/pages/`,
  first line the source URL. `crawl` follows links that start with `prefix`,
  breadth-first, up to `max`.
- Writes `MANIFEST.json`: date, resolved commit, and per file its source URL and sha256.
  Re-running shows what changed upstream.
- `redistribute: false` — the default for docs with no licence (anime.js, Motion and GSAP
  publish docs only as websites with none) — writes `docs/.gitignore` keeping only
  `SOURCE.json` and `MANIFEST.json`. A builder runs `pnpm vendor-docs <pkg>` in its
  worktree first. Tests check docs refs against `MANIFEST.json`, so CI never needs the
  files or the network.
- **Official only**: every source URL must share a host with the package's `homepage`,
  `docsUrl` or `repo` (tested). Official standalone demo galleries (a repo's `examples/`,
  threejs.org/examples) are **not** vendored: they are examples, which belong to the
  comparison phase. Docs pages with inline snippets are vendored as-is.

The example view links each docs ref to its source URL from `MANIFEST.json`.

## Purity rule

In CLAUDE.md, because sessions have `tfish` and nothing mechanical stops a search:

- `tfish` may fetch **only the package's official documentation, into its
  `packages/<pkg>/docs/`** (through `vendor-docs`).
- Builders read `packages/<pkg>/docs/` and, from `node_modules/<npm>/`, only the type
  definitions and README. Never anyone else's examples, never web search.
- The comparison phase is the only exception, and it writes only `comparisons/`.

The `docs` refs are a **declaration**, not proof: the test checks they resolve, and that
`pure` examples have at least one. The check that backs a declaration is review: the
reviewer of a builder's batch samples examples and confirms each one's API usage appears in
its cited docs.

## Comparisons

`packages/<pkg>/comparisons/<entry>.ts`:

```ts
defineComparison({
  title, author, sourceUrl, demoUrl?, license?, foundVia,
  ours: ['stagger-grid'],   // our example slugs covering the same ground (tested)
  notes,                    // what theirs does that ours doesn't, and vice versa
})
```

The package view lists them in a "Community" section once any exist. A comparison never
changes an example; an idea seen there becomes a new example only if the docs alone
support it.

## Styling

`https://mase.fi/base.css` (P8) with a blue `--accent` override; gallery chrome in
`src/styles/`. Example visuals are their own. Prism (npm) highlights source, loaded only by
the example view.

## Testing

vitest, node environment, reading the filesystem — no example code is executed:
- Registry integrity: each package dir has `package.ts` and `docs/SOURCE.json`; each
  example dir has `meta.ts` + `main.ts`; `section` is in the package's `sections`; docs refs
  are in `MANIFEST.json`; `pure` ⇒ ≥1 ref; comparison `ours` resolve; SOURCE URLs are
  official hosts; example CSS is scoped.
- Router parse/format round-trip; gallery filter/sort; preview queue ordering and cap;
  vendor-docs URL→filename mapping and link extraction.

Type-check: `tsc --noEmit`, strict. CI runs check + build.

## Migration of the 15 existing pages (in step one)

Each page becomes `packages/<pkg>/` with one example folder per old demo section,
`provenance: 'legacy'`, `docs: []`, `sections` = the old page's demo grouping, and a
`SOURCE.json` stub (`sources: []`). Libraries move from CDN tags to npm, same majors.
Audio demos (Tone.js, Pizzicato) keep their start button for the browser's gesture
requirement and set `audio: true`. Old URLs (`showcases/<slug>/`) are not kept.

## Out of scope (step one)

Building pure examples, vendoring real docs, the comparison phase, static thumbnails.
