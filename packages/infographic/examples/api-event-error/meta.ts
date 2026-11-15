// AntV Infographic example: Infographic API events: error
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API events: error",
  summary:
    "The error event fires when parsing or rendering fails and may carry SyntaxError[] or an Error, for instance 'Incomplete options' when there is nothing to draw. The card renders valid syntax, then syntax with an unknown key (a SyntaxError[], and it still draws), then syntax with no data (an Error), and shows each payload.",
  section: "Infographic API",
  tags: ["on", "error", "SyntaxError", "Error"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
