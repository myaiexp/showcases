// postprocessing example: DepthEffect against the camera near and far planes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth effect: near and far planes',
  summary:
    'The depth DepthEffect shows is the raw depth buffer, so it depends on the camera. A larger near plane pushes the whole corridor toward black and spreads the values out; a smaller near plane crams everything into white. The far plane has a smaller effect. Cards animate camera.near.',
  section: 'Other effects',
  tags: ['DepthEffect', 'camera.near', 'camera.far', 'EffectAttribute.DEPTH'],
  docs: ['repo/README.md', 'repo/src/effects/DepthEffect.js', 'repo/src/effects/glsl/depth.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
