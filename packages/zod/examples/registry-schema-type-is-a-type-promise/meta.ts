// Zod example: the registry schema type constrains TypeScript only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A registry limited to string schemas',
  summary:
    'A registry created for string schemas only refuses a number schema in the editor, because that is a TypeScript check. The running code stores it anyway: the constraint adds no runtime check.',
  section: 'Metadata and registries',
  tags: ['z.registry', 'z.ZodString', 'add', 'has'],
  docs: ['repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
