// globe-gl example: Arcs: colour interpolator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: colour interpolator",
  summary:
    "arcColor returns a function from t (0 at the start, 1 at the end) to a colour. Three of them: a fade to transparent, a hue sweep and hard colour bands.",
  section: "Arcs Layer",
  tags: ['arcColor', 'arcStroke'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
