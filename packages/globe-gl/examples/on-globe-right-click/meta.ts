// globe-gl example: Globe: onGlobeRightClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe: onGlobeRightClick",
  summary:
    "onGlobeRightClick receives the { lat, lng } under a right-click; each one starts ripple rings there, and the readout prints the spot. Setting the handler also keeps the browser's context menu closed.",
  section: "Globe Layer",
  tags: ["onGlobeRightClick", "ringsData", "ringColor"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
