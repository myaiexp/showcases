// gsap example: Pluck random until empty
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pluck random until empty',
  summary:
    'Two rows of letters are picked at random every moment. pluckRandomFrom() uses each letter once before starting over (picked tiles dim); getRandomFrom() only avoids repeating the last pick.',
  section: 'Helper functions',
  tags: ['pluckRandomFrom', 'getRandomFrom', 'utils.shuffle', 'random'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/pluckRandomFrom.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
