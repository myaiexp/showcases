# Showcases

Per-package galleries of interactive JavaScript examples. Each package gets its own
gallery of many examples (hundreds for rich libraries), and every new example is built
**only from that package's official documentation**, vendored into the repo. Live at
https://myaiexp.github.io/showcases/.

Stack: vanilla TypeScript + Vite single-page app (hash routes), pnpm, vitest,
`https://mase.fi/base.css`. Libraries come from npm, pinned in `pnpm-lock.yaml`.

## Purity rule (read before building any example)

Sessions have `tfish` (web search and fetch) through Bash, so nothing mechanical
enforces this. You do:

- **`tfish` may fetch only the package's official documentation, and only into that
  package's vendored docs folder** `packages/<pkg>/docs/` (through `pnpm vendor-docs`).
- **Builders never search for or read other people's examples**: no blog posts,
  CodePens, GitHub repos, Stack Overflow, AI-generated galleries, or the official site's
  own standalone demo gallery. Read `packages/<pkg>/docs/` plus the package's own
  published code in `node_modules/<npm>/` (source, type definitions, README), nothing
  else. Any examples or demos shipped inside the package stay off limits.
- **The comparison phase is the only exception.** It may search the web for community
  examples, and it writes only `packages/<pkg>/comparisons/`. It never edits an example.
- Every pure example lists the docs files it was built from in `meta.ts` `docs`.

Details and the reasoning: [docs/pattern.md](docs/pattern.md) § Purity.

## Where things live

- `packages/<pkg>/`: one package. `package.ts` (metadata), `docs/` (vendored docs, see
  [docs/vendoring.md](docs/vendoring.md)), `examples/<slug>/` (one folder per example),
  `comparisons/` (see [docs/comparisons.md](docs/comparisons.md)).
- `src/`: the app shell (router, registry, views, preview host). Packages and examples
  are discovered by glob, so there's no list to update.
- The pattern for adding a package or an example, and the contracts, are in
  [docs/pattern.md](docs/pattern.md).
- Ranked list of packages to build next: [docs/package-showcase-list.md](docs/package-showcase-list.md).
  When a package's pure gallery ships, mark its entry `✅ built`.
- Design record: `docs/plans/2026-11-13-example-galleries-design.md`.

## Commands

- `pnpm dev`: dev server. `pnpm check` runs types, tests and the build.
- `pnpm new-package <slug> <npm> <Category>`, then `pnpm new-example <pkg> <slug> "<Title>" "<Section>"`.
- `pnpm vendor-docs <pkg>`: (re)fetch a package's docs from its `docs/SOURCE.json`.

## Deploy

`deploy` pushes `master` to Forgejo (`origin`) and GitHub (`github`). The
`.github/workflows/pages.yml` workflow then type-checks, tests, builds and publishes
GitHub Pages. No service on the VPS.

## Rules that bite

- Example CSS is global once loaded, so every `style.css` is one block nested under
  `[data-example='<pkg>/<slug>']`. The integrity test enforces this.
- `mount()` must return a cleanup that stops everything it started: loops, timers,
  tweens, audio, listeners. Gallery previews mount and unmount as the reader scrolls.
- A preview card (`ctx.preview`) has no pointer input and is 200px tall. It must look
  alive without input and must not send network requests or play sound.
- Docs with `redistribute: false` are gitignored. Run `pnpm vendor-docs <pkg>` in a
  fresh worktree before building that package's examples.
- Slugs (package and example dir names) are permanent once published: URLs and
  comparisons point at them.
- GSAP features that act on the whole window or the shared GSAP instance (ScrollSmoother,
  `normalizeScroll`, `gsap.matchMedia`, `defaults`/`config`, `exportRoot`) run in an iframe
  with its own GSAP via `packages/gsap/shared/frame.ts`, so they never take over the gallery.
- Perspective examples share one Web Worker engine (`packages/perspective/shared/setup.ts`),
  so a table left behind outlives its example. Delete views, then viewers, then tables; an
  example that builds derived tables through the viewer gets its own worker and terminates it.
- Mermaid: `test/mermaid-definitions.test.ts` runs `mermaid.parse()` on every definition an
  example renders (first state and every playground variant). It catches syntax, not layout.
  Live-config examples share `packages/mermaid/shared/controls.ts` (`liveDiagram`).
- `vite.config.ts` resolves the bare `three` imported by three's addons to `three/webgpu`,
  so the Three.js gallery keeps one core. Spark (WebGL) imports the `Pass.js` addon and so
  gets `three/webgpu` too; it works because both builds share `three.core.js`.
- Spark examples must not fetch in cards: the only captured splat is the docs' `butterfly.spz`,
  loaded in full views, with `pushButterfly` as the card stand-in (`packages/spark/shared/`).
