// tanstack-charts example: Dot radius needs an explicit scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot radius needs an explicit scale',
  summary:
    'Dot radius as a constant, as an accessor read in pixels, and as a field mapped through a d3 scaleSqrt rScale so that bubble area follows the value.',
  section: 'Data and Channels',
  tags: ['dot', 'r', 'rScale', 'scaleSqrt'],
  docs: ['repo/docs/concepts/data-and-channels.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
