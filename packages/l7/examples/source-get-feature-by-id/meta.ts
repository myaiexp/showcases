// l7 example: source.getFeatureById
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "source.getFeatureById",
  summary:
    "A layer click gives L7's featureId; getFeatureById returns the matching feature from the source: a GeoJSON feature for GeoJSON data, a row for JSON data.",
  section: "Source",
  tags: ["getFeatureById","featureId","click","getSource"],
  docs: ["repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
