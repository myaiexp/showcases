// galacean example: Model: load a glTF and instantiate it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: load a glTF and instantiate it",
  summary:
    "A robot built as a .glb in code is loaded from a blob URL as AssetType.GLTF; instantiateSceneRoot() makes the entity tree, with an Animator already bound.",
  section: "Model",
  tags: ['AssetType','GLTFResource','instantiateSceneRoot','Animator'],
  docs: [
    'repo/docs/en/graphics/model/use.mdx',
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
