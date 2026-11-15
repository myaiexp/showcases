// l7 example: Quick start: a custom highlight layer
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Quick start: a custom highlight layer",
  summary: "For a white stroke instead of a colour tint, add an empty LineLayer and feed it the clicked feature with setData. The highlight layer starts with no features and a click fills it.",
  section: "Getting Started",
  tags: ["LineLayer","setData","click","feature","zIndex","name"],
  docs: ["repo/site/docs/tutorial/quickstart.en.md"],
  provenance: "pure",
  added: "2026-11-15",
});
