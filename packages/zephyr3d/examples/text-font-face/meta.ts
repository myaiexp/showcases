// zephyr3d example: A FontFace loaded before TextSprite.font
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A FontFace loaded before TextSprite.font',
  summary:
    'TextSprite.font silently falls back to a default face while a font is not ready. The font is loaded with the browser FontFace API, added to document.fonts and awaited, and only then do the labels switch to it; the first label shows the fallback.',
  section: 'Basic Framework',
  tags: ['TextSprite', 'font', 'FontFace', 'document.fonts'],
  docs: ['repo/apps/doc/web/en/text-rendering.md', 'repo/apps/doc/src/tut-54/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
