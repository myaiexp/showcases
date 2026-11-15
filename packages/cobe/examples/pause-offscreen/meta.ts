// cobe example: the Performance recipe's IntersectionObserver pause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pause when offscreen',
  summary:
    'A globe sits in the middle of a scrolling box that auto-scrolls up and down. A badge reads rendering or paused with a frame counter that stops while the globe is outside the box. An IntersectionObserver starts the update() loop on entry and cancels it on exit.',
  section: 'Recipes',
  tags: ['IntersectionObserver', 'update', 'phi'],
  docs: ['repo/website/app/components/Recipes.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
