// echarts example: Server-side SVG with hydration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Server-side SVG with hydration',
  summary:
    'A chart rendered to an SVG string with ssr: true and renderToSVGString, shown without a live chart, and made clickable by the lightweight echarts/ssr/client hydrate runtime.',
  section: 'Cross Platform',
  tags: ['ssr', 'renderToSVGString', 'hydrate', 'echarts/ssr/client', 'renderer: svg'],
  docs: [
    'repo/contents/en/how-to/cross-platform/server.md',
    'repo/en/api/echarts.md',
    'repo/en/api/echarts-instance.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
