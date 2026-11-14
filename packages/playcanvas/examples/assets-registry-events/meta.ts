// playcanvas example: Registry and asset events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Registry and asset events',
  summary:
    "The AssetRegistry fires add, load, error and remove for every asset, and each asset fires load, error and remove for itself. Textures drawn on a canvas and served as blob URLs load, a bundle of junk bytes fails to decode, and removed assets shrink away. Boxes are grey until loaded, then textured, or orange on error.",
  section: 'Assets',
  tags: ['AssetRegistry', 'Asset', 'add', 'load', 'error', 'remove', 'asset.loading', 'canvas.toBlob'],
  docs: [
    'repo/docs/user-manual/assets/asset-registry.md',
    'repo/docs/user-manual/assets/loading-unloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
