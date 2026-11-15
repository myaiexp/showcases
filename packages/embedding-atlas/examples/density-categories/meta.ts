// embedding-atlas example: density mode and maxDensityModeCategories()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Categories in density mode',
  summary:
    'maxDensityModeCategories() returns how many categories density mode can colour separately (32 in 0.26). Blobs on a spiral, one category each, are drawn in density mode with 8, exactly the limit, and 8 past it.',
  section: 'Config',
  tags: ['maxDensityModeCategories', 'mode', 'density', 'data.category'],
  docs: ['repo/packages/component/src/lib/index.ts', 'repo/packages/component/src/lib/embedding_view/api.ts', 'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
