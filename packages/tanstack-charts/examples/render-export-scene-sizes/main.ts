// Export sizes: one definition compiled at three sizes, each serialized to its own SVG file
import { barY, createChartScene, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { blobUrl, checkerImage, svgBlob } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const sizes = [[480, 270], [960, 540], [1280, 720]] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each image is a separate SVG string compiled for its own size.' });
  if (stage.preview) stage.height -= 34;
  // The artifact's own theme: it should not depend on the page being dark or light.
  const definition = defineChart({
    theme: { foreground: '#111827', muted: '#4b5563', grid: '#d1d5db', background: '#ffffff', palette: ['#2563eb', '#ea580c'] },
    marks: [barY(revenue, { x: 'month', y: 'revenue' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });

  stage.box.style.display = 'flex';
  stage.box.style.gap = '8px';
  stage.box.style.alignItems = 'flex-end';
  const notes: string[] = [];
  for (const [w, h] of sizes) {
    const scene = createChartScene(definition, { width: w, height: h });
    const markup = renderChartSvg(scene, { ariaLabel: `Revenue at ${w} by ${h}`, idPrefix: `size-${w}` });
    const cell = document.createElement('div');
    cell.style.flex = `${w} 1 0`;
    cell.style.minWidth = '0';
    const img = checkerImage(blobUrl(stage, svgBlob(markup)), stage.preview ? 150 : 300);
    img.style.width = '100%';
    cell.append(img);
    stage.box.append(cell);
    notes.push(`${w} x ${h}: ${markup.length} characters, ${scene.chart.width.toFixed(0)} px plot`);
  }
  if (stage.preview) stage.say(notes.join('  '));
  else stage.readout().textContent = notes.join('\n');
  return () => stage.dispose();
};

export default mount;
