// AntV Infographic example: Exports: parseSyntax() returns options, errors and warnings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: parseSyntax() returns options, errors and warnings",
  summary:
    "parseSyntax(text) parses infographic syntax without rendering and returns { options, errors, warnings }. The card feeds it syntax as it grows, each time passing result.options to a new Infographic, and prints how many items, errors and warnings came back, so half-written text is seen to draw.",
  section: "Exports",
  tags: ["parseSyntax", "SyntaxParseResult", "SyntaxError"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/learn/infographic-syntax.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
