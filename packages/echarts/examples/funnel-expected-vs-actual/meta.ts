// echarts example: Expected versus actual funnels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Expected versus actual funnels',
  summary:
    'Two funnel series on the same area: the planned stages as a faint wide backdrop and the achieved stages in front. Roll new actuals to see where the real funnel falls short of the plan.',
  section: 'Option: series.funnel',
  tags: ['funnel', 'min', 'max', 'maxSize', 'sort', 'emphasis.disabled', 'legend'],
  docs: ['repo/en/option/series/funnel.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
