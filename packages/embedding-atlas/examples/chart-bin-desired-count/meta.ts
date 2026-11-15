// embedding-atlas example: encoding.x.bin.desiredCount sets histogram bins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin count of a histogram",
  summary:
    "The x encoding of a histogram takes bin: { desiredCount }. The variants ask for 6, 15 and 40 bins over the score column; the chart picks round bin edges near the request.",
  section: "Charts",
  tags: ['bin', 'desiredCount', 'encoding', 'mark: bar'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
