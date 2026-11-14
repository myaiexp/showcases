// babylon-js example: Large world rendering side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Large world rendering side by side",
  summary:
    "The same grid of meshes sits millions of units from the origin in two engines: a plain one that visibly jitters as the camera moves, and one created with useLargeWorldRendering, which keeps float32 precision with floating origin. A selector changes the distance.",
  section: "Scene",
  tags: ['useLargeWorldRendering', 'floatingOriginMode', 'useHighPrecisionMatrix', 'floatingOriginOffset', 'Engine options'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/large_world.md',
    'repo/content/features/featuresDeepDive/scene/floating_origin.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
