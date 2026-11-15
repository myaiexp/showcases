// cobe example: marker size across its documented range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker sizes',
  summary:
    'Six dots along the equator with size 0.01, 0.02, 0.04, 0.06, 0.08 and 0.1, each labelled with its value, and one dot near the north pole that sweeps through the same range. Size is relative to the globe radius.',
  section: 'Markers & Arcs',
  tags: ['markers', 'size', 'id', 'update'],
  docs: ['repo/website/app/components/MarkersArcs.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
