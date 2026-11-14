// observable-plot example: Transforms: transform and mark options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms: transform and mark options',
  summary:
    'binX takes transform options ({y: "count"}) then mark options ({x, fill}) and returns options for rectY, which stacks the sexes.',
  section: 'Transforms',
  tags: ['rectY', 'binX', 'fill', 'stackY'],
  docs: ['repo/docs/features/transforms.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
