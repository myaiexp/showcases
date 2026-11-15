// pigment: paint-like colour mixing across a grid of percentages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colours that mix like paint',
  summary:
    "The pigment addon's grid: blue gets more to the right, yellow more to the bottom, and red has what is left. @pigment() mixes them the way paint does, so the bottom-right corner is green; the second variant mixes blue and yellow with plain color-mix() for comparison, which goes grey.",
  section: 'Addons',
  tags: ["pigment", "@pigment", "color-mix()", "$()"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/pigment/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
