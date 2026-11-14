// marked example: Settings inside the note: front matter
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Settings inside the note: front matter",
  summary:
    "A note that starts with a --- block of settings. The preprocess hook reads the block, switches the breaks option on for that note only, and hands the rest of the text to Marked.",
  section: "Hooks",
  tags: ["hooks", "preprocess", "this.options", "breaks"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
