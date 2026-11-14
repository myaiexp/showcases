// Tone.js example: Two voices singing a fifth apart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two voices singing a fifth apart',
  summary:
    'Tone.DuoSynth runs two voices at once, and harmonicity sets the pitch ratio between them: unison, a fifth, an octave up or down. A quick way to thicken a single note into an interval.',
  section: 'Instruments',
  tags: ['DuoSynth', 'harmonicity', 'voice0', 'voice1'],
  docs: ['repo/Tone/instrument/DuoSynth.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
