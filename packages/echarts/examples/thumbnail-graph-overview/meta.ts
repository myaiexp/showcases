// echarts example: Thumbnail overview of a graph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Thumbnail overview of a graph',
  summary:
    'A 63-node graph you can pan and zoom, with a thumbnail overview whose window box follows the viewport. Move it to a corner, resize it, restyle its frame, or hide it.',
  section: 'Option: Components',
  tags: ['thumbnail', 'windowStyle', 'itemStyle', 'seriesIndex', 'graph', 'roam', 'zoom', 'center'],
  docs: [
    'repo/en/option/component/thumbnail.md',
    'repo/en/option/series/graph.md',
    'repo/en/option/partial/view-coord-sys.md',
    'repo/en/option/partial/roam.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
