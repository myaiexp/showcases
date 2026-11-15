// globe-gl example: Arcs: hover and tooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: hover and tooltip",
  summary:
    "arcLabel gives each arc an HTML tooltip. onArcHover receives the arc under the pointer (or null) and repaints it thicker and red by setting the colour and stroke accessors again.",
  section: "Arcs Layer",
  tags: ['onArcHover', 'arcLabel', 'arcColor', 'arcStroke', 'arcAltitude'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
