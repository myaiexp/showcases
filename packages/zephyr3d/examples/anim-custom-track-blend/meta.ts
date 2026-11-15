// zephyr3d example: Blending custom tracks: mixState and one blendId per property
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blending custom tracks: mixState and one blendId per property',
  summary:
    'Two custom tracks, a UV scroll and a colour tint, sit in the same clips because their blendIds differ. A slow and a fast clip play at once, and a weight slider makes mixState interpolate their states.',
  section: 'Animation',
  tags: ['AnimationTrack', 'mixState', 'getBlendId', 'blendId', 'weight', 'Interpolator', 'playAnimation'],
  docs: ['repo/apps/doc/web/en/animation-custom.md', 'repo/apps/doc/web/en/animation-blending.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
