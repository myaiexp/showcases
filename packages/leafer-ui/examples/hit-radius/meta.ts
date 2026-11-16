// leafer-ui example: Hit: hitRadius widens an element's target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hit: hitRadius widens an element's target",
  summary: "hitRadius gives one element a collision radius, so the pointer can pick a thin line from a few pixels away. The slider sets it; the card hovers 14 px off the line with radius 0 and then with 24.",
  section: "Interaction",
  tags: ["hitRadius","Line","hover"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/hit.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
