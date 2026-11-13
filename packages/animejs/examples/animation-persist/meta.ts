// Animation example: waapi persist true against false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WAAPI persist keeps a finished animation alive',
  summary: 'Two waapi.animate() squares, one with persist: false and one with persist: true. Calling alternate().resume() after they finish brings the persistent one back; the full view also reads the native playState of each.',
  section: 'Animation',
  tags: ['waapi', 'persist', 'alternate', 'resume'],
  docs: [
    'pages/animejs-com/documentation/animation/animation-playback-settings/persist.md',
    'pages/animejs-com/documentation/animation/animation-playback-settings.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
