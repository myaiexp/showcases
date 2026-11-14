// vchart example: API: registerMap, getMap and unregisterMap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: registerMap, getMap and unregisterMap',
  summary:
    'A map name is registered with registerMap, read back with getMap and removed with unregisterMap. A hand-made GeoJSON grid of tiles is registered under one name; picking a 2x2, 3x3 or 4x4 grid unregisters the name, registers the new grid and redraws the map, and a readout reports what getMap returns.',
  section: 'API',
  tags: ['registerMap', 'getMap', 'unregisterMap', 'GeoJSON', 'map'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
