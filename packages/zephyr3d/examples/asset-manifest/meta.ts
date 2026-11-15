// zephyr3d example: Asset manifest: shipped files behind source paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Asset manifest: shipped files behind source paths',
  summary:
    'asset-manifest.json maps a source texture path to the file a build shipped, and the engine reads it at startup so fetchTexture(source) just works. loadAssetManifest loads one from elsewhere, assetSourceResolver can be replaced or cleared, and direct reads still see the shipped file names.',
  section: 'Basic Framework',
  tags: ['asset-manifest.json', 'loadAssetManifest', 'assetSourceResolver', 'createManifestSourceResolver', 'fetchTexture', 'MemoryFS'],
  docs: ['repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
