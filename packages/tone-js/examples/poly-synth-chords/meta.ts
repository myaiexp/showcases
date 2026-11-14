// Tone.js example: Play whole chords with PolySynth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play whole chords with PolySynth',
  summary:
    'Most Tone.js synths play one note at a time. Wrap one in Tone.PolySynth and pass an array of notes to play a chord; the card plays a progression with one, three and four notes.',
  section: 'Instruments',
  tags: ['PolySynth', 'triggerAttackRelease', 'set'],
  docs: ['repo/Tone/instrument/PolySynth.ts', 'repo/Instruments.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
