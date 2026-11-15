// l7 example: Update style, then render
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Update style, then render",
  summary: "layer.style({...}) merges new values into a live layer; scene.render() draws them. Sliders change opacity, stroke width and stroke colour of the points.",
  section: "Layer: Basics",
  tags: ["style","opacity","stroke","strokeWidth","render"],
  docs: ["repo/site/docs/api/common/layer/layer_update.en.md","repo/site/docs/api/common/layer/layer_style.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});
