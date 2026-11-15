// d2 example: Shape catalog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shape catalog',
  summary:
    'Every standard value of `shape`, from rectangle (the default) to cloud and c4-person, each one a shape whose key names it. A five-row grid with invisible row containers lays them out, as in the catalog on the Shapes page.',
  section: 'Shapes',
  tags: ['shape', 'grid-rows', 'classes'],
  docs: ['repo/docs/tour/shapes.md', 'repo/static/d2/shapes-3.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
