// VFX-JS example: Live params and setParams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live params and setParams',
  summary:
    'An effect added once can be changed for as long as it lives. Most effects read params every frame, so assigning one field (the sliders) or calling setParams with several at once (the preset buttons) takes effect on the next frame, with no vfx.remove or vfx.add.',
  section: '@vfx-js/effects',
  tags: ['params', 'setParams', 'ChromaticEffect', 'effect', 'live'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/chromatic.ts',
    'repo/skills/vfx-js/references/effects.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
