// motion example: SVG spinner that rotates around the wrong point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG spinner that rotates around the wrong point",
  summary: "Two spinners side by side: one swings around the corner of the SVG, the other spins in place. The fix is transform-box: fill-box, which Motion applies itself when it animates a rotate.",
  section: "Guides",
  tags: ["transform-box","transform-origin","animate","rotate"],
  docs: ["pages/motion-dev/docs/svg-animation.md","pages/motion-dev/docs/svg-effect.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
