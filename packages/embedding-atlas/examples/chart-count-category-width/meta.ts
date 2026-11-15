// embedding-atlas example: count-plot categoryWidth sizing the label column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Count plot category width",
  summary:
    "categoryWidth sets the width of the label column of a count plot over the source column, in pixels. The variants give 40, 90 and 160 pixels; narrow columns cut long names short.",
  section: "Charts",
  tags: ['count-plot', 'categoryWidth', 'labels'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
