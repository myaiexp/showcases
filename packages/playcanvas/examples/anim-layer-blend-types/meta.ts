// playcanvas example: Overwrite and additive layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overwrite and additive layers',
  summary:
    "A layer's blend type decides how it combines with the layers below. Two creatures walk and share one lean clip on a second layer: on the left the layer overwrites, blending from the walk pose towards the lean pose by its weight; on the right it is additive, adding the lean's difference from the original pose on top of the walk.",
  section: 'Animation',
  tags: ['AnimComponent', 'addLayer', 'AnimComponentLayer', 'ANIM_LAYER_OVERWRITE', 'ANIM_LAYER_ADDITIVE', 'weight', 'blendToWeight'],
  docs: ['repo/docs/user-manual/animation/layers-and-masks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
