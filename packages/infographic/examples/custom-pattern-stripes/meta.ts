// AntV Infographic example: Custom pattern: horizontal stripes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom pattern: horizontal stripes',
  summary:
    'registerPattern takes a name and a generator that receives scale, backgroundColor and foregroundColor and returns an SVG <pattern> element. showcase-stripes is a background rect plus one bar per tile; `stylize pattern` with `pattern showcase-stripes` fills the chart columns with it, and the steps change scale.',
  section: 'Custom patterns',
  tags: ['registerPattern', 'PatternStyle', 'stylize', 'pattern', 'scale', 'chart-column-simple'],
  docs: [
    'repo/site/src/content/learn/custom-pattern.en.md',
    'repo/site/src/content/reference/built-in-patterns.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
