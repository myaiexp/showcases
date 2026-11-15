// cobe example: a hub-and-spoke arc network
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flight network',
  summary:
    'Ten arcs fan out from Dubai, with a small dot at each destination and a larger one at the hub. Every arc has its own color, chosen by distance from the hub or by region; the card swaps between the two.',
  section: 'Markers & Arcs',
  tags: ['arcs', 'markers', 'color', 'arcColor', 'arcWidth', 'arcHeight', 'markerElevation'],
  docs: ['repo/website/app/components/MarkersArcs.tsx', 'pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
