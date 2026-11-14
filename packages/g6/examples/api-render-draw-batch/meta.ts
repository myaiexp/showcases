// g6 example: Render: batch updates, then draw once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render: batch updates, then draw once',
  summary: 'updateNodeData and updateEdgeData only queue changes. One draw() applies the whole batch, so the canvas stays as it was until then.',
  section: 'API',
  tags: ['draw', 'updateNodeData', 'updateEdgeData'],
  docs: [
    'repo/packages/site/docs/api/render.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
