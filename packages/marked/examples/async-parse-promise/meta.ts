// marked example: A Promise while it works
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "A Promise while it works",
  summary:
    "A slow spell-check fixes typos in meeting notes. While it works parse() has only handed back a Promise, which prints as [object Promise] if you forget await; a spinner shows until the page arrives.",
  section: "Async",
  tags: ["async", "Promise", "await", "walkTokens"],
  docs: ["repo/docs/USING_PRO.md", "repo/src/Instance.ts"],
  provenance: "pure",
  added: "2026-11-14",
});
