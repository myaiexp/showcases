// l7 example: source.getFeatureId
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "source.getFeatureId",
  summary:
    "getFeatureId(key, value) finds the L7 id of the first feature whose field matches; here it drives layer.setActive.",
  section: "Source",
  tags: ["getFeatureId","setActive","Source"],
  docs: ["repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
