// l7 example: Feature animate: interval and trail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature animate: interval and trail",
  summary:
    "interval (0-1) cuts each line into 1 / interval trails: 0.2 gives five, 0.5 gives two. trailLength (0-1) is how long each fades. duration is seconds.",
  section: "Layer: Features",
  tags: ["animate","duration","interval","trailLength"],
  docs: ["repo/site/docs/api/common/features/animate.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
