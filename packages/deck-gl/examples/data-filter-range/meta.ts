// deck-gl example: DataFilterExtension range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DataFilterExtension range',
  summary:
    'getFilterValue gives each dot a number and filterRange picks the window that draws; moving the window is nearly free. filterEnabled switches the filter off.',
  section: 'Extensions',
  tags: ['DataFilterExtension', 'getFilterValue', 'filterRange', 'filterEnabled'],
  docs: [
    'repo/docs/api-reference/extensions/data-filter-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
