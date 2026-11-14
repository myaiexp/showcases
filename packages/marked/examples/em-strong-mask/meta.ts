// marked example: Keep formulas from turning italic
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Keep formulas from turning italic",
  summary:
    "A sentence with a formula whose underscores would break the italics. An emStrongMask hook hides every $...$ block from the italic rules, so the sentence stays in one piece.",
  section: "Hooks",
  tags: ["hooks", "emStrongMask", "em", "math"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
