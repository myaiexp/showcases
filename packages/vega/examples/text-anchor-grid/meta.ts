// vega example: Text: Align and Baseline Grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text: Align and Baseline Grid",
  summary:
    "Each cell anchors a small red dot, and the label hangs off it by its own align and baseline. The line-top and line-bottom baselines measure from the line height rather than the font size.",
  section: "Mark Types",
  tags: ['marks.text.align','marks.text.baseline','marks.text.dx','marks.text.dy','marks.text.angle'],
  docs: ['repo/docs/docs/marks/text.md', 'repo/docs/docs/marks/text.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
