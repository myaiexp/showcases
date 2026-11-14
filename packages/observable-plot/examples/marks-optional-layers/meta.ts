// observable-plot example: Marks: layered and optional marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marks: layered and optional marks',
  summary:
    'A rule, an area and a line layered over the same series; the area is a null mark, which draws nothing, while its toggle is off.',
  section: 'Marks',
  tags: ['Plot.ruleY', 'Plot.areaY', 'Plot.lineY', 'marks', 'null mark'],
  docs: ['repo/docs/features/marks.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
