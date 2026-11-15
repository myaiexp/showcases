// tanstack-charts example: Canvas shells before any pixels exist
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas shells before any pixels exist",
  summary:
    "A prerendered canvas chart is only a shell: a named root and five aria-hidden canvases, with no pixels painted. The page inserts the shell, counts painted pixels (zero), then mounts the adapter, which adopts the canvases and paints. A select switches between the canvas-renderer adapter and the default SVG adapter with one canvas mark, whose SVG part is visible before mount.",
  section: "SSR and Hydration",
  tags: ['createChartRendererAdapter', 'createChartAdapter', 'createCanvasChartRenderer', 'prerender', 'canvas shell'],
  docs: ['repo/docs/guides/ssr-and-hydration.md', 'repo/docs/reference/adapter-controller.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
