// leaflet example: Quick start: map, shapes, popups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quick start: map, shapes, popups',
  summary:
    'The Quick Start Guide end to end: a map set to central London at zoom 13, a tile layer from a URL template, a marker, a red circle with a 500 m radius and a polygon, each with a bound popup, and one reusable Popup that a map click opens at the clicked coordinates.',
  section: 'Quick start',
  tags: ['LeafletMap', 'setView', 'TileLayer', 'Marker', 'Circle', 'Polygon', 'bindPopup', 'openOn', "map.on('click')"],
  docs: ['repo/docs/examples/quick-start/index.md', 'repo/src/map/Map.js', 'repo/src/layer/Popup.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
