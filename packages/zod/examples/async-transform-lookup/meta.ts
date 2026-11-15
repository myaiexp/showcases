// Zod example: Async transform: look a user up by id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Async transform: look a user up by id',
  summary:
    "A transform can be async: here it turns a user id into a whole user record after a short pretend lookup (no network, just a timer). Because of that the schema has to be run with safeParseAsync; the plain safeParse refuses.",
  section: 'Transforms and pipes',
  tags: ['transform', 'safeParseAsync', 'safeParse', 'z.NEVER', 'async'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
