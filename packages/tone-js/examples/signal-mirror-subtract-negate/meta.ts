// Tone.js example: Rising pitch and its mirror image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rising pitch and its mirror image',
  summary:
    'One rising signal feeds the left ear directly and the right ear through Subtract and Negate, which turns it into 1000 minus itself: the two pitches cross in the middle.',
  section: 'Signals',
  tags: ['Subtract', 'Negate', 'Signal', 'Panner'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/Subtract.ts', 'repo/Tone/signal/Negate.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
