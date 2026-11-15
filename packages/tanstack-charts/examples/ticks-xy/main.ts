// tickX and tickY: short rules centered at points, as vertical or horizontal glyphs
import { defineChart, mountChart, tickX, tickY } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(33);
const rows = ['North', 'South', 'East', 'West'].flatMap((region, k) => {
  const draw = normal(random, 40 + k * 8, 9);
  return Array.from({ length: 14 }, (_, i) => ({ id: `${region}${i}`, region, value: Math.round(draw()) }));
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each tick is one observation.' });

  const build = (vertical: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: vertical
        ? [tickX(rows, { x: 'region', y: 'value', key: 'id', z: 'region', strokeOpacity: 0.7 })]
        : [tickY(rows, { x: 'value', y: 'region', key: 'id', z: 'region', strokeOpacity: 0.7 })],
      scales: vertical
        ? { x: { scale: () => scaleBand<string>().padding(0.4) }, y: { scale: scaleLinear, nice: true, grid: true } }
        : { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: () => scaleBand<string>().padding(0.4) } },
      tooltip,
    });

  const options = (vertical: boolean) => ({ definition: build(vertical), height: stage.height, ariaLabel: 'Ticks per region' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const modes = [[true, 'tickX: vertical ticks, length from the band'], [false, 'tickY: horizontal ticks']] as const;
  const show = (vertical: boolean): void => host.update(options(vertical));
  if (stage.bar) select(stage.bar, 'ticks', modes, show);
  else {
    stage.cycle([true, false], 2200, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
