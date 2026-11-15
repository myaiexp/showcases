// vega example: Time: Units
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time: Unit Lists and Specifiers',
  summary:
    'timeUnits sorts unit lists from largest to smallest and rejects incompatible, invalid or empty ones; timeUnitSpecifier turns a unit list into a d3 format string, with custom overrides.',
  section: 'Time',
  tags: ['time.timeUnits', 'time.timeUnitSpecifier'],
  docs: ['repo/docs/docs/api/time.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
