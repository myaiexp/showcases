// l7 example: Charts in markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Charts in markers",
  summary:
    "A Marker's element can be any DOM, so a point can carry a statistics chart. Each city gets three bars (agriculture, industry, service) sized by the total; the chart is drawn as SVG in code.",
  section: "Tutorial: Point",
  tags: ['Marker', 'addMarker', 'element', 'chart', 'DOM'],
  docs: ['repo/site/docs/tutorial/point/chart.en.md', 'repo/site/docs/api/component/marker.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
