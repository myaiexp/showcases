// Two explicit themes for the same data: the export chooses its theme, not the page
import { barY, createChartScene, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { blobUrl, checkerImage, svgBlob } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const themes = {
  dark: { foreground: '#e5e7eb', muted: '#9ca3af', grid: '#374151', background: '#111827', palette: ['#60a5fa'] },
  light: { foreground: '#111827', muted: '#4b5563', grid: '#d1d5db', background: '#ffffff', palette: ['#2563eb'] },
} as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both images are SVG files built from one data set with different theme objects.' });
  if (stage.preview) stage.height -= 34;
  stage.box.style.display = 'flex';
  stage.box.style.gap = '8px';
  for (const [name, theme] of Object.entries(themes)) {
    const scene = createChartScene(
      defineChart({
        theme,
        marks: [barY(revenue, { x: 'month', y: 'revenue' })],
        scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      }),
      { width: 640, height: 360 },
    );
    const markup = renderChartSvg(scene, { ariaLabel: `Revenue, ${name} theme`, idPrefix: `theme-${name}` });
    const img = checkerImage(blobUrl(stage, svgBlob(markup)), stage.preview ? 150 : 300);
    img.style.flex = '1 1 0';
    img.style.minWidth = '0';
    stage.box.append(img);
  }
  stage.say('dark theme file, light theme file');
  return () => stage.dispose();
};

export default mount;
