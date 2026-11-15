// vega example: Rect: A Timeline from x and x2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rect: A Timeline from x and x2",
  summary:
    "A task timeline: each rect runs from a start to an end on a linear scale with rounded ends. A vertical rule sweeps through \"today\", and tasks it has passed turn green, the one it is inside amber.",
  section: "Mark Types",
  tags: ['marks.rect.x2','marks.rect.cornerRadius','value.band','production-rule'],
  docs: ['repo/docs/docs/marks/rect.md', 'repo/docs/docs/marks/rect.vg.json', 'repo/docs/docs/marks.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
