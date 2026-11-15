// aframe example: <a-cylinder>: hexagon, pac-man, pipe and tube from one primitive
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-cylinder>: hexagon, pac-man, pipe and tube from one primitive',
  summary:
    'The docs build several shapes from <a-cylinder>: a plain cylinder, a hexagon from six radial segments, a pac-man from theta-start and theta-length, a green pipe from open-ended, and a tube that also draws its inside with material side double.',
  section: 'Primitives',
  tags: ['a-cylinder', 'segments-radial', 'theta-start', 'theta-length', 'open-ended', 'side: double'],
  docs: ['repo/docs/primitives/a-cylinder.md', 'repo/docs/components/geometry.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
