// aframe example: Primitives under the hood: <a-box> is an entity with geometry and material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Primitives under the hood: <a-box> is an entity with geometry and material',
  summary:
    '<a-box color="red" width="3"> and <a-entity geometry="primitive: box; width: 3" material="color: red"> side by side. The primitive presets the box shape and maps width and color onto geometry and material, so the data matches.',
  section: 'Introduction',
  tags: ['a-box', 'a-entity', 'geometry', 'material', 'primitive mappings'],
  docs: ['repo/docs/introduction/html-and-primitives.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
