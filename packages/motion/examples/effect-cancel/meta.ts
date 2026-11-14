// motion example: Unplug and replug a live preview
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unplug and replug a live preview',
  summary: 'A brightness dial wired to a lamp. Unplug the lamp and the dial keeps moving but the lamp freezes; plug it back in and it catches up with the dial. Effects hand back a cleanup function, and calling it is how you disconnect a motion value from an element.',
  section: 'Effects',
  tags: ['styleEffect', 'cancel', 'cleanup', 'motionValue', 'on'],
  docs: ['pages/motion-dev/docs/style-effect.md', 'pages/motion-dev/docs/motion-value.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
