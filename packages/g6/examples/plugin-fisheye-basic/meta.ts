// g6 example: Fisheye: magnified region
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fisheye: magnified region',
  summary: 'The fisheye plugin magnifies the nodes inside a circle that follows the pointer and shows the distortion percentage. The card moves the lens across the graph on a timer.',
  section: 'Plugin',
  tags: ['fisheye', 'trigger', 'r', 'd', 'showDPercent'],
  docs: ['repo/packages/site/docs/manual/plugin/Fisheye.en.md', 'repo/packages/site/common/api/plugins/fisheye.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
