// Tone.js example: LowpassCombFilter as a plucked string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pluck a string from a burst of noise',
  summary:
    'A LowpassCombFilter is an echo that gets duller each time round, which is exactly how a plucked string behaves. Feed it a tiny puff of noise and it rings at the pitch of its delay; dampening decides how bright or woolly the string sounds.',
  section: 'Filters',
  tags: ['LowpassCombFilter', 'delayTime', 'resonance', 'dampening', 'NoiseSynth'],
  docs: ['repo/Tone/component/filter/LowpassCombFilter.ts', 'repo/Tone/instrument/NoiseSynth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
