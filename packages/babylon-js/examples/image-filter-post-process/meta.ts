// babylon-js example: ImageFilter with post processes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ImageFilter with post processes",
  summary:
    "The ImageFilter control from @babylonjs/controls runs existing post processes (black and white, blur, grain, chromatic aberration and colour-matrix filters) over a generated canvas with filter(), shown next to the source.",
  section: "2D Controls",
  tags: ['ImageFilter', 'filter', 'BlackAndWhitePostProcess', 'BlurPostProcess', 'FilterPostProcess', '@babylonjs/controls'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/controls/imageFilter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
