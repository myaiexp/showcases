// galacean example: UI canvas: screen space camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI canvas: screen space camera",
  summary:
    "In ScreenSpaceCamera mode the canvas follows renderCamera at a set distance, so cubes nearer than that hide the UI and farther ones sit behind it. The distance changes in the card and has a slider in the full view.",
  section: "UI",
  tags: ['UICanvas', 'CanvasRenderMode.ScreenSpaceCamera', 'renderCamera', 'distance'],
  docs: [
    'repo/docs/en/UI/quickStart/canvas.mdx',
    'repo/docs/en/UI/quickStart/order.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
