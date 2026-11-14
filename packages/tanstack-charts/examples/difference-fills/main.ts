// differenceY fill options: null omits a lobe's fill
import { defineChart, mountChart } from '@tanstack/charts';
import { differenceY } from '@tanstack/charts/difference';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { forecastVsActual } from '../../shared/marks1-compare.ts';
import { createStage } from '../../shared/stage.ts';

const rows = forecastVsActual();

const modes = [
  [{ positiveFill: '#16a34a', negativeFill: '#dc2626' }, 'both lobes'],
  [{ positiveFill: '#16a34a', negativeFill: null }, 'negativeFill: null'],
  [{ positiveFill: null, negativeFill: '#dc2626' }, 'positiveFill: null'],
  [{ positiveFill: null, negativeFill: null }, 'both null: lines only'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (fills: (typeof modes)[number][0]) =>
    defineChart({
      svgAnimation: true,
      marks: [differenceY(rows, { x: 'day', y1: 'forecast', y2: 'actual', fillOpacity: 0.35, ...fills })],
      scales: {
        x: { scale: scaleLinear },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(modes[0][0]), height: stage.height, initialWidth: 640, ariaLabel: 'Difference with chosen lobes filled' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (i: number): void => {
    host.update({ ...options, definition: chart(modes[i]![0]) });
    stage.say(modes[i]![1]);
  };

  if (stage.bar) {
    select(stage.bar, 'fills', modes.map((m, i) => [i, m[1]] as const), show);
    stage.say(modes[0][1]);
  } else stage.cycle(modes.map((_, i) => i), 2000, show);
  return () => stage.dispose();
};

export default mount;
