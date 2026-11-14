// g6 example: EdgeBundling: simulation parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EdgeBundling: simulation parameters',
  summary: 'cycles, divisions, divRate, iterations, iterRate and lambda tune the force simulation behind the bundling: more cycles and divisions give smoother, slower bundles.',
  section: 'Plugin',
  tags: ['edge-bundling', 'cycles', 'divisions', 'divRate', 'iterations', 'iterRate', 'lambda'],
  docs: ['repo/packages/site/docs/manual/plugin/EdgeBundling.en.md', 'repo/packages/site/common/api/plugins/edge-bundling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
