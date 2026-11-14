// VFX-JS example: FluidEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FluidEffect',
  summary:
    'Moving the pointer over the landscape stirs a fluid simulation that drags the picture along. FluidEffect reads the element-local pointer position and tracks its motion itself. Cards use a stand-in pointer; showDye shows the raw dye buffer instead.',
  section: '@vfx-js/effects',
  tags: ['FluidEffect', 'effect', 'curlStrength', 'splatForce', 'showDye', 'pointer', 'mouse'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/fluid.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
