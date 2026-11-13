// Apache ECharts: declarative charts with the widest range of series types, on canvas or SVG
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Apache ECharts',
  npm: 'echarts',
  tagline: 'Declarative, animated charts: dozens of series types, coordinate systems and interactive components from one option object.',
  about:
    'A chart is one option object passed to setOption(): series, axes and components are described as data, and every later setOption() animates from the old state to the new one. Every example runs on ECharts 6 with its built-in dark theme. The handbook embeds the official examples gallery for its demos; that gallery is off limits here, so these examples are built from the handbook text, the option reference and the API reference alone.',
  category: 'Data/Viz',
  homepage: 'https://echarts.apache.org',
  docsUrl: 'https://echarts.apache.org/handbook/en/get-started/',
  repo: 'https://github.com/apache/echarts',
  added: '2026-11-13',
  // The handbook's chapter order (contents/en/posts.yml), with its "Common Charts" chapter
  // split per chart type, followed by the option reference and the API reference.
  sections: [
    'Get Started',
    "What's New in 6",
    'Concepts',
    'Bar',
    'Line',
    'Pie',
    'Scatter',
    'Custom Series',
    'Geo',
    'Cross Platform',
    'Data',
    'Label',
    'Animation',
    'Interaction',
    'Best Practices',
    'Option: Components',
    'Option: Series',
    'API',
  ],
});
