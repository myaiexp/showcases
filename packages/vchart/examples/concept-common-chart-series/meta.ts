// vchart example: A combined chart: bar and area in one region
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A combined chart: bar and area in one region',
  summary:
    'A type common chart holds a bar series and an area series that read two data entries through data.fromDataId. The area sits on its own right axis with stack false; the full view toggles the area stack and re-randomises each series.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['type: common', 'series', 'data.fromDataId', 'axes', 'stack'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Understanding_VChart.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
