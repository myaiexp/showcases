// observable-plot example: Auto: size channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto: size channel',
  summary:
    'The size channel is an alias for the dot radius, so adding it makes auto draw dots sized by Volume.',
  section: 'Mark: Auto',
  tags: ['auto', 'size', 'r'],
  docs: ['repo/docs/marks/auto.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
