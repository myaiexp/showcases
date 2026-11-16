// fabric example: Events: on, off, once and the disposer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: on, off, once and the disposer',
  summary:
    'canvas.on() returns a function that removes just that listener, once() removes itself after one call, on({...}) attaches a map of handlers with one disposer, and off(name) clears an event.',
  section: 'Events',
  tags: ['on', 'off', 'once', 'Observable', 'mouse:down', 'mouse:up'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/src/content/docs/api/classes/Observable.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
