// vega example: View: Image Export
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Exporting Images',
  summary:
    'A moving chart snapshotted again and again with toImageURL("png", 2), toCanvas(2) and toSVG(): the full view shows the PNG and the start of the SVG markup next to the chart, the card prints the sizes.',
  section: 'View API',
  tags: ['view.toImageURL', 'view.toCanvas', 'view.toSVG'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
