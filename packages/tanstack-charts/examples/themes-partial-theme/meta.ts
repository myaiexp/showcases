// tanstack-charts example: A partial theme keeps the rest
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A partial theme keeps the rest',
  summary:
    'theme is partial: only the palette is given here, so text, axes and grid stay on currentColor and the background stays transparent. The container color still decides everything the theme leaves out.',
  section: 'Themes and Styling',
  tags: ['theme', 'palette', 'partial theme'],
  docs: ['repo/docs/guides/themes-and-styling.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
