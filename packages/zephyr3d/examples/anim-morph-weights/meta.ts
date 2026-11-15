// zephyr3d example: Morph target weights: setMorphTargetWeight and per-mesh control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Morph target weights: setMorphTargetWeight and per-mesh control',
  summary:
    'The blob\'s four targets (smile, squash, spike, stretch) are listed with collectMorphTargetNames and driven by sliders, once through the model root with setMorphTargetWeight and once on the mesh with getMorphTargetIndexByName and setMorphWeightByIndex.',
  section: 'Animation',
  tags: ['collectMorphTargetNames', 'setMorphTargetWeight', 'getMorphTargetIndexByName', 'setMorphWeightByIndex', 'setMorphWeight', 'updateMorphWeights'],
  docs: ['repo/apps/doc/web/en/animation-morph-target.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
