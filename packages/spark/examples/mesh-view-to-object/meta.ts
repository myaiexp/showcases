// Spark example: enableViewToObject and context.viewToObject in a modifier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Camera position in object space',
  summary:
    'With enableViewToObject set, the mesh keeps context.viewToObject up to date, and its translate is the camera in the mesh’s own coordinates. An object-space modifier measures each splat’s distance to it, so the part of the knot nearest the viewer is bright and swollen and the rest dims, however the mesh turns. The slider changes the lit radius, a dynoFloat uniform.',
  section: 'SplatMesh',
  tags: ['enableViewToObject', 'context', 'viewToObject', 'objectModifiers', 'dyno.distance', 'dynoFloat'],
  docs: ['repo/docs/docs/splat-mesh.md', 'repo/docs/docs/dyno-stdlib.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
