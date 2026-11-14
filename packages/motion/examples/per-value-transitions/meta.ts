// motion example: Notification badge with per-value transitions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Notification chip: slow slide, quick fade',
  summary: 'A notification chip slides in slowly while its opacity snaps on quickly, and the little dot on it pulses on its own timing. One animate() call, one default transition, and named overrides for single values.',
  section: 'animate',
  tags: ['animate', 'transition options', 'per-value transition', 'duration', 'ease', 'x', 'opacity'],
  docs: ['pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/improvements-to-the-web-animations-api-dx.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
