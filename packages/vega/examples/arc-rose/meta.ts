// vega example: Arc: Polar Area Rose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: Polar Area Rose",
  summary:
    "A rose chart: a band scale over the angle range gives each arc its wedge, and a square-root scale turns the value into an outer radius so area stays honest. The values drift with a gain signal.",
  section: "Mark Types",
  tags: ['marks.arc.startAngle','marks.arc.outerRadius','marks.arc.cornerRadius','value.band'],
  docs: ['repo/docs/docs/marks/arc.md', 'repo/docs/docs/marks/arc.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
