// z partitions lines; color only paints. Without z, color also groups; with both, z wins the geometry
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { regionalSeries } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = regionalSeries(3, 16).map((row) => ({ ...row, coastal: row.region === 'West' ? 'coast' : 'inland' }));
type Mode = 'z' | 'color' | 'both';
const modes: readonly (readonly [Mode, string])[] = [
  ['z', "z: 'region' (three lines, region colours)"],
  ['color', "color: 'region' (grouping inferred from colour)"],
  ['both', "z: 'region', color: 'coastal' (three lines, two colours)"],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Mode) =>
    defineChart({
      marks: [
        mode === 'z'
          ? lineY(rows, { x: 'date', y: 'value', z: 'region' })
          : mode === 'color'
            ? lineY(rows, { x: 'date', y: 'value', color: 'region' })
            : lineY(rows, { x: 'date', y: 'value', z: 'region', color: 'coastal' }),
      ],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Regional series' });
  const host = stage.own(mountChart(stage.box, options('z')));
  const show = (mode: Mode, label: string): void => {
    host.update(options(mode));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'channels', modes, (m) => show(m, ''));
  else stage.cycle(modes, 2000, ([m, label]) => show(m, label));
  return () => stage.dispose();
};

export default mount;
