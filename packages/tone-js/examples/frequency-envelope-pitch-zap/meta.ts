// Tone.js example: a FrequencyEnvelope driving pitch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sound effects from a pitch that falls',
  summary:
    'A FrequencyEnvelope connected to an oscillator frequency bends the pitch along its curve. A fast drop from high to low is a laser zap or a kick drum; a slow rise is a riser.',
  section: 'Envelopes',
  tags: ['FrequencyEnvelope', 'baseFrequency', 'octaves', 'Oscillator', 'frequency', 'connect'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/FrequencyEnvelope.ts', 'repo/Signals.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
