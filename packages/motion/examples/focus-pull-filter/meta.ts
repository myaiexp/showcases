// motion example: Photo coming into focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A photo that pulls into focus',
  summary: 'A blurry, dark photo sharpens and brightens as if the camera just found its focus. The filter is animated like any style. Delay waits before starting, and a negative delay skips ahead so the animation starts partway through.',
  section: 'animate',
  tags: ['animate', 'filter', 'blur', 'brightness', 'delay', 'negative delay'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
