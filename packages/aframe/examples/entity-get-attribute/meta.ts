// aframe example: getAttribute vs getDOMAttribute: with and without defaults and mixins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'getAttribute vs getDOMAttribute: with and without defaults and mixins',
  summary:
    'For the same geometry, getAttribute returns every property with its default while getDOMAttribute returns only what the markup or setAttribute set. Non-component attributes such as data-position behave as plain DOM.',
  section: 'Core API',
  tags: ['getAttribute', 'getDOMAttribute', 'geometry', 'setAttribute'],
  docs: ['repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
