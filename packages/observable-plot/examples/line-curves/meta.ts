// observable-plot example: Line: choosing a curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: choosing a curve',
  summary:
    'Ten values drawn with the linear, step, basis and catmull-rom curves, with the raw points as dots. Step shows when the value changes; basis and catmull-rom smooth between points.',
  section: 'Mark: Line',
  tags: ['lineY', 'curve', 'dot'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/features/curves.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
