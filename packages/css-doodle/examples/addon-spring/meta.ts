// spring: @spring() as an animation timing function, bounce 0 to .8 by row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A spring easing',
  summary:
    "The spring addon's @spring() is an easing that overshoots and settles, for animation or transition. Each row of balls slides with a bounce of (@y - 1) * .2, so the top one stops dead and the bottom one wobbles the most.",
  section: 'Addons',
  tags: ["spring", "@spring", "animation", "easing"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/spring/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
