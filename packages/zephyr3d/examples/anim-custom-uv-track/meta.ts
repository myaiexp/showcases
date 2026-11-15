// zephyr3d example: A custom AnimationTrack that scrolls a texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom AnimationTrack that scrolls a texture',
  summary:
    'A subclass of AnimationTrack implements clone, calculateState, mixState, applyState, getBlendId and getDuration, with an Interpolator holding the keyframes. applyState writes albedoTexCoordMatrix so a checker texture scrolls across a box.',
  section: 'Animation',
  tags: ['AnimationTrack', 'calculateState', 'mixState', 'applyState', 'getBlendId', 'getDuration', 'Interpolator', 'albedoTexCoordMatrix'],
  docs: ['repo/apps/doc/web/en/animation-custom.md', 'repo/apps/doc/web/en/animation-intro.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
