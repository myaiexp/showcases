// postprocessing example: the orthographic depth conversion helpers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'orthographicDepthToViewZ and viewZToOrthographicDepth',
  summary:
    'With an orthographic camera, depth is a straight line between near and far. The two helpers convert between a negative view-space Z and that depth value in JavaScript. A DepthEffect paints the scene in grey and a yellow marker sphere sits at the slider\'s distance, so its grey level matches the number the helper returns. The helpers are internal (@ignore, not exported from the package), so the example carries the two formulas from src/utils in depth.ts.',
  section: 'Utilities',
  tags: ['orthographicDepthToViewZ', 'viewZToOrthographicDepth', 'DepthEffect', 'OrthographicCamera'],
  docs: ['repo/README.md', 'repo/src/utils/orthographicDepthToViewZ.js', 'repo/src/utils/viewZToOrthographicDepth.js', 'repo/src/effects/DepthEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
