// VFX-JS example: changing the speed of the VFX clock with timeScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'timeScale: speed, pause, rewind',
  summary:
    'The time uniform comes from the VFX clock, not the wall clock. vfx.timeScale changes its speed at any moment: 1 is realtime, 0 pauses the animation while frames keep rendering, and a negative value runs it backwards. vfx.time reads the clock.',
  section: 'How it Works',
  tags: ['timeScale', 'time', 'clock', 'sinewave'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'repo/packages/vfx-js/src/vfx.ts', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
