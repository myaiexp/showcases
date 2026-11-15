// l7 example: Arc segments and thetaOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc segments and thetaOffset",
  summary:
    "segmentNumber is how many straight pieces an arc is cut into and thetaOffset how far it bows. With only 5 segments the arc is visibly faceted.",
  section: "Tutorial: Line",
  tags: ["segmentNumber","thetaOffset","arc"],
  docs: ["repo/site/docs/tutorial/line/arc.en.md","repo/site/docs/api/common/features/segment_number.en.md","repo/site/docs/api/common/features/theta_offset.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
