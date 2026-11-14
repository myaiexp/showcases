// playcanvas example: Script attributes set from code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Script attributes set from code',
  summary:
    "One Satellite script exposes a number, a Vec3, a Color, an Entity reference and a grouped object as attributes, and three entities get different values through script.create's properties. The full view changes the same members on a live instance, the way the docs say attributes can be set at runtime.",
  section: 'Scripting',
  tags: ['Script', '@attribute', 'script.create', 'properties', 'Vec3', 'Color', 'Entity'],
  docs: [
    'repo/docs/user-manual/scripting/script-attributes/index.md',
    'repo/docs/user-manual/scripting/script-attributes/esm.md',
    'repo/docs/user-manual/scripting/getting-started.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
