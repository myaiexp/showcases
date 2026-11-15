// leaflet example: on-once-off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on, once, off and listens",
  summary:
    "The Evented methods on a map: on() adds a listener that runs on every click, once() adds one that Leaflet removes after the first click, off() removes listeners, and listens() reports whether a handler is registered. Buttons add and remove them, and a log shows which ran.",
  section: "Map events & conversion",
  tags: ["on", "once", "off", "listens", "click"],
  docs: ["repo/src/core/Events.js", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
