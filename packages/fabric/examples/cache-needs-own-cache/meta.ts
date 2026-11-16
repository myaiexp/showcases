// fabric example: Object caching: needsItsOwnCache cases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object caching: needsItsOwnCache cases',
  summary:
    'Five rects with objectCaching false. Only the clipPath one and the paintFirst stroke one with a shadow report needsItsOwnCache() true and still render through a cache (ownCaching true), because their drawing needs an isolated canvas.',
  section: 'Object caching',
  tags: ['needsItsOwnCache', 'objectCaching', 'clipPath', 'paintFirst', 'Shadow'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-object-caching.mdx',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
