// g6 example: Plugin API: updatePlugin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin API: updatePlugin',
  summary: "graph.updatePlugin changes a plugin's options by its key: sliders and a colour select resize and recolour a grid-line plugin without rebuilding it.",
  section: 'Plugin',
  tags: ['updatePlugin', 'key', 'grid-line', 'size', 'stroke'],
  docs: ['repo/packages/site/docs/manual/plugin/overview.en.md', 'repo/packages/site/docs/api/plugin.en.md', 'repo/packages/site/docs/manual/plugin/GridLine.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
