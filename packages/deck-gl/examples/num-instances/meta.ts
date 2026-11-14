// deck-gl example: numInstances override
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "numInstances override",
  summary:
    "A slider overrides the instance count derived from data, drawing only the first N of 800 points.",
  section: "Using layers",
  tags: ["numInstances", "data", "ScatterplotLayer"],
  docs: ["repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
