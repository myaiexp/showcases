// gsap example: Directional snap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Directional snap',
  summary:
    'A white puck sweeps along a number line while three markers show where it would snap: to the closest tick, to the next one up and to the next one down. The getDirectionalSnapFunc() helper takes a direction and works with an increment or an array of points.',
  section: 'Helper functions',
  tags: ['getDirectionalSnapFunc', 'utils.snap', 'quickSetter', 'snap array'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/getDirectionalSnapFunc.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
