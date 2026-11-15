// path: 'morph' against a rolling path whose update breaks the rules, with fallback snap or morph
import { defineChart, lineY } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { forecastRows } from '../../shared/style-forecast.ts';
import { createStage } from '../../shared/stage.ts';

type Path = 'morph' | 'rolling-snap' | 'rolling-morph';
const paths: readonly (readonly [Path, string])[] = [
  ['morph', "path: 'morph'"],
  ['rolling-snap', "rolling, fallback: 'snap'"],
  ['rolling-morph', "rolling, fallback: 'morph'"],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The whole curve changes, so a rolling update is not valid and the fallback decides.' });
  let variant = 0;
  let path: Path = 'morph';
  const options = () => ({
    definition: defineChart({
      motion: {
        path: path === 'morph' ? 'morph' : { update: 'rolling', x: 'shift', fallback: path === 'rolling-snap' ? 'snap' : 'morph' },
        transition: { type: 'tween', duration: 900, easing: 'ease-in-out' },
      },
      marks: [lineY(forecastRows(variant), { id: 'actual', x: 'month', y: 'actual', key: 'id', stroke: '#60a5fa', strokeWidth: 3 })],
      scales: { x: { scale: () => scaleLinear().domain([0, 11]) }, y: { scale: () => scaleLinear().domain([30, 100]), grid: true } },
      clip: true,
    }),
    renderer: motion(),
    height: stage.height,
    ariaLabel: 'A curve that changes shape',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const run = (): void => {
    variant++;
    host.update(options());
  };
  if (stage.bar) {
    select(stage.bar, 'path', paths, (v) => { path = v; run(); });
    stage.every(2400, run);
  } else stage.cycle(paths, 2600, ([p, label]) => { path = p; stage.say(label); run(); });
  return () => stage.dispose();
};

export default mount;
