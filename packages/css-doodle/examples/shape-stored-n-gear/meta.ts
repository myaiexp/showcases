// css-doodle example: A stored body with a free variable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A stored body with a free variable",
  summary:
    "A stored body can read a variable it does not define, so it works like a preset of your own. --gear has points: 4n and two radii in contours, and each button gives it a different n.",
  section: 'Shapes',
  tags: ['@shape', '$name', 'points', 'fill-rule'],
  docs: ['repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
