// g6 example: Custom node: Rect with a subtitle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom node: Rect with a subtitle",
  summary:
    "A custom node extending Rect, drawing a subtitle with upsert in render(), registered as showcase-node-dual-label. A select changes the subtitle data.",
  section: 'Node',
  tags: ['register', 'ExtensionCategory.NODE', 'Rect', 'render', 'upsert'],
  docs: ['repo/packages/site/docs/manual/element/node/custom-node.en.md', 'repo/packages/site/docs/manual/element/node/overview.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
