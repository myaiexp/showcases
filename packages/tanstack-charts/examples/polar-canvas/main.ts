// Polar with a canvas renderer: one radial mark painted to canvas while the guides stay SVG
import { defineChart, mountChart } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { angleGrid, polar, radialDot, radialGrid } from '@tanstack/charts/polar';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(77);
const noise = normal(random, 0, 0.12);
const rows = Array.from({ length: 1500 }, (_, id) => {
  const angle = random() * 360;
  return { id, angle, radius: Math.min(1, Math.max(0, 0.5 + 0.4 * Math.sin((angle * Math.PI) / 90) + noise())) };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // A canvas layer fills its container, and the stage box has no height of its own.
  stage.box.style.height = `${stage.height}px`;

  const build = (canvas: boolean) =>
    defineChart({
      marks: [
        polar({
          guides: [radialGrid({ ticks: 4, stroke: 'currentColor', strokeOpacity: 0.2, labels: false }), angleGrid({ values: [0, 90, 180, 270], stroke: 'currentColor', strokeOpacity: 0.2, format: (v) => `${v}` })],
          radiusRatio: 0.88,
          marks: [radialDot(rows, { angle: 'angle', radius: 'radius', key: 'id', r: 2, fill: '#38bdf8', fillOpacity: 0.5, ...(canvas ? { renderer: canvasChartRenderer } : {}) })],
          scales: {
            angle: { scale: scaleLinear().domain([0, 360]) },
            radius: { scale: scaleLinear().domain([0, 1]) },
          },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = (canvas: boolean) => ({ definition: build(canvas), height: stage.height, ariaLabel: '1500 dots on a polar chart' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (canvas: boolean): void => {
    host.update(options(canvas));
    stage.say(canvas ? "radialDot renderer: canvasChartRenderer - 1500 dots on one canvas." : 'Default renderer: 1500 SVG circles.');
  };
  if (stage.bar) checkbox(stage.bar, 'canvas renderer', true, show);
  else stage.cycle([true, false], 2400, show);
  return () => stage.dispose();
};

export default mount;
