// l7 example: Marker: default pin, anchor and offsets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Marker: default pin, anchor and offsets",
  summary:
    "Without an element a Marker draws L7's default pin; color tints it. anchor and offsets move it against the coordinate, and hide()/show() toggle it. White dots mark the coordinates.",
  section: "Tutorial: Point",
  tags: ['Marker', 'color', 'anchor', 'offsets', 'hide', 'show'],
  docs: ['repo/site/docs/tutorial/point/mark.en.md', 'repo/site/docs/api/component/marker.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
