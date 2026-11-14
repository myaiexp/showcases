// vchart example: Band axis domain: order and extra categories
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Band axis domain: order and extra categories',
  summary:
    'A band axis lists its categories in data order unless domain says otherwise. The selector reverses the order, keeps a subset, or names an extra category that has no data and so reserves an empty slot.',
  section: 'Concepts: Axes',
  tags: ['axes.type: band', 'domain', 'category order'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/band-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
