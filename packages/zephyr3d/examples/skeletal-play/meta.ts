// zephyr3d example: Skeletal animation: playAnimation and cross-fades
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skeletal animation: playAnimation and cross-fades',
  summary:
    'A skinned humanoid loaded with fetchModel through the GLTFImporter. Its AnimationSet lists the clips; playAnimation takes repeat, speedRatio, weight and fadeIn, and stopAnimation with fadeOut cross-fades from the previous clip. The model is a GLB generated in code and served from a MemoryFS.',
  section: 'Animation',
  tags: ['fetchModel', 'GLTFImporter', 'animationSet', 'playAnimation', 'stopAnimation', 'fadeIn'],
  docs: ['repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/asset-loading.md', 'repo/apps/doc/web/en/animation-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
