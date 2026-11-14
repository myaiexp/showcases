// playcanvas example: Your own EventHandler subclass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your own EventHandler subclass',
  summary:
    "Anything can emit events by extending pc.EventHandler. A Tank fires change, full and empty as its level moves; a gauge listens with on, once and off, and the handle returned by on removes a single listener. hasEvent reports what is still registered.",
  section: 'Scripting',
  tags: ['EventHandler', 'EventHandle', 'on', 'once', 'off', 'fire', 'hasEvent'],
  docs: ['repo/docs/user-manual/scripting/events.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
