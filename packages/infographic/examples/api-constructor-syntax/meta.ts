// AntV Infographic example: Infographic API: the constructor with a syntax string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: the constructor with a syntax string",
  summary:
    "The constructor's first form takes an infographic syntax string, handy for AI or streaming output. The syntax carries the design and data but not a container, so the container and size arrive with render(). The card builds three instances from three strings in turn.",
  section: "Infographic API",
  tags: ["constructor", "syntax", "render"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
