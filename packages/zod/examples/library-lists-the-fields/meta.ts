// Zod example: a library reads def.shape to list an object schema fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A library reads the fields',
  summary:
    'A form helper receives an object schema it has never seen and lists its fields by reading schema._zod.def.shape: each field name, its type and whether it is required. It works the same on a Zod and a Zod Mini schema.',
  section: 'For library authors',
  tags: ['z.core.$ZodObject', '_zod.def.shape', '_zod.optin', 'zod/mini', 'z.core'],
  docs: ['repo/packages/docs/content/library-authors.mdx', 'repo/packages/docs/content/packages/core.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
