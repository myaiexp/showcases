// embedding-atlas example: axis.x.labelMaxWidth truncating long category labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Axis label max width",
  summary:
    "Bars per topic with the x labels capped by labelMaxWidth. At 20 px the topic names shrink to their first letters, at 60 they fit; the default leaves them whole.",
  section: "Charts",
  tags: ['axis', 'labelMaxWidth', 'mark: bar'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
