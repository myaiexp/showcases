// zephyr3d example: PCF shadow filtering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PCF shadow filtering',
  summary:
    'Percentage Closer Filtering samples the neighbouring shadow-map texels and averages them. pcfKernelSize takes 3, 5 or 7 (larger is softer and costs more samples); a toggle switches to unfiltered hard shadows.',
  section: 'Shadows',
  tags: ['shadow.mode', 'pcf', 'pcfKernelSize', 'hard', 'shadowMapSize'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
