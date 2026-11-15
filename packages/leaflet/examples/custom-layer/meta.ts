// leaflet example: A Layer subclass: onAdd, onRemove, update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A Layer subclass: onAdd, onRemove, update",
  summary:
    `A Layer subclass, as the extending tutorial skeletons it: onAdd creates a div with DomUtil.create in the layer's pane, places it with DomUtil.setPosition and listens for zoomend and viewreset; onRemove removes the div and the listeners. The pane option is read from the layer's defaults, and the log lists each lifecycle call. Panning needs no update because the pane moves; zooming does.`,
  section: "Extending Leaflet",
  tags: ["Layer", "onAdd", "onRemove", "getPane", "Util.setOptions", "DomUtil.create", "DomUtil.setPosition", "latLngToLayerPoint"],
  docs: ["repo/docs/examples/extending-2-layers/index.md", "repo/src/layer/LayerBase.js", "repo/src/dom/DomUtil.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
