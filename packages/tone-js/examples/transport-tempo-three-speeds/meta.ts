// Tone.js example: Same beat, three tempos
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Same beat, three tempos',
  summary:
    'The Transport\'s bpm value sets how long a beat lasts, and every scheduled event follows it. A kick and off-beat hat loop one bar at 80, 120 and 180 BPM; the playhead crosses the same notation at different speeds.',
  section: 'Transport',
  tags: ['bpm', 'scheduleRepeat', 'loop', 'MembraneSynth'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
