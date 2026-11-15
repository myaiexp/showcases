// galacean example: UI canvas sort order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI canvas sort order",
  summary:
    "Two root canvases overlap and their sortOrder values change, so the higher one draws on top. Sliders set both orders in the full view.",
  section: "UI",
  tags: ['UICanvas.sortOrder', 'CanvasRenderMode.ScreenSpaceOverlay'],
  docs: [
    'repo/docs/en/UI/quickStart/order.mdx',
    'repo/docs/en/UI/quickStart/canvas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
