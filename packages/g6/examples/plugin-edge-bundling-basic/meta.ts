// g6 example: EdgeBundling: bundled edges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EdgeBundling: bundled edges',
  summary: 'The edge-bundling plugin pulls edges that run close together into shared bundles, turning a ring of crossing lines into visible trunks. The card toggles it with setPlugins to compare.',
  section: 'Plugin',
  tags: ['edge-bundling', 'bundleThreshold', 'setPlugins'],
  docs: ['repo/packages/site/docs/manual/plugin/EdgeBundling.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
