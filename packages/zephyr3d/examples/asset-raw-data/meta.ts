// zephyr3d example: Text, JSON and binary data from the VFS
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text, JSON and binary data from the VFS',
  summary:
    'The asset manager caches raw files too: fetchJsonData reads a level file that lays out boxes, fetchBinaryData returns float32 positions that become a triangle fan, and fetchTextData returns a text file. clearCache() evicts the cached results.',
  section: 'Basic Framework',
  tags: ['fetchTextData', 'fetchJsonData', 'fetchBinaryData', 'assetManager', 'clearCache', 'MemoryFS'],
  docs: ['repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
