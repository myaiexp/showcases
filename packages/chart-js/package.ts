// Chart.js: simple, flexible charting on an HTML canvas
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Chart.js',
  npm: 'chart.js',
  tagline: 'Simple, flexible charting on an HTML canvas with animated transitions and sensible defaults.',
  about:
    'Chart.js hits the sweet spot between "too basic" and "you need a PhD in D3." It renders to a single <canvas>, so charts stay fast even with lots of points, and every update animates automatically. You describe the chart declaratively (type, data, options), and mutating the data then calling chart.update() tweens smoothly to the new values. It is the default reach-for when you want good-looking charts without fighting a visualization grammar.',
  category: 'Data/Viz',
  homepage: 'https://www.chartjs.org',
  docsUrl: 'https://www.chartjs.org/docs/latest/',
  repo: 'https://github.com/chartjs/Chart.js',
  added: '2026-06-14',
  sections: ['Basics'],
});
