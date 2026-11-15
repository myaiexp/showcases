// galacean example: Assets: gc and reference counts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: gc and reference counts",
  summary:
    "Cached textures stay in memory until resourceManager.gc(). Only assets that nothing references (refCount 0) are released: textures used by a material survive, the loaded-but-unused ones are destroyed.",
  section: "Assets",
  tags: ['ResourceManager', 'gc', 'refCount', 'ReferResource', 'Texture2D', 'getFromCache'],
  docs: [
    'repo/docs/en/assets/gc.mdx',
    'repo/docs/en/assets/overall.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
