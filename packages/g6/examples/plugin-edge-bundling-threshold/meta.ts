// g6 example: EdgeBundling: bundleThreshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EdgeBundling: bundleThreshold',
  summary: 'bundleThreshold is the compatibility cut-off: low values bundle many edges together, high values keep most of them apart. K sets how strongly bundled edges attract.',
  section: 'Plugin',
  tags: ['edge-bundling', 'bundleThreshold', 'K', 'updatePlugin'],
  docs: ['repo/packages/site/docs/manual/plugin/EdgeBundling.en.md', 'repo/packages/site/common/api/plugins/edge-bundling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
