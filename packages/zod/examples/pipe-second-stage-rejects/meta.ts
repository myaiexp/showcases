// Zod example: Pipe: the second schema can reject what the first made
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pipe: the second schema can reject what the first made',
  summary:
    "A transform never complains, so new Date on a nonsense date text happily returns an Invalid Date. Piping it into z.date() turns that quiet failure into a real issue, and a refine adds a business rule on top.",
  section: 'Transforms and pipes',
  tags: ['pipe', 'transform', 'z.date', 'refine'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
