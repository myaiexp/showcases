// Heatmap density backend: hide a WebGPU that has no adapter, so the CPU path runs
//
// three-globe's heatmaps layer computes its density on the GPU whenever `navigator.gpu`
// exists. When it exists but `requestAdapter()` finds no adapter (headless Chrome, a
// blocklisted driver, a browser with the flag on and no support), that path falls back to a
// WebGL2 backend that returns all-zero density: every heatmap draws fully transparent, and
// each update leaves a WebGL renderer behind. The CPU path draws correctly.
//
// So before the first heatmap, ask for an adapter once per page; if there is none, shadow
// `navigator.gpu` with undefined. Nothing on such a page could use WebGPU anyway: any other
// library asking for an adapter would get null too.

let checked: Promise<void> | null = null;

/** Resolves once the heatmaps layer will take a working path. Await it before `heatmapsData`. */
export function heatmapBackend(): Promise<void> {
  checked ??= probe();
  return checked;
}

async function probe(): Promise<void> {
  const gpu = (navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }).gpu;
  if (!gpu) return;
  let adapter: unknown = null;
  try {
    adapter = await gpu.requestAdapter();
  } catch (err) {
    console.warn('globe.gl heatmaps: WebGPU adapter request failed, using the CPU path', err);
  }
  if (!adapter) Object.defineProperty(navigator, 'gpu', { value: undefined, configurable: true });
}
