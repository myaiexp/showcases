// babylon-js example: Highlight layer outlines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Highlight layer outlines',
  summary:
    'A HighlightLayer outlines picked shapes in their own colour with addMesh and removeMesh, using the stencil buffer. Its blurHorizontalSize and blurVerticalSize pulse each frame, innerGlow and outerGlow switch either side off, and a second layer outlines the ground so overlapping highlights don’t cancel.',
  section: 'Mesh',
  tags: ['HighlightLayer', 'addMesh', 'innerGlow', 'outerGlow', 'blurHorizontalSize'],
  docs: ['repo/content/features/featuresDeepDive/mesh/highlightLayer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
