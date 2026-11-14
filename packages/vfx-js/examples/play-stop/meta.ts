// VFX-JS example: stopping and restarting the render loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'stop() and play()',
  summary:
    'A VFX starts rendering at once (autoplay). vfx.stop() halts its render loop and vfx.play() starts it again. While stopped no frames are drawn, so the glitching portrait holds still.',
  section: 'How it Works',
  tags: ['stop', 'play', 'autoplay', 'render loop'],
  docs: ['repo/packages/vfx-js/src/vfx.ts', 'repo/packages/vfx-js/src/types.ts', 'pages/amagi-dev/vfx-js/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
