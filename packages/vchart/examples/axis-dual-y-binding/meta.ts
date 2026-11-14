// vchart example: Two value axes bound to series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two value axes bound to series',
  summary:
    'A bar series in units and a line series in percent share one chart. Binding each axis to a series with seriesId, or with seriesIndex, gives each its own scale; without a binding both fall onto one axis and the line flattens.',
  section: 'Concepts: Axes',
  tags: ['axes.seriesId', 'axes.seriesIndex', 'type: common', 'dual axis'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
