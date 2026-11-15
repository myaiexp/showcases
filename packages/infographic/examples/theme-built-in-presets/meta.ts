// AntV Infographic example: Themes: the built-in themes by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Themes: the built-in themes by name',
  summary:
    'The built-in themes are default, dark and hand-drawn. The options object picks one with theme: name, using the names that getThemes() returns, and the same funnel is drawn in each. The side panel lists what getThemes() answers.',
  section: 'Themes',
  tags: ['theme', 'getThemes', 'default', 'dark', 'hand-drawn', 'sequence-funnel-simple'],
  docs: [
    'repo/site/src/content/learn/theme.en.md',
    'repo/site/src/content/reference/built-in-themes.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
