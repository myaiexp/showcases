// AntV Infographic example: Templates: a template that carries a theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Templates: a template that carries a theme',
  summary:
    'A template is a subset of the infographic options, so it can hold a theme and a palette as well as a design. This one sets theme dark and a themeConfig palette; the steps use it as is, then override the palette and the theme in the syntax.',
  section: 'Templates',
  tags: ['registerTemplate', 'template', 'theme', 'themeConfig', 'palette'],
  docs: [
    'repo/site/src/content/learn/template.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
