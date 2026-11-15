// galacean example: Animation: Override against Additive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: Override against Additive",
  summary:
    "Two robots share the same Walk base and Wave layer at the same weight; the Override one loses its base arm motion, the Additive one keeps it.",
  section: "Animation",
  tags: ['AnimatorLayerBlendingMode','weight','AnimatorControllerLayer'],
  docs: [
    'repo/docs/en/animation/layer.mdx',
    'repo/docs/en/animation/examples/blending.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
