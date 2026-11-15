// zephyr3d example: Layering masked clips: waving upper body over a walking lower body
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layering masked clips: waving upper body over a walking lower body',
  summary:
    'The walk clip is cut to its lowerBody and the wave clip to its upperBody; the two complementary masked clips play together, each with its own switch and weight, so the figure waves while it walks.',
  section: 'Animation',
  tags: ['createSkeletalMaskedAnimation', 'preset', 'upperBody', 'lowerBody', 'playAnimation', 'weight'],
  docs: ['repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/animation-blending.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
