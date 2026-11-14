// g6 example: Graph option zoomRange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graph option zoomRange',
  summary:
    'zoomRange limits the zoom: wheel zooming and zoomTo() both stop at the minimum and maximum, which two sliders change on the live graph.',
  section: 'Graph',
  tags: ['zoomRange', 'zoomTo', 'getZoom', 'zoom-canvas', 'setOptions'],
  docs: [
    'repo/packages/site/docs/manual/graph/option.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
