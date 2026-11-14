// Tone.js example: Soft and hard notes with velocity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Soft and hard notes with velocity',
  summary:
    'The third argument of triggerAttack is velocity from 0 to 1, how hard the note is struck: it scales both the attack and the sustain. Each pad plays the same Tone.Synth note at its own velocity.',
  section: 'Instruments',
  tags: ['Synth', 'velocity', 'triggerAttackRelease'],
  docs: ['repo/Instruments.md', 'repo/Tone/instrument/Monophonic.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
