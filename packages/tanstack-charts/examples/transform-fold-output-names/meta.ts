// tanstack-charts example: Fold output names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fold output names",
  summary:
    "Without as, fold names its columns key and value; as renames them, and a name may replace a source field because lineage keeps the original row. The select switches between the defaults and authored names and the chart reads whichever names are in use.",
  section: "Data Transforms",
  tags: ["fold", "as", "lineY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
