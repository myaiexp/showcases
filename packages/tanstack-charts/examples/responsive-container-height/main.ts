// Height from CSS: no height and no aspectRatio, so the host follows the box content height
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the box height: the chart is not given one, it reads the CSS height of its container.' });
  const high = stage.preview ? stage.height : 380;
  // The card box is a flex child: take it out of flex sizing so its own height applies.
  stage.box.style.flex = 'none';
  stage.box.style.height = `${high}px`;

  const definition = defineChart({
    marks: [
      areaY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa', fillOpacity: 0.25 }),
      lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2 }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });
  stage.own(
    mountChart(stage.box, {
      definition,
      ariaLabel: 'Monthly revenue',
      onRender: ({ scene }) => stage.say(`box ${Math.round(stage.box.clientHeight)}px high -> scene ${scene.height}px`),
    }),
  );
  const setHeight = (h: number): void => {
    stage.box.style.height = `${h}px`;
  };
  if (stage.bar) slider(stage.bar, 'box height', 140, 460, 10, high, setHeight, (v) => `${v}px`);
  else stage.cycle([190, 110], 2000, setHeight);
  return () => stage.dispose();
};

export default mount;
