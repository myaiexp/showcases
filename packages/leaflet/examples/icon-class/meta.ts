// leaflet example: Icon subclass with defaultOptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Icon subclass with defaultOptions",
  summary: "The custom icons tutorial's LeafIcon: a subclass of Icon whose static defaultOptions hold the shared size, anchors and shadow, so each of the green, red and orange leaves needs only its iconUrl.",
  section: "Markers & icons",
  tags: ["Icon", "static defaultOptions", "extends", "Marker", "bindPopup"],
  docs: ["repo/docs/examples/custom-icons/index.md", "repo/src/layer/marker/Icon.js", "repo/docs/examples/custom-icons/leaf-green.png", "repo/docs/examples/custom-icons/leaf-red.png", "repo/docs/examples/custom-icons/leaf-orange.png", "repo/docs/examples/custom-icons/leaf-shadow.png"],
  provenance: 'pure',
  added: '2026-11-15',
});
