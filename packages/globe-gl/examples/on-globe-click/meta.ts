// globe-gl example: Globe: onGlobeClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe: onGlobeClick",
  summary:
    "onGlobeClick receives the clicked { lat, lng } and the event. Each click drops a red column at that spot (the last 20 are kept), and the readout prints the coordinates.",
  section: "Globe Layer",
  tags: ["onGlobeClick", "pointsData"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
