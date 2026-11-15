// leaflet example: Attribution prefix and texts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Attribution prefix and texts",
  summary:
    "An AttributionControl built by hand: addAttribution, removeAttribution and setPrefix, including a prefix of false. Texts are counted, so one added twice stays after one removal. The caption prints the control's text after each call.",
  section: "Controls",
  tags: ["AttributionControl", "addAttribution", "removeAttribution", "setPrefix", "attributionControl"],
  docs: ["repo/src/control/AttributionControl.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
