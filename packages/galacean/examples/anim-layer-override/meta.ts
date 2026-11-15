// galacean example: Animation: an Override layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: an Override layer",
  summary:
    "A second AnimatorControllerLayer in Override mode plays Wave over the base Walk; its weight blends the arm between the two.",
  section: "Animation",
  tags: ['AnimatorControllerLayer','AnimatorLayerBlendingMode.Override','weight','addLayer'],
  docs: [
    'repo/docs/en/animation/layer.mdx',
    'repo/docs/en/animation/examples/blending.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
