// playcanvas example: Application events as a hub
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Application events as a hub',
  summary:
    "Scripts talk through app.fire and app.on with namespaced names such as orb:spawn, so none needs a reference to another entity. An emitter waits for a one-off game:start, a collector subscribes with a scope argument, and a tally adds its listener on enable and removes it on disable.",
  section: 'Scripting',
  tags: ['AppBase', 'fire', 'on', 'once', 'off', 'hasEvent', 'Script', 'enable', 'disable'],
  docs: [
    'repo/docs/user-manual/scripting/events.md',
    'repo/docs/user-manual/scripting/script-lifecycle.md',
    'repo/docs/user-manual/scripting/engine-api.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
