// playcanvas example: Script component events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Script component events',
  summary:
    "The script component fires create and destroy as scripts come and go, move when their order changes, state when the component is enabled or disabled, and remove when the component itself goes; create:spin style events name one script. Three behaviours toggle on a box and the full view logs every event.",
  section: 'Scripting',
  tags: ['ScriptComponent', 'create', 'destroy', 'move', 'state', 'remove', 'script.has'],
  docs: [
    'repo/docs/user-manual/editor/scenes/components/script.md',
    'repo/docs/user-manual/scripting/script-lifecycle.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
