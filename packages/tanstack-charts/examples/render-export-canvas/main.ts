// Canvas export: renderChartImage on the chart root, against the base canvas's own data URL
import { barY, defineChart } from '@tanstack/charts';
import { mountCanvasChart } from '@tanstack/charts/canvas';
import type { CanvasChartSurface } from '@tanstack/charts/canvas';
import { renderChartImage } from '@tanstack/charts/export';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { checkerImage } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Middle: renderChartImage at scale 1. Right: the base canvas read directly.' });
  if (stage.preview) stage.height -= 34;
  const viaHelper = stage.addBox();
  const viaCanvas = stage.addBox();
  const readout = stage.preview ? null : stage.readout();
  stage.box.style.height = `${stage.height}px`;
  let surface: CanvasChartSurface | null = null;
  let url: string | null = null;
  stage.onDispose(() => url && URL.revokeObjectURL(url));

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountCanvasChart(stage.box, { definition, height: stage.height, initialWidth: 300, ariaLabel: 'Revenue on canvas', onRender: ({ surface: s }) => { surface = s as CanvasChartSurface; } }));

  stage.after(150, async () => {
    const blob = await renderChartImage(stage.box, { scale: 1, background: '#14141a' });
    if (stage.disposed || !surface) return;
    url = URL.createObjectURL(blob);
    const a = checkerImage(url, stage.preview ? 150 : 260);
    const b = checkerImage(surface.canvas.toDataURL('image/png'), stage.preview ? 150 : 260);
    viaHelper.replaceChildren(a);
    viaCanvas.replaceChildren(b);
    await Promise.all([a.decode(), b.decode()]).catch(() => undefined);
    const text = `renderChartImage: ${a.naturalWidth} x ${a.naturalHeight} px, ${blob.size} bytes\nbase canvas.toDataURL: ${b.naturalWidth} x ${b.naturalHeight} px (backing store at devicePixelRatio ${window.devicePixelRatio})`;
    if (readout) readout.textContent = text;
    else stage.say(`export ${a.naturalWidth} x ${a.naturalHeight} px, base canvas ${b.naturalWidth} x ${b.naturalHeight} px`);
  });
  return () => stage.dispose();
};

export default mount;
