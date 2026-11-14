// VFX-JS example: SliceShiftEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SliceShiftEffect',
  summary:
    'A test card cut into strips, each slid toward the centre strip. shift sets how far (1 makes every strip show the centre one), random adds a per-strip offset, size is the strip width in px and angle turns the strips.',
  section: '@vfx-js/effects',
  tags: ['SliceShiftEffect', 'effect', 'shift', 'random', 'size', 'angle', 'centerX', 'centerY', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/slice-shift.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
