// globe-gl example: Arcs: accessors for your own data shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: accessors for your own data shape",
  summary:
    "A round-the-world itinerary whose records have nested starts and non-default field names. Accessors given as a function, an attribute name or a constant tell the layer where to read each value, including the tooltip.",
  section: "Arcs Layer",
  tags: ['arcStartLat', 'arcStartLng', 'arcEndLat', 'arcEndLng', 'arcStartAltitude', 'arcEndAltitude', 'arcLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
