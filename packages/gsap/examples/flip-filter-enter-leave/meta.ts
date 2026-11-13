// gsap example: Flip filtering with onEnter and onLeave
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flip filter with enter and leave',
  summary:
    'Filter buttons hide tiles with display:none. Flip glides the remaining tiles into their new spots while onEnter and onLeave fade the tiles that appear and disappear.',
  section: 'Flip',
  tags: ['Flip', 'onEnter', 'onLeave', 'absolute', 'scale'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Flip.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-from-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-getState-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
