// motion example: Dashed route loader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marching dashed route while a ride is found',
  summary: 'A map with a winding route whose dashes march from pickup to drop-off while the app looks for a driver. The dash size, the gap and the position along the path are three progress values, so you can tune them.',
  section: 'animate',
  tags: ['animate', 'SVG paths', 'pathLength', 'pathSpacing', 'pathOffset', 'repeat'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
