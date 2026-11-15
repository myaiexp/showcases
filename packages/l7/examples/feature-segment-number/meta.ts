// l7 example: Feature segmentNumber
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature segmentNumber",
  summary:
    "An arc is cut into 30 straight pieces by default. Fewer segments are cheaper but look angular; try 3 and then 30.",
  section: "Layer: Features",
  tags: ["segmentNumber","arc"],
  docs: ["repo/site/docs/api/common/features/segment_number.en.md", "repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
