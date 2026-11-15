// globe-gl example: Arcs: altitude auto scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: altitude auto scale",
  summary:
    "With arcAltitude null, arcAltitudeAutoScale sets how tall the arcs grow compared with their length on the ground (1 is as high as long). A slider sweeps it, and cards step through values.",
  section: "Arcs Layer",
  tags: ['arcAltitudeAutoScale', 'arcAltitude', 'arcsTransitionDuration'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
