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
