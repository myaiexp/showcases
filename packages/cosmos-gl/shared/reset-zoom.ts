// Clears d3 zoom state on the canvas before a graph is rebuilt on it
/**
 * d3-zoom keeps its transform on the canvas element itself, and a rebuilt graph reuses the
 * device's canvas, so it would start from the previous graph's pan. Call before `build()`.
 */
export function resetZoom(div: HTMLElement): void {
  const canvas = div.querySelector('canvas') as (HTMLCanvasElement & { __zoom?: unknown }) | null;
  if (canvas) delete canvas.__zoom;
}
