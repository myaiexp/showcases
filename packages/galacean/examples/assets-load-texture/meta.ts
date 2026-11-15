// galacean example: Assets: load a texture from a URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: load a texture from a URL",
  summary:
    "resourceManager.load with a LoadItem of type Texture2D: an image drawn in code, turned into a PNG blob URL, loaded as a Texture2D and put on a material. Blob URLs are the docs' absolute-path case.",
  section: "Assets",
  tags: ['ResourceManager', 'load', 'AssetType', 'Texture2D', 'LoadItem'],
  docs: [
    'repo/docs/en/assets/load.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
