// leaflet example: scale-by-latitude
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale changes with latitude",
  summary:
    "A ScaleControl at the equator and at 60 degrees north: the same bar length stands for about half the distance further north. The card alternates setView between the two; a slider picks any latitude. The caption reads the control's text.",
  section: "Zoom levels",
  tags: ["ScaleControl", "setView", "moveend"],
  docs: [
    'repo/docs/examples/zoom-levels/index.md',
    'repo/src/control/ScaleControl.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
