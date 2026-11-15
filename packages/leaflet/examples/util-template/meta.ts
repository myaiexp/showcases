// leaflet example: Util.template strings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Util.template strings",
  summary:
    `Util.template fills {name} placeholders from a data object, and calls a function value with the whole data object. Each city's popup is built from a template you can edit; a placeholder with no value makes template throw, and the popup shows that error. The card cycles three templates.`,
  section: "Utilities & DOM",
  tags: ["Util.template", "bindPopup", "setPopupContent", "Marker"],
  docs: ['repo/src/core/Util.js', 'repo/src/layer/Layer.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
