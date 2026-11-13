// echarts example: Pictorial bar progress with symbolClip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pictorial bar progress with symbolClip',
  summary:
    'Five meters drawn with one battery shape each over a grey track. Toggle symbolClip (cut the symbol at the value or scale it) and symbolBoundingData (fix the symbol size to the track or follow each bar), then draw new values.',
  section: 'Option: series.pictorialBar',
  tags: ['pictorialBar', 'symbolClip', 'symbolBoundingData', 'symbolSize', 'z'],
  docs: ['repo/en/option/series/pictorialBar.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
