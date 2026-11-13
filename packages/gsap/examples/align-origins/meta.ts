// gsap example: Align transform origins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Align transform origins',
  summary:
    'A square swings around a white pivot dot that keeps moving. alignOrigins() snaps the square\'s transform origin onto the dot first, so it never jumps. In the full view, click anywhere to set a pivot.',
  section: 'Helper functions',
  tags: ['alignOrigins', 'transformOrigin', 'MotionPathPlugin', 'convertCoordinates', 'rotation'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/alignOrigins.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
