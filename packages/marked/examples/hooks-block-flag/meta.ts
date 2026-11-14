// marked example: Block or inline? this.block
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Block or inline? this.block",
  summary:
    "The same hook run by parse() and by parseInline() stamps what this.block was. It is true when whole blocks are parsed and false for inline-only parsing, so a hook can behave differently in each.",
  section: "Hooks",
  tags: ["hooks", "this.block", "parseInline", "postprocess"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Hooks.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
