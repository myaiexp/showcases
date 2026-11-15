// The page's one PhysXPhysics, loaded from the package's own files, not the CDN
//
// PhysXPhysics.initialize() adds a <script> for its runtime, by default from
// mdn.alipayobjects.com, and that script fetches physx.release.wasm from a hardcoded CDN URL.
// The package ships both files in libs/. `runtimeUrls.wasmModeUrl` swaps the script; for the
// wasm, the script's text is rewritten to point at the bundled copy and loaded as a blob.
import { PhysXPhysics, PhysXRuntimeMode } from '@galacean/engine-physics-physx';
import runtimeSource from '@galacean/engine-physics-physx/libs/physx.release.js?raw';
import wasmUrl from '@galacean/engine-physics-physx/libs/physx.release.wasm?url';

const CDN_WASM = /"https:\/\/[^"]+\/physx\.release\.wasm"/;

let shared: Promise<PhysXPhysics> | undefined;

/**
 * Initialised once per page and handed to every engine with physics: the engine keeps the
 * backend on a static (`Engine._nativePhysics`), so two instances would trade it back and forth.
 */
export function physx(): Promise<PhysXPhysics> {
  shared ??= (async () => {
    if (!CDN_WASM.test(runtimeSource)) throw new Error('physx.release.js no longer names its wasm URL; update shared/physx.ts');
    const local = JSON.stringify(new URL(wasmUrl, document.baseURI).href);
    const blob = new Blob([runtimeSource.replace(CDN_WASM, local)], { type: 'text/javascript' });
    const physics = new PhysXPhysics(PhysXRuntimeMode.WebAssembly, { wasmModeUrl: URL.createObjectURL(blob) });
    await physics.initialize();
    return physics;
  })();
  // A failed load (a blocked blob script, say) is retried by the next engine, not cached.
  shared.catch(() => {
    shared = undefined;
  });
  return shared;
}
