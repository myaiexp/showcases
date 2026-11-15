// AntV Infographic example: Infographic API events: warning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API events: warning",
  summary:
    "The warning event reports non-fatal problems found while parsing syntax, as an array of SyntaxError objects with a line, a path and a message; the infographic still renders. Today the one warning the parser raises is implicit_template, for a template name on a bare first line. The card renders syntax with and without that slip (a template name with no infographic keyword in front) and lists what the listener received.",
  section: "Infographic API",
  tags: ["on", "warning", "SyntaxError", "parseSyntax"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
