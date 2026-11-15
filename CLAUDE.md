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

- `pnpm dev`: dev server.
- `pnpm check:pkg [<pkg>...]`: **what builders run.** It type-checks only those packages
  (about 0.5 GB at most) and runs their integrity checks and their `test/<pkg>-*.test.ts`
  files. With no args, it works out the scope from the branch's changes against master;
  a `src/` or `tsconfig.json` change brings in the whole-repo tsc. It never builds.
- `pnpm check`: the whole repo (tsc ~4 GB, vite build ~6 GB). Each heavy step queues on a
  lock shared by every worktree. Run it only after changing shared config. CI and
  deploy's type-check gate run the whole-repo check on every land. Details:
  [docs/pattern.md](docs/pattern.md) § Checking.
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
- Babylon.js loads Havok and Recast WASM once per page through
  `packages/babylon-js/shared/{havok,recast}.ts` (Vite's dep bundling moves Havok's .wasm).
  Babylon has page-wide registries (glTF extensions, loader plugins, `RegisterMaterialPlugin`,
  `TransformNode.BillboardUseParentOrientation`); an example that touches one undoes it on
  cleanup, or attaches per instance instead.
- PlayCanvas: build on `packages/playcanvas/shared/stage.ts`, which frees the WebGL context on
  dispose and stops the frame loop if `app.destroy()` throws. Destroy an example's own textures,
  meshes and targets before `stage.dispose()`, never after. Physics awaits `loadAmmo()` (sync-ammo,
  global `Ammo`). An error thrown every frame floods the dev server's terminal and stalls it.
- ECharts: read the trap list in `packages/echarts/shared/chart.ts` before building, and add
  to it. The option reference has one gallery section per series type (`Option: series.<type>`).
  Tags are option paths: `test/echarts-citations.test.ts` fails when a tag's name is not in the
  cited docs, usually a partial reached through `{{ use: }}` that `meta.docs` leaves out.
- VChart: read the trap list in `packages/vchart/shared/chart.ts` before building, and add to
  it. Never call `VChart.ThemeManager.setCurrentTheme` (it restyles every card); register
  themes, maps and functions under unique prefixed names (`showcase-…`, `vchart-…`), and leave them.
- Observable Plot: build on `packages/observable-plot/shared/plot.ts` (`mountPlot`, trap list) and
  load data with `shared/data.ts`, which bundles the docs' own `test/data` files as lazy text
  chunks, so cards never fetch. Each example writes its whole `Plot.plot` spec in its main.ts.
- Motion: read the trap list in `packages/motion/shared/ui.ts`. Clean up through `scopeMotion(el, …)`
  (effects and `frame` loops excepted). Card gestures go through `shared/pointer.ts`, one page-wide
  queue, because drag/press/pinch listen on window; `animateView` runs in `shared/view.ts`'s iframe.
- G6: build on `packages/g6/shared/graph.ts` (`mountGraph`, trap list); every example writes its
  whole `new Graph({...})` spec with `theme: 'dark'`. Data comes from `shared/data.ts` (the repo's
  test datasets, the files the docs fetch from their CDN); images from `shared/images.ts`.
- deck.gl: read the trap list in `packages/deck-gl/shared/stage.ts` and add to it. Render on
  `createStage`'s device (`new Deck({device: stage.device})`) and clean up with `stage.release(deck)`:
  `Deck.finalize()` never frees the WebGL context. MapLibre examples use `shared/base-maps.ts`
  instead. No network in cards or full views: tiles, terrain and glTF are generated in code.
- Chart.js: build on `packages/chart-js/shared/stage.ts` (`createStage`, trap list); `shared/setup.ts`
  registers everything and sets dark `Chart.defaults` once, so an example that changes defaults or
  registries restores them. Re-read `chart.options.scales.*` after `update()` (it re-merges them).
  Cards fake the pointer with `shared/hover.ts` or `config-data.ts` `ghostCursor()` (non-bubbling).
- Tone.js: build on `packages/tone-js/shared/stage.ts` (`toneStage`, trap list). One spec runs live
  in the full view and through a queued `Tone.Offline` render in cards, which stay silent and
  animate the rendered waveform; `shared/samples.ts` renders stand-in recordings, so nothing fetches.
- Pizzicato: build on `packages/pizzicato/shared/stage.ts` (`pzStage`, trap list). Cards render
  silently by pointing the page-wide `Pizzicato.context` at an OfflineAudioContext (`render.ts`);
  timed steps go through `at()`, never timers. `vite.config.ts` resolves `pizzicato` to
  `shared/entry.ts`, which undoes the library's page-wide `AudioNode.connect` patch.
- Sortable.js: read the trap list in `packages/sortablejs/shared/lifecycle.ts`. One drag per page lives in
  module state: cards script touch drags through `shared/drive.ts` (one page-wide queue) and tear down with
  `release()`, since `destroy()` ends any drag on the page. Plugins mount once per page (`mountOnce`).
- Zdog: build on `packages/zdog/shared/stage.ts` (`createStage`, trap list), which sizes the
  canvas or svg before the example's own `new Zdog.Illustration({ element: stage.element })`
  reads it. Docs are the zzz.dog source (`metafizzy/zdog-docs`); its `demos/` folder stays out.
- Marked: build on `packages/marked/shared/stage.ts` (`createStage`, trap list) and `shared/demo.ts`, whose
  cards type sample Markdown and re-render each step. Never `marked.use()` on the global: `new Marked()` per
  mount. HTML reaches the page through `doc.show()`/`putHtml()` (DOMPurify, offline images, inert links).
- Tippy.js: build on `packages/tippy-js/shared/stage.ts` (`createStage`, trap list). Cards drive tips
  with `stage.ghost`, which sends events to the element only, never to the document (other cards'
  tips listen there). Pass elements, never selector strings, and `appendTo: stage.root`.
- Fuse.js: build on `packages/fuse-js/shared/stage.ts` (`createStage`, trap list: several docs claims are
  wrong for 7.5.0) with `searchBox`/`typeLoop`, `resultList`, `shelf` and `highlight`. FuseWorker loads its
  script from `import workerUrl from 'fuse.js/worker-script?url'`; cards never run plain Fuse on big lists.
- Papa Parse: build on `packages/papaparse/shared/stage.ts` (`createStage`, trap list) and its
  views (`csvView`/`csvEditor`, `dataTable`, `flow`). Downloads go to `shared/fake-server.ts`
  (an XMLHttpRequest subclass answering https://data.example in memory); never with `worker`.
- Dexie.js: build on `packages/dexie-js/shared/stage.ts` (`createStage`, trap list). Name databases
  with `stage.dbName()` and pass them to `stage.own()`, which deletes them on cleanup; show the data
  with `shared/table-view.ts` (a liveQuery grid that flashes changes) and drive steps with `tour()`.
- Ky: build on `packages/ky/shared/stage.ts` (`createStage`, trap list). Every request goes through
  the pretend server via Ky's own `fetch` option (`ky.extend({fetch: server.fetch})`) to an
  `https://*.example` URL; a guard rejects *.example requests that skip it. The wire picture and
  timeline read the server's events, so what travelled is always visible.
- VFX-JS: build on `packages/vfx-js/shared/stage.ts` (`createStage`, trap list). Every `new VFX()` spreads
  `stage.vfxOpts` and goes through `stage.own()`, which clips its window-sized canvas to the stage and frees
  the WebGL context. Cards scroll-reveal through `shared/scroll-sim.ts` and fake the mouse with `shared/pointer.ts`.
- Wretch: build on `packages/wretch/shared/stage.ts` (`createStage`, trap list) and `shared/server.ts`, an
  in-memory server each chain reaches through `.fetchPolyfill(server.fetch)`, so nothing touches the network.
  Show the traffic with `wire` (requests flying), `timeline` (timing), `envelope` (what was sent), `chips`.
- Zod: build on `packages/zod/shared/stage.ts` (`createStage`, trap list: many docs claims are wrong for
  4.6.7) with `checkpoint`, `sampleRows`/`schemaTour`, `valueView`. `z.config()` is page-wide and messages
  are built lazily: call it inside `error-config.ts` `keepConfig()` and read issues with `settle()`. Use
  `z.registry()` per mount, never ids on `z.globalRegistry`.
- css-doodle: build on `packages/css-doodle/shared/stage.ts` (`createStage`, trap list): `stage.doodle(code)` frames a
  `<css-doodle>` (code says `@grid: N / 100%`, not the docs' `60vmin`) with a live editor in full views; cards stay alive
  with `reroll` or `variants`. Addons are imported from `@css-doodle/addons/<name>` so `@use` never hits a CDN.
- TanStack Charts: build on `packages/tanstack-charts/shared/stage.ts` (`createStage`, trap list) and mount with
  `stage.own(mountChart(stage.box, …))`; the box's currentColor and `--ts-chart-N` tokens are the dark theme. A fixed
  scale domain needs an instance (`scaleLinear().domain(…)`): factories and a `domain` key re-infer it. Cards fake input
  with `stage.ghost()` on the container; package.json overrides charts' d3-selection so `zoomX` works.
- Vizzu: build on `packages/vizzu/shared/stage.ts` (`createStage`, trap list). Every chart is
  `stage.own(new Vizzu(stage.element, { style: darkStyle }))`; steps run through `stage.story()`,
  which loops and rewinds via `chart.store()`. tsconfig `paths` maps `vizzu` to the type-only
  `shared/vizzu-types.d.ts`, because the library's own shorthand `animate()` types never apply.
- Plotly.js: build on `packages/plotly-js/shared/stage.ts` (`createStage`, trap list); every example writes
  its whole `Plotly.newPlot(stage.div, data, {template: stage.template, …}, stage.config)` call. Data comes
  from `shared/data.ts` (the docs' plotly/datasets files, bundled); geo maps `await loadGeoAssets()`; tile
  maps use `shared/tiles.ts` (`darkMapStyle`, `landLayers`) and never draw map text (no glyphs offline).
- D2: build on `packages/d2/shared/stage.ts` (`createStage`, trap list) and `shared/playground.ts`; each
  main.ts writes its D2 source and compile options. Never `new D2()`: `stage.d2()` is the page's one queued
  engine (22 MB WASM). Icons come from `shared/icons.ts`, quoted (`icon: "${icons.x}"`). `test/d2-examples.test.ts`
  compiles every variant in Node; a variant that fails on purpose holds the comment `# (deliberate error)`.
- Leaflet 2 (`packages/leaflet`, on `leaflet@2.0.0-beta.4`): build on `shared/stage.ts` (`createStage`; traps in
  `shared/traps.md`), `stage.own(new LeafletMap(stage.box, …))`. Never a plain TileLayer/WMSTileLayer: `LocalTileLayer`
  and `LocalWMSTileLayer` send Leaflet's URLs (`https://tiles.example/…`, `wms.example`) to a pretend server that paints
  Natural Earth land; `test/leaflet-offline.test.ts` fails other URLs. Cards click through `shared/ghost.ts`.
- cosmos.gl: build on `packages/cosmos-gl/shared/stage.ts` (`createStage`; traps in `shared/traps.md`). Every graph is
  `stage.own(new Graph(stage.div, config, stage.device()))`: the stage's own luma device, because
  `Graph.destroy()` never frees the WebGL context. It runs on the repo's one luma.gl (9.4.2) although it
  declares ~9.3. Cards fake hover and clicks with `shared/ghost.ts`; layouts centre on `CENTER` (2048).
