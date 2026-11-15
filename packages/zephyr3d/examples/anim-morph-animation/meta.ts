// zephyr3d example: Morph target animation: the pulse clip and weights on top
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Morph target animation: the pulse clip and weights on top',
  summary:
    'The GLB\'s weights channel becomes a MorphTargetTrack that plays through animationSet like any other clip. Its playback weight fades the pulse in and out, and a slider sets a morph target by hand on top of it.',
  section: 'Animation',
  tags: ['MorphTargetTrack', 'playAnimation', 'weight', 'setMorphTargetWeight', 'collectMorphTargetNames'],
  docs: ['repo/apps/doc/web/en/animation-morph-target.md', 'repo/apps/doc/web/en/animation-blending.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
