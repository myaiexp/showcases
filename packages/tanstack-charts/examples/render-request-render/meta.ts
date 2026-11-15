// tanstack-charts example: requestRender(true) for renderer-owned state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "requestRender(true) for renderer-owned state",
  summary:
    "A text renderer prints node coordinates either in pixels or as percentages of the scene, a choice that lives in the renderer and not in the chart options. Changing it calls the requestRender function the host passed to mount, with force set to true, which makes the host repaint although neither size nor options changed.",
  section: "Custom Marks and Renderers",
  tags: ['ChartRenderer.mount', 'requestRender', 'force', 'surface.render'],
  docs: ['repo/docs/reference/rendering-and-export.md', 'repo/docs/guides/custom-marks-and-renderers.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
