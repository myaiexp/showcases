// babylon-js example: Occlusion queries behind a moving wall
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Occlusion queries behind a moving wall',
  summary:
    'Four spheres with occlusionType set, in a later rendering group than the wall sliding in front of them. Babylon queries each sphere’s bounding box and skips drawing it while the box is hidden; the chips read mesh.isOccluded. The panel switches OPTIMISTIC, STRICT and NONE, the query algorithm and occlusionRetryCount.',
  section: 'Occlusion Queries',
  tags: ['occlusionType', 'isOccluded', 'occlusionRetryCount', 'occlusionQueryAlgorithmType', 'renderingGroupId'],
  docs: ['repo/content/features/featuresDeepDive/occlusionQueries.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
