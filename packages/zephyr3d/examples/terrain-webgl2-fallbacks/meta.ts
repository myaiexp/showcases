// zephyr3d example: Terrain on WebGL2: what the WebGPU-only features do
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Terrain on WebGL2: what the WebGPU-only features do",
  summary:
    "terrain.runtimeVirtualTexture = true has no effect on WebGL2 and reads back false; a 'blade' grass layer is not drawn while a 'card' layer is. The readout shows both, with the blade layer's blades counted but never drawn.",
  section: "Environment",
  tags: ['runtimeVirtualTexture', 'grassRenderer', 'addLayer', 'blade', 'card', 'GrassLayerKind'],
  docs: ['repo/apps/doc/web/en/terrain-runtime.md', 'repo/apps/doc/web/en/backend-support.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
