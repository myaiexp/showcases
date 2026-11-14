// Zdog example: a clock whose hands and marks are fractions of TAU
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Turns in TAU',
  summary:
    "A wall clock showing the current time. Zdog measures rotation in TAU, one full turn, so an hour mark is TAU/12 and the minute hand sits at TAU × minutes / 60. Each mark and hand is a line hung on an invisible anchor that turns around the clock's centre.",
  section: 'API: Utilities',
  tags: ['TAU', 'rotate', 'Anchor', 'path', 'Ellipse'],
  docs: ['repo/modules/docs/api-utils.hbs', 'repo/modules/docs/api-anchor.hbs', 'repo/modules/docs/modeling-concepts.hbs', 'repo/modules/docs/shapes-shape.hbs', 'repo/modules/docs/shapes-basic.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
