// Spark example: imageSplats from a canvas data URL with a forEachSplat filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural image splats',
  summary:
    'A sunset drawn on a canvas is passed to imageSplats as a data: URL, so nothing is downloaded. subXY subsamples it, and a forEachSplat callback drops dim pixels by returning null and lifts bright ones toward the camera by setting center.z. Sliders adjust subXY, the brightness cut, the lift and dotRadius.',
  section: 'Procedural Splats',
  tags: ['imageSplats', 'subXY', 'forEachSplat', 'dotRadius', 'data URL'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
