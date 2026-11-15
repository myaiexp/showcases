// The surface's canvases: transient focus is painted on its own layer, not on the base bitmap
import { defineChart, lineY } from '@tanstack/charts';
import { mountCanvasChart } from '@tanstack/charts/canvas';
import type { CanvasChartSurface } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

/** Painted pixels of a canvas, counted on a 96 x 48 downscale. */
function painted(source: HTMLCanvasElement): number {
  const probe = document.createElement('canvas');
  probe.width = 96;
  probe.height = 48;
  const g = probe.getContext('2d', { willReadFrequently: true })!;
  g.drawImage(source, 0, 0, 96, 48);
  const data = g.getImageData(0, 0, 96, 48).data;
  let n = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i]! > 0) n++;
  return n;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the chart (or watch the pretend pointer): only the focus layer changes.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  stage.box.style.height = `${stage.height}px`;
  let surface: CanvasChartSurface | null = null;

  const definition = defineChart({
    marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2.5, points: true })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.4) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  stage.own(
    mountCanvasChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Revenue on canvas',
      onRender: ({ surface: s }) => {
        surface = s as CanvasChartSurface;
      },
    }),
  );
  stage.every(350, () => {
    if (!surface) return;
    const s = surface;
    const text = `base canvas ${painted(s.canvas)} px   background ${painted(s.backgroundCanvas)}   focus under ${painted(s.focusUnderCanvas)}   scene ${painted(s.sceneCanvas)}   focus ${painted(s.focusCanvas)}`;
    if (readout) readout.textContent = text.replaceAll('   ', '\n');
    else stage.say(text);
  });
  stage.ghost();
  return () => stage.dispose();
};

export default mount;
