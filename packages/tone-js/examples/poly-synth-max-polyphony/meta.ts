// Tone.js example: What happens when the voices run out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What happens when the voices run out',
  summary:
    'A Tone.PolySynth can only sound as many notes at once as its maxPolyphony; notes pressed beyond that are dropped. The red keys on the card never sound.',
  section: 'Instruments',
  tags: ['PolySynth', 'maxPolyphony', 'triggerAttack', 'releaseAll'],
  docs: ['repo/Instruments.md', 'repo/Tone/instrument/PolySynth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
