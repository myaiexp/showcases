// leaflet example: addInteractiveTarget on a custom layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "addInteractiveTarget on a custom layer",
  summary:
    `A custom layer draws a badge as a plain div. Without registration a click on it is only a map click; calling addInteractiveTarget on the div in onAdd (and removeInteractiveTarget in onRemove) makes pointer and click events on it fire on the layer itself, bubble to a feature group and reach the map with the layer as their propagatedFrom, the way they do for markers. A toggle re-adds the layer with registration on or off.`,
  section: "Extending Leaflet",
  tags: ["Layer.addInteractiveTarget", "Layer.removeInteractiveTarget", "FeatureGroup", "propagatedFrom", "click", "onAdd"],
  docs: ["repo/src/layer/LayerBase.js", "repo/src/layer/Layer.js", "repo/src/layer/FeatureGroup.js", "repo/docs/examples/extending-2-layers/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
