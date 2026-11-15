// galacean example: Animation: footsteps from clip events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: footsteps from clip events",
  summary:
    "Two events added to the loaded Walk clip call step() at the leg swing peaks; each call stamps a footprint that fades.",
  section: "Animation",
  tags: ['addEvent','clearEvents','AnimationClip','Script'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
    'repo/docs/en/animation/system.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
