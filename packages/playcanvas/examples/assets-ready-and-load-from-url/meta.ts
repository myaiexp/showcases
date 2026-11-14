// playcanvas example: ready() and loadFromUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ready() and loadFromUrl',
  summary:
    "Four textures drawn on a canvas load four ways: ready() registered before registry.load, loadFromUrl and loadFromUrlAndFilename that create the asset themselves, and ready() called on an asset that is already loaded, which runs at once. The log timestamps each callback; the full view reruns it with fresh textures.",
  section: 'Assets',
  tags: ['Asset', 'ready', 'AssetRegistry', 'load', 'loadFromUrl', 'loadFromUrlAndFilename', 'getByUrl', 'canvas.toBlob'],
  docs: [
    'repo/docs/user-manual/assets/asset-registry.md',
    'repo/docs/user-manual/assets/loading-unloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
