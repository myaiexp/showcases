// deck-gl example: Data from an async iterable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data from an async iterable",
  summary:
    "An async generator streams batches of points into a layer; each batch is appended, or a dataTransform keeps a sliding window of the newest 300.",
  section: "Using layers",
  tags: ["data", "AsyncIterable", "dataTransform"],
  docs: ["repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
