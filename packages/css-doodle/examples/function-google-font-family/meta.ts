// @google-font: load a Google Fonts family by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Google Font: a family by name',
  summary:
    'font-family: @google-font("Alfa Slab One") loads the family from Google Fonts and is replaced by its quoted name, so random capitals are set in a heavy slab face. The card shows the same grid in a system font, since it never goes online; the full view fetches the real font and also tries a name with spaces and no quotes.',
  section: 'Values',
  tags: ['@google-font', 'font-family', '@content'],
  docs: ['pages/css-doodle-com/reference/function-google-font.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
