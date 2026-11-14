// motion example: Tabs with the 3.2kb mini animate and a spring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tab underline with the tiny mini animate()',
  summary: 'A segmented tab bar whose highlight glides to the tapped tab with a spring. It uses the 3.2kb mini animate(), which runs on the browser itself: you animate a transform string and pass the spring function as the type.',
  section: 'animate',
  tags: ['motion/mini', 'animate', 'spring', 'type: spring', 'transform', 'stiffness'],
  docs: ['pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/improvements-to-the-web-animations-api-dx.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
