// AntV Infographic example: Infographic API: render() with syntax, options or nothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: render() with syntax, options or nothing",
  summary:
    "render() accepts a syntax string, a partial options object, or no argument at all. Each call replaces what the instance draws, always on top of the options it was created with. The card calls it three ways on one instance: with syntax, with an options object, and with no argument.",
  section: "Infographic API",
  tags: ["render", "syntax", "options"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
