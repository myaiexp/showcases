// postprocessing example: OutlineEffect xRay and hiddenEdgeColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: X-ray and hidden edges',
  summary:
    'A grey slab stands in front of the selected torus knot. With xRay on, OutlineEffect also outlines the parts that are hidden, in hiddenEdgeColor (the default is a near-black red that is easy to miss, so pick a bright one). With xRay off only the visible edge is drawn.',
  section: 'Outline',
  tags: ['OutlineEffect', 'xRay', 'hiddenEdgeColor', 'visibleEdgeColor'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js', 'repo/src/effects/glsl/outline.frag', 'repo/src/materials/DepthComparisonMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
