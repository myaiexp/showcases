// leaflet example: DomUtil.toFront and toBack
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DomUtil.toFront and toBack",
  summary:
    `Three overlapping cards are plain divs in the overlay pane. DomUtil.toFront makes one the last child of its parent so it paints on top, and DomUtil.toBack makes it the first child so it paints below the rest. The caption lists the DOM order from back to front.`,
  section: "Utilities & DOM",
  tags: ["DomUtil.create", "DomUtil.toFront", "DomUtil.toBack", "DomUtil.setPosition"],
  docs: ['repo/src/dom/DomUtil.js', 'repo/src/map/Map.js', 'repo/src/layer/LayerBase.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
