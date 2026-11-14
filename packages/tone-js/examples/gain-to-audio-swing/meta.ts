// Tone.js example: Stretch 0 to 1 into -1 to 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stretch 0 to 1 into -1 to 1',
  summary:
    'GainToAudio is the opposite of AudioToGain: a 0 to 1 control becomes -1 to 1, so one rising fader moves a pitch down below its centre and up above it.',
  section: 'Signals',
  tags: ['GainToAudio', 'Multiply', 'Add', 'Signal'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/GainToAudio.ts', 'repo/Tone/signal/Multiply.ts', 'repo/Tone/signal/Add.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
