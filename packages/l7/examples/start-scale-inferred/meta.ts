// l7 example: Scale: what L7 infers
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Scale: what L7 infers",
  summary: "With no scale() call L7 looks at the field's first value: a number gets a linear scale and a string a cat scale. The top row names a field that does not exist, which the docs call a constant but which draws nothing at all here.",
  section: "Getting Started",
  tags: ["scale","linear","cat","identity","color"],
  docs: ["repo/site/docs/tutorial/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});
