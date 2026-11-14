// playcanvas example: Registering and creating scripts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Registering and creating scripts',
  summary:
    "An ESM script is a class that extends pc.Script with a static scriptName. In an engine-only app you add it to app.scripts, then attach it with entity.script.create by class or by name. Asking for a name that is not registered yet returns null and the script appears when the class is added; the full view registers it on a button.",
  section: 'Scripting',
  tags: ['Script', 'scriptName', 'ScriptRegistry', 'ScriptComponent', 'script.create', 'scripts.add'],
  docs: [
    'repo/docs/user-manual/scripting/esm-scripts.md',
    'repo/docs/user-manual/scripting/getting-started.md',
    'repo/docs/user-manual/editor/scenes/components/script.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
