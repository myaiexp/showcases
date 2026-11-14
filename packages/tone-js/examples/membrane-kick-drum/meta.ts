// Tone.js example: Kick drum from a membrane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Kick drum from a membrane',
  summary:
    'A sine wave whose pitch drops fast sounds like a drum skin being hit. Tone.MembraneSynth sets how long and how far the pitch falls: a short dive clicks, a long one booms.',
  section: 'Instruments',
  tags: ['MembraneSynth', 'pitchDecay', 'octaves', 'triggerAttackRelease'],
  docs: ['repo/Tone/instrument/MembraneSynth.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
