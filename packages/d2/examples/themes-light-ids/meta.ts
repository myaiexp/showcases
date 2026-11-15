// d2 example: Light theme IDs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Light theme IDs',
  summary:
    'The same diagram compiled with four different `themeID` values. A theme changes the colours of every shape, connection and table, including the `sql_table`, without any change to the source. Each card caption names the ID that is showing.',
  section: 'Themes',
  tags: ['theme', 'themeID', 'sql_table'],
  docs: ['repo/docs/tour/themes.md', 'repo/docs/releases/0.2.1.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
