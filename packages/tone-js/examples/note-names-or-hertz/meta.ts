// Tone.js example: a note given as a name like "D#2" or as a frequency in hertz
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Note names or hertz',
  summary:
    'A note can be a name with an octave, like "A4" or "D#2", or a plain frequency in hertz, like 440. "A4" and 440 are the same pitch; the others show how names map to vibrations per second.',
  section: 'Getting started',
  tags: ['triggerAttackRelease', 'Frequency', 'toFrequency'],
  docs: ['repo/README.md', 'repo/Time.md', 'repo/Tone/core/type/Frequency.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
