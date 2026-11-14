// observable-plot example: Line: gaps versus filtering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: gaps versus filtering',
  summary:
    'Setting y to NaN for the first three months of each year breaks the line into pieces. Filtering those rows out instead joins the remaining points with long straight lines, drawn faintly under the gapped line for comparison.',
  section: 'Mark: Line',
  tags: ['lineY', 'filter', 'strokeOpacity', 'NaN'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
