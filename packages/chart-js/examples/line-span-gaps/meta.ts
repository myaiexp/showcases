// Chart.js example: Gaps in a line where data is missing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gaps in a line where data is missing',
  summary:
    'A room sensor that dropped out twice, so some readings are null. spanGaps decides whether the line breaks at each missing reading or draws straight across it.',
  section: 'Chart types',
  tags: ['line', 'spanGaps', 'null', 'gaps'],
  docs: ['repo/docs/charts/line.md', 'repo/docs/general/data-structures.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
