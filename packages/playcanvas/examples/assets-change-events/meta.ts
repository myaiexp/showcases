// playcanvas example: The asset change event
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The asset change event',
  summary:
    "A single texture asset reports its changes: assigning asset.data patches the loaded texture (nearest versus linear filtering on a 16 pixel tile), assigning asset.file fetches the new image and reloads, and the log prints each change event with its property, new value and old value. Renaming and retagging are findable straight away.",
  section: 'Assets',
  tags: ['Asset', 'change', 'data', 'file', 'name', 'tags', 'AssetRegistry', 'find', 'findByTag'],
  docs: [
    'repo/docs/user-manual/assets/asset-registry.md',
    'repo/docs/user-manual/assets/loading-unloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
