// vchart example: Band size: bandSize, maxBandSize and minBandSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Band size: bandSize, maxBandSize and minBandSize',
  summary:
    'By default the bands share the container width. bandSize fixes each band in pixels, maxBandSize caps it and minBandSize floors it; autoRegionSize then lets the region follow the band count instead of the container.',
  section: 'Concepts: Axes',
  tags: ['bandSize', 'maxBandSize', 'minBandSize', 'autoRegionSize'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/band-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
