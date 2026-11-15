// galacean example: Assets: load a base64 data URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: load a base64 data URL",
  summary:
    "The docs load a base64 image by passing a data URL with an explicit type. Here the data URL comes from canvas.toDataURL and loads as a Texture2D on a plane.",
  section: "Assets",
  tags: ['ResourceManager', 'load', 'AssetType', 'Texture2D', 'base64'],
  docs: [
    'repo/docs/en/assets/load.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
