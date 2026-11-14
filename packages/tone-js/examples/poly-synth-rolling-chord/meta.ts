// Tone.js example: A chord that builds one note at a time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A chord that builds one note at a time',
  summary:
    'Five notes start a moment apart and are all released by one call, straight from the README. Tone.PolySynth keeps each note ringing until you release it with triggerRelease and an array.',
  section: 'Instruments',
  tags: ['PolySynth', 'triggerAttack', 'triggerRelease'],
  docs: ['repo/README.md', 'repo/Instruments.md', 'repo/Tone/instrument/PolySynth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
