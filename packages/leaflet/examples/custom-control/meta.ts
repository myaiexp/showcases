// leaflet example: A custom control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom control",
  summary:
    "A class extending Control: onAdd builds a readout element, getEvents subscribes it to the map's move event, onRemove clears it, and static defaultOptions holds its position and digits option. The card flies the map between cities.",
  section: "Controls",
  tags: ["Control", "onAdd", "onRemove", "getEvents", "defaultOptions", "DomUtil.create"],
  docs: ['repo/src/control/Control.js', 'repo/MIGRATION.md', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
