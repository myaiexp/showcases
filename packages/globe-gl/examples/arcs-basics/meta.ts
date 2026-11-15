// globe-gl example: Arcs: start and end coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: start and end coordinates",
  summary:
    "Eight city-to-city links drawn with every default: pale yellow 1px lines that rise from the surface and peak at half their length. Each link carries startLat, startLng, endLat, endLng and a name for the tooltip.",
  section: "Arcs Layer",
  tags: ['arcsData', 'arcStartLat', 'arcStartLng', 'arcEndLat', 'arcEndLng', 'arcLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
