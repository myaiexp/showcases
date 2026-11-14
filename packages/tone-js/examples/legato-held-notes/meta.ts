// Tone.js example: Legato: connected notes versus separate ones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legato: connected notes versus separate ones',
  summary:
    'A monophonic synth can play notes separately, tie them together without lifting, or be caught out when an attack lands before the last release. Compare all three on Tone.Synth.',
  section: 'Instruments',
  tags: ['Synth', 'triggerAttack', 'triggerRelease', 'triggerAttackRelease'],
  docs: ['repo/Instruments.md', 'repo/Tone/instrument/Monophonic.ts', 'repo/Tone/instrument/Synth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
