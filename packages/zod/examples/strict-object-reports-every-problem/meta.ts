// Zod example: a strict object reports an extra key and a bad value together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Strict objects report every problem',
  summary:
    'A strict profile schema with two kinds of mistake at once: a stray key and a wrong value. Since Zod 4.5 an unrecognized key no longer aborts the schema, so both problems come back in one list and the reader can fix them in one go.',
  section: 'Release notes',
  tags: ['z.strictObject', 'unrecognized_keys', 'invalid_type', 'issues'],
  docs: ['repo/packages/docs/content/blog/zod-4-5.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
