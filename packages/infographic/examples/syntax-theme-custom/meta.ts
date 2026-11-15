// AntV Infographic example: Syntax: a custom theme block
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: a custom theme block',
  summary:
    'Instead of a preset name, the theme block can list its own fields: colorBg, colorPrimary, an inline palette and a stylize line with its own options. The steps add the palette, then the rough style at two roughness values.',
  section: 'Infographic syntax',
  tags: ['theme', 'colorBg', 'colorPrimary', 'palette', 'stylize', 'roughness'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
