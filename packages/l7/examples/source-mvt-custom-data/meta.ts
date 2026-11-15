// l7 example: MVT parser getCustomData
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MVT parser getCustomData",
  summary:
    "getCustomData(tile, callback) lets you supply each tile's protobuf yourself: callback(null, bytes) answers it, callback(err) leaves a hole.",
  section: "Source",
  tags: ["mvt","getCustomData","callback","Source"],
  docs: ["repo/site/docs/api/source/mvt.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
