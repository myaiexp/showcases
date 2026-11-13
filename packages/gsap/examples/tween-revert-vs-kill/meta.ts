// gsap example: progress(0), kill() and revert() compared on identical tweens, with the inline style attribute shown
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tween revert vs kill',
  summary:
    'Three identical tweens finish, then are undone with progress(0).pause(), kill() and revert(). A readout prints each box\'s style attribute: only revert() puts the element back to having no inline styles.',
  section: 'Tweens',
  tags: ['revert', 'kill', 'progress', 'inline styles'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/revert-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/kill-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/progress-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
