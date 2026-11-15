// cobe example: markers at both ends of arcs, sharing markerElevation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Markers and arcs together',
  summary:
    'A chain of five arcs between six cities with a dot at every end. markerElevation raises dots and arc ends together, so the arcs start at the tops of the markers; the card sweeps it from 0 to 0.2 and the full view has a slider.',
  section: 'Markers & Arcs',
  tags: ['markers', 'arcs', 'markerElevation', 'arcHeight', 'arcWidth', 'arcColor'],
  docs: ['repo/README.md', 'pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
