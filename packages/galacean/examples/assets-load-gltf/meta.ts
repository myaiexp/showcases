// galacean example: Assets: load a glTF model
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: load a glTF model",
  summary:
    "A cube described as glTF JSON with an embedded base64 buffer, loaded from a blob URL as AssetType.GLTF and instantiated with instantiateSceneRoot, several copies from one load.",
  section: "Assets",
  tags: ['ResourceManager', 'load', 'AssetType', 'GLTFResource', 'instantiateSceneRoot'],
  docs: [
    'repo/docs/en/assets/load.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
