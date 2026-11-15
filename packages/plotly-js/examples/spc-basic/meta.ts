// plotly-js example: SPC control chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SPC control chart',
  summary:
    'A data line against red control limits at plus and minus 5, with violations circled; the card reveals the points one by one.',
  section: 'SPC Control Charts',
  tags: ['scatter', 'line.dash', 'marker.symbol', 'circle-open'],
  docs: ['repo/_posts/plotly_js/statistical/SPC/2017-09-27-spc-basic.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
