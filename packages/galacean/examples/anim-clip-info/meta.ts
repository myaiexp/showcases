// galacean example: Animation: inspect a clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: inspect a clip",
  summary:
    "A clip's length, curveBindings and events are read from the AnimationClip and printed over the canvas.",
  section: "Animation",
  tags: ['AnimationClip','length','curveBindings','events','AnimationEvent'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
    'repo/docs/en/animation/system.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
