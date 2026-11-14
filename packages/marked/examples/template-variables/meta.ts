// marked example: Fill in the blanks: mail merge
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Fill in the blanks: mail merge",
  summary:
    "A booking letter full of {{name}}, {{guests}} and {{time}} blanks. A preprocess hook fills them in for the chosen guest before Marked reads the text, so one template makes many letters.",
  section: "Hooks",
  tags: ["hooks", "preprocess", "template"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
