// vega example: Expressions: geoArea, geoBounds, geoCentroid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: geoArea, geoBounds, geoCentroid",
  summary:
    "Hover a US state: geoArea, geoBounds and geoCentroid measure it in projected pixels (bounding box and centroid cross drawn on the map) and unprojected, and geoScale and geoTranslate read the projection.",
  section: 'Expressions',
  tags: ["expression.geoArea","expression.geoBounds","expression.geoCentroid","expression.geoScale","expression.geoTranslate"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/projections.md","repo/docs/docs/transforms/geoshape.md","repo/docs/docs/data.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
