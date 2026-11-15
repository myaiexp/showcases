// penrose example: centerLabel: a label on a line or in a box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "centerLabel: a label on a line or in a box",
  summary:
    'A Text label with a free position. `encourage centerLabel(a.icon, b.icon, 1)` puts it at the middle of a line, and, when the first shape is a rectangle, at the middle of the rectangle. In 3.3.1 the `padding` argument shifts the energy by a constant, so it does not move the label.',
  section: "Objective Functions",
  tags: ['centerLabel', 'encourage', 'objective', 'Text', 'Line', 'Rectangle', 'padding'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
