// leaflet example: disableClickPropagation and disableScrollPropagation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "disableClickPropagation and disableScrollPropagation",
  summary:
    `Two custom controls hold the same scrollable text. The red one is left alone, so clicking it also counts as a map click, and scrolling over it zooms the map. The green one calls DomEvent.disableClickPropagation and disableScrollPropagation on its container, so neither reaches the map. Counters show map clicks and map zooms.`,
  section: "Utilities & DOM",
  tags: ["DomEvent.disableClickPropagation", "DomEvent.disableScrollPropagation", "Control", "onAdd"],
  docs: [
    'repo/src/dom/DomEvent.js',
    'repo/docs/examples/extending-3-controls/index.md',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
