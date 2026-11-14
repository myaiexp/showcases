// echarts example: Spiral motion with the during callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Spiral motion with the during callback',
  summary:
    'Dots jump to new angles on a spiral every few seconds. With during, ECharts interpolates extra.degree and the callback sets x and y on every frame, so the dots swirl along the spiral. Switch to a plain x and y transition to watch them cut straight across instead.',
  section: 'Animation',
  tags: ['custom', 'renderItem', 'during', 'extra', 'transition', 'setTransform', 'getExtra', 'updateAnimation', 'coordinateSystem'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/contents/en/basics/release-note/5-3-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
