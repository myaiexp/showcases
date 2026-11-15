// zephyr3d example: Skeletal masks by joint name: strings, RegExp and functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skeletal masks by joint name: strings, RegExp and functions',
  summary:
    'For rigs without a humanoid mapping, type: \'joints\' masks take include and exclude lists whose entries are a joint name, a RegExp or a predicate on the joint node. The run clip is cut three ways and played alone.',
  section: 'Animation',
  tags: ['type joints', 'include', 'exclude', 'JointNameMatcher', 'includeDescendants', 'createSkeletalMaskedAnimation'],
  docs: ['repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
