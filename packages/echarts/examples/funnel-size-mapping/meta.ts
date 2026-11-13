// echarts example: Funnel min, max and size mapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Funnel min, max and size mapping',
  summary:
    'Five stages valued 100 down to 9. Move min and max to change which values count as empty and full, and minSize and maxSize to change the widths they map to, so the last layer need not be a point.',
  section: 'Option: series.funnel',
  tags: ['funnel', 'min', 'max', 'minSize', 'maxSize'],
  docs: ['repo/en/option/series/funnel.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
