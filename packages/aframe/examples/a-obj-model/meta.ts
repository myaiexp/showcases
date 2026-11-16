// aframe example: <a-obj-model>: an OBJ mesh with its MTL materials
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-obj-model>: an OBJ mesh with its MTL materials',
  summary:
    '<a-obj-model> maps src to obj-model.obj and mtl to obj-model.mtl. The left gem loads both through <a-asset-item>, so its facets take the Ruby and Garnet materials from the MTL file; the right one loads the OBJ inline without an MTL and takes the material component instead, as the docs allow. Both files are written in code.',
  section: 'Primitives',
  tags: ['a-obj-model', 'obj-model', 'src', 'mtl', 'a-asset-item'],
  docs: ['repo/docs/primitives/a-obj-model.md', 'repo/docs/components/obj-model.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
