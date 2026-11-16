// fabric example: Object caching: cacheProperties by class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: cacheProperties by class',
  summary:
    'Pick a class to see its static cacheProperties (the names whose set() invalidates the cache) and what it adds to the base list. statefullCache from the old guide no longer exists in v7: this list is the whole mechanism.',
  section: 'Object caching',
  tags: ['cacheProperties', 'stateProperties', 'Rect', 'FabricText', 'Group'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/api/classes/FabricObject.md',
    'repo/src/content/docs/api/classes/Rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
