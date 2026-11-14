// barY: one bar per category on a band scale with padding
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { fruit: 'Apple', crates: 42 },
  { fruit: 'Pear', crates: 27 },
  { fruit: 'Plum', crates: 35 },
  { fruit: 'Cherry', crates: 18 },
  { fruit: 'Fig', crates: 23 },
  { fruit: 'Quince', crates: 9 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar; the slider sets the band scale padding.' });

  const chart = (padding: number) =>
    defineChart({
      svgAnimation: true,
      marks: [barY(rows, { x: 'fruit', y: 'crates' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(padding) },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Crates' } },
      },
      tooltip,
    });

  const options = { definition: chart(0.2), height: stage.height, initialWidth: 640, ariaLabel: 'Crates by fruit' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (p: number): void => host.update({ ...options, definition: chart(p) });

  if (stage.bar) slider(stage.bar, 'padding', 0, 0.8, 0.05, 0.2, show);
  else {
    stage.cycle([0.1, 0.4, 0.7], 1800, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
