// aframe example: registerPrimitive: your own element from defaults and mappings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'registerPrimitive: your own element from defaults and mappings',
  summary:
    'Registers a-crate with the docs\' a-box recipe (getMeshMixin plus extendDeep) and a-pyramid whose attributes size and sides map to geometry.radiusBottom and geometry.segmentsRadial. A slider changes the mapped sides.',
  section: 'Introduction',
  tags: ['registerPrimitive', 'defaultComponents', 'mappings', 'getMeshMixin', 'extendDeep'],
  docs: ['repo/docs/introduction/html-and-primitives.md', 'repo/docs/core/globals.md', 'repo/docs/core/utils.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
