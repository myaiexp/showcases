// globe-gl example: Arcs: dash initial gap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: dash initial gap",
  summary:
    "Eight arcs leave one city with a single moving dash each. arcDashInitialGap gives each a different head start, so the dashes fan out in a wave; a checkbox sets all gaps to 0 to compare.",
  section: "Arcs Layer",
  tags: ['arcDashInitialGap', 'arcDashLength', 'arcDashGap', 'arcDashAnimateTime'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
