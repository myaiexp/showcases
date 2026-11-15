// tanstack-charts example: Definition theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Definition theme',
  summary:
    'The theme field of the definition sets explicit scene colors: foreground, muted text, grid, background and palette. Three themes are applied to the same marks through host.update, so the whole chart, background included, changes with the definition.',
  section: 'Themes and Styling',
  tags: ['theme', 'foreground', 'muted', 'grid', 'background', 'palette'],
  docs: ['repo/docs/guides/themes-and-styling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
