// Zdog example: Update path (bars), a bar chart that grows to new values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Update path (bars)',
  summary:
    'A five-bar chart that eases to a fresh set of values every few seconds. A bar is a Rect, and its height is baked into its path, so after changing it you call updatePath() to see the change. Turn that call off and the gold marker dots still move (they only use translate) but the bars stay as they were.',
  section: 'API: Shape',
  tags: ['Shape', 'Rect', 'updatePath', 'height', 'translate'],
  docs: ['repo/modules/docs/api-shape.hbs', 'repo/modules/docs/shapes-basic.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
