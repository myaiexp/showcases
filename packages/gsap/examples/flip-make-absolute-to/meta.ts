// gsap example: Flip.to against Flip.from, Flip.makeAbsolute and Flip.isFlipping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flip makeAbsolute and to',
  summary:
    'A lane of cards switches between a row and a column. Flip.from changes the layout first; Flip.to animates toward a captured layout and leaves its offsets behind until you commit. Flip.makeAbsolute pins the cards, and a lamp per card shows Flip.isFlipping.',
  section: 'Flip',
  tags: ['Flip', 'Flip.to', 'makeAbsolute', 'isFlipping', 'getState', 'from'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Flip/static-to-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-makeAbsolute-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-isFlipping-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-getState-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-from-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
