// galacean example: Model: play any clip of a glTF
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: play any clip of a glTF",
  summary:
    "GLTFResource.animations lists a glTF's AnimationClips; the Animator on the instance has a state per clip, so animator.play(clip.name) picks one.",
  section: "Model",
  tags: ['animations','Animator','play','AnimationClip'],
  docs: [
    'repo/docs/en/graphics/model/use.mdx',
    'repo/docs/en/animation/animator.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
