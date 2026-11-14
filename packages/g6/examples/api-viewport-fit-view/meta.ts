// g6 example: Viewport: fitView with when and direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Viewport: fitView with when and direction',
  summary: 'graph.fitView({ when, direction }, animation) scales and centers the graph. when: overflow leaves a graph that already fits alone; direction limits the fit to one axis.',
  section: 'API',
  tags: ['fitView', 'FitViewOptions', 'when', 'direction'],
  docs: [
    'repo/packages/site/docs/api/viewport.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
