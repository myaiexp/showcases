# Zephyr3D 0.10.0 traps

Found while building this gallery. Read before building an example; add to it.

## The page

- **One Application per page, never disposed.** `new Application()` throws when `getApp()` is
  set, and there is no `dispose()`. Every example runs in its own iframe through
  `zephyrExample(import.meta.url, run)` (`frame.ts`), which re-imports the example's module
  inside the iframe so it gets its own engine. Never import an example's run code any other way.
- **The iframe is a real URL (`frame.html?url`), not srcdoc.** The engine's default VFS is
  `new HttpFS('./')`, resolved against `location.href`, which throws for `about:srcdoc`.
- **`Application.ready()` focuses the canvas.** The host turns `focus()` into a no-op in cards and
  `preventScroll` in the full view, so a card never scrolls the gallery.
- **Controls live in the gallery page.** `stage.bar` belongs to the parent document; build inputs
  with `shared/controls.ts`, which uses `bar.ownerDocument`.
- **Timers:** use `stage.every()` or `myApp.on('tick', …)`. Both stop with the iframe.

## Assets

- **Nothing fetches.** Generated files go into a `MemoryFS` (`shared/vfs.ts` `memoryFiles`) passed
  as `runtimeOptions: { VFS }`; then `resourceManager.fetchTexture('/textures/x.png')` reads memory.
  PNGs come from `shared/textures.ts` (`png(w, h, painter)`).
- **Colour maps are sRGB, data maps linear.** Normal, roughness/metallic, masks and heights pass
  `{ linearColorSpace: true }` to `fetchTexture`.

## Physics

- **Rapier's WASM URL breaks under Vite.** Always `await initPhysics(rapierPhysics, { wasmUrl: rapierWasmUrl })`
  with `rapierWasmUrl` from `shared/physics.ts`.

## Docs that drifted from 0.10.0

- **`user-material-lit.md`:** the `forEachLight` callback is `(type, posRange, dirCutoff, colorIntensity,
  extra, shadow, …)`, not the 5-argument form; `calculateShadow` takes `(scope, worldPos, worldNormal, NoL)`.
- **`user-material-multipass.md`:** `albedoIntensity` sums `r, g, g`; use `r, g, b`. An opaque
  multi-pass material's light pass depth-tests `equal` against the prepass, so the inflated outline
  pass never draws; overriding `getQueueType()` to `QUEUE_TRANSPARENT` makes it draw.
- **`posteffect-sao.md`:** `SSAOScale` and `SSAORadius` are gone: use `SSAOOcclusionRadius` (metres,
  default 0.25) and `SSAOIntensity` (default 1).
- **`serialization.md`:** the property accessors' `value` type does not narrow on `type: 'float'`, so the
  docs' `value.num[0]` needs a cast under this repo's strict tsconfig.

## Device API

- **Set a `RenderStateSet` before every raw draw** (depth and cull); without one an indexed cube drew nothing.
- **`Matrix4x4.lookAt` is the camera's world matrix**, not a view matrix: invert it (`invertAffine`).
- **`Matrix4x4.perspective` and `DEPTH_COMPARE_DEFAULT` follow reverse-Z**: clear with `DEPTH_CLEAR_VALUE`.

## Scenes

- **The default scene has a bright scatter sky and IBL**, which washes out bloom and dark demos:
  set `scene.env.sky.skyType = 'none'` (and `scene.env.light.type`) when the effect needs contrast.
- **`Vector3` has no `setX`/`setY`/`setZ`**: use `setXYZ` or `.x =`.
- **Every file write in the worktree makes the dev server reload open pages**: re-open before
  judging a blank stage.
- **Debug views (`camera.wireframe`, `lodColoration`) need `__ZEPHYR3D_DEBUG_VIEWS__`** set before the
  engine loads: pass it through `zephyrExample(url, run, { globals: { __ZEPHYR3D_DEBUG_VIEWS__: true } })`.

## Framework, lighting, shadows

- **Hand-built `Primitive`s have no bounding volume**: `setBoundingVolume(new BoundingBox(…))`, and
  `invalidateBoundingVolume()` when the vertices change, or culling and picking misbehave.
- **Generated LOD levels switch early at the default `lodPixelError: 8`**; `1` shows the full chain.
- **`fetchTexture` and `fetchFontAsset` cache by path**: changing `samplerOptions` needs
  `resourceManager.clearCache()`; a `FontAsset` takes `pageSize`/`glyphSize` only on a path's first load.
- **`ParticleSystem.worldSpace` defaults to true**; the `rampMap` alpha fades particles over their life.
- **Files without an extension** load from a MemoryFS with `fetchTexture(path, { mimeType })`.
- **`SDFSpriteMaterial` and `computeBoundsScreenSize`** are documented but not exported by 0.10.0.

## Environment and render graph

- **Headless Chrome here (software GL, 1.2 GB cap) dies on PBR + IBL + shadow-casting sun + water or
  terrain.** Real GPUs are fine; verify heavy scenes in a bare full view, one tab, and keep cards light.
- **`rendergraph.md` lists 13 default modules; 0.10.0 has 17** (`WaterCaustics`, `VirtualTextureUpdate`,
  `TransmissionThickness`, `Underwater`). Anchor edits with the module objects: `TransmissionThickness`'s
  type is `'TransmissionThicknessPass'`.
- **`water.md`'s `shoreFoam*` properties are gone**: `wallFoam*` (from the scene SDF) and `foamFadeRate`
  replaced them. Shore waves need a terrain plus the scene SDF: WebGPU only.
- **Terrain heights are r16f**: a PNG through `fetchTexture` bands. `updateHeightPyramid()` is not public:
  use `heightMap.update(…)` then `updateBoundingBox()`, or `setHeights(Uint16Array)` of half floats.
  `setSplatMap` takes a 2-layer `Texture2DArray`; layer 0's rgba weight detail layers 0–3.
- **`PlaneShape` is centred on its node.**
