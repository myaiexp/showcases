// postprocessing example: Depth of field: focus range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth of field: focus range',
  summary:
    "With the focus fixed halfway down the corridor, focusRange decides how quickly things blur away from it. A small range leaves a thin sharp slice; a large one keeps most of the hall in focus.",
  section: 'Depth of Field',
  tags: ['DepthOfFieldEffect', 'cocMaterial', 'focusRange'],
  docs: ['repo/README.md', 'repo/src/effects/DepthOfFieldEffect.js', 'repo/src/materials/CircleOfConfusionMaterial.js', 'repo/src/materials/glsl/circle-of-confusion.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
