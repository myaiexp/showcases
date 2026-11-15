// leaflet example: Util.formatNum precision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Util.formatNum precision",
  summary:
    `Util.formatNum rounds a number to a number of decimal places (6 by default), or leaves it alone when given false. The readout formats the pointer's coordinates, so the slider shows how many digits a coordinate needs: 5 decimals is about a metre. The card cycles through precisions.`,
  section: "Utilities & DOM",
  tags: ["Util.formatNum", "pointermove", "LatLng"],
  docs: ["repo/src/core/Util.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
