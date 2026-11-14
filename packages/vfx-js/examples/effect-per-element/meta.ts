// VFX-JS example: One effect instance per element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One effect instance per element',
  summary:
    'Two pictures on one VFX, each with its own PixelateEffect. An effect object keeps the state of the element it is attached to, so each element gets a new instance and their params move independently.',
  section: '@vfx-js/effects',
  tags: ['effect', 'instance', 'PixelateEffect', 'vfx.add', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/pixelate.ts',
    'repo/skills/vfx-js/references/effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
