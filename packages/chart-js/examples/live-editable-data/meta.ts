// Chart.js example: bar chart whose data is edited with sliders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live, editable data',
  summary:
    'Drag the sliders to change the monthly figures. Each change mutates the dataset and calls chart.update(), which tweens the bars to their new heights.',
  section: 'Basics',
  tags: ['bar', 'update', 'animation'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
