// zephyr3d example: Shadow modes compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shadow modes compared',
  summary:
    'One scene and one 512-pixel shadow map, switched between shadow.mode hard, pcf, pcss, vsm and esm, with a line on what each trades off. hard is the single-sample baseline the other examples compare against.',
  section: 'Shadows',
  tags: ['shadow.mode', 'hard', 'pcf', 'pcss', 'vsm', 'esm', 'camera.TAA'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
