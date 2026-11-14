// Zdog example: a comet with a tail made of copied Vector positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector copy trail',
  summary:
    'A comet circles a ringed planet and drags a fading tail of its past positions. Each position is stored with vector.copy(), so the history keeps old values. Switch the push option to the same vector and the whole tail collapses onto the comet, since every entry is the one object that keeps changing.',
  section: 'API: Vector',
  tags: ['Vector', 'copy', 'set', 'rotate'],
  docs: ['repo/modules/docs/api-vector.hbs', 'repo/modules/docs/vector-objects.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
