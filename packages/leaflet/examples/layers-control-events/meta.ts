// leaflet example: Layers control events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layers control events",
  summary:
    "The map's baselayerchange, overlayadd and overlayremove events, fired when the LayersControl switches a layer, each with the entry's name. A log lists them.",
  section: "Layer groups",
  tags: ["LayersControl", "baselayerchange", "overlayadd", "overlayremove"],
  docs: ['repo/src/control/LayersControl.js', 'repo/src/map/Map.js', 'repo/src/layer/LayerGroup.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
