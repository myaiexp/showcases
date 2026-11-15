// zephyr3d example: fetchTexture options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'fetchTexture options',
  summary:
    'Four flat planes, one per option of ResourceManager.fetchTexture: samplerOptions (address and filter modes), linearColorSpace for a normal map, mimeType for a file without an extension, and texture to upload into an existing texture object. Files come from an in-memory VFS.',
  section: 'Basic Framework',
  tags: ['fetchTexture', 'samplerOptions', 'linearColorSpace', 'mimeType', 'texture', 'clearCache', 'MemoryFS'],
  docs: ['repo/apps/doc/web/en/asset-loading.md', 'repo/apps/doc/web/en/mesh-material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
