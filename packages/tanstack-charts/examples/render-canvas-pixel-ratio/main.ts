// pixelRatio: backing-store size against CSS size, for renderers created with different ratios
import { barY, defineChart } from '@tanstack/charts';
import { createCanvasChartRenderer } from '@tanstack/charts/canvas';
import type { CanvasChartSurface } from '@tanstack/charts/canvas';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const ratios = [1, 2, 4] as const;
const renderers = ratios.map((r) => createCanvasChartRenderer<Revenue, string, number>({ pixelRatio: r }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The canvas keeps its CSS size; the backing store grows with the ratio.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  stage.box.style.height = `${stage.height}px`;
  let surface: CanvasChartSurface | null = null;

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  const options = (i: number) => ({
    definition,
    renderer: renderers[i]!,
    height: stage.height,
    ariaLabel: 'Revenue on canvas at a fixed pixel ratio',
    onRender: ({ surface: s }: { surface: unknown }) => {
      surface = s as CanvasChartSurface;
    },
  });
  const host = stage.own(mountChartRenderer(stage.box, options(1)));
  const report = (i: number): void => {
    stage.after(150, () => {
      const c = surface?.sceneCanvas;
      if (!c) return;
      const text = `pixelRatio ${ratios[i]}: backing store ${c.width} x ${c.height}, CSS ${c.clientWidth} x ${c.clientHeight}`;
      if (readout) readout.textContent = text;
      else stage.say(text);
    });
  };
  const show = (i: number): void => {
    host.update(options(i));
    report(i);
  };
  report(1);
  if (stage.bar) select(stage.bar, 'pixelRatio', ratios.map((r, i) => [i, String(r)] as const), show, 1);
  else stage.cycle([0, 1, 2], 2000, show);
  return () => stage.dispose();
};

export default mount;
