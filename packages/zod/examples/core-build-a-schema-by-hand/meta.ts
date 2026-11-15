// Zod example: a schema built from plain defs, parsed by core functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Build a schema from plain pieces',
  summary:
    'Zod Core classes have no methods, so a schema is just a def object handed to a class, and parsing is a top-level function. Here a text schema and a minimum-length check are put together by hand, then used on three words.',
  section: 'Zod Core',
  tags: ['z.core', 'z.core.$ZodString', 'z.core.$ZodCheckMinLength', 'z.core.safeParse', 'def'],
  docs: ['repo/packages/docs/content/packages/core.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
