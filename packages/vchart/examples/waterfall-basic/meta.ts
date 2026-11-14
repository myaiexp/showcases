// vchart example: Waterfall: increases and decreases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waterfall: increases and decreases',
  summary:
    'A waterfall chart accumulates each value onto the previous one: increases and decreases get their own legend entries and colors. Leader lines connect the bars and the axis formats its ticks.',
  section: 'Bar',
  tags: ['waterfall', 'xField', 'yField', 'legends', 'axes.formatMethod'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Waterfall.md',
    'repo/docs/assets/option/en/series/waterfall.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
