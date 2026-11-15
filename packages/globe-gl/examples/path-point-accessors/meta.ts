// globe-gl example: Paths: point accessors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paths: point accessors",
  summary:
    "Routes whose points are {latitude, longitude} objects under a waypoints field. pathPoints names the list, pathPointLat and pathPointLng (an attribute and a function) read each point, and pathLabel gives a tooltip.",
  section: "Paths Layer",
  tags: ['pathPoints', 'pathPointLat', 'pathPointLng', 'pathLabel', 'pathColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
