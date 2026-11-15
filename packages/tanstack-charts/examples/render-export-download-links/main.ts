// Export on demand: helper-driven downloads, and download links prepared in advance
import { lineY, defineChart, mountChart } from '@tanstack/charts';
import { downloadChartImage, downloadChartSvg, renderChartImage, serializeChartSvg } from '@tanstack/charts/export';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { fileLink, pane, svgBlob } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Nothing downloads until you click a button or a link.' });
  if (stage.preview) stage.height -= 46;

  const definition = defineChart({
    marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2.5, points: true })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.4) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 560, ariaLabel: 'Monthly revenue' }));

  if (stage.bar) {
    // The helpers download on click, from the event handler.
    button(stage.bar, 'downloadChartSvg', () => downloadChartSvg(stage.box, 'revenue.svg', { width: 1200, height: 600 }));
    button(stage.bar, 'downloadChartImage (PNG, 2x)', () => void downloadChartImage(stage.box, 'revenue.png', { scale: 2, background: '#14141a' }));
  }
  // Prepared links: build the files now, let the reader follow the link later.
  stage.after(100, async () => {
    const links = stage.preview ? null : pane(stage, 'Prepared links');
    const svg = svgBlob(serializeChartSvg(stage.box, { width: 1200, height: 600 }));
    const png = await renderChartImage(stage.box, { scale: 2, background: '#14141a' });
    if (stage.disposed) return;
    if (links) {
      links.style.display = 'flex';
      links.style.gap = '16px';
      fileLink(stage, links, svg, 'revenue.svg');
      fileLink(stage, links, png, 'revenue.png');
    } else stage.say(`revenue.svg ${svg.size.toLocaleString('en-US')} bytes, revenue.png ${png.size.toLocaleString('en-US')} bytes`);
  });
  return () => stage.dispose();
};

export default mount;
