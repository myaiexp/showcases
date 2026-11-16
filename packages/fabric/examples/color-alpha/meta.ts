// fabric example: Colors: getAlpha and setAlpha
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colors: getAlpha and setAlpha',
  summary:
    'setAlpha() rewrites the alpha channel of a Color in place and returns it; six swatches of one blue at falling alphas over a red disc, while the object opacity stays 1.',
  section: 'Colors',
  tags: ['Color', 'getAlpha', 'setAlpha', 'toRgba'],
  docs: ['repo/src/content/docs/api/classes/Color.md', 'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
