// globe-gl example: Arcs: click and right-click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Arcs: click and right-click",
  summary:
    "onArcClick gets the arc, the event and the clicked lat, lng and altitude, and highlights the arc. onArcRightClick swaps the arc's ends, so its dashes run the other way.",
  section: "Arcs Layer",
  tags: ['onArcClick', 'onArcRightClick', 'arcDashAnimateTime', 'arcsTransitionDuration'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
