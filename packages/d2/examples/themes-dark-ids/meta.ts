// d2 example: Dark theme IDs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dark theme IDs',
  summary:
    'Dark themes are ordinary theme IDs that happen to have dark colours: 200 is Dark Mauve and 201 is Dark Terrastruct Flagship. Passing one as `themeID` makes the diagram dark for every viewer.',
  section: 'Themes',
  tags: ['theme', 'dark', 'themeID'],
  docs: ['repo/docs/tour/themes.md', 'repo/docs/releases/0.4.1.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
