// zephyr3d example: Skeletal masks: includeBody, excludeBody and includeDescendants
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skeletal masks: includeBody, excludeBody and includeDescendants',
  summary:
    'A humanoid mask can name joints by HumanoidBodyRig semantics instead of bone names. Pick a joint to include or exclude from the run clip, and toggle includeDescendants to take its whole branch or only the joint itself.',
  section: 'Animation',
  tags: ['includeBody', 'excludeBody', 'HumanoidBodyRig', 'includeDescendants', 'rootMotion', 'createSkeletalMaskedAnimation'],
  docs: ['repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
