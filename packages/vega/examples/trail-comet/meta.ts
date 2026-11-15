// vega example: Trail: A Comet Tail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Trail: A Comet Tail",
  summary:
    "The spiral is a trail of 120 points whose size shrinks toward the tail. A head signal runs along the path and the defined channel shows only the last 40 points behind it, so a comet circles.",
  section: "Mark Types",
  tags: ['marks.trail.size','marks.trail.defined','signal.update'],
  docs: ['repo/docs/docs/marks/trail.md', 'repo/docs/docs/marks/trail.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
