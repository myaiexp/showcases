// deck-gl example: Data as array, Map, Set or length object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data as array, Map, Set or length object",
  summary:
    "The same cities drawn from an Array, a Map (accessors get [key, value] entries), a Set, and a non-iterable object with a length that accessors read by index.",
  section: "Using layers",
  tags: ["data", "Map", "Set", "length", "accessors"],
  docs: ["repo/docs/api-reference/core/layer.md", "repo/docs/developer-guide/using-layers.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
