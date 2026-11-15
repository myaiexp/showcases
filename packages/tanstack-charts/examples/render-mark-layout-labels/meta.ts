// tanstack-charts example: layoutLabels reserves margin for labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "layoutLabels reserves margin for labels",
  summary:
    "A custom mark that writes a label to the right of its last point. With layoutLabels returning those labels, the automatic margins grow to hold them. Without it, the label runs past the plot edge. The checkbox switches the hook, and the readout shows the right margin.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'layoutLabels', 'SceneLabel', 'margin'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
