// galacean example: Model: pick a scene root
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: pick a scene root",
  summary:
    "One glTF holds three scenes; instantiateSceneRoot(index) places the one you choose, here cycling through a cube, a ball and a pair.",
  section: "Model",
  tags: ['instantiateSceneRoot','sceneRoots','GLTFResource'],
  docs: [
    'repo/docs/en/graphics/model/use.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
