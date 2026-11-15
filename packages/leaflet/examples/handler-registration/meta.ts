// leaflet example: Registering a handler three ways
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Registering a handler three ways",
  summary:
    `A small ProbeHandler draws a ring under the pointer while it is enabled. It is attached by map.addHandler on one map, by the static Handler.addTo on another (both leave it disabled until enable), and through addInitHook on an own LeafletMap subclass, where a map option with the handler's name set to true enables it at creation. The log shows whether map.probe exists and is enabled.`,
  section: "Extending Leaflet",
  tags: ["Handler.addTo", "addHandler", "addInitHook", "enable", "enabled", "LeafletMap", "CircleMarker", "pointerEventToLatLng"],
  docs: ["repo/docs/examples/extending-3-controls/index.md", "repo/src/core/Handler.js", "repo/src/core/Class.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
