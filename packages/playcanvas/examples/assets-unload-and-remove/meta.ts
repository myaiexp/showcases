// playcanvas example: Unloading and removing assets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unloading and removing assets',
  summary:
    "Unloading an asset frees its resource but keeps the entry, so registry.load brings it back; removing it takes the entry out of the registry. Three textured boxes can be unloaded, reloaded and removed, with each asset's flags and the number of GPU textures the app holds printed beside the unload and remove events.",
  section: 'Assets',
  tags: ['Asset', 'unload', 'AssetRegistry', 'remove', 'load', 'unload event', 'GraphicsDevice.textures'],
  docs: [
    'repo/docs/user-manual/assets/loading-unloading.md',
    'repo/docs/user-manual/assets/asset-registry.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
