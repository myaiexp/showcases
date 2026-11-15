// leaflet example: DomEvent.on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DomEvent.on and off",
  summary:
    `DomEvent.on adds listeners to a DOM element: several space-separated types at once, or an object of type to listener pairs, with an optional context for this. Adding the same listener and context twice still gives one call. DomEvent.off removes one listener, every listener of some types, or everything on the element. The steps run in order against a pad; the caption counts the calls per type.`,
  section: "Utilities & DOM",
  tags: ["DomEvent.on", "DomEvent.off", "Util.splitWords", "Control"],
  docs: ['repo/src/dom/DomEvent.js', 'repo/src/core/Util.js', 'repo/src/control/Control.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
