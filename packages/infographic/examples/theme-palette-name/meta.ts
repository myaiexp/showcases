// AntV Infographic example: Themes: a palette by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Themes: a palette by name',
  summary:
    'When theme.palette is a string it names a registered palette. The same six values are drawn as columns with no palette (the primary colour), with the built-in antv palette and with the spectral palette, whose colours run in a gradient.',
  section: 'Themes',
  tags: ['theme', 'palette', 'antv', 'spectral'],
  docs: [
    'repo/site/src/content/learn/theme.en.md',
    'repo/site/src/content/reference/built-in-palettes.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
