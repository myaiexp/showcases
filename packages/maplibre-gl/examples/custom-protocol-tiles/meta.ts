// maplibre-gl example: Custom protocol tiles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom protocol tiles',
  summary:
    'addProtocol registers a handler for a custom URL scheme. Here it draws each raster tile on an OffscreenCanvas, labelled with its z/x/y, and returns an ImageBitmap to a raster source. removeProtocol undoes it on teardown.',
  section: 'Global functions',
  tags: ['addProtocol', 'removeProtocol', 'raster', 'OffscreenCanvas', 'tiles'],
  docs: [
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/addProtocol.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/functions/removeProtocol.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/type-aliases/AddProtocolResponseData.md',
    'pages/maplibre-org/maplibre-gl-js/docs/API/classes/Map.md',
    'pages/maplibre-org/maplibre-style-spec/sources.md',
    'pages/maplibre-org/maplibre-style-spec/layers.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
