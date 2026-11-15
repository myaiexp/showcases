# Package showcase list

Ranked candidates for per-package galleries, **newest and most visual first**.
Checked 2026-11-13 against the npm registry and GitHub/Codeberg APIs; the 2026-11-14
additions and the resolved Docs entries were checked the same way. Visual scores and
example counts are estimates, and the 2026-11-14 counts come from docs file trees, not
from reading pages. A second 2026-11-14 pass added about 70 packages, chosen for being
new (most first released or re-lined in 2025–2026). Their "Line since" is the first
stable npm release of the current major (minor for 0.x), computed from the registry.

**Ranking.** Two packages are pinned at the top because Mase asked for them: anime.js
and Pretext. Everything else is ordered by visual tier (5 = striking on screen). Within
a tier, packages are ordered by how recent their current major line is (approximate where only the
latest release date, in parentheses, was available). Only packages usable from
plain TypeScript are ranked; React-, Vue- and Svelte-only packages are listed at the end.

**Columns.**
- **Vis**: visual tier, 1–5.
- **Line since**: date of the current major line, or of the current minor line for 0.x
  packages.
- **Docs**: how the docs get vendored.
  - **repo ✓**: markdown or MDX in a repo with a permissive licence. Vendored and committed.
    The note names the docs path or a separate docs repo when it isn't obvious.
  - **repo ✗lic**: in a repo, but the repo has no licence. Vendored, then gitignored.
  - **site**: crawled from the website, no licence found. Gitignored.
  - **site ✓**: crawled from the website, which states a licence. Committed.
  - **README**: the README is the whole docs.
- **~Ex**: rough number of distinct examples the docs could support.

When a package's pure gallery ships, mark it `✅ built`. Packages with a `legacy` port in
the gallery today are marked *(legacy in gallery)*.

## Pinned

| # | Package | Vis | Line since | Docs | ~Ex | Note |
|---|---|---|---|---|---|---|
| 1 | **anime.js** (`animejs`) ✅ built | 4 | v4 2025-04 | site | 150 | Mase's favourite. Timeline, stagger, SVG, draggable, scroll observer, text split, WAAPI |
| 2 | **Pretext** (`@chenglou/pretext`) ✅ built | 4 | 1.0 2026-10 | repo ✓ MIT | 25 | Text layout: reflow around shapes, shrink-wrap, masonry. Docs are README + CHANGELOG; `pages/demos/` stays out (pattern.md § Purity) |

## Tier 5: striking

| # | Package | Vis | Line since | Docs | ~Ex | Note |
|---|---|---|---|---|---|---|
| 3 | MuTracer (`@meimu/mutracer`) | 5 | 0.3 2026-11 | repo ✓ MIT | 25 | Progressive path tracer, WebGPU with a WebGL2 fallback: OpenPBR materials, denoising, caustics, a three.js sync bridge. First release 2026-10. Docs are `docs/*.md` plus `docs/technical/`; `examples/` stays out. Scenes are built in code |
| 4 | Zephyr3D (`@zephyr3d/scene`) | 5 | 0.10 2026-11 | repo ✓ MIT | 90 | TypeScript WebGPU/WebGL2 engine: PBR, SSGI, SSR, TAA, water, terrain, skinning. Docs are `apps/doc/web/en` (78 pages); its `editor/` pages assume the browser editor, and the zh-cn copy and `apps/*` demos stay out. Assets are generated in code |
| 5 | css-doodle (`css-doodle`) ✅ built | 5 | 0.69 2026-11 (0.x since 2017) | repo ✓ MIT | 60 | `<css-doodle>` web component: grid, random and shape functions for generative CSS art. Docs are `docs/grammar.md` (the whole function reference), `docs/languages.md` and the README; no source was found for the css-doodle.com pages. No network, so it suits cards |
| 6 | Shaders (`shaders`) | 5 | 4.0 2026-10 | site + repo ✓ MIT | 120 | ~200 WebGPU effect components with a vanilla entry (`shaders/js`, `createShader`), a `defineShader` std vocabulary and raw WGSL. First release 2025-06. Docs are the shaders.com guide and component reference (no licence stated, gitignored) plus the MIT `packages/core/docs/std` (46 pages). Pro presets and the design editor stay out. WebGPU-only, so cards need a fallback |
| 7 | vgpu (`vgpu`) | 5 | 0.6 2026-10 | repo ✓ MIT | 80 | Vercel Labs WebGPU toolkit: typed WGSL imports, `effect`/`draw`/`frame`, std noise and colour, three.js interop. First release 2026-05. Docs are `apps/docs/content/docs` (~90 pages) plus `docs/topics` (54); `apps/docs/examples`, the agent evals and the macOS-native pages stay out. WebGPU-only |
| 8 | gpu-curtains (`gpu-curtains`) | 5 | 0.17 2026-10 | repo ✓ MIT | 50 | WebGPU successor to curtains.js: planes synced to DOM images, render targets, compute, 3D. Docs are six `guides/*.md`, the README and the TypeDoc HTML in `docs/` (API only, awkward to vendor); `examples/` stays out. WebGPU-only |
| 9 | TanStack Charts (`@tanstack/charts`) ✅ built | 5 | 1.0 2026-10 | repo ✓ MIT | 80 | Grammar-of-graphics marks on SVG or canvas; vanilla through `defineChart` + `mountChart`. First release 2026-07. Docs are `docs/` (concepts, guides, 23 mark references, dom-host); `docs/examples/` (the sample catalogue) and `docs/framework/*` stay out |
| 10 | Embedding Atlas (`embedding-atlas`) | 5 | 0.26 2026-10 | repo ✓ MIT | 20 | Apple's GPU scatter and density view for millions of embedding points, with cluster labels. First release 2025-05. Vanilla `new EmbeddingView(el, props)` is documented, but `packages/docs` (12 pages) leans on Python, so thin. Points are generated in code; the Mosaic view needs DuckDB |
| 11 | Three.js (`three`) ✅ built | 5 | r187 2026-10 | repo ✓ MIT | 400+ | WebGPU renderer, TSL shaders. Vendor `docs/` only, not the 639 `examples/` |
| 12 | Sigma.js (`sigma`) ✅ built | 5 | v4 2026-10 | repo ✓ MIT | 70 | WebGL graphs, 100k+ nodes (pairs with graphology). Docs are the website chapters plus companion-package READMEs; the embedded SigmaExample stories stay out (pattern.md § Purity) |
| 13 | Use.GPU (`@use-gpu/core` and siblings) | 5 | 0.21 2026-10 | site | 40 | Declarative WebGPU graphics. Vanilla TS, but on its own React-like `live` JSX runtime. npm says MIT; the GitLab repo declares no licence |
| 14 | **Mermaid** (`mermaid`) ✅ built | 5 | v12 2026-09 | repo ✓ MIT | 250 | Text to diagrams. Huge breadth. Docs are the site source (intro, syntax, config) plus the generated API reference; ZenUML needs the separate `@mermaid-js/mermaid-zenuml` package |
| 15 | **Plotly.js** (`plotly.js`) ✅ built | 5 | v4 2026-08 | repo ✓ CC BY 3.0 | 200 | Scientific breadth: 3D, statistical, financial, maps. Docs repo `plotly/graphing-library-docs` mixes Python and R; vendor the JS posts only, with attribution (`PackageDef.credit`). Map traces want tiles: examples draw GeoJSON on a source-less style instead. Large bundle |
| 16 | Perspective (`@perspective-dev/viewer`) ✅ built | 5 | v5 2026-07 | repo ✓ Apache | 60 | Streaming pivot/visual analytics web component. Docs are the mdbook under `docs/md` plus the package READMEs; the docs site's project gallery stays out. Examples share one Web Worker engine and must delete their tables |
| 17 | MapLibre GL JS (`maplibre-gl`) ✅ built | 5 | v6 2026-07 | repo ✓ BSD | 150 | Vector maps, 3D terrain, globe. Docs are the API reference and style spec (site crawl) plus repo guides; all examples run offline on Natural Earth data and computed tiles |
| 18 | Orillusion (`@orillusion/core`) | 5 | 0.9 2026-06 | repo ✗lic | 60 | WebGPU-only engine: PBR, GI, particles. Docs repo `Orillusion/orillusion-web` has no LICENSE (`master` is Chinese, the `en` branch English): vendor `docs/guide` (86 pages) and the API reference (`docs/{api,physics,particle,media-extention,geometry,graphic}`). `docs/example/` and `docs/public/demos/` stay out; guide pages embed a live `<Demo>` and pull its whole source in with `<<< @/public/demos/…`, so vendor the page markdown with its own inline snippets, not the included files |
| 19 | vfx-js (`@vfx-js/core`) ✅ built | 5 | 1.0 2026-05 | repo ✓ MIT | 30 | Shader effects on DOM elements, images, video, page transitions. Vanilla core beside framework wrappers. Docs are README, `docs/*.md`, `skills/vfx-js/**` and the package READMEs. `packages/docs` is a prose Astro site (getting-started, shaders, effects, custom-effects, how-it-works) written as `.astro` pages, so fetch those as pages from the site; its `src/demos/`, the site's Examples page and `packages/examples` stay out |
| 20 | Spark (`@sparkjsdev/spark`) ✅ built | 5 | v2 2026-04 | repo ✓ MIT | 97 | Gaussian splats on three.js. Docs are the mkdocs pages in the repo; Community Resources stays out. Most examples are procedural; the docs' one linked asset, butterfly.spz, loads from sparkjs.dev in full views only |
| 21 | Vizzu (`vizzu`) ✅ built | 5 | 0.18 2026-04 | repo ✓ Apache | 70 | Animated data stories: charts morph between types through keyframes. Docs are `docs/` in vizzuhq/vizzu-lib, a ~25-chapter tutorial with its snippets; `docs/examples/` (gallery) stays out. Canvas, no network |
| 22 | **Babylon.js** (`@babylonjs/core`) ✅ built | 5 | v9 2026-03 | repo ✓ Apache | 300+ | Full engine, PBR, WebGPU |
| 23 | cobe (`cobe`) | 5 | v2 2026-03 | README MIT | 10 | Small WebGL dotted globe |
| 24 | tsl-textures (`tsl-textures`) | 5 | 3.0 2026-02 | repo ✓ MIT | 50 | ~53 procedural TSL textures (marble, planet, wood, water) for `three/webgpu`, so it shares the Three gallery's core. README may be the whole docs; `examples/` stays out |
| 25 | cosmos.gl (`@cosmos.gl/graph`) | 5 | v3 2026-02 | site | 25 | GPU force layout for 1M+ nodes. Docs site is a Storybook: guide and config pages only, the stories stay out. Not `@cosmograph/*`, which is CC BY-NC |
| 26 | AntV Infographic (`@antv/infographic`) | 5 | 0.2 2025-12 | repo ✓ MIT | 40 | New, infographic templates. Docs are `site/src/content/{learn,reference}` |
| 27 | **Apache ECharts** (`echarts`) ✅ built | 5 | v6 2025-07 | repo ✓ Apache | 400 | Biggest chart breadth, animated, 3D. Docs are the handbook (`apache/echarts-handbook`) plus the option and API reference (`apache/echarts-doc`); the handbook's embedded gallery demos stay out (pattern.md § Purity). ECharts GL is a separate package |
| 28 | **VChart** (`@visactor/vchart`) ✅ built | 5 | v2 2025-06 | repo ✓ MIT | 150 | Narrative/animated charts. Docs are `docs/assets/{guide,option,api,changelog,faq}` in VisActor/VChart; its `examples/` and `demos/` gallery stays out. 3D charts and the extension charts need `@visactor/vchart-extension` |
| 29 | GSAP (`gsap`) ✅ built | 5 | 3.x, plugins free since 2025 | site | 250 | SplitText, MorphSVG, ScrollTrigger, Flip. Non-OSI licence |
| 30 | Vega (`vega`) | 5 | v6 2025-03 | repo ✓ BSD-3 | 200 | The grammar under Vega-Lite (Tier 4): signals, event streams, 51 transforms, projections. Docs are `docs/` (~200 pages); `docs/examples/` stays out |
| 31 | D2 (`@terrastruct/d2`) | 5 | 0.1 2025-01 | repo ✓ BSD-3 | 80 | Diagram-as-code compiled in the browser by WASM: sketch mode, themes, sequence, grid, sql_table, animated boards. Library is MPL-2.0. Docs repo `d2lang/d2-docs` (`docs/tour`, 61 pages). npm last published 2025-08 while the docs moved on, so check each feature against the WASM. The proprietary TALA layout and remote icons stay out |
| 32 | Paper Shaders (`@paper-design/shaders`) | 5 | 0.0.x 2024-10 | repo ✓ Apache | 30 | Shader-effect pack, vanilla build alongside React. The docs site is the demo gallery: every `docs/src/app/(shaders)/*/page.tsx` is a playground, so none of it is vendored. What counts as docs is the READMEs (the vanilla one is three lines) and the per-shader parameter tables in `docs/src/shader-defs/*-def.ts` (description, range, default). Vanilla `ShaderMount` usage is documented nowhere, so it comes from the package's types and source. Thin |
| 33 | PlayCanvas (`playcanvas`) ✅ built | 5 | v2 2024-08 | repo ✓ MIT | 350 | Engine with Gaussian splats. Docs are the developer-site user manual (engine chapters plus the component reference); the Editor-based tutorials stay out because each embeds a demo project. Physics loads sync-ammo; splats, models and textures are generated in code |
| 34 | VStory (`@visactor/vstory`) | 5 | 0.0.x 2024-07 | repo ✓ MIT | 30 | Animated data storytelling on VChart. `docs/assets` guide and API; `docs/assets/examples` stays out |
| 35 | **AntV G6** (`@antv/g6`) ✅ built | 5 | v5 2024-06 | repo ✓ MIT | 120 | Graph visualisation. Docs in `packages/site`; its example files stay out |
| 36 | deck.gl (`deck.gl`) ✅ built | 5 | v9 2024-03 | repo ✓ MIT | 389 | GPU geospatial layers. Docs are `docs/` at v9.4.1; every example runs offline (tiles, terrain and glTF made in code). CARTO, ArcGIS, Google Maps and React are left out; MVT, Tile3D and WMS need a server |
| 37 | Rive (`@rive-app/canvas`) | 5 | v2 2023-07 | repo ✗lic | 40 | State-machine art; needs `.riv` assets |
| 38 | Penrose (`@penrose/core`) | 5 | 3.0 2023-07 (3.3 2026-08) | repo ✓ MIT | 40 | Diagrams from math notation: Domain, Substance and Style programs laid out by a constraint solver. Docs are `packages/docs-site/docs` (53 pages); `packages/examples` and the docs' examples page stay out |
| 39 | Galacean (`@galacean/engine`) | 5 | 1.0 2023-04 | repo ✓ MIT | 150 | Full WebGL engine; `docs/en` has ~185 pages. Pages that assume the Editor or embed playgrounds stay out. 2.0 is in alpha, so the line may move |
| 40 | AntV G2 (`@antv/g2`) | 5 | v5 2023-03 | repo ✓ MIT | 150 | Grammar-of-graphics charts. Docs in `site/docs` |
| 41 | Observable Plot (`@observablehq/plot`) ✅ built | 5 | 0.6 (2026-11) | repo ✓ ISC | 544 | Polished charts, minimal code. Docs are the repo's `docs/` pages plus the `test/data` files they load, so every example runs on the docs' own datasets offline; the notebooks and gallery the docs link stay out |
| 42 | D3 (`d3`) | 5 | v7 2021-06 | repo ✓ ISC | 300 | Bespoke graphics |
| 43 | AntV L7 (`@antv/l7`) | 5 | 2.x 2020 (2.29 2026-07) | repo ✓ MIT | 80 | WebGL geospatial layers: heatmaps, 3D bars, flows. Docs in `site/docs` (prose, en and zh); `site/examples` stays out. Runs without a basemap: `Map` from `@antv/l7-maps` needs no tiles or token (`site/docs/api/map/map.en.md`). Cards set `logoVisible: false`, since the default logo loads from alipayobjects.com, and skip the `water`/`ocean` polygon shapes and raster tile layers, which fetch too |
| 44 | A-Frame (`aframe`) | 5 | 1.0 2019-12 (1.8 2026-06) | repo ✓ MIT | 100 | HTML 3D and XR on a bundled three.js; 105 pages in `docs/`. Primitives and shaders need no assets; XR needs a headset |
| 45 | postprocessing (`postprocessing`) | 5 | 6.0 2019-03 (6.39 2026-11) | repo ✓ Zlib | 50 | three.js effects: bloom, god rays, SMAA, SSAO, DoF, LUT. Docs are the JSDoc API (esdoc over `src/`) plus the four prose pages in `manual/content` (getting-started, custom-effects, migration-guide, plugins-tools). `manual/content/demos/` pages are empty stubs that load scripts from `manual/assets/js/src/demos/`, the demo gallery; that and the legacy `demo/` app stay out |
| 46 | force-graph / 3d-force-graph (`force-graph`, `3d-force-graph`) | 5 | 1.x 2018 (1.52 2026-09, 1.80 2026-11) | README MIT | 30 | globe.gl's siblings: canvas 2D and three.js 3D force-directed graphs. Each README is the whole docs (long API tables); `example/` stays out. The 3D one imports `three`, which `vite.config.ts` resolves to `three/webgpu` |
| 47 | globe.gl (`globe.gl`) | 5 | v2 (2026-08) | README MIT | 30 | Data globes on Three.js |
| 48 | CesiumJS (`cesium`) | 5 | 1.147 2026-11 | repo ✓ Apache | 100 | 3D globe; Ion token for some data. Docs are the JSDoc plus `Documentation/` guides; Sandcastle stays out |

## Tier 4: strongly visual

| # | Package | Vis | Line since | Docs | ~Ex | Note |
|---|---|---|---|---|---|---|
| 49 | Paper.js (`paper`) | 4 | 0.17 2026-11 | repo ✗lic | 100 | Vector path scripting, just revived |
| 50 | Leaflet (`leaflet`) | 4 | 2.0 beta 2026-11 | repo ✓ BSD-2 | 60 | `latest` is still 1.9.4 (2023-05); build on the 2.0 `beta` tag. Raster tiles are network, so cards stay on GeoJSON |
| 51 | Mosaic vgplot (`@uwdata/vgplot`) | 4 | 0.35 2026-11 | repo ✓ BSD-3 | 60 | Cross-filtered plots on DuckDB-WASM. Heavy, and 0.x moves fast |
| 52 | dotLottie (`@lottiefiles/dotlottie-web`) | 4 | 0.83 2026-11 | README MIT | 30 | Lottie with state machines and themes; needs assets |
| 53 | party.js (`party-js`) | 4 | 3.0 2026-11 | repo ✓ MIT | 15 | Confetti and sparkles from shapes, samplers and behaviours; v3 is a rewrite. Docs are `docs/src/content/docs` (13 pages). Thin |
| 54 | HyperFrames (`hyperframes`, `@hyperframes/player`) | 4 | 0.9 2026-11 | repo ✓ Apache | 30 | HeyGen's HTML-to-video compositions: timelines, GSAP and CSS frame adapters, shader transitions. First release 2026-03. Docs are `docs/{concepts,guides,packages,sdk,reference}` (~90 pages); `docs/catalog`, `registry/` and `examples/` stay out. The renderer needs Chrome and ffmpeg, so in-page examples are limited to `<hyperframes-player>`; unverified that it plays without the render server |
| 55 | Charming (`charmingjs`) | 4 | 0.1 2026-11 | repo ✓ MIT | 40 | Data-driven creative coding: flow API, canvas and WebGL/GLSL helpers, an ASCII terminal renderer in WASM. First release 2025-01. Docs are ~18 prose pages in `docs/`; `docs/examples` and `docs/gallery` stay out |
| 56 | textmode.js (`textmode.js`) | 4 | 0.18 2026-10 | README MIT | 25 | ASCII/text-mode rendering, new 2025. API from the typings; `examples/` stays out |
| 57 | **Motion** (`motion`) ✅ built | 4 | v14 2026-10 | site | 120 | Springs, scroll, layout, gestures. JS docs only: React/Vue pages and Motion UI (Motion+, paid) stay out |
| 58 | A5 (`a5-js`) | 4 | 1.0 2026-10 | repo ✓ Apache | 25 | Equal-area pentagonal global grid, pitched as an H3 successor. First release 2025-04. Docs are `docs/` (API, quickstarts, recipes, technical notes); `website/` stays out. Cells drawn on canvas or SVG, no basemap. Already installed for deck.gl |
| 59 | Quickdraw (`@quickdrawjs/core`) | 4 | 0.3 2026-10 | repo ✓ MIT | 15 | Framework-free infinite-canvas whiteboard engine. First release 2026-08. Docs are `apps/docs/content` (12 pages); the React and React Native pages, `apps/website` and `examples/` stay out. The corner watermark is on by default (`watermark: false`). Thin and very new |
| 60 | Pts (`pts`) | 4 | 1.0 2026-09 | repo ✓ Apache | 80 | Generative art, just hit 1.0 |
| 61 | wavesurfer.js (`wavesurfer.js`) | 4 | v8 2026-09 | README BSD | 50 | Audio waveforms, regions, spectrogram |
| 62 | Monaco Editor (`monaco-editor`) | 4 | 0.57 2026-09 | README MIT | 25 | VS Code editor. Docs are README plus `monaco.d.ts`; the playground stays out |
| 63 | Tegaki (`tegaki`) | 4 | 1.0 2026-09 | repo ✓ MIT | 15 | Handwriting animation for any font. First release 2026-03 (the npm name also holds an unrelated 2020 version). Docs are `packages/website/src/content/docs` (~22 pages); use the vanilla and web-component pages, not React, Vue or Svelte. Thin |
| 64 | Univer (`@univerjs/presets`) | 4 | 1.0 2026-09 | site | 120 | Office suite SDK in the page: Sheets, Docs, Slides; Apache core. Docs at docs.univer.ai (crawl `llms-full.txt`), no licence found. Pro features are commercial, so check each. Large bundle; the `univer-*-examples` repos stay out |
| 65 | melonJS (`melonjs`) | 4 | v20 2026-08 | repo ✓ MIT | 40 | 2D engine, Tiled maps, physics adapters. Where the API site's source lives is unconfirmed; `packages/examples` stays out |
| 66 | TypeGPU (`typegpu`) | 4 | 0.12 2026-08 | repo ✓ MIT | 100+ | Typed WebGPU compute and shaders |
| 67 | ChartGPU (`chartgpu`) | 4 | 0.4 2026-08 | repo ✓ MIT | 40 | WebGPU charts for millions of points. Cards need a non-WebGPU fallback. Young |
| 68 | Replicad (`replicad`) | 4 | 1.0 2026-08 | repo ✓ MIT | 35 | Code CAD on OpenCascade WASM with a three.js mesh helper. Docs are `packages/replicad-docs/docs` (~35 pages); its `examples` stay out. The `replicad-opencascadejs` kernel is LGPL-2.1 and ~10 MB, so ask Mase (Cautions) |
| 69 | number-flow (`number-flow`) | 4 | 0.6 2026-07 | repo ✓ MIT | 25 | Morphing digits, vanilla element |
| 70 | MediaPipe Vision (`@mediapipe/tasks-vision`) | 4 | 1.0 2026-07 | site ✓ CC BY 4.0 | 30 | Face, hand, pose, gesture, segmentation and object overlays. Docs are the ~13 web pages under ai.google.dev/edge/mediapipe/solutions/vision (prose CC BY 4.0 with attribution, code Apache). Each task loads a `.task` model from Google storage, so full views only; serve the WASM from `node_modules`. Inputs are generated images, not a camera |
| 71 | Swiper (`swiper`) | 4 | v14 2026-06 | repo ✗lic | 60 | Sliders with 3D effects |
| 72 | billboard.js (`billboard.js`) | 4 | v4 2026-06 | site | 80 | D3-based charts. Docs are the README, typings and the naver.github.io site; `demo/` and `stories/` stay out |
| 73 | FullCalendar (`@fullcalendar/core`) | 4 | v7 2026-06 | site | 60 | Calendar views. Repo is MIT but holds no docs |
| 74 | Blockly (`blockly`) | 4 | v13 2026-06 | site | 50 | Visual block editor: custom blocks, generators, themes. Docs on developers.google.com; content licence unverified |
| 75 | AG Charts (`ag-charts-community`) | 4 | v14 2026-06 | repo ✗lic | 120 | Vanilla charts. Community features only: Enterprise ones watermark. Repo is "MIT and Commercial" |
| 76 | NiiVue (`@niivue/niivue`) | 4 | 0.69 2026-05 | repo ✓ BSD-2 | 25 | WebGL medical volume and mesh viewer. Needs NIfTI and mesh files: only ones the docs ship or link |
| 77 | opentype.js (`opentype.js`) | 4 | v2 2026-05 | repo ✓ MIT | 30 | Glyph paths, variable fonts |
| 78 | tsParticles (`@tsparticles/engine`) | 4 | v4 2026-05 | repo ✓ MIT | 150 | JSON-driven particle effects |
| 79 | navcat (`navcat`) | 4 | 0.4 2026-05 | README MIT | 40 | Navmesh generation and pathfinding in plain JS, with each build stage inspectable. First release 2025-08. The 105 KB README is the whole docs; `examples/` and `website/` stay out. Geometry generated in code |
| 80 | Phaser (`phaser`) | 4 | v4 2026-04 | repo ✓ MIT | 150 | 2D game framework. Docs are the `docs/` guides plus the JSDoc API; docs.phaser.io is the site |
| 81 | Giro3D (`@giro3d/giro3d`) | 4 | 2.0 2026-04 | repo ✓ MIT | 50 | 3D geospatial on three.js: maps, terrain, point clouds, 3D Tiles. GitLab repo; docs are the TypeDoc API plus `site/` pages, no prose tutorials found, and `examples/` (the main teaching route) stays out. Thin outside the API. Imagery and elevation generated in code |
| 82 | Shiki (`shiki`) | 4 | v4 2026-02 | repo ✓ MIT | 60 | VS Code-grade highlighting, themes |
| 83 | q5.js (`q5`) | 4 | 4.0 2026-02 | repo ✓ LGPL-3.0 | 80 | p5-compatible creative coding with WebGPU and WebGL renderers. Docs are `lang/en/learn/*.md` (19 pages) plus the README. LGPL-3.0 like p5, so ask Mase |
| 84 | crashcat (`crashcat`) | 4 | 0.0 2026-02 | README MIT | 40 | Pure-JS 3D physics (shapes, constraints, queries); navcat's sibling. First release 2025-08. The 94 KB README is the whole docs; `examples/` and `website/` stay out. Needs a renderer. 0.0.x |
| 85 | Leafer UI (`leafer-ui`) | 4 | v2 2026-01 | repo ✓ MIT | 80 | Canvas UI scene graph: interaction, animation, editor, flow. Docs repo `leaferjs/docs`, `en/` only; plugins are separate packages |
| 86 | Schedule-X (`@schedule-x/calendar`) | 4 | 4.0 2026-01 | repo ✓ MIT | 40 | Calendar views with drag and drop; vanilla `createCalendar` plus plugins. Docs are `website/app/docs` (40 pages); `website/app/demos` and the code-example components stay out |
| 87 | Fabric.js (`fabric`) | 4 | v7 2025-12 | repo ✗lic | 90 | Interactive canvas objects, filters, SVG in/out, free drawing. Docs repo `fabricjs/fabricjs.com`; its `demos/` stays out |
| 88 | AntV X6 (`@antv/x6`) | 4 | v3 2025-12 | repo ✓ MIT | 60 | Graph editor: ports, edge routers, stencils, minimap. Docs in `site/docs` |
| 89 | Web Awesome (`@awesome.me/webawesome`) | 4 | v3 2025-10 | repo ✓ MIT | 80 | Web-component UI kit. Docs in `packages/webawesome/docs`; check the package `LICENSE.md` for Pro carve-outs |
| 90 | vis-network (`vis-network`) | 4 | v10 2025-07 | repo ✓ Apache/MIT | 60 | Physics-driven networks. Docs are hand-written HTML in `docs/network`; `examples/` stays out |
| 91 | vis-timeline (`vis-timeline`) | 4 | v8 2025-07 | repo ✓ Apache/MIT | 40 | Timelines and Graph2D. HTML docs |
| 92 | That Open Components (`@thatopen/components`) | 4 | 3.1 2025-07 | repo ✗lic | 30 | BIM/IFC viewer on three.js: clipping, measurement, highlighting. Docs repo `ThatOpen/engine_docs` has no licence; vendor the 74 tutorial pages in `docs/Tutorials`. Needs IFC or fragment files the docs link. `web-ifc` is MPL-2.0 |
| 93 | VRender (`@visactor/vrender`) | 4 | v1 2025-06 | repo ✓ MIT | 60 | Canvas/SVG scene graph with animation, under VChart |
| 94 | p5.js (`p5`) | 4 | 2.0 2025-04 | repo ✓ MIT (site repo) | 300+ | Creative coding. The library is LGPL; check the reference content licence |
| 95 | Vega-Lite (`vega-lite`) | 4 | v6 2025-03 | repo ✓ BSD | 200 | Declarative JSON charts |
| 96 | VexFlow (`vexflow`) | 4 | v5 2025-03 | README MIT | 25 | Music engraving. No docs folder: README plus typings; `demos/` and `tests/` stay out |
| 97 | VGrammar (`@visactor/vgrammar`) | 4 | 0.16 2025-02 | repo ✓ MIT | 60 | Grammar-based visualisation and animation. Docs in `docs/site`, en and zh |
| 98 | lightweight-charts (`lightweight-charts`) | 4 | v5 2025-01 | repo ✓ Apache | 60 | Financial charts, panes |
| 99 | three-mesh-bvh (`three-mesh-bvh`) | 4 | 0.9 2025-01 | README MIT | 20 | Fast raycasts, shapecasts, SDFs and GPU BVH for three.js |
| 100 | AntV S2 (`@antv/s2`) | 4 | v2 2024-11 | repo ✓ MIT | 50 | Pivot and table sheets on canvas. Docs in `s2-site/docs` |
| 101 | manifold-3d (`manifold-3d`) | 4 | 3.0 2024-11 (3.5 2026-11) | repo ✓ Apache | 40 | WASM solid modelling: booleans, extrude, revolve, smoothing, level sets, warps. Docs are `bindings/wasm/documents/*.md` (6) plus the JSDoc in the `.d.ts`; the editor and `examples/` stay out. Lean docs for the count |
| 102 | model-viewer (`@google/model-viewer`) | 4 | v4 2024-10 | repo ✓ Apache | 40 | glTF web component. Docs are `packages/modelviewer.dev/data/{docs,faq}.json`; `examples.json` stays out. Needs glTF assets |
| 103 | Kaplay (`kaplay`) | 4 | v3001 2024-10 | repo ✗lic | 80 | Kaboom successor: sprites, scenes, physics, particles. Docs repo `kaplayjs/kaplay-site`. v4000 is in alpha on `next` |
| 104 | OpenLayers (`ol`) | 4 | v10 2024-07 | repo ✓ BSD-2 | 250 | Full GIS maps. Docs are the JSDoc plus `site/src/doc`; the 728-file `examples/` gallery stays out |
| 105 | thi.ng umbrella (`@thi.ng/geom` and siblings) | 4 | geom v8 2024-06 | repo ✓ Apache | 150 | Generative geometry, colour, SVG and canvas. On Codeberg; each package's README is its docs; root `examples/` stays out. Likely one gallery per sub-package |
| 106 | VTable (`@visactor/vtable`) | 4 | v1 2024-05 | repo ✓ MIT | 120 | Canvas tables with in-cell charts, sparklines, pivot, Gantt. Docs in `docs/assets`, en and zh |
| 107 | PixiJS (`pixi.js`) | 4 | v8 2024-03 | repo ✗lic | 150+ | Fast 2D WebGL, filters |
| 108 | luma.gl (`@luma.gl/core`) | 4 | v9 2024-03 | repo ✓ MIT | 80 | WebGL2 plus WebGPU adapter under deck.gl. Low-level: shaders and GPGPU. ~550 docs files |
| 109 | AntV G (`@antv/g`) | 4 | v6 2024-03 | repo ✗lic | 70 | Renderer under G2/G6/X6: Canvas, SVG, WebGL, WebGPU. npm says MIT, repo has no LICENSE |
| 110 | Konva (`konva`) | 4 | v10 (2026) | repo ✗lic | 150 | Interactive canvas shapes |
| 111 | OGL (`ogl`) | 4 | 1.0 2023-08 | README Unlicense | 40 | Minimal WebGL |
| 112 | Atropos (`atropos`) | 4 | v2 2023-06 | README MIT | 15 | Parallax tilt |
| 113 | Graphviz via Viz.js (`@viz-js/viz`) | 4 | 3.0 2023-06 (3.31 2026-09) | repo ✓ EPL-2.0 | 90 | Graphviz compiled to WASM: DOT, six layout engines, shapes, HTML labels, clusters. The library is MIT and its README thin, so the docs are the graphviz.org source (`graphviz/graphviz.gitlab.io` on GitLab, EPL-2.0) |
| 114 | Motion Canvas (`@motion-canvas/core`, `/2d`, `/player`) | 4 | 3.0 2023-02 | repo ✓ MIT | 50 | Generator-driven TypeScript animation with an embeddable `<motion-canvas-player>`. Docs are `packages/docs` (65 files). No release since 2024-12, and the Vite-plugin project format is awkward to host in the gallery |
| 115 | Unovis (`@unovis/ts`) | 4 | v1 2022-12 (1.8 2026-11) | repo ✓ Apache | 80 | Framework-agnostic TS charts: graph, Sankey, maps, timeline. Docs in `packages/website` |
| 116 | AntV F2 (`@antv/f2`) | 4 | v5 2022-11 | repo ✓ MIT | 40 | Mobile-first canvas charts with gestures. Low activity |
| 117 | abcjs (`abcjs`) | 4 | v6 2022 | repo ✓ MIT | 50 | Music notation and playback. VuePress `docs/`: visual, audio, animation, interactive |
| 118 | LittleJS (`littlejsengine`) | 4 | 1.x 2021-09 (1.30 2026-11) | repo ✓ MIT | 40 | Tiny engine: WebGL, Box2D, particles, ZzFX sound, post-processing. Docs are README, `REFERENCE.md`, FAQ and JSDoc; `examples/` stays out |
| 119 | regl (`regl`) | 4 | v2 2020-09 | README MIT | 40 | Functional WebGL. Docs are `API.md` plus README. Last publish 2024-11 |
| 120 | alphaTab (`@coderline/alphatab`) | 4 | 1.0 2020-07 (1.9 2026-10) | repo ✓ MPL-2.0 | 90 | Guitar tab and score rendering from AlphaTex text, with a player. Docs are `website/docs` (~180 pages); the Android and .NET pages stay out. The package ships a SoundFont, so playback works offline in full views. MPL-2.0, fine unmodified |
| 121 | perfect-freehand (`perfect-freehand`) | 4 | v1 (2026-02) | README MIT | 10 | Pressure-sensitive strokes |
| 122 | Rough.js (`roughjs`) | 4 | v4 2020 | repo ✓ MIT | 25 | Hand-drawn shapes. Stale since 2023 |
| 123 | JSXGraph (`jsxgraph`) | 4 | 1.x 2020 (1.14 2026-10) | repo ✓ MIT | 80 | Interactive geometry, function plots, 3D view. Dual MIT/LGPL; docs are JSDoc plus `src/tutorials/*.md`. The jsxgraph.org gallery stays out |
| 124 | Rough Notation (`rough-notation`) | 4 | 0.5 2020 | README MIT | 10 | Hand-drawn highlights. Stale |
| 125 | curtains.js (`curtainsjs`) | 4 | v8 2020 | README MIT | 50 | WebGL image effects. Low activity |
| 126 | Zdog (`zdog`) ✅ built | 4 | 1.0 2019 | repo ✗lic | 60 | Pseudo-3D. Stale but charming. Docs are the site source `metafizzy/zdog-docs` (`content/`, `modules/docs/`); its `demos/` stays out |
| 127 | SVG.js (`@svgdotjs/svg.js`) | 4 | v3 2018-12 | site | 50 | SVG animation, morphing, masks, gradients. Repo MIT; the API docs are on svgdotjs.github.io, source not found |
| 128 | canvas-confetti (`canvas-confetti`) | 4 | v1 (2025-10) | README ISC | 15 | Confetti bursts and shapes |
| 129 | Flubber (`flubber`) | 4 | 2018 | README MIT | 8 | SVG shape morphing. Abandoned |
| 130 | Lottie (`lottie-web`) | 4 | v5 (2025-05) | README MIT | 30 | Classic player; prefer dotLottie |
| 131 | mo.js (`@mojs/core`) | 4 | 2017 | site | 30 | Bursts and shapes. Abandoned |
| 132 | Cytoscape.js (`cytoscape`) | 4 | 3.35 2026-11 | repo ✓ MIT | 120 | Graph layouts |

## Tier 3: visual, narrower

| # | Package | Line since | Docs | ~Ex | Note |
|---|---|---|---|---|---|
| 133 | Excalibur (`excalibur`) | 1.0 2026-11 | repo ✗lic | 60 | 2D engine, brand-new 1.0. Docs repo `excaliburjs/excaliburjs.github.io` has no licence; its samples stay out |
| 134 | Mind Elixir (`mind-elixir`) | v6 2026-11 | README MIT | 20 | Mind maps |
| 135 | Video.js 10 (`video.js`) | v10 2026-10 | repo ✓ Apache | 90 | Rewrite with web-component skins and UI parts (first v10 package 2025-10). Docs are `site/src/content/docs` (51 guides, 180 reference pages); the React, Vue and Svelte pages and `apps/sandbox` stay out. Clips made in-page (canvas capture and MediaRecorder); streaming pages need a server |
| 136 | ProseKit (`prosekit`) | 0.23 2026-10 | repo ✓ MIT | 45 | ProseMirror toolkit with a vanilla adapter. Docs are `website/src/content/docs` (73 pages: 38 extensions, guides, components); `website/src/stories` stays out |
| 137 | Oat (`@knadh/oat`) | 1.0 2026-10 | repo ✓ MIT | 35 | ~8 KB semantic-HTML UI kit, no dependencies. First release 2026-02. Docs are `docs/content` (33 pages) |
| 138 | Chartist (`chartist`) | v2 2026-10 | repo ✓ MIT | 30 | SVG charts styled by CSS. Brand-new major. Docs in `apps/docs` |
| 139 | maxGraph (`@maxgraph/core`) | 0.25 2026-10 | repo ✓ Apache | 30 | Diagram editor, mxGraph successor. `packages/html/stories` stays out |
| 140 | Box2D v3 WASM (`box2d3-wasm`) | v6 2026-10 | repo ✗lic | 40 | Physics; needs a renderer. Wrapper repo has no licence and a stub README; upstream Box2D docs unchecked |
| 141 | Pragmatic drag and drop (`@atlaskit/pragmatic-drag-and-drop`) | v4 2026-09 | repo ✓ Apache | 25 | Headless drag and drop, no React needed. Docs folder (`packages/documentation`?) unverified |
| 142 | snapDOM (`@zumer/snapdom`) | v3 2026-09 | README MIT | 25 | DOM capture to SVG, PNG or canvas, with plugins, filters and fonts. First release 2025-04. Docs are the README, `FEATURES.md` and typings; `docs/` (the demo site) and `demos/` stay out |
| 143 | MathLive (`mathlive`) | 0.111 2026-09 | site | 30 | `<math-field>` editor with virtual keyboard, LaTeX and MathJSON. The repo's `documentation/` holds mathfield.md and the commands reference; no source or licence was found for the fuller cortexjs.io docs. `@cortex-js/compute-engine` is a text-output companion |
| 144 | @web-kits/audio (`@web-kits/audio`) | 0.2 2026-09 | repo ✓ MIT | 35 | Declarative Web Audio sounds and patches; `renderToBuffer` gives silent cards a waveform to draw. First release 2026-04. Docs are `apps/audio/content/docs` (~38 pages; React pages stay out). Young |
| 145 | troika-three-text (`troika-three-text`) | 0.53 2026-07 | README MIT | 20 | SDF text in Three.js |
| 146 | Rapier (`@dimforge/rapier2d`/`3d-compat`) | 0.21 2026-09 | repo ✓ Apache | 60 | Physics. JS repo merged into `dimforge/rapier` |
| 147 | Gridstack (`gridstack`) | v14 2026-09 | repo ✓ MIT | 25 | Draggable dashboard grids. Docs are README plus `doc/API.md`; `demo/` stays out |
| 148 | Ionic (`@ionic/core`) | v9 2026-08 | repo ✓ Apache | 80 | Mobile UI web components. Docs repo `ionic-team/ionic-docs`; embedded demos stay out. Heavy bundle |
| 149 | TanStack Table v9 (`@tanstack/table-core`) | v9 2026-08 | repo ✓ MIT | 50 | Headless tables: sorting, grouping, pinning, row models. Docs are `docs/framework/vanilla` (5) and `docs/guide` (18); the ~700 generated reference pages and other frameworks stay out. All markup is hand-written |
| 150 | Color.js (`colorjs.io`) | 0.7 2026-07 | repo ✓ MIT | 40 | Colour spaces, gamut mapping, interpolation, contrast. `notebook` and `apps` stay out |
| 151 | dnd-kit DOM (`@dnd-kit/dom`) | 0.5 2026-06 | repo ✓ MIT | 30 | Framework-agnostic core of the new dnd-kit. Vanilla docs exist: `apps/docs/docs/{quickstart.mdx,concepts,extend}` (about 17 pages: draggable, droppable, manager, sortable, sensors, modifiers, plugins) use `@dnd-kit/dom` directly. The react/vue/svelte/solid and `legacy/` folders and `apps/stories-vanilla` stay out |
| 152 | AG Grid (`ag-grid-community`) | v36 2026-06 | repo ✗lic | 80 | Data grid; Enterprise features gated. Mostly data, little visual |
| 153 | DHTMLX Gantt (`dhtmlx-gantt`) | v10 2026-06 | repo ✗lic | 40 | The npm package and repo are MIT since v10.0.0 (Community edition; GPL lives on the `9.x` branch). Docs repo `DHTMLX/gantt-docs` (785 en pages) has no licence. The docs cover PRO too: auto-scheduling, critical path, resources, baselines and constraints, plus undo, markers, multi-select and calendars, are missing from the MIT build. Check each feature against `guides/editions-comparison.md` |
| 154 | Basecoat (`basecoat-css`) | 1.0 2026-06 | repo ✓ MIT | 50 | shadcn/ui's look as plain HTML, CSS and small vanilla JS: dialog, command, combobox, sidebar, toast, eight themes. First release 2025-05. Docs are `site/src/docs` (46 pages) |
| 155 | Observable Notebook Kit (`@observablehq/notebook-kit`) | 2.0 2026-06 | repo ✓ ISC | 20 | Reactive HTML notebooks: runtime, Vite plugin, data loaders. First release 2025-07. Docs are ~8 pages in `docs/*.html`; `docs/ex/` and `gallery.html` stay out. Thin |
| 156 | Transformers.js (`@huggingface/transformers`) | v4 2026-03 | repo ✓ Apache | 40 | In-browser ML pipelines on ONNX Runtime Web (WebGPU or WASM): depth, segmentation, embeddings, speech, text generation. Docs are `packages/transformers/docs/source` plus the API reference; examples and `.ai/skills` stay out. Models download from the Hugging Face Hub (tens to hundreds of MB), so full views only and cards stand in |
| 157 | OpenSeadragon (`openseadragon`) | v6 2026-02 | README BSD-3 | 20 | Deep-zoom viewer; tile sources must be generated |
| 158 | Zag.js (`@zag-js/vanilla` + component machines) | 1.x, vanilla adapter 2026-01 | repo ✓ MIT | 55 | Headless UI state machines: 55 components (dialog, combobox, tour, colour picker, tree view, signature pad). Docs are `website/data/{components,guides,overview}`, but every snippet is React, Solid, Vue or Svelte, so vanilla wiring comes from the adapter guide and types; `examples/vanilla-ts` stays out |
| 159 | Jolt Physics (`jolt-physics`) | 1.0 2025-12 | README MIT | 25 | WASM 3D physics. `Examples/` stays out |
| 160 | xterm.js (`@xterm/xterm`) | v6 2025-12 | repo ✓ MIT | 25 | Terminal rendering, addons, themes; feed it a fake PTY. Docs repo `xtermjs/xtermjs.org`; `demo/` stays out |
| 161 | EmbedPDF (`@embedpdf/snippet`) | v2 2025-12 | repo ✓ Apache, docs CC BY 4.0 | 60 | PDFium-WASM viewer as a drop-in element, plus an engine API. First release 2025-06. Docs are `website/src/content/docs` (viewer and engine; the headless pages lean on frameworks), prose CC BY 4.0 and code MIT-0. `docs/content/samples`, `website/src/samples` and the FCL-licensed `cloudpdf/server` stay out. Self-host the WASM; PDFs made in code |
| 162 | DuckDB-WASM (`@duckdb/duckdb-wasm`) | 1.32 2025-12 | repo ✓ MIT | 150 | Analytical SQL in the page. npm `latest` is a 1.33 dev build (2026-06). Docs are `duckdb/duckdb-web` (MIT), versioned `docs/<ver>/` (`clients/wasm`, ~130 SQL pages, guides): vendor the one version matching the WASM's engine, not yet mapped. Data from `range()` and inline CSV; the httpfs and spatial extensions fetch. Multi-MB WASM |
| 163 | SpessaSynth (`spessasynth_lib`) | v4 2025-09 | repo ✓ Apache | 20 | SoundFont synth and MIDI sequencer on AudioWorklet, with offline rendering for silent cards. Docs are `docs/getting-started`, `docs/extra` and the typedoc API; `examples/` stays out. Needs `.sf2` and `.mid` files and ships none: use only what the docs link |
| 164 | Mediabunny (`mediabunny`) | v1 2025-07 | repo ✓ MPL-2.0 | 35 | WebCodecs read/write/convert; render canvas frames to video. MPL is file-level copyleft |
| 165 | camera-controls (`camera-controls`) | v3 2025-07 | README MIT | 20 | three.js orbit and fly controls |
| 166 | Cropper.js (`cropperjs`) | v2 2025-03 | repo ✓ MIT | 30 | Web-component cropper. VitePress `docs/`; `playground.md` stays out |
| 167 | Jspreadsheet CE (`jspreadsheet-ce`) | v5 2025-02 | repo ✓ MIT | 60 | Vanilla spreadsheet: formulas, merges, comments, plugins. Docs are `docs/jspreadsheet/docs`, which mixes v2–v5: vendor v5 only (subtree unconfirmed) and leave out the Pro features they describe. npm `license` is empty; the repo LICENSE is MIT |
| 168 | markmap (`markmap-view`) | 0.18 2024-12 | repo ✓ MIT | 15 | Markdown to mind map |
| 169 | LogicFlow (`@logicflow/core`) | v2 2024-08 | repo ✓ Apache | 50 | Flowchart and BPMN editor. Docs look Chinese-first; check the English share |
| 170 | chroma.js (`chroma-js`) | v3 2024-08 | repo ✓ BSD-3 | 40 | Colour scales, Brewer palettes, blending. Docs are one large `docs/index.html` |
| 171 | Media Chrome (`media-chrome`) | v4 2024-08 (4.19 2026-11) | repo ✓ MIT | 45 | ~30 media-control web components: time range, volume, captions and rendition menus, PiP. Docs are `docs/src/pages/docs/en` (~67 pages); `examples/` and the docs showcase stay out. Media made in-page |
| 172 | UI5 Web Components (`@ui5/webcomponents`) | v2 2024-07 (2.28 2026-10) | repo ✓ Apache | 100 | SAP's design system as framework-free web components. Docs are `packages/website/docs`; `_samples` stays out. Check `LICENSE.txt` for SAP asset terms. Heavy, with icon packs |
| 173 | Turf (`@turf/turf`) | v7 2024-06 (7.4 2026-08) | repo ✓ MIT | 100 | Geospatial analysis: buffer, union, Voronoi, isolines, clustering, along. Docs are the per-module READMEs and JSDoc. No tiles needed: results drawn as GeoJSON on SVG or canvas |
| 174 | Locomotive Scroll (`locomotive-scroll`) | v5 (2026-11) | README MIT | 8 | Scroll effects on Lenis. Fuller docs are site-only |
| 175 | Lenis (`lenis`) | v1 2024-04 | README MIT | 25 | Smooth scroll feel |
| 176 | Tabulator (`tabulator-tables`) | v6 2024-03 | site | 60 | Interactive tables. MIT; repo holds no docs |
| 177 | culori (`culori`) | v4 2024-01 | repo ✓ MIT | 30 | Colour parsing, OKLCH, interpolation, difference |
| 178 | Planck.js (`planck`) | v1 2023-12 | repo ✓ MIT | 60 | Box2D port with testbed |
| 179 | AutoAnimate (`@formkit/auto-animate`) | 0.10 (2026-11) | repo ✓ MIT | 12 | Zero-config list transitions |
| 180 | Two.js (`two.js`) | 0.8 (2026-08) | repo ✓ MIT | 80 | Renderer-agnostic 2D |
| 181 | Embla Carousel (`embla-carousel`) | v8 2024-02 | repo ✓ MIT | 30 | Carousel |
| 182 | Driver.js (`driver.js`) | v1 (2026-11) | repo ✓ MIT | 20 | Product tours |
| 183 | interact.js (`interactjs`) | 1.10 (2026-08) | repo ✓ MIT | 40 | Drag, resize, gestures |
| 184 | Matter.js (`matter-js`) | 0.20 2024-06 | repo ✓ MIT | 50 | 2D physics sandbox |
| 185 | Swup (`swup`) | v4 2023-07 | repo ✗lic | 30 | Page transitions with hooks; plugins are separate packages. Pages need a local fetch stub. Docs repo `swup/docs` |
| 186 | Carbon / Spectrum web components | 2023–24 | repo ✓ Apache | 40 each | IBM and Adobe design systems as web components. Docs paths in the monorepos unmapped |
| 187 | dygraphs (`dygraphs`) | 2.2 2023-01 | repo ✓ MIT | 40 | Time series. HTML docs; old API, active repo |
| 188 | Theatre.js (`@theatre/core`) | 0.7 2024 | site | 40 | Choreography editor. Stale |
| 189 | d3-delaunay (`d3-delaunay`) | v6 2021 | README ISC | 20 | Voronoi patterns |
| 190 | CodeMirror (`codemirror`) | v6 2022 | site | 100 | Editor. Moved off GitHub |
| 191 | Tiptap / Lexical / Milkdown | 2024–26 | Tiptap repo ✓ MIT; others unchecked | 60 each | Rich-text editors. Tiptap's MIT `LICENSE-DOCS` covers only `src/content` of `tiptap-docs`; many pages are Pro or Cloud |
| 192 | Satori (`satori`) | 0.63 (2026-10) | README MPL | 20 | HTML/CSS to SVG |
| 193 | uPlot (`uplot`) | v1 2020 | README MIT | 30 | Fast time series |
| 194 | Splitting (`splitting`) | v1 2018 | README MIT | 12 | Text/grid splitting into CSS vars |
| 195 | Chart.js (`chart.js`) ✅ built | v4 2022 | repo ✓ MIT | 154 | Canvas charts. Docs are the repo's `docs/` markdown at v4.6.1; `docs/samples` (the official sample gallery) stays out. Time axes run on a small in-repo date adapter |
| 196 | Sortable.js (`sortablejs`) ✅ built | v1 | README MIT | 25 | Drag-sort lists. Docs are the README and `plugins/*/README.md` at the release tag; `index.html` and `st/` are the demo site and stay out |
| 197 | Muuri (`muuri`) | 0.9 2021 | repo ✓ MIT | 30 | Animated grids. Abandoned |

## Tier 1–2: little to look at

These are better as compact, text-output examples. Build them after the visual tiers.

| # | Package | Line since | Docs | Note |
|---|---|---|---|---|
| 198 | TanStack Hotkeys (`@tanstack/hotkeys`) | 0.30 2026-11 | repo ✓ MIT | Typed hotkeys, key sequences, a shortcut recorder. First release 2026-02. Vendor `docs/guides`, `docs/reference` and `docs/framework/lit`, not the other frameworks. Moves fast |
| 199 | oxc (`oxc-parser`, `oxc-transform`, `oxc-minify`) | 0.x weekly (0.158 2026-11) | README MIT | Rust JS/TS parser, transformer and minifier as WASM in the page: AST dumps, TS and JSX stripping, isolated declarations, minify. Docs are the `napi/*` READMEs plus typings (the oxc.rs site repo has no licence). Thin; in-page use unverified |
| 200 | Remix 3 (`remix`) | v3 2026-10 | repo ✓ MIT | Web-standards toolkit: `fetch-router`, `route-pattern`, cookies, sessions, multipart and tar parsers, its own JSX `component` runtime. Docs are `packages/remix/guides` (15) plus ~50 package READMEs. Server-side parts (data tables, S3) stay out; which exports run in a page is unchecked |
| 201 | Effect (`effect`) | v4 2026-10 | repo ✓ MIT + site | Typed effects, Schema, Stream, Layer and Schedule in one dependency-free package. The v4 docs in the MIT repo are `LLMS.md`, `MIGRATION.md`, `ai-docs/` (24 topics) and JSDoc; the licence-less effect.website may still describe v3. Output is logs and traces |
| 202 | TanStack DB (`@tanstack/db`) | 1.0 RC 2026-10 | repo ✓ MIT | Typed collections with incremental live queries and optimistic mutations; local-only collections need no backend. First release 2025-05. Docs are `docs/{overview,quick-start,guides,collections}`; framework folders stay out. npm `latest` is an RC, so pin it |
| 203 | LiveStore (`@livestore/livestore`) | 0.5 2026-10 | repo ✓ Apache | Event-sourced SQLite with reactive queries; the web adapter has an in-memory mode (persisted mode wants a worker and OPFS). Docs are `docs/src/content/docs` (~100 pages); sync-provider pages need servers |
| 204 | TinyBase (`tinybase`) | v10 2026-09 | repo ✓ MIT | Reactive store: tables, queries, relationships, metrics, checkpoints, a mergeable CRDT store, browser persisters. Docs are `site/guides` (111 pages) plus the API typings with runnable snippets; `site/demos` and the UI-framework guides stay out. Rich |
| 205 | Turso (`@tursodatabase/database-wasm`) | 0.8 2026-09 | repo ✓ MIT | Rust rewrite of SQLite, beta, with a `:memory:` mode. First release 2025-09. Docs are `docs/` (51 SQL reference pages, manual, JS API, FTS). 11 MB WASM; unverified whether it needs cross-origin isolation, which GitHub Pages can't enable |
| 206 | Cap'n Web (`capnweb`) | 0.12 2026-08 | repo ✓ MIT | Cloudflare's object-capability RPC with promise pipelining; the MessagePort transport puts both ends in one page. First release 2025-09. Docs are `packages/docs/src/content/docs` (~35 pages); the docs' Playground and `examples/` stay out |
| 207 | gpt-tokenizer (`gpt-tokenizer`) | v4 2026-08 | README MIT | Pure-JS BPE tokenisers: token counts, chat encoding, cost estimates. Offline, nothing to download |
| 208 | Pyodide (`pyodide`) | 314 2026-06 | repo ✓ MPL-2.0 | CPython in WASM (~9 MB plus stdlib): JS↔Python bridging, filesystem, async runs. Versions now follow Python (314 = 3.14). Docs are `docs/usage` (30 pages). Wheels such as numpy load from a CDN, so stdlib only |
| 209 | PGlite (`@electric-sql/pglite`) | 0.5 2026-06 | repo ✓ Apache | Postgres in WASM with an in-memory filesystem, live queries and extensions (pgvector, ltree). Docs are `docs/` (~20 pages); the REPL, examples and React/Vue hook pages stay out. ~15 MB |
| 210 | just-bash (`just-bash`) | v3 2026-05 | README Apache | Simulated bash with grep, sed, awk, jq and an in-memory filesystem, browser export included. First release 2025-12. Docs are the package README and typings. Thin |
| 211 | messageformat (`messageformat`) | v4 2025-11 | README Apache | Unicode MessageFormat 2 (the v4 rewrite): plurals, selectors, custom functions. Docs are the `mf2/` READMEs; the repo's `docs/` covers v3 and stays out. Thin |
| 212 | alien-signals (`alien-signals`) | v3 2025-09 | README MIT | The push-pull signal algorithm behind Vue 3.6: `signal`, `computed`, `effect`, `effectScope`. README-only, thin; a dependency-graph readout gives it something to show |
| 213 | TypeBox (`typebox`) | v1 2025-09 | repo ✓ MIT | JSON Schema types plus `Value`, compile and `Script` (TS syntax to schema); the unscoped successor to `@sinclair/typebox`. Docs are `design/website/docs` (138 pages); `example/` stays out |
| 214 | noble (`@noble/hashes`, `/curves`, `/ciphers`, `/post-quantum`) | v2 2025-08 | README MIT | Audited pure-JS crypto: SHA-2/3, BLAKE, ed25519, secp256k1, ChaCha, ML-KEM, ML-DSA. Four repos, each README-only but long |
| 215 | Automerge (`@automerge/automerge`) | v3 2025-07 | repo ✓ MIT | CRDT documents (3.5 MB WASM), merging two copies in one page. Docs repo `automerge/automerge.github.io`, `content/docs` (~41 pages); automerge-repo networking and React pages stay out |
| 216 | oRPC (`@orpc/server`, `@orpc/client`) | v1 2025-04 | repo ✓ MIT | Contract-first typed RPC and OpenAPI; the message-port adapter puts client and server in one page. Docs are `apps/content/docs` (137 pages); framework integrations and `playgrounds/` stay out |
| 217 | fast-check (`fast-check`) | v4 2025-03 | repo ✓ MIT | Property-based testing with shrinking, model-based and race-condition runs; examples show counterexamples and shrink traces. Docs are `website/docs` (68 pages) |
| 218 | ArkType (`arktype`) | v2 2025-01 | repo ✓ MIT | Validation written in TS syntax: morphs, scopes, `match`, JSON Schema, plus `arkregex`. Docs are `ark/docs/content` (34 pages); the `attest` pages stay out |
| 219 | Loro (`loro-crdt`) | 1.x 2024 (1.17 2026-10) | repo ✗lic | CRDTs with rich text, movable trees and time travel (3.4 MB WASM). Docs repo `loro-dev/loro-docs` has no licence; ~45 English pages under `pages/docs` |
| 220 | Zod (`zod`) ✅ built | v4 2025-07 | repo ✓ MIT | Validation. Docs are the zod.dev source (`packages/docs/content/*.mdx`) at v4.6.7 plus the package README and the 4.5, 4.6 and `z.compile()` posts; the other blog posts are essays, not docs |
| 221 | Valibot (`valibot`) | v1 2025-03 | repo ✓ MIT | Validation |
| 222 | Arquero (`arquero`) | v8 2025-02 | site | Data wrangling; repo BSD-3 |
| 223 | Marked + DOMPurify (`marked`) ✅ built | v18 2026-04 | repo ✓ MIT | Markdown. Docs are the repo `docs/` pages (INDEX, USING_ADVANCED, USING_PRO, broken.md), README and `src/`; `docs/demo/` stays out |
| 224 | ky ✅ built | v2 2026-04 | README MIT | HTTP. Docs are the readme plus the TSDoc in `source/types` and `source/errors`; requests go to an in-page pretend server through the `fetch` option |
| 225 | Wretch (`wretch`) ✅ built | v3 2025-10 | README MIT | HTTP. Docs are README, RECIPES, the v2→v3 guide and the library source (the API site is generated from it); 123 examples on an in-memory server reached through `.fetchPolyfill()` |
| 226 | **Tone.js** (`tone`) ✅ built | v15 2024-05 | repo ✗lic (wiki) + source | Audio; `next` tag far ahead of `latest` |
| 227 | Fuse.js (`fuse.js`) ✅ built | v7 2023-10 | repo ✓ Apache | Fuzzy search. Docs are the VitePress `docs/` pages and articles at v7.5.0 plus README, CHANGELOG and `src/` (the site has no API reference pages any more); `demo.md` and the Vue demo components stay out |
| 228 | Dexie.js (`dexie`) ✅ built | v4 2024-03 | repo ✗lic (`dexie/dexie-web` `docs/`) | IndexedDB. `docs/cloud` (needs a sync server) and the Samples page (links to official demos) stay out; dexie 4.4.7 live-query cache bug worked around in `shared/cache-fix.ts` |
| 229 | Papa Parse (`papaparse`) ✅ built | v5 2019 | repo ✓ MIT | CSV. Docs are the site source in the repo's `docs/` (docs, FAQ, home) at 5.7.1 plus README, CHANGELOG and source; `demo.html` and `player/` stay out. Downloads go to an in-page fake server |
| 230 | Floating UI (`@floating-ui/dom`) | v1 2022 | repo ✓ MIT | Positioning; replaces archived Tippy |
| 231 | Temporal polyfill (`temporal-polyfill`) | v1 | repo | Dates |
| 232 | harfbuzzjs, fitty, mark.js, panzoom, Howler, tonal, webmidi | various | README | Small or audio-only |
| 233 | Tippy.js (`tippy.js`) ✅ built | v6 2020 | repo ✓ MIT (`website/src/pages/v6`) | Repo archived; Floating UI succeeds it. `website/src/components/examples/` stays out |
| 234 | Pizzicato.js (`pizzicato`) ✅ built | 0.6 2018 | README MIT + source | Abandoned. Docs are the repo README and `src/` at tag 0.6.4; the gh-pages demo site stays out |

## Cautions

- **Docs that can't be committed.** anime.js, Motion and GSAP have site-only docs with
  no licence, as do Paper.js, Konva, PixiJS, Swiper and Rive in repos without a licence.
  So do Fabric.js, Kaplay, Swup and Excalibur (docs repos without a licence), AntV G (no
  LICENSE file) and AG Charts / AG Grid ("MIT and Commercial" repo). Of the second
  2026-11-14 pass: Univer and MathLive (site, no licence), the shaders.com part of Shaders,
  and Loro and That Open (docs repos without a licence). All of these vendor
  with `redistribute: false` (gitignored). That's fine for building; it just means
  re-vendoring per worktree.
- **Attribution.** Plotly's docs are CC BY 3.0, and MediaPipe's and EmbedPDF's prose is
  CC BY 4.0: committed docs and the gallery credit them.
- **Copyleft.** Hydra (`hydra-synth`, AGPL) and Strudel (`@strudel/web`, AGPL, on
  Codeberg) are both visual-5 and very new-feeling, but AGPL code bundled into a public
  site carries obligations. Ask Mase before building them. Typed.js v3 moved to GPL-3.0.
  p5.js the library is LGPL. Also AGPL: audioMotion-analyzer, Shepherd, Intro.js.
  Isotope is GPL-3; elkjs is EPL. Mediabunny, Satori and JointJS (`@joint/core`) are
  MPL-2.0, which is file-level copyleft and fine unmodified; so are alphaTab, D2 and
  Pyodide. q5.js is LGPL-3.0 and Replicad's OpenCascade kernel
  (`replicad-opencascadejs`) LGPL-2.1, the same question as p5: ask Mase. Graphviz's docs
  are EPL-2.0, fine to vendor unmodified. GPL, skipped: `swapy`, `@ortho-earth/globe`.
- **Non-OSI or commercial.** GSAP's no-charge licence bars use in tools that compete with
  Webflow; a demo gallery is fine. ApexCharts is restricted. Highcharts is free only for
  non-commercial use; amCharts 5 must show its logo; GoJS and bpmn-js watermark;
  Handsontable is non-commercial; LYGIA is Prosperity-licensed; `@cosmograph/*` is
  CC BY-NC; Remotion and Pintura have their own commercial terms. Also `deepscatter`
  (CC BY-NC-SA), `mapgpu` (npm says PolyForm Noncommercial, GitHub says MIT),
  `@imgly/background-removal` (custom terms) and `@tailwindplus/elements` (commercial).
  Ask Mase before any of these. Univer, Shaders and Jspreadsheet document paid features
  beside the free ones, and Quickdraw shows a watermark unless turned off.
- **Closed or gated.** Spline's runtime (`@splinetool/runtime`) has no licence and no
  public repo. Needle Engine has no licence and a commercial workflow; Unicorn Studio
  scenes need its closed editor; Mapbox GL needs a token and its ToS. MapTiler SDK needs
  a key. `@browser-ai/core` and `prompt-api-polyfill` need Chrome's built-in model or a
  hosted API; LiveCodes embeds its app from livecodes.io. Skipped.
- **Framework-only (excluded).** React Three Fiber, `@pixi/react`, Threlte (Svelte),
  TresJS (Vue), xyflow, tldraw, Excalidraw, kepler.gl, NgDiagram (Angular), Waveform
  Playlist v5 (React). React-first with a thin vanilla path: `@pmndrs/uikit`,
  `@ssgoi/core`; LikeC4 needs React at build time.
- **Asset-dependent.** Rive, Lottie/dotLottie and Spark need content files (`.riv`,
  `.lottie`, splats), as do model-viewer (glTF), NiiVue (NIfTI), That Open (IFC) and
  SpessaSynth (`.sf2`, `.mid`). Use only assets the official docs ship or link.
- **Model downloads.** MediaPipe and Transformers.js fetch models (megabytes to hundreds
  of megabytes) at run time: full views only, with a drawn stand-in in cards. WebLLM and
  wllama were skipped for their 100 MB–4 GB models.
- **Big WASM and isolation.** DuckDB-WASM, PGlite, Pyodide, Turso, Replicad and Automerge
  ship multi-MB WASM. GitHub Pages can't send COOP/COEP headers, so anything that needs
  `SharedArrayBuffer` (unverified for Turso and oxc) won't run there.
