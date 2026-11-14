// Tone.js example: Tremolo from AudioToGain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tremolo from AudioToGain',
  summary:
    'A -1 to 1 oscillator cannot be a volume, because negative gain flips the sound. AudioToGain rescales it to 0 to 1 so a slow wave makes a smooth tremolo; compare the raw wave.',
  section: 'Signals',
  tags: ['AudioToGain', 'Oscillator', 'Gain'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/AudioToGain.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
