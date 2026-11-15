// l7 example: Feature vertexHeightScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature vertexHeightScale",
  summary:
    "A line whose coordinates carry a third number (height) rises and falls along its length; vertexHeightScale scales those heights. Tilt the map to see the lines.",
  section: "Layer: Features",
  tags: ["vertexHeightScale","height"],
  docs: ["repo/site/docs/api/common/features/vertex_height.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
