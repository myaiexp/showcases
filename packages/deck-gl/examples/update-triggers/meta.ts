// deck-gl example: updateTriggers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "updateTriggers",
  summary:
    "getFillColor reads a palette outside the data; with updateTriggers declared the colours change with it, without them the layer keeps the stale colours.",
  section: "Using layers",
  tags: ["updateTriggers", "getFillColor", "accessor"],
  docs: ["repo/docs/api-reference/core/layer.md", "repo/docs/developer-guide/using-layers.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
