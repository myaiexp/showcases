// Tone.js example: Tempo that steps or glides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tempo that steps or glides',
  summary:
    'Because bpm is a signal, you can schedule it like any parameter: jump with setValueAtTime, slide with linearRampToValueAtTime, or glide with rampTo. The readout reads the bpm signal at each kick.',
  section: 'Transport',
  tags: ['bpm', 'setValueAtTime', 'linearRampToValueAtTime', 'rampTo', 'getValueAtTime'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
    'repo/Tone/core/clock/TickParam.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
