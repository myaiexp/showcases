// leaflet example: Util.wrapNum on a heading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Util.wrapNum on a heading",
  summary:
    `Util.wrapNum folds a number into a range. A compass needle on the map takes a heading from a slider that runs from -720 to 720 and turns to wrapNum(heading, [0, 360]), so 400 shows as 40 and -90 as 270. The includeMax flag decides whether exactly 360 stays 360 or becomes 0. The card steps through sample headings.`,
  section: "Utilities & DOM",
  tags: ["Util.wrapNum", "CircleMarker", "DivIcon", "Marker"],
  docs: [
    'repo/src/core/Util.js',
    'repo/src/layer/vector/CircleMarker.js',
    'repo/src/layer/marker/DivIcon.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
