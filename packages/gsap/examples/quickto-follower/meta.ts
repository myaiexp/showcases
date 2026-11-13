// gsap example: quickTo eases a dot toward a moving point while quickSetter pins another dot to it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'quickTo follower',
  summary:
    'A large dot trails a moving point through gsap.quickTo() (retargeting one reused tween), while a small dot is placed on the point each frame with gsap.quickSetter(). Hover the box to steer it; otherwise a looping point drives both.',
  section: 'gsap methods',
  tags: ['quickTo', 'quickSetter', 'follower', 'performance'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/gsap-quickTo-.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-quickSetter-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
