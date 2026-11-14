// Tone.js example: Ease toward a pitch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ease toward a pitch',
  summary:
    'setTargetAtTime starts closing in on a value at a given moment and slows as it arrives; the time constant sets how lazy it is. Good for natural-feeling pitch and volume changes.',
  section: 'Signals',
  tags: ['Signal', 'setTargetAtTime', 'timeConstant'],
  docs: ['repo/Signals.md', 'repo/Tone/core/context/Param.ts', 'repo/Tone/signal/Signal.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
