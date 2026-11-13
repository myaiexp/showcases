// echarts example: Init options: width, height and pixel ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Init options: width, height and pixel ratio',
  summary:
    'echarts.init takes a third opts argument. Pick an explicit width and height or let the container decide, a devicePixelRatio, and canvas or svg; the readout shows the size and pixel ratio the instance ended up with and the canvas backing store.',
  section: 'Get Started',
  tags: ['echarts.init', 'opts.width', 'opts.height', 'opts.devicePixelRatio', 'opts.renderer', 'getWidth', 'getHeight'],
  docs: ['repo/en/api/echarts.md', 'repo/en/api/echarts-instance.md', 'repo/contents/en/get-started.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
