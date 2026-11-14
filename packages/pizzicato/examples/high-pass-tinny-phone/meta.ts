// Pizzicato.js example: HighPassFilter thinning a melody out like a tiny speaker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tinny phone speaker',
  summary:
    'Tiny speakers cannot make bass, so music from a phone sounds thin. A HighPassFilter mutes everything below its `frequency` and lets the highs through: the card raises it from none, to a phone, to a tin can.',
  section: 'Effects',
  tags: ['HighPassFilter', 'frequency', 'peak'],
  docs: ['repo/README.md', 'repo/src/Effects/Filters.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
