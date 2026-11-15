// globe-gl example: Rings: ripples from points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rings: ripples from points",
  summary:
    "Concentric rings spread from the largest cities and fade out at their maximum radius. ringLat and ringLng read the cities' lat and lng by default; the radius, speed and colour are set to suit a whole-globe view.",
  section: "Rings Layer",
  tags: ['ringsData', 'ringLat', 'ringLng', 'ringMaxRadius', 'ringPropagationSpeed', 'ringColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
