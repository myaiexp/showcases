// playcanvas example: Script enable, disable and destroy events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Script enable, disable and destroy events',
  summary:
    'A script listens for its own enable, disable, state and destroy events. The box is green while the script runs and grey while it is not; the full view flips the script, its script component, the entity and its parent, and destroys or re-creates the script, logging which events each one fires.',
  section: 'Scripting',
  tags: ['Script', 'enabled', 'enable', 'disable', 'state', 'destroy', 'ScriptComponent'],
  docs: ['repo/docs/user-manual/scripting/script-lifecycle.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
