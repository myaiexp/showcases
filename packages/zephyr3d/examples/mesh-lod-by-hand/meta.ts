// zephyr3d example: Levels of detail set by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Levels of detail set by hand',
  summary:
    'A grid sphere with one vertex buffer and one index buffer holding three levels back to back. indexStart/indexCount give level 0, Primitive.lods the coarser ones with their screenSize and hysteresis; sliders move the switch sizes.',
  section: 'Basic Framework',
  tags: ['Primitive.lods', 'indexStart', 'indexCount', 'screenSize', 'hysteresis', 'createAndSetIndexBuffer'],
  docs: ['repo/apps/doc/web/en/mesh-lod.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
