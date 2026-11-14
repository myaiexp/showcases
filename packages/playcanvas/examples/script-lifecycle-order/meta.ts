// playcanvas example: Script lifecycle order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Script lifecycle order',
  summary:
    'Three entities carry the same script, built detached and then added to the scene. The log shows every initialize running first, then every postInitialize, then each frame\'s updates followed by the postUpdates. A box starts small in initialize and grows in postInitialize.',
  section: 'Scripting',
  tags: ['Script', 'initialize', 'postInitialize', 'update', 'postUpdate', 'ScriptComponent'],
  docs: [
    'repo/docs/user-manual/scripting/script-lifecycle.md',
    'repo/docs/user-manual/scripting/application-lifecycle.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
