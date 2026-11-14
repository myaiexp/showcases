// Tone.js example: Straight ramp or octave ramp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Straight ramp or octave ramp',
  summary:
    'The same glide from 200 to 800 Hz drawn two ways: linearRampTo adds equal Hz every moment, exponentialRampTo multiplies, which is how pitch really feels. Useful whenever you glide a frequency or a volume.',
  section: 'Signals',
  tags: ['Signal', 'linearRampTo', 'exponentialRampTo', 'frequency'],
  docs: ['repo/Signals.md', 'repo/Tone/core/context/Param.ts', 'repo/Tone/signal/Signal.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
