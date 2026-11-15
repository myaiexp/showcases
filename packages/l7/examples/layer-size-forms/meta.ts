// l7 example: size(): constant, field, range, callback
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "size(): constant, field, range, callback",
  summary: "size accepts a number, a field name (default range 1 to 10), a field with [min, max], or a field with a callback. Switch between the four forms on the same data.",
  section: "Layer: Encoding",
  tags: ["size","callback","range","field"],
  docs: ["repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});
