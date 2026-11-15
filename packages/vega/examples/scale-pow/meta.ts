// vega example: Power Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Power Scale",
  summary:
    "Each dot is a value from 0 to 20 plotted against itself raised to the exponent. An exponent of 1 draws a straight diagonal; 0.5 and 3 bend it either way.",
  section: "Scales",
  tags: ['scale.type','scale.exponent','signal.bind'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
