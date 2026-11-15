// embedding-atlas example: columnStyles display set to full, badge and hidden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Column display: full, badge, hidden",
  summary:
    "display chooses how a column appears in tooltips: \"full\" shows the value, \"badge\" a compact tag, \"hidden\" leaves the column out (the instances table drops it too). The variants apply each to the source column.",
  section: "Data Formats",
  tags: ['columnStyles', 'display: full', 'display: badge', 'display: hidden'],
  docs: [
    'repo/packages/viewer/src/renderers/types.ts',
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
