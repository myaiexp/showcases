// galacean example: Assets: a custom resource loader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: a custom resource loader",
  summary:
    "A Loader subclass registered with resourceLoader for a new asset type: it reads a small JSON file of voxels from a blob URL and resolves a resource that knows how to build an entity of cubes.",
  section: "Assets",
  tags: ['Loader', 'resourceLoader', 'AssetPromise', 'LoadItem', 'ResourceManager'],
  docs: [
    'repo/docs/en/assets/custom.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
