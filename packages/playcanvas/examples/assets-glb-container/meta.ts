// playcanvas example: A GLB container built in memory
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A GLB container built in memory',
  summary:
    "The engine loads glTF binary at runtime as a container asset. A robot of primitives is exported to GLB bytes by GltfExporter, served from a blob URL, loaded, and instantiated with instantiateRenderEntity as many times as the slider says, all sharing the container's renders and materials.",
  section: 'Assets',
  tags: ['GltfExporter', 'ContainerResource', 'container', 'instantiateRenderEntity', 'Asset', 'GLB', 'renders', 'materials'],
  docs: [
    'repo/docs/user-manual/assets/supported-formats.md',
    'repo/docs/user-manual/assets/models/building.md',
    'repo/docs/user-manual/assets/models/index.md',
    'repo/docs/user-manual/assets/loading-unloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
