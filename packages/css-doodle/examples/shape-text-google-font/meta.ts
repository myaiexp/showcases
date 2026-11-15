// css-doodle example: A Google font for text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A Google font for text",
  summary:
    "font: @google-font(Pacifico) loads the family from Google Fonts, and the doodle draws again once the letters arrive. The full view fetches the font; a card uses a plain cursive stand-in so it stays offline.",
  section: 'Shapes',
  tags: ['@shape', 'text', 'font', '@google-font'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
