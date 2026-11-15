// galacean example: Animation: an Additive layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: an Additive layer",
  summary:
    "A Lean clip built in code sits on an Additive layer over the Run state: its change from the first key is added to the run, scaled by the layer weight.",
  section: "Animation",
  tags: ['AnimatorLayerBlendingMode.Additive','AnimationQuaternionCurve','AnimatorControllerLayer'],
  docs: [
    'repo/docs/en/animation/layer.mdx',
    'repo/docs/en/animation/examples/blending.mdx',
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
