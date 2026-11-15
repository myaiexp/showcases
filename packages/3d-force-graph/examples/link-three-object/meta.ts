// 3d-force-graph example: Link styling: linkThreeObject with linkPositionUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: linkThreeObject with linkPositionUpdate',
  summary:
    'linkThreeObject adds a custom object to each link, and with linkThreeObjectExtend true it sits on top of the default line. Here it is a text sprite with the relation name; linkPositionUpdate receives the start and end points every tick and moves it to the middle.',
  section: 'Link styling',
  tags: ['linkThreeObject', 'linkThreeObjectExtend', 'linkPositionUpdate'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
