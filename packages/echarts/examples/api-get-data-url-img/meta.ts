// echarts example: getDataURL and getConnectedDataURL into images
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'getDataURL and getConnectedDataURL into images',
  summary:
    'Export a chart to a base64 URL and put it in an img element. Choose the image type, pixelRatio, backgroundColor and excluded components, export one chart with getDataURL, or two connected charts as one picture with getConnectedDataURL.',
  section: 'API',
  tags: ['getDataURL', 'getConnectedDataURL', 'pixelRatio', 'backgroundColor', 'excludeComponents', 'connect', 'group'],
  docs: ['repo/en/api/echarts-instance.md', 'repo/en/api/echarts.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
