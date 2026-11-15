// AntV Infographic example: Infographic API: the constructor with an options object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: the constructor with an options object",
  summary:
    "The constructor's second form takes a (partial) InfographicOptions object: container, size, template, data and theme in one JSON. The card builds instances from three option objects that differ in template, theme and data. render() with no arguments then draws what the constructor was given.",
  section: "Infographic API",
  tags: ["constructor", "InfographicOptions", "Partial", "template", "data"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md", "repo/site/src/content/reference/infographic-options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
