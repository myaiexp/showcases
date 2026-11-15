// mountCanvasChart: the same definition and options as mountChart, painted on canvases
import { defineChart, lineY } from '@tanstack/charts';
import { mountCanvasChart } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line: the tooltip comes from the shared host, the pixels from canvas.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  // The canvas host fills its container, so the container needs a definite height.
  stage.box.style.height = `${stage.height}px`;

  const definition = defineChart({
    marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2.5, points: true })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.4) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  const host = stage.own(mountCanvasChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue on canvas' }));
  const text = (): string => `canvas elements ${stage.box.querySelectorAll('canvas').length}, svg elements ${stage.box.querySelectorAll('svg').length}\ndevicePixelRatio ${window.devicePixelRatio}, scene points ${host.getScene().points.length}`;
  if (readout) readout.textContent = text();
  else {
    stage.say(text().replace('\n', ', '));
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
