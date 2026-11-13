// echarts example: Drag points on a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drag points on a line',
  summary:
    'The handbook drag example: invisible draggable graphic circles placed with convertToPixel over each line symbol, with ondrag mapping back through convertFromPixel and a tooltip shown by hand.',
  section: 'Interaction',
  tags: ['graphic', 'draggable', 'ondrag', 'convertToPixel', 'convertFromPixel', 'triggerOn: none'],
  docs: [
    'repo/contents/en/how-to/interaction/drag.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/en/api/echarts-instance.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
