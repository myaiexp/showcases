// leaflet example: hideSingleBase
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "hideSingleBase",
  summary:
    "hideSingleBase hides the base-layer section while the LayersControl lists only one base layer. Buttons call removeLayer and addBaseLayer to go between one and two.",
  section: "Layer groups",
  tags: ["LayersControl", "hideSingleBase", "removeLayer", "addBaseLayer"],
  docs: ["repo/src/control/LayersControl.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
