// galacean example: Assets: load an array of items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: load an array of items",
  summary:
    "load([...]) takes several URLs or LoadItems and returns the assets in the same order: three textures and a glTF come back as one array and are placed by index.",
  section: "Assets",
  tags: ['ResourceManager', 'load', 'AssetType', 'GLTFResource', 'Texture2D'],
  docs: [
    'repo/docs/en/assets/load.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
