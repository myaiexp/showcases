// Chart.js: simple, flexible charting on an HTML canvas
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Chart.js',
  npm: 'chart.js',
  tagline: 'Simple, flexible charting on an HTML canvas with animated transitions and sensible defaults.',
  about:
    'Chart.js turns a list of numbers into a bar, line, pie, radar, bubble or scatter chart drawn on one <canvas>. You describe the chart as plain settings (type, data, options) and it handles axes, legends, tooltips and animation, with defaults that look right before you change anything. Change the data and call update(), and the chart animates to the new values. Because it draws on a canvas instead of building page elements, it stays quick with thousands of points.',
  category: 'Data/Viz',
  homepage: 'https://www.chartjs.org',
  docsUrl: 'https://www.chartjs.org/docs/latest/',
  repo: 'https://github.com/chartjs/Chart.js',
  added: '2026-06-14',
  sections: ['Getting started', 'General', 'Configuration', 'Chart types', 'Axes', 'Developers'],
});
