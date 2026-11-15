// serializeChartSvg rejects a mixed SVG and Canvas root; renderChartImage draws all layers
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { renderChartImage, serializeChartSvg } from '@tanstack/charts/export';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { checkerImage } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The vector export throws; the raster export includes the canvas area.' });
  if (stage.preview) stage.height -= 46;
  const outBox = stage.addBox();
  const readout = stage.preview ? null : stage.readout();
  stage.box.style.height = `${stage.height}px`;
  let url: string | null = null;
  stage.onDispose(() => url && URL.revokeObjectURL(url));

  const definition = defineChart({
    marks: [
      areaY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa', fillOpacity: 0.35, renderer: canvasChartRenderer }),
      lineY(revenue, { x: 'month', y: 'revenue', stroke: '#facc15', strokeWidth: 2.5, points: true }),
    ],
    scales: { x: { scale: () => scalePoint<string>().padding(0.3) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 300, ariaLabel: 'Revenue, canvas area under an SVG line' }));

  stage.after(150, async () => {
    let svgResult: string;
    try {
      svgResult = `serializeChartSvg returned ${serializeChartSvg(stage.box).length} characters`;
    } catch (err) {
      svgResult = `serializeChartSvg threw: ${(err as Error).message}`;
    }
    const blob = await renderChartImage(stage.box, { scale: 1, background: '#14141a' });
    if (stage.disposed) return;
    url = URL.createObjectURL(blob);
    outBox.replaceChildren(checkerImage(url, stage.preview ? 150 : 260));
    const text = `${svgResult}\nrenderChartImage returned ${blob.type}, ${blob.size} bytes`;
    if (readout) readout.textContent = text;
    else stage.say('serializeChartSvg throws; renderChartImage returns a PNG');
  });
  return () => stage.dispose();
};

export default mount;
