// g6 example: Fisheye: radius and distortion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fisheye: radius and distortion',
  summary: 'r is the lens radius and d the distortion factor; minR, maxR, minD and maxD bound them, and scaleRBy and scaleDBy let the wheel or a drag adjust each.',
  section: 'Plugin',
  tags: ['fisheye', 'r', 'd', 'minR', 'maxR', 'minD', 'maxD', 'scaleRBy', 'scaleDBy'],
  docs: ['repo/packages/site/docs/manual/plugin/Fisheye.en.md', 'repo/packages/site/common/api/plugins/fisheye.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
