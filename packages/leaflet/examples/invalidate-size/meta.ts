// leaflet example: Container resize and invalidateSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Container resize and invalidateSize",
  summary:
    "A slider resizes the map box. With trackResize on (a ResizeObserver) the map follows by itself and fires resize; with it off the map keeps its old size until invalidateSize() is called, with {pan: false} or {animate: true}. The trackResize toggle builds a new map because the option is read at creation.",
  section: "Map view",
  tags: ["trackResize", "invalidateSize", "InvalidateSizeOptions", "resize"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
