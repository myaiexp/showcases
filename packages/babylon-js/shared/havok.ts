// Loads the Havok WebAssembly engine once per page, wasm URL resolved by Vite
import HavokPhysics, { type HavokPhysicsWithBindings } from '@babylonjs/havok';
import wasmUrl from '@babylonjs/havok/lib/esm/HavokPhysics.wasm?url';

let havok: Promise<HavokPhysicsWithBindings> | undefined;

/**
 * The initialized Havok module, as `await HavokPhysics()` returns it in the docs. The
 * package finds its .wasm next to its own script, which Vite's dependency bundling moves,
 * so `locateFile` points at the URL Vite emits instead. One module serves every example:
 * each `new HavokPlugin(true, havok)` creates its own physics world inside it.
 */
export function loadHavok(): Promise<HavokPhysicsWithBindings> {
  havok ??= HavokPhysics({ locateFile: () => wasmUrl });
  return havok;
}
