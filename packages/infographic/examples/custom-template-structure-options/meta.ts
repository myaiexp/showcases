// AntV Infographic example: Custom template: structure options and per-level items inside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom template: structure options and per-level items inside',
  summary:
    'A template design may use the object form for its parts: showcase-org-tree sets hierarchy-tree options (orientation, edge type, levelGap) and lists one item design per level in design.items. The syntax stays three lines; the steps feed the same template trees of different shape.',
  section: 'Custom templates',
  tags: ['registerTemplate', 'design.structure', 'design.items', 'hierarchy-tree', 'orientation', 'WithType'],
  docs: [
    'repo/site/src/content/learn/custom-template.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/design.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
