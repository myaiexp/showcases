// vega example: Title frame, offset, dx/dy, angle and baseline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Title frame, offset, dx/dy, angle and baseline",
  summary:
    "With a wide y axis, frame bounds anchors the title over the whole chart and frame group over the plot only; offset, dx, dy, angle, align and baseline then fine-tune it.",
  section: "Title",
  tags: ["title.frame","title.offset","title.dx","title.dy","title.angle","title.baseline","title.align"],
  docs: ["repo/docs/docs/title.md","repo/docs/docs/config.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
