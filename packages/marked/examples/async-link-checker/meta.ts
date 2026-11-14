// marked example: Link checker
import { defineMeta } from "@/types.ts";

export default defineMeta({
  title: "Link checker",
  summary:
    "A list of links where each address is checked one after another; dead ones come back struck through with a cross, live ones get a tick. It is the docs' async walkTokens example, with pretend fetches.",
  section: "Async",
  tags: ["async", "walkTokens", "fetch", "Promise"],
  docs: ["repo/docs/USING_PRO.md"],
  provenance: "pure",
  added: "2026-11-14",
});
