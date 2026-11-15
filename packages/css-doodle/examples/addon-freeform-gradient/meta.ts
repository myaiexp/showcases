// gradient-2d's @freeform-gradient: colours at positions, with an optional spread
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@freeform-gradient()',
  summary:
    "In a freeform gradient each colour blends out from its position, given with keywords or percentages. A percentage before at is the colour's spread, the radius where it stays solid (gold 20% here), and a colour without a position sits at the centre.",
  section: 'Addons',
  tags: ["gradient-2d", "@freeform-gradient", "spread", "at"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/gradient-2d/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
