// vchart example: A basic spec, part by part
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A basic spec, part by part',
  summary:
    'A grouped bar chart grows one part of the spec at a time: type, data and field mapping, then the bar style, the labels, the legend and the crosshair. A stage selector in the full view replays the build.',
  section: 'Basic',
  tags: ['type', 'data', 'xField', 'yField', 'seriesField', 'bar.style', 'label', 'legends', 'crosshair'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Basic/A_Basic_Spec.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
