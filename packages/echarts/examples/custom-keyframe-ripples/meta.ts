// echarts example: Keyframe ripples in a custom series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyframe ripples in a custom series',
  summary:
    'Nine readings drawn by a custom series, each a dot ringed by looping ripples. The ripples are circle elements with keyframeAnimation, offset by a negative delay so they overlap. Change the ring count, the loop duration and how far the rings flatten, or draw new readings.',
  section: 'Custom Series',
  tags: ['custom', 'renderItem', 'keyframeAnimation', 'keyframes', 'percent', 'loop', 'delay', 'scaleX', 'scaleY', 'group'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/contents/en/basics/release-note/5-3-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
