# A-Frame 1.8.0 traps

Found while building this gallery. Read before building an example; add to it.

## The page

- **Every example runs in its own iframe** through `aframeExample(import.meta.url, { setup, scene, run })`
  (`frame.ts`). A-Frame's custom elements, component/system/shader/primitive registries and
  several `window` listeners are page-wide and never undone (a detached `<a-scene>` stays alive
  through an anonymous resize listener), so sharing the gallery page is not an option. The iframe
  re-imports the example's module, so the example's code runs in the iframe's realm: `document`,
  `window`, `setTimeout`, `requestAnimationFrame` in `setup`/`scene`/`run` are the iframe's and die
  with it. Never import aframe from an example: `setup(AFRAME)` gets the iframe's copy.
- **Order** is the docs' order: `setup(AFRAME)` registers components, systems, shaders,
  primitives and geometries (a `<script>` in `<head>`), then the `scene` markup is attached,
  then `run(stage)` runs after the scene's `loaded` event.
- **A registered system starts in every scene**, and component names are global: with one
  example per iframe this is harmless, but never register the same name twice in one example.
- **Controls live in the gallery page.** `stage.bar` belongs to the parent document; build inputs
  with `shared/controls.ts`, which uses `bar.ownerDocument`. Their handlers can still call into the
  scene (`stage.scene.querySelector(...)`).
- **Cards** (`stage.preview`): the host adds `xr-mode-ui="enabled: false"`, `loading-screen="enabled: false"`,
  `device-orientation-permission-ui="enabled: false"` and `keyboard-shortcuts="enterVR: false"` to the
  `<a-scene>` unless the markup sets them, and devicePixelRatio is 1. A card has no pointer: keep it alive
  with the `animation` component, `sway(stage)` (turns the camera through look-controls), `ghost(stage)`
  (a pretend mouse on the canvas, for `cursor="rayOrigin: mouse"`), or `stage.every(ms, fn)`.
- **look-controls owns the camera's rotation**: it rewrites `object3D.rotation` every tick from its own
  yaw/pitch objects, so a `rotation` attribute on a camera with look-controls is ignored. Turn a card's
  camera with `sway`, or give the camera `look-controls="enabled: false"` (or none) and set its rotation.
- **Ctrl+Alt+I** (the inspector, loaded from unpkg) is blocked by the host. Do not build an inspector example.

## Network

- **Nothing fetches.** `AFRAME_CDN_ROOT` points at `https://cdn.aframe.example/` (`net.ts`), which
  serves only the text fonts (`fonts.ts`); any other remote URL throws `OfflineError`. Images come from
  `shared/images.ts` (data: URLs painted in code), models from `shared/gltf/` and `shared/models.ts`
  (blob: URLs), sounds from code. Controller and hand models live on the CDN, so controller components
  render nothing outside a headset here.
- **Fonts are stand-ins**: every stock font name works (`roboto` default, `dejavu`, `exo2bold`, `monoid`, …)
  and draws with Inter or the system monospace, so glyph shapes and widths differ from the real fonts.
- **Headless Chrome (SwiftShader) draws hairlines inside thin `roboto` (msdf) glyphs** where the shader
  divides by fwidth = 0. Real GPUs do not; the sdf fonts (all the others) are clean everywhere.

## Docs vs 1.8.0
