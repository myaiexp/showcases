// Zdog example: Group updateSort, moons that pass behind a planet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group updateSort',
  summary:
    'Three moons circle a purple planet inside a Group. A Group normally draws its children in the order they were added, so the moons are always painted over the planet, even on the far side. Switch updateSort on and the group re-orders its children every frame, so a moon that goes behind the planet is hidden by it.',
  section: 'API: Group',
  tags: ['Group', 'updateSort', 'Shape', 'translate'],
  docs: ['repo/modules/docs/api-group.hbs', 'repo/modules/docs/group-concept.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
