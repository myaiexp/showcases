// Zod example: a tiny generator walks _zod.def and writes a type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Write a TypeScript type from a schema',
  summary:
    'A tool that traverses schemas needs only a switch over def.type. This tiny generator reads a schema through zod/v4/core types and writes its TypeScript type as text, one line per field, without knowing the schema ahead of time.',
  section: 'Zod Core',
  tags: ['z.core', '_zod.def', 'def.type', 'z.core.$ZodTypes', 'switch'],
  docs: ['repo/packages/docs/content/packages/core.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
