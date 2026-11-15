// scaleOrdinal().unknown(): categories outside the declared domain share one neutral color
import { barY, colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const known = [{ name: 'core', value: 1280 }, { name: 'react', value: 940 }, { name: 'octane', value: 610 }];
const rows = [...known, { name: 'legacy', value: 420 }, { name: 'beta', value: 260 }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'legacy and beta are not in the color domain.' });
  const build = (guarded: boolean) =>
    defineChart({
      marks: [barY(rows, { x: 'name', y: 'value', color: 'name' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.25) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: {
        scale: guarded
          ? scaleOrdinal<string, string>().domain(['core', 'react', 'octane']).range(['#2563eb', '#f97316', '#10b981']).unknown('#64748b')
          : scaleOrdinal<string, string>().domain(['core', 'react', 'octane']).range(['#2563eb', '#f97316', '#10b981']),
        legend: colorLegend({ label: 'Package' }),
      },
    });
  const options = (guarded: boolean) => ({ definition: build(guarded), height: stage.height, ariaLabel: 'Downloads by package' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const apply = (v: boolean): void => {
    host.update(options(v));
    stage.say(v ? '.unknown("#64748b"): extra categories are grey' : 'no unknown: extra categories use the scale default');
  };
  if (stage.bar) checkbox(stage.bar, 'unknown color', true, apply);
  else stage.cycle([true, false], 2200, apply);
  return () => stage.dispose();
};

export default mount;
