// observable-plot example: Auto: one color channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto: one color channel',
  summary:
    'Auto has one color channel, applied as stroke for a line and as fill for an area. The mark option overrides the line with an area.',
  section: 'Mark: Auto',
  tags: ['auto', 'color', 'mark'],
  docs: ['repo/docs/marks/auto.md', 'repo/docs/data/bls-industry-unemployment.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
