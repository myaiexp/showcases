// Pizzicato.js example: Quadrafuzz distorting only the low or only the high end of a drum loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fuzz only the highs or the lows',
  summary:
    'Quadrafuzz splits the sound into four bands, low to high, and distorts each one by its own gain. On a drum loop, fuzzing only the low band chews the kick and leaves the hats crisp; fuzzing only the high band does the opposite.',
  section: 'Effects',
  tags: ['Quadrafuzz', 'lowGain', 'midLowGain', 'midHighGain', 'highGain'],
  docs: ['repo/README.md', 'repo/src/Effects/Quadrafuzz.js', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
