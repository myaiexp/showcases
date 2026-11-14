// playcanvas example: Application events through a frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Application events through a frame',
  summary:
    "The start, initialize and postinitialize app events fire once when the app starts, then each frame fires frameupdate, the scripts' update and postUpdate, the app's own update, framerender, prerender, postrender and frameend. The log interleaves a script's methods with those events; the full view logs further frames on demand.",
  section: 'Scripting',
  tags: ['AppBase', 'start', 'update', 'prerender', 'postrender', 'frameend', 'Script', 'manualStart'],
  docs: [
    'repo/docs/user-manual/scripting/application-lifecycle.md',
    'repo/docs/user-manual/scripting/script-lifecycle.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
