# Package showcase list

Ranked candidates for per-package galleries, **newest and most visual first**.
Checked 2026-11-13 against the npm registry and GitHub/Codeberg APIs. Visual scores and
example counts are estimates.

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
| 3 | Three.js (`three`) | 5 | r187 2026-10 | repo ✓ MIT | 400+ | WebGPU renderer, TSL shaders. Vendor `docs/` only, not the 639 `examples/` |
| 4 | Sigma.js (`sigma`) ✅ built | 5 | v4 2026-10 | repo ✓ MIT | 70 | WebGL graphs, 100k+ nodes (pairs with graphology). Docs are the website chapters plus companion-package READMEs; the embedded SigmaExample stories stay out (pattern.md § Purity) |
| 5 | Mermaid (`mermaid`) | 5 | v12 2026-09 | repo ✓ MIT | 250 | Text to diagrams. Huge breadth |
| 6 | Perspective (`@perspective-dev/viewer`) | 5 | v5 2026-07 | repo ✓ Apache | 60 | Streaming pivot/visual analytics web component |
| 7 | MapLibre GL JS (`maplibre-gl`) ✅ built | 5 | v6 2026-07 | repo ✓ BSD | 150 | Vector maps, 3D terrain, globe. Docs are the API reference and style spec (site crawl) plus repo guides; all examples run offline on Natural Earth data and computed tiles |
| 8 | Spark (`@sparkjsdev/spark`) | 5 | v2 2026-04 | unchecked | 30 | Gaussian splats on Three.js |
| 9 | Babylon.js (`@babylonjs/core`) | 5 | v9 2026-03 | repo ✓ Apache | 300+ | Full engine, PBR, WebGPU |
| 10 | cobe (`cobe`) | 5 | v2 2026-03 | README MIT | 10 | Small WebGL dotted globe |
| 11 | AntV Infographic (`@antv/infographic`) | 5 | 0.1 2025-11 | unchecked | 40 | New, infographic templates |
| 12 | Apache ECharts (`echarts`) | 5 | v6 2025-07 | repo ✓ Apache | 400 | Biggest chart breadth, animated, 3D |
| 13 | VChart (`@visactor/vchart`) | 5 | v2 2025-06 | unchecked | 150 | Narrative/animated charts |
| 14 | GSAP (`gsap`) ✅ built | 5 | 3.x, plugins free since 2025 | site | 250 | SplitText, MorphSVG, ScrollTrigger, Flip. Non-OSI licence |
| 15 | Paper Shaders (`@paper-design/shaders`) | 5 | 0.0.x 2024-10 | unchecked | 30 | Shader-effect pack, vanilla build alongside React |
| 16 | PlayCanvas (`playcanvas`) | 5 | v2 2024-08 | repo ✓ MIT | 200+ | Engine with Gaussian splats |
| 17 | AntV G6 (`@antv/g6`) | 5 | v5 2024-06 | unchecked MIT | 120 | Graph visualisation |
| 18 | deck.gl (`deck.gl`) | 5 | v9 2024-03 | repo ✓ MIT | 150 | GPU geospatial layers |
| 19 | Rive (`@rive-app/canvas`) | 5 | v2 2023-07 | repo ✗lic | 40 | State-machine art; needs `.riv` assets |
| 20 | AntV G2 (`@antv/g2`) | 5 | v5 2023-03 | unchecked MIT | 150 | Grammar-of-graphics charts |
| 21 | Observable Plot (`@observablehq/plot`) | 5 | 0.6 (2026-11) | repo ✓ ISC | 150 | Polished charts, minimal code |
| 22 | D3 (`d3`) | 5 | v7 2021-06 | repo ✓ ISC | 300 | Bespoke graphics |
| 23 | globe.gl (`globe.gl`) | 5 | v2 (2026-08) | unchecked MIT | 30 | Data globes on Three.js |
| 24 | CesiumJS (`cesium`) | 5 | 1.147 2026-11 | unchecked Apache | 100 | 3D globe; Ion token for some data |

## Tier 4: strongly visual

| # | Package | Vis | Line since | Docs | ~Ex | Note |
|---|---|---|---|---|---|---|
| 25 | Paper.js (`paper`) | 4 | 0.17 2026-11 | repo ✗lic | 100 | Vector path scripting, just revived |
| 26 | dotLottie (`@lottiefiles/dotlottie-web`) | 4 | 0.83 2026-11 | README MIT | 30 | Lottie with state machines and themes; needs assets |
| 27 | textmode.js (`textmode.js`) | 4 | 0.18 2026-10 | unchecked MIT | 40 | ASCII/text-mode rendering, new 2025 |
| 28 | Motion (`motion`) *(legacy in gallery)* | 4 | v14 2026-10 | site | 120 | Springs, scroll, layout, gestures |
| 29 | Pts (`pts`) | 4 | 1.0 2026-09 | repo ✓ Apache | 80 | Generative art, just hit 1.0 |
| 30 | wavesurfer.js (`wavesurfer.js`) | 4 | v8 2026-09 | README BSD | 50 | Audio waveforms, regions, spectrogram |
| 31 | Monaco Editor (`monaco-editor`) | 4 | 0.57 2026-09 | unchecked MIT | 50 | VS Code editor |
| 32 | TypeGPU (`typegpu`) | 4 | 0.12 2026-08 | repo ✓ MIT | 100+ | Typed WebGPU compute and shaders |
| 33 | number-flow (`number-flow`) | 4 | 0.6 2026-07 | repo ✓ MIT | 25 | Morphing digits, vanilla element |
| 34 | Swiper (`swiper`) | 4 | v14 2026-06 | repo ✗lic | 60 | Sliders with 3D effects |
| 35 | billboard.js (`billboard.js`) | 4 | v4 2026-06 | unchecked MIT | 80 | D3-based charts |
| 36 | FullCalendar (`@fullcalendar/core`) | 4 | v7 2026-06 | unchecked MIT | 60 | Calendar views |
| 37 | opentype.js (`opentype.js`) | 4 | v2 2026-05 | repo ✓ MIT | 30 | Glyph paths, variable fonts |
| 38 | tsParticles (`@tsparticles/engine`) | 4 | v4 2026-05 | repo ✓ MIT | 150 | JSON-driven particle effects |
| 39 | Phaser (`phaser`) | 4 | v4 2026-04 | unchecked MIT | 150 | 2D game framework |
| 40 | Shiki (`shiki`) | 4 | v4 2026-02 | repo ✓ MIT | 60 | VS Code-grade highlighting, themes |
| 41 | Web Awesome (`@awesome.me/webawesome`) | 4 | v3 2025-10 | unchecked MIT | 80 | Web-component UI kit |
| 42 | p5.js (`p5`) | 4 | 2.0 2025-04 | repo ✓ MIT (site repo) | 300+ | Creative coding. The library is LGPL; check the reference content licence |
| 43 | Vega-Lite (`vega-lite`) | 4 | v6 2025-03 | repo ✓ BSD | 200 | Declarative JSON charts |
| 44 | VexFlow (`vexflow`) | 4 | v5 2025-03 | unchecked MIT | 40 | Music engraving |
| 45 | lightweight-charts (`lightweight-charts`) | 4 | v5 2025-01 | repo ✓ Apache | 60 | Financial charts, panes |
| 46 | OpenLayers (`ol`) | 4 | v10 2024-07 | unchecked BSD | 250 | Full GIS maps |
| 47 | PixiJS (`pixi.js`) | 4 | v8 2024-03 | repo ✗lic | 150+ | Fast 2D WebGL, filters |
| 48 | Konva (`konva`) | 4 | v10 (2026) | repo ✗lic | 150 | Interactive canvas shapes |
| 49 | OGL (`ogl`) | 4 | 1.0 2023-08 | README Unlicense | 40 | Minimal WebGL |
| 50 | Atropos (`atropos`) | 4 | v2 2023-06 | README MIT | 15 | Parallax tilt |
| 51 | abcjs (`abcjs`) | 4 | v6 2022 | unchecked MIT | 40 | Music notation and playback |
| 52 | perfect-freehand (`perfect-freehand`) | 4 | v1 (2026-02) | README MIT | 10 | Pressure-sensitive strokes |
| 53 | Rough.js (`roughjs`) | 4 | v4 2020 | repo ✓ MIT | 25 | Hand-drawn shapes. Stale since 2023 |
| 54 | Rough Notation (`rough-notation`) | 4 | 0.5 2020 | README MIT | 10 | Hand-drawn highlights. Stale |
| 55 | curtains.js (`curtainsjs`) | 4 | v8 2020 | README MIT | 50 | WebGL image effects. Low activity |
| 56 | Zdog (`zdog`) *(legacy in gallery)* | 4 | 1.0 2019 | site (vendored) | 40 | Pseudo-3D. Stale but charming |
| 57 | canvas-confetti (`canvas-confetti`) | 4 | v1 (2025-10) | README ISC | 15 | Confetti bursts and shapes |
| 58 | Flubber (`flubber`) | 4 | 2018 | README MIT | 8 | SVG shape morphing. Abandoned |
| 59 | Lottie (`lottie-web`) | 4 | v5 (2025-05) | README MIT | 30 | Classic player; prefer dotLottie |
| 60 | mo.js (`@mojs/core`) | 4 | 2017 | site | 30 | Bursts and shapes. Abandoned |
| 61 | Cytoscape.js (`cytoscape`) | 4 | 3.35 2026-11 | repo ✓ MIT | 120 | Graph layouts |

## Tier 3: visual, narrower

| # | Package | Line since | Docs | ~Ex | Note |
|---|---|---|---|---|---|
| 62 | Excalibur (`excalibur`) | 1.0 2026-11 | unchecked BSD | 60 | 2D engine, brand-new 1.0 |
| 63 | Box2D v3 WASM (`box2d3-wasm`) | v6 2026-10 | unchecked MIT | 40 | Physics; needs a renderer |
| 64 | troika-three-text (`troika-three-text`) | 0.53 2026-07 | README MIT | 20 | SDF text in Three.js |
| 65 | Rapier (`@dimforge/rapier2d`/`3d-compat`) | 0.21 2026-09 | repo ✓ Apache | 60 | Physics. JS repo merged into `dimforge/rapier` |
| 66 | Gridstack (`gridstack`) | v14 2026-09 | unchecked MIT | 30 | Draggable dashboard grids |
| 67 | Jolt Physics (`jolt-physics`) | 1.0 2025-12 | unchecked MIT | 40 | WASM 3D physics |
| 68 | Locomotive Scroll (`locomotive-scroll`) | v5 (2026-11) | unchecked MIT | 15 | Scroll effects on Lenis |
| 69 | Lenis (`lenis`) | v1 2024-04 | README MIT | 25 | Smooth scroll feel |
| 70 | Planck.js (`planck`) | v1 2023-12 | repo ✓ MIT | 60 | Box2D port with testbed |
| 71 | AutoAnimate (`@formkit/auto-animate`) | 0.10 (2026-11) | repo ✓ MIT | 12 | Zero-config list transitions |
| 72 | Two.js (`two.js`) | 0.8 (2026-08) | repo ✓ MIT | 80 | Renderer-agnostic 2D |
| 73 | Embla Carousel (`embla-carousel`) | v8 2024-02 | repo ✓ MIT | 30 | Carousel |
| 74 | Driver.js (`driver.js`) | v1 (2026-11) | repo ✓ MIT | 20 | Product tours |
| 75 | interact.js (`interactjs`) | 1.10 (2026-08) | repo ✓ MIT | 40 | Drag, resize, gestures |
| 76 | Matter.js (`matter-js`) | 0.20 2024-06 | repo ✓ MIT | 50 | 2D physics sandbox |
| 77 | Theatre.js (`@theatre/core`) | 0.7 2024 | site | 40 | Choreography editor. Stale |
| 78 | d3-delaunay (`d3-delaunay`) | v6 2021 | README ISC | 20 | Voronoi patterns |
| 79 | CodeMirror (`codemirror`) | v6 2022 | site | 100 | Editor. Moved off GitHub |
| 80 | Tiptap / Lexical / Milkdown | 2024–26 | unchecked MIT | 60 each | Rich-text editors |
| 81 | Satori (`satori`) | 0.63 (2026-10) | README MPL | 20 | HTML/CSS to SVG |
| 82 | uPlot (`uplot`) | v1 2020 | README MIT | 30 | Fast time series |
| 83 | Splitting (`splitting`) | v1 2018 | README MIT | 12 | Text/grid splitting into CSS vars |
| 84 | Chart.js (`chart.js`) *(legacy in gallery)* | v4 2022 | repo ✓ MIT | 80 | Canvas charts |
| 85 | Sortable.js (`sortablejs`) *(legacy in gallery)* | v1 | README MIT | 25 | Drag-sort lists |
| 86 | Muuri (`muuri`) | 0.9 2021 | repo ✓ MIT | 30 | Animated grids. Abandoned |

## Tier 1–2: little to look at

These are better as compact, text-output examples. Build them after the visual tiers.

| # | Package | Line since | Docs | Note |
|---|---|---|---|---|
| 87 | Zod (`zod`) *(legacy in gallery)* | v4 2025-07 | repo ✓ MIT | Validation |
| 88 | Valibot (`valibot`) | v1 2025-03 | repo ✓ MIT | Validation |
| 89 | Marked + DOMPurify *(legacy in gallery)* | v18 2026-04 | repo ✓ | Markdown |
| 90 | ky *(legacy in gallery)* | v2 2026-04 | README MIT | HTTP |
| 91 | Wretch *(legacy in gallery)* | v3 2025-10 | README MIT | HTTP |
| 92 | Tone.js *(legacy in gallery)* | v15 2024-05 | TypeDoc site | Audio; `next` tag far ahead of `latest` |
| 93 | Fuse.js *(legacy in gallery)* | v7 2023-10 | unchecked Apache | Fuzzy search |
| 94 | Dexie.js *(legacy in gallery)* | v4 2024-03 | site | IndexedDB |
| 95 | Papa Parse *(legacy in gallery)* | v5 2019 | site | CSV |
| 96 | Floating UI (`@floating-ui/dom`) | v1 2022 | repo ✓ MIT | Positioning; replaces archived Tippy |
| 97 | Temporal polyfill (`temporal-polyfill`) | v1 | repo | Dates |
| 98 | harfbuzzjs, fitty, mark.js, panzoom, Howler, tonal, webmidi | various | README | Small or audio-only |
| 99 | Tippy.js *(legacy in gallery)* | v6 2020 | site | Repo archived; Floating UI succeeds it |
| 100 | Pizzicato.js *(legacy in gallery)* | 0.6 2018 | README MIT | Abandoned |

## Cautions

- **Docs that can't be committed.** anime.js, Motion and GSAP have site-only docs with
  no licence, as do Paper.js, Konva, PixiJS, Swiper and Rive in repos without a licence.
  All of these vendor with `redistribute: false` (gitignored). That's fine for building;
  it just means re-vendoring per worktree.
- **Copyleft.** Hydra (`hydra-synth`, AGPL) and Strudel (`@strudel/web`, AGPL, on
  Codeberg) are both visual-5 and very new-feeling, but AGPL code bundled into a public
  site carries obligations. Ask Mase before building them. Typed.js v3 moved to GPL-3.0.
  p5.js the library is LGPL.
- **Non-OSI.** GSAP's no-charge licence bars use in tools that compete with Webflow; a
  demo gallery is fine. ApexCharts is restricted.
- **Closed.** Spline's runtime (`@splinetool/runtime`) has no licence and no public
  repo. Skipped.
- **Framework-only (excluded).** React Three Fiber, `@pixi/react`, Threlte (Svelte),
  TresJS (Vue), xyflow, tldraw, Excalidraw.
- **Asset-dependent.** Rive, Lottie/dotLottie and Spark need content files (`.riv`,
  `.lottie`, splats). Use only assets the official docs ship or link.
