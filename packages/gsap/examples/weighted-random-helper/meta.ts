// gsap example: the weightedRandom helper function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Weighted random picker',
  summary:
    'Picks from six letters thousands of times and draws how often each one was chosen. The official weightedRandom() helper bends the odds with any ease; change the ease to reshape the histogram.',
  section: 'Helper functions',
  tags: ['weightedRandom', 'utils.pipe', 'parseEase', 'mapRange', 'snap'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/weightedRandom.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
