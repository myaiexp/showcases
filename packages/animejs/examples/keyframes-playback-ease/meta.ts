// animejs example: playbackEase across duration-based keyframes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyframes with playbackEase',
  summary:
    'Two copies of the same duration-based keyframes: one plain, one with a playbackEase applied across the whole sequence. Pick the ease to compare; the bars show iteration progress.',
  section: 'Animation',
  tags: ['animate', 'keyframes', 'playbackEase', 'loop', 'iterationProgress'],
  docs: [
    'pages/animejs-com/documentation/animation/animation-playback-settings/playbackease.md',
    'pages/animejs-com/documentation/animation/keyframes/duration-based-keyframes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
