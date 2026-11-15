// leaflet example: Subclass with static defaultOptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Subclass with static defaultOptions",
  summary:
    `A subclass declares its defaults in a static defaultOptions field, which is merged with its parent's: Ring extends CircleMarker and sets a radius and colour, Pulse extends Ring and changes only the radius and fill. Each circle is built with no options except the last, which overrides the radius. Changing Ring.defaultOptions later restyles the instances that did not set that option themselves.`,
  section: "Extending Leaflet",
  tags: ["Class", "static defaultOptions", "CircleMarker", "Util.setOptions", "redraw"],
  docs: [
    'repo/docs/examples/extending-1-classes/index.md',
    'repo/src/core/Class.js',
    'repo/MIGRATION.md',
    'repo/src/layer/vector/CircleMarker.js',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
