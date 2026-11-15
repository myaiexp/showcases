// tanstack-charts example: A threshold rule from createMark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A threshold rule from createMark",
  summary:
    "A custom mark that draws one horizontal rule and a label at a chosen value, on top of a bar chart. The mark declares its value as a y channel, so the axis grows to include it, and it emits no interaction points because the rule is decorative. The slider moves the threshold.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'MarkScene', 'rule', 'label', 'channels'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
