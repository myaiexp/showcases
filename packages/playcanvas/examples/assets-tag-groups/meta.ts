// playcanvas example: Loading asset groups by tag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading asset groups by tag',
  summary:
    "Eight textures carry level and role tags. A group is loaded with the guide's loop: findByTag, one once('load') per asset, a counter, and a callback when the last one lands (the group hops). The full view tries tag queries with AND and OR and unloads everything again.",
  section: 'Assets',
  tags: ['AssetRegistry', 'findByTag', 'Asset', 'tags', 'load', 'unload', 'once'],
  docs: [
    'repo/docs/user-manual/assets/preloading.md',
    'repo/docs/user-manual/assets/asset-registry.md',
    'repo/docs/user-manual/assets/loading-unloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
