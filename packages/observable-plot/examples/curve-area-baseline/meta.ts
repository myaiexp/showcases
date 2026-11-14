// observable-plot example: Curves: area and line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Curves: area and line',
  summary:
    'The area mark takes a curve option too; here an area and its outline line share the curve (bundle is left out, it is for lines only).',
  section: 'Curves',
  tags: ['areaY', 'lineY', 'curve'],
  docs: ['repo/docs/features/curves.md', 'repo/docs/marks/area.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
