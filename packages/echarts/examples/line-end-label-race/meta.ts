// echarts example: End labels with value animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'End labels with value animation',
  summary:
    'Four lines that keep growing; each ends in a label showing its name and latest value. The value counts up with endLabel.valueAnimation, and labelLayout.moveOverlap keeps neighbouring labels apart. Toggle both, or pause the feed.',
  section: 'Option: series.line',
  tags: ['endLabel', 'valueAnimation', 'labelLayout', 'moveOverlap', 'formatter', 'animationDurationUpdate'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/label.md', 'repo/en/option/partial/label-layout.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
