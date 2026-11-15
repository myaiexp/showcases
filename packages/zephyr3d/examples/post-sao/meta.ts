// zephyr3d example: Screen-space ambient occlusion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Screen-space ambient occlusion',
  summary:
    'camera.SSAO darkens creases and contact points that ambient light would reach too easily. The occlusion radius, bias, intensity and blur depth cutoff are live; the lights are mostly ambient so the effect reads.',
  section: 'Post-processing',
  tags: ['SSAO', 'SSAOOcclusionRadius', 'SSAOBias', 'SSAOIntensity', 'SSAOBlurDepthCutoff'],
  docs: ['repo/apps/doc/web/en/posteffect-sao.md', 'repo/apps/doc/web/en/posteffect-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
