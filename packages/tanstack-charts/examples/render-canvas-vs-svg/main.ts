// A single defineChart result handed to the SVG host and the canvas host
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { mountCanvasChart } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { cloud } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cloud(120, 33);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: SVG. Right: canvas. Same definition, same tooltip behaviour.' });
  if (stage.preview) stage.height -= 34;
  const canvasBox = stage.addBox();
  for (const b of [stage.box, canvasBox]) b.style.height = `${stage.height}px`;

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', key: 'id', r: 4, fill: '#60a5fa', fillOpacity: 0.7 })],
    scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 320, ariaLabel: 'Scatter as SVG' }));
  stage.own(mountCanvasChart(canvasBox, { definition, height: stage.height, initialWidth: 320, ariaLabel: 'Scatter on canvas' }));
  stage.after(100, () => stage.say(`SVG side: ${stage.box.querySelectorAll('circle').length} circle elements. Canvas side: ${canvasBox.querySelectorAll('canvas').length} canvas elements, ${canvasBox.querySelectorAll('circle').length} circles.`));
  stage.ghost((t) => [0.2 + 0.6 * t, 0.5], 5000, stage.box);
  stage.ghost((t) => [0.2 + 0.6 * t, 0.5], 5000, canvasBox);
  return () => stage.dispose();
};

export default mount;
