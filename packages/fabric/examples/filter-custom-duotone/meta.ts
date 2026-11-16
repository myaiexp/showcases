// fabric example: Image filters: Custom filter with options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Custom filter with options',
  summary:
    'A filters.BaseFilter subclass with defaults, uniformLocations and sendUniformData: a duotone mapping brightness between two colours, saved by toObject.',
  section: 'Image filters',
  tags: ['BaseFilter', 'defaults', 'uniformLocations', 'sendUniformData', 'applyTo2d', 'classRegistry'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/BaseFilter.md',
    'repo/src/content/docs/api/variables/classRegistry.md',
    'repo/src/content/docs/docs/Old docs/fabric-filters.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
