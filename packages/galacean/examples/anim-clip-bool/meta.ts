// galacean example: Animation: boolean curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: boolean curves",
  summary:
    "An AnimationBoolCurve on MeshRenderer.enabled makes a cube blink at keyed moments; bool keys hold their value until the next key.",
  section: "Animation",
  tags: ['AnimationBoolCurve','enabled','MeshRenderer'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
