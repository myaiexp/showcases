// observable-plot example: Transforms: group median tick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms: group median tick',
  summary:
    'Raw traffic observations as faint ticks and a groupY median tick in red per location, with sort ordering the rows by that median.',
  section: 'Transforms',
  tags: ['tickX', 'groupY', 'median', 'sort'],
  docs: ['repo/docs/features/transforms.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
