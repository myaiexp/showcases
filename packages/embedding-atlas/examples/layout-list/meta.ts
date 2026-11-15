// embedding-atlas example: a list layout: showTable, showEmbedding, showCharts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "List layout sections",
  summary:
    "A layout of type \"list\" stacks the embedding, the instances table and the charts. showTable, showEmbedding and showCharts turn each section on or off: all charts, charts only, and table only. showEmbedding stays false because the embedding view needs WebGPU.",
  section: "State & Layouts",
  tags: ['layouts', 'type: list', 'showTable', 'showEmbedding', 'showCharts', 'layoutOrder', 'currentLayout'],
  docs: [
    'repo/packages/viewer/src/layouts/list/types.ts',
    'repo/packages/viewer/src/layouts/layout_types.ts',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
