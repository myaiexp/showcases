// The overview's rings: $%(100 - 6 * @i) sizes, hsl($(360 / n * @i)) colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cell variables and custom properties in $()',
  summary:
    "The syntax overview's rings: twelve cells placed at the centre, each sized $%(100 - 6 * @i) so they nest, with a border hue of $(360 / n * @i). Inside $() the bare name n reads the custom property --n with its dashes dropped, so changing --n respaces the colours.",
  section: 'Syntax overview',
  tags: ["$()", "$%()", "--n", "@i", "@place", "@size"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
