// d2 example: Which theme IDs exist
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which theme IDs exist',
  summary:
    'The docs name only a few theme IDs, so this example asks the compiler: it compiles one diagram with each ID in the ranges 0-12, 100-106, 200-203 and 300-304 and reports which are found. IDs that do not exist make `compile` throw "theme N not found".',
  section: 'Themes',
  tags: ['theme', 'themeID', 'compile', 'error'],
  docs: ['repo/docs/tour/themes.md', 'repo/docs/releases/0.4.1.md', 'repo/docs/releases/0.2.5.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
