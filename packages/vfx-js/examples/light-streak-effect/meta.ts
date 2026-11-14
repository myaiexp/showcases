// VFX-JS example: LightStreakEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LightStreakEffect',
  summary:
    'Bright city lights throw horizontal anamorphic streaks. LightStreakEffect takes the pixels above threshold and smears them along an axis, fading with falloff. pad gives the streaks room outside the picture and should be at least length.',
  section: '@vfx-js/effects',
  tags: ['LightStreakEffect', 'effect', 'threshold', 'intensity', 'length', 'width', 'falloff', 'pad', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/light-streak.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
