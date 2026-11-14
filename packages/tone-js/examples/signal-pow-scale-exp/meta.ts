// Tone.js example: Bend a control with Pow, Scale and ScaleExp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bend a control with Pow, Scale and ScaleExp',
  summary:
    'The same 0 to 1 control becomes a pitch three ways: Scale maps it evenly, Pow and ScaleExp bend it so the change is slow at one end and fast at the other.',
  section: 'Signals',
  tags: ['Scale', 'ScaleExp', 'Pow', 'Signal'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/Scale.ts', 'repo/Tone/signal/ScaleExp.ts', 'repo/Tone/signal/Pow.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
