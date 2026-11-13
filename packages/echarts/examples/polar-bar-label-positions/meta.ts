// echarts example: Polar bar label positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polar bar label positions',
  summary:
    'Five rings of a polar bar chart with value labels. Switch label.position between start, insideStart, middle, insideEnd and end, and the rotate mode between radial, tangential and 0 degrees.',
  section: 'Option: series.bar',
  tags: ['bar', 'polar', 'label.position', 'label.rotate', 'roundCap', 'colorBy'],
  docs: ['repo/en/option/series/bar.md', 'repo/en/option/partial/label.md', 'repo/en/option/partial/label-rotate-tangential.md', 'repo/contents/en/basics/release-note/5-2-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
