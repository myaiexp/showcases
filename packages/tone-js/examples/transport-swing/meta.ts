// Tone.js example: Straight hats vs swung hats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Straight hats vs swung hats',
  summary:
    'Transport.swing delays every second subdivision (the swingSubdivision, an eighth note by default) so the groove lilts. Pink dots are hat hits on the beat grid: at 0 they sit on the lines, with swing they slide late. Drag swing in the full view.',
  section: 'Transport',
  tags: ['swing', 'swingSubdivision', 'scheduleRepeat', 'NoiseSynth'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
