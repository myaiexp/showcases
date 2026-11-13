// echarts example: getOption round trip and clear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'getOption round trip and clear',
  summary:
    'Zoom the first chart and toggle its legend, then press copy: getOption carries those interaction states into a second chart through setOption. Clear the first chart and read what getOption returns afterwards.',
  section: 'API',
  tags: ['getOption', 'clear', 'setOption', 'dataZoom', 'legend.selected', 'isDisposed'],
  docs: ['repo/en/api/echarts-instance.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
