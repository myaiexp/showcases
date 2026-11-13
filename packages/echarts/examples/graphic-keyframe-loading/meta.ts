// echarts example: Keyframe loading animations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keyframe loading animations',
  summary:
    'Four loaders drawn with the graphic component and nothing else: a column wave, a fading ring of dots, text that strokes itself in, and a breathing circle. Each uses keyframeAnimation with percent keyframes. Pick one, loop or play once, change the duration, or replay.',
  section: 'Animation',
  tags: ['graphic', 'keyframeAnimation', 'keyframes', 'percent', 'loop', 'delay', 'easing', 'scaleY', 'lineDash'],
  docs: [
    'repo/en/option/component/graphic.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/contents/en/basics/release-note/5-3-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
