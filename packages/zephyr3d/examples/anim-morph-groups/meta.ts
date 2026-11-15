// zephyr3d example: Morph target groups: one expression drives several targets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Morph target groups: one expression drives several targets',
  summary:
    'A runtime morphTargetGroups list defines expressions (happy, puffed, pointy) as weighted bindings onto the blob\'s targets, and setMorphTargetGroupWeight drives them. A name that is not a group falls back to a target of that name.',
  section: 'Animation',
  tags: ['morphTargetGroups', 'setMorphTargetGroupWeight', 'bindings', 'isBinary', 'SceneMorphTargetGroup'],
  docs: ['repo/apps/doc/web/en/animation-morph-target.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
