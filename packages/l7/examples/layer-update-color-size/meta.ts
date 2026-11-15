// l7 example: Re-map color and size, then render
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Re-map color and size, then render",
  summary: "Calling color() and size() again on a live layer swaps the field behind each channel. Choose which field drives colour and which drives size, and the points update on the next render.",
  section: "Layer: Basics",
  tags: ["color","size","render","update"],
  docs: ["repo/site/docs/api/common/layer/layer_update.en.md","repo/site/docs/api/common/layer/layer_encode.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});
