// playcanvas example: Script execution order on an entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Script execution order on an entity',
  summary:
    "Scripts on one entity run in the order of the script component's list. Reset, Shift and Double each edit the box's x, so the final x depends on the order; script.move reorders them and the component's move event reports each change.",
  section: 'Scripting',
  tags: ['ScriptComponent', 'script.move', 'move event', 'Script', 'update'],
  docs: [
    'repo/docs/user-manual/scripting/script-lifecycle.md',
    'repo/docs/user-manual/editor/scenes/components/script.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
