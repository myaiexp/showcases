// playcanvas example: Attributes by reference or by copy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Attributes by reference or by copy',
  summary:
    "ESM script attributes are not copied, they are passed by reference. One goal Vec3 is given to two scripts: the plain member keeps seeing every change to it, while the script with a copying setter keeps the value it was handed until it is assigned again. A moving marker shows the goal.",
  section: 'Scripting',
  tags: ['Script', '@attribute', 'Vec3', 'copy', 'setter', 'script.create', 'properties'],
  docs: ['repo/docs/user-manual/scripting/migration-guide.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
