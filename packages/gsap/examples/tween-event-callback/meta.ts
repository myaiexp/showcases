// gsap example: toggling onUpdate and onRepeat on a live tween through eventCallback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'eventCallback() at runtime',
  summary:
    'A yoyoing tween gets its onUpdate and onRepeat callbacks attached and removed on the fly with eventCallback(), with params passed as the third argument. The panel reads each callback back through the getter form.',
  section: 'Tweens',
  tags: ['eventCallback', 'onUpdate', 'onRepeat', 'callbacks'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween/eventCallback-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/progress-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/yoyo-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
