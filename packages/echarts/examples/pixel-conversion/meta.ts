// echarts example: Pixel and data conversion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pixel and data conversion',
  summary:
    'A crosshair follows the pointer: containPixel says whether it is inside the grid, convertFromPixel reads its data coordinates and convertToPixel rings the nearest point.',
  section: 'API',
  tags: ['convertFromPixel', 'convertToPixel', 'containPixel', 'getZr', 'graphic'],
  docs: [
    'repo/en/api/echarts-instance.md',
    'repo/en/option/component/graphic.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/contents/en/concepts/event.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
