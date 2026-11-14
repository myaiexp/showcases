// deck-gl example: MaskExtension geofence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MaskExtension geofence',
  summary:
    "A GeoJsonLayer with operation 'mask' defines a region and a ScatterplotLayer with MaskExtension and maskId draws only the dots inside it. The mask is a moving circle or a country picked from a select.",
  section: 'Extensions',
  tags: ['MaskExtension', 'maskId', 'operation', 'GeoJsonLayer'],
  docs: [
    'repo/docs/api-reference/extensions/mask-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
