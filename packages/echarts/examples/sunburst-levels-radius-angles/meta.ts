// echarts example: Sunburst level radii, startAngle and clockwise
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst level radii, startAngle and clockwise",
  summary:
    "Set the inner and outer radius of each ring through levels.radius, where the first sector starts with startAngle, which way they run with clockwise, and how round the sector corners are.",
  section: 'Option: series.sunburst',
  tags: ['sunburst', 'levels', 'levels.radius', 'startAngle', 'clockwise', 'itemStyle.borderRadius', 'center', 'radius'],
  docs: ['repo/en/option/series/sunburst.md', 'repo/en/option/partial/circular-layout.md', 'repo/en/option/partial/sector-border-radius.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
