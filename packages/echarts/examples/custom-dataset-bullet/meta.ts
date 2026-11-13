// echarts example: Bullet chart from a dataset and encode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bullet chart from a dataset and encode',
  summary:
    'A bullet chart drawn by a custom series that has no data of its own: it reads columns of a dataset, named with dimensions and mapped to the axes and the tooltip with encode. Sort the rows, hide the qualitative bands, change the bar thickness or draw new data.',
  section: 'Custom Series',
  tags: ['custom', 'renderItem', 'dataset', 'source', 'dimensions', 'encode', 'api.value', 'api.size', 'api.coord'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/en/tutorial/custom-series.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
