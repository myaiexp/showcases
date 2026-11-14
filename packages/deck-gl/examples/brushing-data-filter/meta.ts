// deck-gl example: Brushing with DataFilter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brushing with DataFilter',
  summary:
    'Two extensions on one ScatterplotLayer: a DataFilterExtension time range and a BrushingExtension radius. A dot draws only when it passes both.',
  section: 'Extensions',
  tags: ['BrushingExtension', 'DataFilterExtension', 'extensions'],
  docs: [
    'repo/docs/api-reference/extensions/brushing-extension.md',
    'repo/docs/api-reference/extensions/data-filter-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
