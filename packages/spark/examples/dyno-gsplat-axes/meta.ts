// Spark example: gsplatNormal and gsplatXAxis/Y/Z colouring splats by orientation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colouring splats by their axes',
  summary:
    'A torus of long, flat splats, each rolled to a random angle about its own normal, coloured by the direction of one of its axes: gsplatNormal (the thinnest axis), or the splat’s X, Y or Z axis. The normal follows the surface smoothly while X and Y scatter with the roll. A checkbox folds the sign away with abs().',
  section: 'Dyno Standard Library',
  tags: ['gsplatNormal', 'gsplatXAxis', 'gsplatYAxis', 'gsplatZAxis', 'abs', 'combineGsplat'],
  docs: ['repo/docs/docs/dyno-stdlib.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
