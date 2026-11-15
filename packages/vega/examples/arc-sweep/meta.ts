// vega example: Arc: Angles and Radii
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: Angles and Radii",
  summary:
    "A single arc around a red centre point. Its angles, radii, padding and corner radius are signals, and the card sweeps the end angle and widens the ring.",
  section: "Mark Types",
  tags: ['marks.arc.startAngle','marks.arc.endAngle','marks.arc.innerRadius','marks.arc.outerRadius','marks.arc.cornerRadius'],
  docs: ['repo/docs/docs/marks/arc.md', 'repo/docs/docs/marks/arc.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
