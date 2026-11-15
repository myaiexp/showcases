// Zod example: one username rule in Zod and in Zod Mini, same verdicts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zod and Zod Mini agree',
  summary:
    'A username rule (trimmed, 3 to 12 characters) written twice: with chained methods in Zod and with .check() and functions in Zod Mini. Six inputs go through both, and every row gets the same verdict and the same cleaned result.',
  section: 'Zod Mini',
  tags: ['zod/mini', '.check()', 'z.minLength', 'z.maxLength', 'z.trim', '.min()', '.max()'],
  docs: ['repo/packages/docs/content/packages/mini.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
