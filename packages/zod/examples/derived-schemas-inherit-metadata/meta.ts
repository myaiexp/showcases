// Zod example: derived schemas inherit metadata, wrappers do not
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which copies keep their metadata',
  summary:
    'A schema is registered with an id and a title. A copy made with min() or trim() keeps the title (but never the id); optional() and z.array() wrap it in something new and start bare; a copy with its own metadata overrides the inherited one. The docs say a refined copy has none: Zod 4.6.7 differs.',
  section: 'Metadata and registries',
  tags: ['z.registry', '.register()', 'registry.get', '.min()', '.optional()'],
  docs: ['repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
