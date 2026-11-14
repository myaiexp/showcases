# Package showcase list

Ranked candidates for per-package galleries, **newest and most visual first**.
Checked 2026-11-13 against the npm registry and GitHub/Codeberg APIs; the 2026-11-14
additions and the resolved Docs entries were checked the same way. Visual scores and
example counts are estimates, and the 2026-11-14 counts come from docs file trees, not
from reading pages.

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
| 3 | Three.js (`three`) ✅ built | 5 | r187 2026-10 | repo ✓ MIT | 400+ | WebGPU renderer, TSL shaders. Vendor `docs/` only, not the 639 `examples/` |
| 4 | Sigma.js (`sigma`) ✅ built | 5 | v4 2026-10 | repo ✓ MIT | 70 | WebGL graphs, 100k+ nodes (pairs with graphology). Docs are the website chapters plus companion-package READMEs; the embedded SigmaExample stories stay out (pattern.md § Purity) |
| 5 | Use.GPU (`@use-gpu/core` and siblings) | 5 | 0.21 2026-10 | site | 40 | Declarative WebGPU graphics. Vanilla TS, but on its own React-like `live` JSX runtime. npm says MIT; the GitLab repo declares no licence |
| 6 | **Mermaid** (`mermaid`) ✅ built | 5 | v12 2026-09 | repo ✓ MIT | 250 | Text to diagrams. Huge breadth. Docs are the site source (intro, syntax, config) plus the generated API reference; ZenUML needs the separate `@mermaid-js/mermaid-zenuml` package |
| 7 | Plotly.js (`plotly.js`) | 5 | v4 2026-08 | repo ✓ CC BY 3.0 | 200 | Scientific breadth: 3D, statistical, financial, maps. Docs repo `plotly/graphing-library-docs` mixes Python and R; vendor the JS posts only, with attribution. Map traces want tiles. Large bundle |
| 8 | Perspective (`@perspective-dev/viewer`) ✅ built | 5 | v5 2026-07 | repo ✓ Apache | 60 | Streaming pivot/visual analytics web component. Docs are the mdbook under `docs/md` plus the package READMEs; the docs site's project gallery stays out. Examples share one Web Worker engine and must delete their tables |
| 9 | MapLibre GL JS (`maplibre-gl`) ✅ built | 5 | v6 2026-07 | repo ✓ BSD | 150 | Vector maps, 3D terrain, globe. Docs are the API reference and style spec (site crawl) plus repo guides; all examples run offline on Natural Earth data and computed tiles |
| 10 | Orillusion (`@orillusion/core`) | 5 | 0.9 2026-06 | repo ✗lic | 60 | WebGPU-only engine: PBR, GI, particles. Docs repo `Orillusion/orillusion-web` has no LICENSE (`master` is Chinese, the `en` branch English): vendor `docs/guide` (86 pages) and the API reference (`docs/{api,physics,particle,media-extention,geometry,graphic}`). `docs/example/` and `docs/public/demos/` stay out; guide pages embed a live `<Demo>` and pull its whole source in with `<<< @/public/demos/…`, so vendor the page markdown with its own inline snippets, not the included files |
| 11 | vfx-js (`@vfx-js/core`) | 5 | 1.0 2026-05 | repo ✓ MIT | 30 | Shader effects on DOM elements, images, video, page transitions. Vanilla core beside framework wrappers. Docs are README, `docs/*.md`, `skills/vfx-js/**` and the package READMEs. `packages/docs` is a prose Astro site (getting-started, shaders, effects, custom-effects, how-it-works) written as `.astro` pages, so fetch those as pages from the site; its `src/demos/`, the site's Examples page and `packages/examples` stay out |
| 12 | Spark (`@sparkjsdev/spark`) ✅ built | 5 | v2 2026-04 | repo ✓ MIT | 97 | Gaussian splats on three.js. Docs are the mkdocs pages in the repo; Community Resources stays out. Most examples are procedural; the docs' one linked asset, butterfly.spz, loads from sparkjs.dev in full views only |
| 13 | **Babylon.js** (`@babylonjs/core`) ✅ built | 5 | v9 2026-03 | repo ✓ Apache | 300+ | Full engine, PBR, WebGPU |
| 14 | cobe (`cobe`) | 5 | v2 2026-03 | README MIT | 10 | Small WebGL dotted globe |
| 15 | tsl-textures (`tsl-textures`) | 5 | 3.0 2026-02 | repo ✓ MIT | 50 | ~53 procedural TSL textures (marble, planet, wood, water) for `three/webgpu`, so it shares the Three gallery's core. README may be the whole docs; `examples/` stays out |
| 16 | cosmos.gl (`@cosmos.gl/graph`) | 5 | v3 2026-02 | site | 25 | GPU force layout for 1M+ nodes. Docs site is a Storybook: guide and config pages only, the stories stay out. Not `@cosmograph/*`, which is CC BY-NC |
| 17 | AntV Infographic (`@antv/infographic`) | 5 | 0.2 2025-12 | repo ✓ MIT | 40 | New, infographic templates. Docs are `site/src/content/{learn,reference}` |
| 18 | **Apache ECharts** (`echarts`) ✅ built | 5 | v6 2025-07 | repo ✓ Apache | 400 | Biggest chart breadth, animated, 3D. Docs are the handbook (`apache/echarts-handbook`) plus the option and API reference (`apache/echarts-doc`); the handbook's embedded gallery demos stay out (pattern.md § Purity). ECharts GL is a separate package |
| 19 | **VChart** (`@visactor/vchart`) ✅ built | 5 | v2 2025-06 | repo ✓ MIT | 150 | Narrative/animated charts. Docs are `docs/assets/{guide,option,api,changelog,faq}` in VisActor/VChart; its `examples/` and `demos/` gallery stays out. 3D charts and the extension charts need `@visactor/vchart-extension` |
| 20 | GSAP (`gsap`) ✅ built | 5 | 3.x, plugins free since 2025 | site | 250 | SplitText, MorphSVG, ScrollTrigger, Flip. Non-OSI licence |
| 21 | Paper Shaders (`@paper-design/shaders`) | 5 | 0.0.x 2024-10 | repo ✓ Apache | 30 | Shader-effect pack, vanilla build alongside React. The docs site is the demo gallery: every `docs/src/app/(shaders)/*/page.tsx` is a playground, so none of it is vendored. What counts as docs is the READMEs (the vanilla one is three lines) and the per-shader parameter tables in `docs/src/shader-defs/*-def.ts` (description, range, default). Vanilla `ShaderMount` usage is documented nowhere, so it comes from the package's types and source. Thin |
| 22 | PlayCanvas (`playcanvas`) ✅ built | 5 | v2 2024-08 | repo ✓ MIT | 350 | Engine with Gaussian splats. Docs are the developer-site user manual (engine chapters plus the component reference); the Editor-based tutorials stay out because each embeds a demo project. Physics loads sync-ammo; splats, models and textures are generated in code |
| 23 | VStory (`@visactor/vstory`) | 5 | 0.0.x 2024-07 | repo ✓ MIT | 30 | Animated data storytelling on VChart. `docs/assets` guide and API; `docs/assets/examples` stays out |
| 24 | **AntV G6** (`@antv/g6`) ✅ built | 5 | v5 2024-06 | repo ✓ MIT | 120 | Graph visualisation. Docs in `packages/site`; its example files stay out |
| 25 | deck.gl (`deck.gl`) ✅ built | 5 | v9 2024-03 | repo ✓ MIT | 389 | GPU geospatial layers. Docs are `docs/` at v9.4.1; every example runs offline (tiles, terrain and glTF made in code). CARTO, ArcGIS, Google Maps and React are left out; MVT, Tile3D and WMS need a server |
| 26 | Rive (`@rive-app/canvas`) | 5 | v2 2023-07 | repo ✗lic | 40 | State-machine art; needs `.riv` assets |
| 27 | Galacean (`@galacean/engine`) | 5 | 1.0 2023-04 | repo ✓ MIT | 150 | Full WebGL engine; `docs/en` has ~185 pages. Pages that assume the Editor or embed playgrounds stay out. 2.0 is in alpha, so the line may move |
| 28 | AntV G2 (`@antv/g2`) | 5 | v5 2023-03 | repo ✓ MIT | 150 | Grammar-of-graphics charts. Docs in `site/docs` |
| 29 | Observable Plot (`@observablehq/plot`) ✅ built | 5 | 0.6 (2026-11) | repo ✓ ISC | 544 | Polished charts, minimal code. Docs are the repo's `docs/` pages plus the `test/data` files they load, so every example runs on the docs' own datasets offline; the notebooks and gallery the docs link stay out |
| 30 | D3 (`d3`) | 5 | v7 2021-06 | repo ✓ ISC | 300 | Bespoke graphics |
| 31 | AntV L7 (`@antv/l7`) | 5 | 2.x 2020 (2.29 2026-07) | repo ✓ MIT | 80 | WebGL geospatial layers: heatmaps, 3D bars, flows. Docs in `site/docs` (prose, en and zh); `site/examples` stays out. Runs without a basemap: `Map` from `@antv/l7-maps` needs no tiles or token (`site/docs/api/map/map.en.md`). Cards set `logoVisible: false`, since the default logo loads from alipayobjects.com, and skip the `water`/`ocean` polygon shapes and raster tile layers, which fetch too |
| 32 | A-Frame (`aframe`) | 5 | 1.0 2019-12 (1.8 2026-06) | repo ✓ MIT | 100 | HTML 3D and XR on a bundled three.js; 105 pages in `docs/`. Primitives and shaders need no assets; XR needs a headset |
| 33 | postprocessing (`postprocessing`) | 5 | 6.0 2019-03 (6.39 2026-11) | repo ✓ Zlib | 50 | three.js effects: bloom, god rays, SMAA, SSAO, DoF, LUT. Docs are the JSDoc API (esdoc over `src/`) plus the four prose pages in `manual/content` (getting-started, custom-effects, migration-guide, plugins-tools). `manual/content/demos/` pages are empty stubs that load scripts from `manual/assets/js/src/demos/`, the demo gallery; that and the legacy `demo/` app stay out |
| 34 | globe.gl (`globe.gl`) | 5 | v2 (2026-08) | README MIT | 30 | Data globes on Three.js |
| 35 | CesiumJS (`cesium`) | 5 | 1.147 2026-11 | repo ✓ Apache | 100 | 3D globe; Ion token for some data. Docs are the JSDoc plus `Documentation/` guides; Sandcastle stays out |

## Tier 4: strongly visual

| # | Package | Vis | Line since | Docs | ~Ex | Note |
|---|---|---|---|---|---|---|
| 36 | Paper.js (`paper`) | 4 | 0.17 2026-11 | repo ✗lic | 100 | Vector path scripting, just revived |
| 37 | Leaflet (`leaflet`) | 4 | 2.0 beta 2026-11 | repo ✓ BSD-2 | 60 | `latest` is still 1.9.4 (2023-05); build on the 2.0 `beta` tag. Raster tiles are network, so cards stay on GeoJSON |
| 38 | Mosaic vgplot (`@uwdata/vgplot`) | 4 | 0.35 2026-11 | repo ✓ BSD-3 | 60 | Cross-filtered plots on DuckDB-WASM. Heavy, and 0.x moves fast |
| 39 | dotLottie (`@lottiefiles/dotlottie-web`) | 4 | 0.83 2026-11 | README MIT | 30 | Lottie with state machines and themes; needs assets |
| 40 | textmode.js (`textmode.js`) | 4 | 0.18 2026-10 | README MIT | 25 | ASCII/text-mode rendering, new 2025. API from the typings; `examples/` stays out |
| 41 | **Motion** (`motion`) ✅ built | 4 | v14 2026-10 | site | 120 | Springs, scroll, layout, gestures. JS docs only: React/Vue pages and Motion UI (Motion+, paid) stay out |
| 42 | Pts (`pts`) | 4 | 1.0 2026-09 | repo ✓ Apache | 80 | Generative art, just hit 1.0 |
| 43 | wavesurfer.js (`wavesurfer.js`) | 4 | v8 2026-09 | README BSD | 50 | Audio waveforms, regions, spectrogram |
| 44 | Monaco Editor (`monaco-editor`) | 4 | 0.57 2026-09 | README MIT | 25 | VS Code editor. Docs are README plus `monaco.d.ts`; the playground stays out |
| 45 | melonJS (`melonjs`) | 4 | v20 2026-08 | repo ✓ MIT | 40 | 2D engine, Tiled maps, physics adapters. Where the API site's source lives is unconfirmed; `packages/examples` stays out |
| 46 | TypeGPU (`typegpu`) | 4 | 0.12 2026-08 | repo ✓ MIT | 100+ | Typed WebGPU compute and shaders |
| 47 | ChartGPU (`chartgpu`) | 4 | 0.4 2026-08 | repo ✓ MIT | 40 | WebGPU charts for millions of points. Cards need a non-WebGPU fallback. Young |
| 48 | number-flow (`number-flow`) | 4 | 0.6 2026-07 | repo ✓ MIT | 25 | Morphing digits, vanilla element |
| 49 | Swiper (`swiper`) | 4 | v14 2026-06 | repo ✗lic | 60 | Sliders with 3D effects |
| 50 | billboard.js (`billboard.js`) | 4 | v4 2026-06 | site | 80 | D3-based charts. Docs are the README, typings and the naver.github.io site; `demo/` and `stories/` stay out |
| 51 | FullCalendar (`@fullcalendar/core`) | 4 | v7 2026-06 | site | 60 | Calendar views. Repo is MIT but holds no docs |
| 52 | Blockly (`blockly`) | 4 | v13 2026-06 | site | 50 | Visual block editor: custom blocks, generators, themes. Docs on developers.google.com; content licence unverified |
| 53 | AG Charts (`ag-charts-community`) | 4 | v14 2026-06 | repo ✗lic | 120 | Vanilla charts. Community features only: Enterprise ones watermark. Repo is "MIT and Commercial" |
| 54 | NiiVue (`@niivue/niivue`) | 4 | 0.69 2026-05 | repo ✓ BSD-2 | 25 | WebGL medical volume and mesh viewer. Needs NIfTI and mesh files: only ones the docs ship or link |
| 55 | opentype.js (`opentype.js`) | 4 | v2 2026-05 | repo ✓ MIT | 30 | Glyph paths, variable fonts |
| 56 | tsParticles (`@tsparticles/engine`) | 4 | v4 2026-05 | repo ✓ MIT | 150 | JSON-driven particle effects |
| 57 | Phaser (`phaser`) | 4 | v4 2026-04 | repo ✓ MIT | 150 | 2D game framework. Docs are the `docs/` guides plus the JSDoc API; docs.phaser.io is the site |
| 58 | Shiki (`shiki`) | 4 | v4 2026-02 | repo ✓ MIT | 60 | VS Code-grade highlighting, themes |
| 59 | Leafer UI (`leafer-ui`) | 4 | v2 2026-01 | repo ✓ MIT | 80 | Canvas UI scene graph: interaction, animation, editor, flow. Docs repo `leaferjs/docs`, `en/` only; plugins are separate packages |
| 60 | Fabric.js (`fabric`) | 4 | v7 2025-12 | repo ✗lic | 90 | Interactive canvas objects, filters, SVG in/out, free drawing. Docs repo `fabricjs/fabricjs.com`; its `demos/` stays out |
| 61 | AntV X6 (`@antv/x6`) | 4 | v3 2025-12 | repo ✓ MIT | 60 | Graph editor: ports, edge routers, stencils, minimap. Docs in `site/docs` |
| 62 | Web Awesome (`@awesome.me/webawesome`) | 4 | v3 2025-10 | repo ✓ MIT | 80 | Web-component UI kit. Docs in `packages/webawesome/docs`; check the package `LICENSE.md` for Pro carve-outs |
| 63 | vis-network (`vis-network`) | 4 | v10 2025-07 | repo ✓ Apache/MIT | 60 | Physics-driven networks. Docs are hand-written HTML in `docs/network`; `examples/` stays out |
| 64 | vis-timeline (`vis-timeline`) | 4 | v8 2025-07 | repo ✓ Apache/MIT | 40 | Timelines and Graph2D. HTML docs |
| 65 | VRender (`@visactor/vrender`) | 4 | v1 2025-06 | repo ✓ MIT | 60 | Canvas/SVG scene graph with animation, under VChart |
| 66 | p5.js (`p5`) | 4 | 2.0 2025-04 | repo ✓ MIT (site repo) | 300+ | Creative coding. The library is LGPL; check the reference content licence |
| 67 | Vega-Lite (`vega-lite`) | 4 | v6 2025-03 | repo ✓ BSD | 200 | Declarative JSON charts |
| 68 | VexFlow (`vexflow`) | 4 | v5 2025-03 | README MIT | 25 | Music engraving. No docs folder: README plus typings; `demos/` and `tests/` stay out |
| 69 | VGrammar (`@visactor/vgrammar`) | 4 | 0.16 2025-02 | repo ✓ MIT | 60 | Grammar-based visualisation and animation. Docs in `docs/site`, en and zh |
| 70 | lightweight-charts (`lightweight-charts`) | 4 | v5 2025-01 | repo ✓ Apache | 60 | Financial charts, panes |
| 71 | three-mesh-bvh (`three-mesh-bvh`) | 4 | 0.9 2025-01 | README MIT | 20 | Fast raycasts, shapecasts, SDFs and GPU BVH for three.js |
| 72 | AntV S2 (`@antv/s2`) | 4 | v2 2024-11 | repo ✓ MIT | 50 | Pivot and table sheets on canvas. Docs in `s2-site/docs` |
| 73 | model-viewer (`@google/model-viewer`) | 4 | v4 2024-10 | repo ✓ Apache | 40 | glTF web component. Docs are `packages/modelviewer.dev/data/{docs,faq}.json`; `examples.json` stays out. Needs glTF assets |
| 74 | Kaplay (`kaplay`) | 4 | v3001 2024-10 | repo ✗lic | 80 | Kaboom successor: sprites, scenes, physics, particles. Docs repo `kaplayjs/kaplay-site`. v4000 is in alpha on `next` |
| 75 | OpenLayers (`ol`) | 4 | v10 2024-07 | repo ✓ BSD-2 | 250 | Full GIS maps. Docs are the JSDoc plus `site/src/doc`; the 728-file `examples/` gallery stays out |
| 76 | thi.ng umbrella (`@thi.ng/geom` and siblings) | 4 | geom v8 2024-06 | repo ✓ Apache | 150 | Generative geometry, colour, SVG and canvas. On Codeberg; each package's README is its docs; root `examples/` stays out. Likely one gallery per sub-package |
| 77 | VTable (`@visactor/vtable`) | 4 | v1 2024-05 | repo ✓ MIT | 120 | Canvas tables with in-cell charts, sparklines, pivot, Gantt. Docs in `docs/assets`, en and zh |
| 78 | PixiJS (`pixi.js`) | 4 | v8 2024-03 | repo ✗lic | 150+ | Fast 2D WebGL, filters |
| 79 | luma.gl (`@luma.gl/core`) | 4 | v9 2024-03 | repo ✓ MIT | 80 | WebGL2 plus WebGPU adapter under deck.gl. Low-level: shaders and GPGPU. ~550 docs files |
| 80 | AntV G (`@antv/g`) | 4 | v6 2024-03 | repo ✗lic | 70 | Renderer under G2/G6/X6: Canvas, SVG, WebGL, WebGPU. npm says MIT, repo has no LICENSE |
| 81 | Konva (`konva`) | 4 | v10 (2026) | repo ✗lic | 150 | Interactive canvas shapes |
| 82 | OGL (`ogl`) | 4 | 1.0 2023-08 | README Unlicense | 40 | Minimal WebGL |
| 83 | Atropos (`atropos`) | 4 | v2 2023-06 | README MIT | 15 | Parallax tilt |
| 84 | Unovis (`@unovis/ts`) | 4 | v1 2022-12 (1.8 2026-11) | repo ✓ Apache | 80 | Framework-agnostic TS charts: graph, Sankey, maps, timeline. Docs in `packages/website` |
| 85 | AntV F2 (`@antv/f2`) | 4 | v5 2022-11 | repo ✓ MIT | 40 | Mobile-first canvas charts with gestures. Low activity |
| 86 | abcjs (`abcjs`) | 4 | v6 2022 | repo ✓ MIT | 50 | Music notation and playback. VuePress `docs/`: visual, audio, animation, interactive |
| 87 | LittleJS (`littlejsengine`) | 4 | 1.x 2021-09 (1.30 2026-11) | repo ✓ MIT | 40 | Tiny engine: WebGL, Box2D, particles, ZzFX sound, post-processing. Docs are README, `REFERENCE.md`, FAQ and JSDoc; `examples/` stays out |
| 88 | regl (`regl`) | 4 | v2 2020-09 | README MIT | 40 | Functional WebGL. Docs are `API.md` plus README. Last publish 2024-11 |
| 89 | perfect-freehand (`perfect-freehand`) | 4 | v1 (2026-02) | README MIT | 10 | Pressure-sensitive strokes |
| 90 | Rough.js (`roughjs`) | 4 | v4 2020 | repo ✓ MIT | 25 | Hand-drawn shapes. Stale since 2023 |
| 91 | JSXGraph (`jsxgraph`) | 4 | 1.x 2020 (1.14 2026-10) | repo ✓ MIT | 80 | Interactive geometry, function plots, 3D view. Dual MIT/LGPL; docs are JSDoc plus `src/tutorials/*.md`. The jsxgraph.org gallery stays out |
| 92 | Rough Notation (`rough-notation`) | 4 | 0.5 2020 | README MIT | 10 | Hand-drawn highlights. Stale |
| 93 | curtains.js (`curtainsjs`) | 4 | v8 2020 | README MIT | 50 | WebGL image effects. Low activity |
| 94 | Zdog (`zdog`) ✅ built | 4 | 1.0 2019 | repo ✗lic | 60 | Pseudo-3D. Stale but charming. Docs are the site source `metafizzy/zdog-docs` (`content/`, `modules/docs/`); its `demos/` stays out |
| 95 | SVG.js (`@svgdotjs/svg.js`) | 4 | v3 2018-12 | site | 50 | SVG animation, morphing, masks, gradients. Repo MIT; the API docs are on svgdotjs.github.io, source not found |
| 96 | canvas-confetti (`canvas-confetti`) | 4 | v1 (2025-10) | README ISC | 15 | Confetti bursts and shapes |
| 97 | Flubber (`flubber`) | 4 | 2018 | README MIT | 8 | SVG shape morphing. Abandoned |
| 98 | Lottie (`lottie-web`) | 4 | v5 (2025-05) | README MIT | 30 | Classic player; prefer dotLottie |
| 99 | mo.js (`@mojs/core`) | 4 | 2017 | site | 30 | Bursts and shapes. Abandoned |
| 100 | Cytoscape.js (`cytoscape`) | 4 | 3.35 2026-11 | repo ✓ MIT | 120 | Graph layouts |

## Tier 3: visual, narrower

| # | Package | Line since | Docs | ~Ex | Note |
|---|---|---|---|---|---|
| 101 | Excalibur (`excalibur`) | 1.0 2026-11 | repo ✗lic | 60 | 2D engine, brand-new 1.0. Docs repo `excaliburjs/excaliburjs.github.io` has no licence; its samples stay out |
| 102 | Mind Elixir (`mind-elixir`) | v6 2026-11 | README MIT | 20 | Mind maps |
| 103 | Chartist (`chartist`) | v2 2026-10 | repo ✓ MIT | 30 | SVG charts styled by CSS. Brand-new major. Docs in `apps/docs` |
| 104 | maxGraph (`@maxgraph/core`) | 0.25 2026-10 | repo ✓ Apache | 30 | Diagram editor, mxGraph successor. `packages/html/stories` stays out |
| 105 | Box2D v3 WASM (`box2d3-wasm`) | v6 2026-10 | repo ✗lic | 40 | Physics; needs a renderer. Wrapper repo has no licence and a stub README; upstream Box2D docs unchecked |
| 106 | Pragmatic drag and drop (`@atlaskit/pragmatic-drag-and-drop`) | v4 2026-09 | repo ✓ Apache | 25 | Headless drag and drop, no React needed. Docs folder (`packages/documentation`?) unverified |
| 107 | troika-three-text (`troika-three-text`) | 0.53 2026-07 | README MIT | 20 | SDF text in Three.js |
| 108 | Rapier (`@dimforge/rapier2d`/`3d-compat`) | 0.21 2026-09 | repo ✓ Apache | 60 | Physics. JS repo merged into `dimforge/rapier` |
| 109 | Gridstack (`gridstack`) | v14 2026-09 | repo ✓ MIT | 25 | Draggable dashboard grids. Docs are README plus `doc/API.md`; `demo/` stays out |
| 110 | Ionic (`@ionic/core`) | v9 2026-08 | repo ✓ Apache | 80 | Mobile UI web components. Docs repo `ionic-team/ionic-docs`; embedded demos stay out. Heavy bundle |
| 111 | Color.js (`colorjs.io`) | 0.7 2026-07 | repo ✓ MIT | 40 | Colour spaces, gamut mapping, interpolation, contrast. `notebook` and `apps` stay out |
| 112 | dnd-kit DOM (`@dnd-kit/dom`) | 0.5 2026-06 | repo ✓ MIT | 30 | Framework-agnostic core of the new dnd-kit. Vanilla docs exist: `apps/docs/docs/{quickstart.mdx,concepts,extend}` (about 17 pages: draggable, droppable, manager, sortable, sensors, modifiers, plugins) use `@dnd-kit/dom` directly. The react/vue/svelte/solid and `legacy/` folders and `apps/stories-vanilla` stay out |
| 113 | AG Grid (`ag-grid-community`) | v36 2026-06 | repo ✗lic | 80 | Data grid; Enterprise features gated. Mostly data, little visual |
| 114 | DHTMLX Gantt (`dhtmlx-gantt`) | v10 2026-06 | repo ✗lic | 40 | The npm package and repo are MIT since v10.0.0 (Community edition; GPL lives on the `9.x` branch). Docs repo `DHTMLX/gantt-docs` (785 en pages) has no licence. The docs cover PRO too: auto-scheduling, critical path, resources, baselines and constraints, plus undo, markers, multi-select and calendars, are missing from the MIT build. Check each feature against `guides/editions-comparison.md` |
| 115 | OpenSeadragon (`openseadragon`) | v6 2026-02 | README BSD-3 | 20 | Deep-zoom viewer; tile sources must be generated |
| 116 | Jolt Physics (`jolt-physics`) | 1.0 2025-12 | README MIT | 25 | WASM 3D physics. `Examples/` stays out |
| 117 | xterm.js (`@xterm/xterm`) | v6 2025-12 | repo ✓ MIT | 25 | Terminal rendering, addons, themes; feed it a fake PTY. Docs repo `xtermjs/xtermjs.org`; `demo/` stays out |
| 118 | Mediabunny (`mediabunny`) | v1 2025-07 | repo ✓ MPL-2.0 | 35 | WebCodecs read/write/convert; render canvas frames to video. MPL is file-level copyleft |
| 119 | camera-controls (`camera-controls`) | v3 2025-07 | README MIT | 20 | three.js orbit and fly controls |
| 120 | Cropper.js (`cropperjs`) | v2 2025-03 | repo ✓ MIT | 30 | Web-component cropper. VitePress `docs/`; `playground.md` stays out |
| 121 | markmap (`markmap-view`) | 0.18 2024-12 | repo ✓ MIT | 15 | Markdown to mind map |
| 122 | LogicFlow (`@logicflow/core`) | v2 2024-08 | repo ✓ Apache | 50 | Flowchart and BPMN editor. Docs look Chinese-first; check the English share |
| 123 | chroma.js (`chroma-js`) | v3 2024-08 | repo ✓ BSD-3 | 40 | Colour scales, Brewer palettes, blending. Docs are one large `docs/index.html` |
| 124 | Locomotive Scroll (`locomotive-scroll`) | v5 (2026-11) | README MIT | 8 | Scroll effects on Lenis. Fuller docs are site-only |
| 125 | Lenis (`lenis`) | v1 2024-04 | README MIT | 25 | Smooth scroll feel |
| 126 | Tabulator (`tabulator-tables`) | v6 2024-03 | site | 60 | Interactive tables. MIT; repo holds no docs |
| 127 | culori (`culori`) | v4 2024-01 | repo ✓ MIT | 30 | Colour parsing, OKLCH, interpolation, difference |
| 128 | Planck.js (`planck`) | v1 2023-12 | repo ✓ MIT | 60 | Box2D port with testbed |
| 129 | AutoAnimate (`@formkit/auto-animate`) | 0.10 (2026-11) | repo ✓ MIT | 12 | Zero-config list transitions |
| 130 | Two.js (`two.js`) | 0.8 (2026-08) | repo ✓ MIT | 80 | Renderer-agnostic 2D |
| 131 | Embla Carousel (`embla-carousel`) | v8 2024-02 | repo ✓ MIT | 30 | Carousel |
| 132 | Driver.js (`driver.js`) | v1 (2026-11) | repo ✓ MIT | 20 | Product tours |
| 133 | interact.js (`interactjs`) | 1.10 (2026-08) | repo ✓ MIT | 40 | Drag, resize, gestures |
| 134 | Matter.js (`matter-js`) | 0.20 2024-06 | repo ✓ MIT | 50 | 2D physics sandbox |
| 135 | Swup (`swup`) | v4 2023-07 | repo ✗lic | 30 | Page transitions with hooks; plugins are separate packages. Pages need a local fetch stub. Docs repo `swup/docs` |
| 136 | Carbon / Spectrum web components | 2023–24 | repo ✓ Apache | 40 each | IBM and Adobe design systems as web components. Docs paths in the monorepos unmapped |
| 137 | dygraphs (`dygraphs`) | 2.2 2023-01 | repo ✓ MIT | 40 | Time series. HTML docs; old API, active repo |
| 138 | Theatre.js (`@theatre/core`) | 0.7 2024 | site | 40 | Choreography editor. Stale |
| 139 | d3-delaunay (`d3-delaunay`) | v6 2021 | README ISC | 20 | Voronoi patterns |
| 140 | CodeMirror (`codemirror`) | v6 2022 | site | 100 | Editor. Moved off GitHub |
| 141 | Tiptap / Lexical / Milkdown | 2024–26 | Tiptap repo ✓ MIT; others unchecked | 60 each | Rich-text editors. Tiptap's MIT `LICENSE-DOCS` covers only `src/content` of `tiptap-docs`; many pages are Pro or Cloud |
| 142 | Satori (`satori`) | 0.63 (2026-10) | README MPL | 20 | HTML/CSS to SVG |
| 143 | uPlot (`uplot`) | v1 2020 | README MIT | 30 | Fast time series |
| 144 | Splitting (`splitting`) | v1 2018 | README MIT | 12 | Text/grid splitting into CSS vars |
| 145 | Chart.js (`chart.js`) *(legacy in gallery)* | v4 2022 | repo ✓ MIT | 80 | Canvas charts |
| 146 | Sortable.js (`sortablejs`) *(legacy in gallery)* | v1 | README MIT | 25 | Drag-sort lists |
| 147 | Muuri (`muuri`) | 0.9 2021 | repo ✓ MIT | 30 | Animated grids. Abandoned |

## Tier 1–2: little to look at

These are better as compact, text-output examples. Build them after the visual tiers.

| # | Package | Line since | Docs | Note |
|---|---|---|---|---|
| 148 | Zod (`zod`) *(legacy in gallery)* | v4 2025-07 | repo ✓ MIT | Validation |
| 149 | Valibot (`valibot`) | v1 2025-03 | repo ✓ MIT | Validation |
| 150 | Arquero (`arquero`) | v8 2025-02 | site | Data wrangling; repo BSD-3 |
| 151 | Marked + DOMPurify *(legacy in gallery)* | v18 2026-04 | repo ✓ | Markdown |
| 152 | ky *(legacy in gallery)* | v2 2026-04 | README MIT | HTTP |
| 153 | Wretch *(legacy in gallery)* | v3 2025-10 | README MIT | HTTP |
| 154 | **Tone.js** (`tone`) ✅ built | v15 2024-05 | repo ✗lic (wiki) + source | Audio; `next` tag far ahead of `latest` |
| 155 | Fuse.js *(legacy in gallery)* | v7 2023-10 | repo ✓ Apache | Fuzzy search. VitePress `docs/`, 9 pages |
| 156 | Dexie.js *(legacy in gallery)* | v4 2024-03 | site | IndexedDB |
| 157 | Papa Parse *(legacy in gallery)* | v5 2019 | site | CSV |
| 158 | Floating UI (`@floating-ui/dom`) | v1 2022 | repo ✓ MIT | Positioning; replaces archived Tippy |
| 159 | Temporal polyfill (`temporal-polyfill`) | v1 | repo | Dates |
| 160 | harfbuzzjs, fitty, mark.js, panzoom, Howler, tonal, webmidi | various | README | Small or audio-only |
| 161 | Tippy.js *(legacy in gallery)* | v6 2020 | site | Repo archived; Floating UI succeeds it |
| 162 | Pizzicato.js *(legacy in gallery)* | 0.6 2018 | README MIT | Abandoned |

## Cautions

- **Docs that can't be committed.** anime.js, Motion and GSAP have site-only docs with
  no licence, as do Paper.js, Konva, PixiJS, Swiper and Rive in repos without a licence.
  So do Fabric.js, Kaplay, Swup and Excalibur (docs repos without a licence), AntV G (no
  LICENSE file) and AG Charts / AG Grid ("MIT and Commercial" repo). All of these vendor
  with `redistribute: false` (gitignored). That's fine for building; it just means
  re-vendoring per worktree.
- **Attribution.** Plotly's docs are CC BY 3.0: committed docs and the gallery credit them.
- **Copyleft.** Hydra (`hydra-synth`, AGPL) and Strudel (`@strudel/web`, AGPL, on
  Codeberg) are both visual-5 and very new-feeling, but AGPL code bundled into a public
  site carries obligations. Ask Mase before building them. Typed.js v3 moved to GPL-3.0.
  p5.js the library is LGPL. Also AGPL: audioMotion-analyzer, Shepherd, Intro.js.
  Isotope is GPL-3; elkjs is EPL. Mediabunny, Satori and JointJS (`@joint/core`) are
  MPL-2.0, which is file-level copyleft and fine unmodified.
- **Non-OSI or commercial.** GSAP's no-charge licence bars use in tools that compete with
  Webflow; a demo gallery is fine. ApexCharts is restricted. Highcharts is free only for
  non-commercial use; amCharts 5 must show its logo; GoJS and bpmn-js watermark;
  Handsontable is non-commercial; LYGIA is Prosperity-licensed; `@cosmograph/*` is
  CC BY-NC; Remotion and Pintura have their own commercial terms. Ask Mase before any of
  these.
- **Closed or gated.** Spline's runtime (`@splinetool/runtime`) has no licence and no
  public repo. Needle Engine has no licence and a commercial workflow; Unicorn Studio
  scenes need its closed editor; Mapbox GL needs a token and its ToS. Skipped.
- **Framework-only (excluded).** React Three Fiber, `@pixi/react`, Threlte (Svelte),
  TresJS (Vue), xyflow, tldraw, Excalidraw, kepler.gl.
- **Asset-dependent.** Rive, Lottie/dotLottie and Spark need content files (`.riv`,
  `.lottie`, splats), as do model-viewer (glTF) and NiiVue (NIfTI). Use only assets the
  official docs ship or link.
