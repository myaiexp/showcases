// cobe example: Arc labels on the peak of each arc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arc labels',
  summary:
    "Three routes, each with a white tag riding on the highest point of its arc as the globe turns. An arc with an id gets an anchor named --cobe-arc-{id} at its peak and a --cobe-visible-arc-{id} variable that fades the tag when the peak turns to the far side.",
  section: 'Custom Labels',
  tags: ['arcs', 'id', '--cobe-arc-{id}', '--cobe-visible-arc-{id}', 'position-anchor', 'anchor()', 'arcHeight'],
  docs: ['repo/website/app/components/CustomLabels.tsx', 'repo/website/app/components/MarkersArcs.tsx', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
