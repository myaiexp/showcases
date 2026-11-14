// Hiding guides: axis: false hides one axis but keeps its scale, guides: false hides every axis and grid
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { alphabet } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

type Mode = 'all' | 'no-x' | 'no-y' | 'none';
const modes: readonly (readonly [Mode, string])[] = [
  ['all', 'both axes'],
  ['no-x', "x: { axis: false }"],
  ['no-y', "y: { axis: false }"],
  ['none', 'guides: false'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const build = (mode: Mode) =>
    defineChart({
      marks: [barY(alphabet, { x: 'letter', y: 'frequency' })],
      guides: mode !== 'none',
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2), axis: mode === 'no-x' ? false : { label: 'Letter' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: mode === 'no-y' ? false : { label: 'Frequency' } },
      },
    });
  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Letter frequency' });
  const host = stage.own(mountChart(stage.box, options('all')));
  const show = (mode: Mode, label: string): void => {
    host.update(options(mode));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'guides', modes, (m) => show(m, ''));
  else stage.cycle(modes, 1600, ([m, l]) => show(m, l));
  return () => stage.dispose();
};

export default mount;
