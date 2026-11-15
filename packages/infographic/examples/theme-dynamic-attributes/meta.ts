// AntV Infographic example: Themes: attributes computed from the node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Themes: attributes computed from the node',
  summary:
    'In a themeConfig object the style values may be functions that receive the current value and the SVG element being styled. Here item.label.fill reads the index off each label element and picks a colour, and the second step does the same with the font size.',
  section: 'Themes',
  tags: ['themeConfig', 'item.label', 'DynamicAttributes', 'fill', 'font-size'],
  docs: [
    'repo/site/src/content/learn/theme.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
