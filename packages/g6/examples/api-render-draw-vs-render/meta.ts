// g6 example: Render: draw keeps positions, render re-runs the layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render: draw keeps positions, render re-runs the layout',
  summary: 'Change the layout with setLayout, then call draw() (nodes stay where they are) or render() (the new layout runs). Same call order, different result.',
  section: 'API',
  tags: ['draw', 'render', 'setLayout', 'circular', 'concentric', 'grid'],
  docs: [
    'repo/packages/site/docs/api/render.en.md',
    'repo/packages/site/docs/manual/faq.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
