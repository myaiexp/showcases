// echarts example: Tree-shaken imports with a typed ComposeOption
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tree-shaken imports with a typed ComposeOption',
  summary:
    'The import.md recipe: echarts/core plus only the bar and line charts, four components and a renderer registered with use(), and an option typed by ComposeOption so an unregistered series or component is a type error. Switch the series type and toggle the dataset.',
  section: 'Get Started',
  tags: ['echarts/core', 'echarts.use', 'ComposeOption', 'BarChart', 'LineChart', 'CanvasRenderer', 'DatasetComponent'],
  docs: ['repo/contents/en/basics/import.md', 'repo/contents/en/get-started.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
