// globe-gl example: Arcs: data transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: data transition",
  summary:
    "A new set of arcs replaces the old one every few seconds: new arcs rise from the ground, removed ones sink. A slider sets arcsTransitionDuration, 0 jumps at once.",
  section: "Arcs Layer",
  tags: ['arcsData', 'arcsTransitionDuration', 'arcColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
