// playcanvas example: Finding assets in the registry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Finding assets in the registry',
  summary:
    "Seven in-memory assets sit in an AssetRegistry with names, types and tags. Pick a query (get by id, find, find by type, findAll, findByTag with AND and OR, filter, list by preload) and the assets it returns rise and glow on a ring of props, with their names and ids printed.",
  section: 'Assets',
  tags: ['AssetRegistry', 'Asset', 'get', 'find', 'findAll', 'findByTag', 'filter', 'list', 'tags', 'preload'],
  docs: [
    'repo/docs/user-manual/assets/asset-registry.md',
    'repo/docs/user-manual/assets/index.md',
    'repo/docs/user-manual/assets/preloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
