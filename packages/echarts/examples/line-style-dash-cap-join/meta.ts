// echarts example: Line dash, cap, join and shadow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line dash, cap, join and shadow',
  summary:
    'A thick zigzag line for the lineStyle options. Pick type (solid, dashed, dotted or a dash array), slide dashOffset, choose cap and join, add miterLimit, and give it a shadow with blur and offsets.',
  section: 'Option: series.line',
  tags: ['lineStyle', 'type', 'dashOffset', 'cap', 'join', 'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/line-style.md', 'repo/en/option/partial/line-border-style.md', 'repo/en/option/partial/style-shadow-opacity.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
