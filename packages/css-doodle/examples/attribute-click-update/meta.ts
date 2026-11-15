// css-doodle example: The click:update attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The click:update attribute",
  summary:
    "With click:update every click redraws the doodle with a new seed. A card has no pointer, so it calls doodle.click() on a timer, which is exactly what a click does; the checkbox removes the attribute.",
  section: "Attributes",
  tags: ['click:update', 'update()', '@p'],
  docs: [
    'pages/css-doodle-com/reference/attribute-click-update.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
