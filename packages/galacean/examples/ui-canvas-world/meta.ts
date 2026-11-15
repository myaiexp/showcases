// galacean example: UI canvas: world space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI canvas: world space",
  summary:
    "A WorldSpace canvas is an object in the scene: a panel with text swings in 3D while the camera orbits. Its size comes from the entity scale (0.01 here), as the docs do not say. A slider turns it in the full view.",
  section: "UI",
  tags: ['UICanvas', 'CanvasRenderMode.WorldSpace', 'referenceResolutionPerUnit'],
  docs: [
    'repo/docs/en/UI/quickStart/canvas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
