// leaflet example: mergeOptions on your own subclass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mergeOptions on your own subclass",
  summary:
    `Marker.mergeOptions would change every marker on the page, so this example subclasses first: Pin extends Marker and Pin.mergeOptions sets a lower opacity and a title. Pin keeps its own defaultOptions object, so Marker.defaultOptions is untouched and plain markers look as before. A button merges a different opacity into Pin, which only the pins created afterwards pick up.`,
  section: "Extending Leaflet",
  tags: ["Class.mergeOptions", "Marker", "defaultOptions", "opacity", "title"],
  docs: ["repo/src/core/Class.js", "repo/docs/examples/extending-1-classes/index.md", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
