// galacean example: Animation: events stored in a glTF
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: events stored in a glTF",
  summary:
    "A Wave animation whose glTF carries the GALACEAN_animation_event extension: the loader adds the events to the clip and a Script hears them.",
  section: "Animation",
  tags: ['GALACEAN_animation_event','AnimationEvent','events'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
