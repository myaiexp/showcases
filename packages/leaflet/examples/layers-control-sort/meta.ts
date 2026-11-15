// leaflet example: Sorting the layers control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sorting the layers control",
  summary:
    "A LayersControl with sortLayers off, on (alphabetical) and with a custom sortFunction that compares name lengths, listing five overlays added in an unsorted order.",
  section: "Layer groups",
  tags: ["LayersControl", "sortLayers", "sortFunction"],
  docs: ["repo/src/control/LayersControl.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
