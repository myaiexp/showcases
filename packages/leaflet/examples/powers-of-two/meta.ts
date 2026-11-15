// leaflet example: powers-of-two
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Powers of two",
  summary:
    "Each zoom level doubles the world's width and height: 2^z tiles per side and 256 * 2^z pixels, read from getPixelWorldBounds. A slider calls setZoom from 0 to 5 over grid tiles; the card steps up and down.",
  section: "Zoom levels",
  tags: ["setZoom", "getPixelWorldBounds", "zoomend", "minZoom", "maxZoom"],
  docs: ["repo/docs/examples/zoom-levels/index.md", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
