// leaflet example: Class.include with a mixin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Class.include with a mixin",
  summary:
    `Class.include copies the methods of a plain object onto a class's prototype, so instances that already exist gain them, and merges an options key into the class defaults. One mixin is included in two subclasses (a Marker and a CircleMarker), then a second include overrides one method on a single class. Marker and CircleMarker themselves are never touched; tooltips print what each layer's describe() returns.`,
  section: "Extending Leaflet",
  tags: ["Class.include", "Class.mergeOptions", "Marker", "CircleMarker", "bindTooltip", "setTooltipContent"],
  docs: [
    'repo/src/core/Class.js',
    'repo/docs/examples/extending-1-classes/index.md',
    'repo/src/layer/vector/CircleMarker.js',
    'repo/src/layer/Layer.js',
    'repo/src/map/Map.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
