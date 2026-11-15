// to: 90deg, 1.5708rad, 100grad and .25turn match
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arc: angles in deg, rad, grad and turn",
  summary: "Angles take deg, rad, grad or turn; a bare number is degrees. Each variant sweeps the same quarter of a circle written in another unit, and the last one sweeps three quarters in turns.",
  section: "SVG",
  tags: ["@arc","deg","rad","grad","turn"],
  docs: ["pages/css-doodle-com/reference/function-arc.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
