// Zod example: registry examples typed with z.$output and run as tests
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Examples checked by their own schema',
  summary:
    'A registry whose metadata type is z.$output keeps a list of examples per schema, typed to what that schema produces. Every stored example is run through its own schema: the one that is not a number is refused by TypeScript and by the schema.',
  section: 'Metadata and registries',
  tags: ['z.$output', 'z.registry', '.register()', 'safeParse'],
  docs: ['repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
