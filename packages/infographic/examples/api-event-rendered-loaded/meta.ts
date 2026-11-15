// AntV Infographic example: Infographic API events: rendered and loaded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API events: rendered and loaded",
  summary:
    "rendered fires after render() or update() completes with { node, options }; loaded fires a moment later, once the SVG's icons and images have finished loading. The card logs both events with their payload, one render after another, and counts the elements under the node.",
  section: "Infographic API",
  tags: ["on", "rendered", "loaded"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
