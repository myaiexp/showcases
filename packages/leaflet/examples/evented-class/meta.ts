// leaflet example: Evented: your own events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Evented: your own events",
  summary:
    `A class that extends Evented gets on, once, off, fire and listens. A Thermostat fires change with the old and new value and an overheat event; the map shows its state as a circle whose colour follows the value. Listeners take a context, once removes itself after the first call, listens reports whether a type has a listener, and off takes listeners away. Buttons add and remove them.`,
  section: "Extending Leaflet",
  tags: ["Evented", "fire", "on", "once", "off", "listens", "CircleMarker"],
  docs: [
    'repo/src/core/Events.js',
    'repo/docs/examples/extending-1-classes/index.md',
    'repo/src/layer/vector/CircleMarker.js',
    'repo/src/map/Map.js',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
