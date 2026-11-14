// vchart example: updateState: highlight a whole series on click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'updateState: highlight a whole series on click',
  summary:
    'A custom state is declared on point.state and switched on later with vchart.updateState, whose filter keeps the points of other series dimmed. The card cycles the highlighted type; in the full view click a point, or press clearState.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['updateState', 'clearState', 'on click', 'custom state', 'seriesField'],
  docs: ['repo/docs/assets/api/en/API/vchart.md', 'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Mark.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
