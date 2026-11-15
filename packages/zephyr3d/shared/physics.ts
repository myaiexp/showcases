// Where Rapier's WASM is served from: pass to initPhysics(rapierPhysics, { wasmUrl })
import wasmUrl from '@zephyr3d/physics-rapier/dist/rapier/rapier_wasm3d_bg.wasm?url';

/**
 * @zephyr3d/physics-rapier finds its .wasm with new URL('./rapier/…', import.meta.url)
 * marked @vite-ignore. Vite's dependency bundling moves the module, so that URL 404s in dev
 * and the file is never emitted in a build. Importing it with ?url makes Vite serve and
 * emit it; the docs' RapierPhysicsOptions.wasmUrl takes the result. Same-origin, no CDN.
 */
export const rapierWasmUrl: string = wasmUrl;
