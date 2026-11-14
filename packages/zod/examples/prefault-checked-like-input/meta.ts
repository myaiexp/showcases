// Zod example: A prefault can still fail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A prefault can still fail',
  summary:
    'A prefault is parsed like typed input, so its rules apply: a too-short "ab" prefault is rejected when the value is missing. The same text given as a default slips through unchecked.',
  section: 'Defaults, catch and more',
  tags: ['prefault', 'default', 'min'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
