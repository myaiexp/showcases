// playcanvas example: Layers and masks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layers and masks',
  summary:
    "A creature walks on its base layer while a second layer waves. The second layer's mask lists the spine and everything below it, so only the upper body is taken over and the legs keep walking. The full view sets the layer weight, fades it with blendToWeight, removes the mask, switches overwrite for additive and toggles normalizeWeights.",
  section: 'Animation',
  tags: ['AnimComponent', 'addLayer', 'AnimComponentLayer', 'mask', 'weight', 'blendToWeight', 'ANIM_LAYER_OVERWRITE', 'ANIM_LAYER_ADDITIVE', 'normalizeWeights'],
  docs: [
    'repo/docs/user-manual/animation/layers-and-masks.md',
    'repo/docs/user-manual/editor/scenes/components/anim.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
