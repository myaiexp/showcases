// GSAP example: tween callbacks logged live
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tween callbacks log',
  summary:
    'A box yoyos across a track while each callback (onStart, onUpdate, onRepeat, onComplete, onReverseComplete) writes to a live log, so you can see exactly when each one fires, including when you reverse mid-flight.',
  section: 'Tweens',
  tags: ['onStart', 'onUpdate', 'onRepeat', 'onComplete', 'onReverseComplete', 'callbacks'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Tween.md',
    'pages/gsap-com/resources/getting-started/control.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
