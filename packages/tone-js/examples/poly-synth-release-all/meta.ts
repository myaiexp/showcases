// Tone.js example: Let go of every note at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Let go of every note at once',
  summary:
    'Hold five notes, then let them all fade with one releaseAll call instead of releasing each one. It also silences stuck notes on Tone.PolySynth.',
  section: 'Instruments',
  tags: ['PolySynth', 'releaseAll', 'triggerRelease', 'triggerAttack'],
  docs: ['repo/Instruments.md', 'repo/Tone/instrument/PolySynth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
