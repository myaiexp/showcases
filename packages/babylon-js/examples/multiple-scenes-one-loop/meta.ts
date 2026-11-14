// babylon-js example: Two scenes in one render loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Two scenes in one render loop",
  summary:
    "Two Scene objects share one engine and are rendered one after the other in a single runRenderLoop. The overlay scene sets autoClear = false so it draws over the first instead of erasing it; a toggle shows what happens otherwise.",
  section: "Scene",
  tags: ['Scene', 'autoClear', 'runRenderLoop', 'multiple scenes', 'Engine'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/multiScenes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
