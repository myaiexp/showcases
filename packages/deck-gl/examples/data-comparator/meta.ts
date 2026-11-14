// deck-gl example: dataComparator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "dataComparator",
  summary:
    "A polling app rebuilds equal data every tick; a custom dataComparator skips the attribute update, shown by a counter of getFillColor calls.",
  section: "Using layers",
  tags: ["dataComparator", "data", "updateTriggers"],
  docs: ["repo/docs/api-reference/core/layer.md", "repo/docs/developer-guide/using-layers.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
