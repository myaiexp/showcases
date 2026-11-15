// globe-gl example: Points: onPointRightClick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Points: onPointRightClick",
  summary:
    "onPointClick and onPointRightClick each receive the point, the event and the clicked coordinates. A left-click raises the column by setting its height attribute and passing the data again; a right-click filters it out of the data.",
  section: "Points Layer",
  tags: ["onPointRightClick", "onPointClick", "pointAltitude", "pointsData"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
