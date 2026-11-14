// VFX-JS example: LightStreakEffect starburst
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LightStreakEffect starburst',
  summary:
    'The same night city with a six-pointed starburst instead of one flare. streaks sets the number of rays and angle rotates them; dispersion shifts the colour toward the tips and fringe adds rainbow banding along each ray.',
  section: '@vfx-js/effects',
  tags: ['LightStreakEffect', 'streaks', 'angle', 'dispersion', 'fringe', 'fringeCount'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/light-streak.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
