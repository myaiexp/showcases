// Vizzu example: chart.getComputedStyle() returns every style value with the defaults filled in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Computed style',
  summary:
    'chart.style holds only the values you set, with null for sizes still automatic, while chart.getComputedStyle() returns the style after defaults are filled in. The x-axis label size is read both ways before and after it is set.',
  section: 'Code reference',
  tags: ['getComputedStyle', 'chart.style'],
  docs: ['repo/docs/assets/data/music_data.js', 'repo/src/apps/weblib/ts-api/vizzu.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
