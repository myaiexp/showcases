// galacean example: Animation: layer masks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: layer masks",
  summary:
    "An AnimatorLayerMask built from the model's entities limits a Run layer to the legs, the arms or the whole body over a base Idle.",
  section: "Animation",
  tags: ['AnimatorLayerMask','createByEntity','setPathMaskActive','AnimatorControllerLayer'],
  docs: [
    'repo/docs/en/animation/layer.mdx',
    'repo/docs/en/animation/system.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
