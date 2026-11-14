// deck-gl example: Data from a Promise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data from a Promise",
  summary:
    "data given as a Promise: the layer draws once it resolves, and onDataLoad reports the loaded value. Load again swaps in a new Promise.",
  section: "Using layers",
  tags: ["data", "Promise", "onDataLoad"],
  docs: ["repo/docs/api-reference/core/layer.md", "repo/docs/developer-guide/using-layers.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
