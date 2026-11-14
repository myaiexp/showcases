// echarts example: Chord label position, radius and rounded sectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chord label position, radius and rounded sectors",
  summary:
    "A chord diagram of trade between six countries where you choose whether labels sit inside or outside the ring, how thick the ring is through radius, and how rounded its sectors are with itemStyle.borderRadius.",
  section: 'Option: series.chord',
  tags: ['chord', 'label.position', 'radius', 'center', 'itemStyle.borderRadius', 'itemStyle.borderWidth', 'clockwise'],
  docs: [
    'repo/en/option/series/chord.md',
    'repo/en/option/partial/circular-layout.md',
    'repo/en/option/partial/sector-border-radius.md',
    'repo/en/option/partial/label.md',
    'repo/en/option/partial/item-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
