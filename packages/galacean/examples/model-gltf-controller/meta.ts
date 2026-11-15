// galacean example: Model: the AnimatorController from a glTF
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: the AnimatorController from a glTF",
  summary:
    "GLTFResource.animatorController is built by the loader with one layer and a state for each clip; the card reads its states and plays them in turn.",
  section: "Model",
  tags: ['GLTFResource.animatorController','AnimatorController','AnimatorState'],
  docs: [
    'repo/docs/en/animation/animatorController.mdx',
    'repo/docs/en/graphics/model/use.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
