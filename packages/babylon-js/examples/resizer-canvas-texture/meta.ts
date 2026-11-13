// babylon-js example: Resizer to canvas and texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Resizer to canvas and texture",
  summary:
    "The Resizer control stretches a live 2D canvas, redrawn every frame, into a smaller WebGL canvas with resize(). A selector changes the target size from 16 x 10 up to 256 x 160.",
  section: "2D Controls",
  tags: ['Resizer', 'resize', '@babylonjs/controls', 'canvas'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/controls/resizer.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
