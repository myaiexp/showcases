// Loads Vizzu's WebAssembly module once per page, from the copy Vite bundles
import Vizzu from 'vizzu';
import wasmUrl from 'vizzu/cvizzu.wasm?url';

let ready: Promise<void> | null = null;

/**
 * Vizzu looks for cvizzu.wasm next to vizzu.min.js, which Vite's dependency bundling moves,
 * so the URL is set before the first chart (the Initialization chapter's "Working with
 * bundlers"). The module is shared by every chart on the page.
 */
export function vizzuReady(): Promise<void> {
  if (!ready) {
    Vizzu.options({ wasmUrl });
    ready = Vizzu.initialize();
  }
  return ready;
}
