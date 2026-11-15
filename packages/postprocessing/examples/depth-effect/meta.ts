// postprocessing example: DepthEffect shows the depth buffer, with inverted
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth effect',
  summary:
    'DepthEffect replaces the picture with the depth buffer, a debugging view: depth 0 is the near plane and 1 the far plane, so close things are dark and the distance fades to white. Perspective depth is not linear, so most of the range sits close to white; inverted flips it so near objects are the bright ones.',
  section: 'Other effects',
  tags: ['DepthEffect', 'inverted', 'EffectAttribute.DEPTH'],
  docs: ['repo/README.md', 'repo/src/effects/DepthEffect.js', 'repo/src/effects/glsl/depth.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
