// galacean example: UI canvas: screen space overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI canvas: screen space overlay",
  summary:
    "A UICanvas in ScreenSpaceOverlay mode draws over the frame while the 3D camera orbits a spinning cube behind it.",
  section: "UI",
  tags: ['UICanvas', 'CanvasRenderMode.ScreenSpaceOverlay', 'renderMode'],
  docs: [
    'repo/docs/en/UI/quickStart/canvas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
