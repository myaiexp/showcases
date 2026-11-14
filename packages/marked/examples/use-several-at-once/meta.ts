// marked example: use(a, b, c) in one call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'use(a, b, c) in one call',
  summary:
    'Three small extensions added with one use(a, b, c) on the left and with three separate use() calls on the right. The page is identical, which is what the docs promise.',
  section: 'marked.use()',
  tags: ['marked.use', 'extensions'],
  docs: ['repo/docs/USING_PRO.md', 'repo/src/Instance.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
