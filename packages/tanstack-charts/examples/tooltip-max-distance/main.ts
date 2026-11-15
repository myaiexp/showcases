// maxFocusDistance on a scatter: how far from a dot the pointer may be and still focus it
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { scatter } from '../../shared/interact-data.ts';
import { createStage, sweep } from '../../shared/stage.ts';

const rows = scatter(24);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over empty space: with a small distance no tooltip opens.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (maxFocusDistance: number) =>
    defineChart({
      marks: [dot(rows, { id: 'blobs', x: 'x', y: 'y', key: 'id', r: 4 })],
      scales: {
        x: { scale: scaleLinear, nice: true, axis: { label: 'x' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'y' } },
      },
      maxFocusDistance,
      tooltip,
    });
  const options = (distance: number) => ({ definition: build(distance), height: stage.height, initialWidth: 640, ariaLabel: 'Scatter of 24 points' });
  const host = stage.own(mountChart(stage.box, options(48)));

  if (stage.bar) slider(stage.bar, 'maxFocusDistance', 4, 200, 4, 48, (v) => host.update(options(v)), (v) => `${v}px`);
  else {
    stage.cycle([6, 48, 160], 2400, (d) => {
      host.update(options(d));
      stage.say(`maxFocusDistance: ${d}px`);
    });
    stage.ghost(sweep(0.55));
  }
  return () => stage.dispose();
};

export default mount;
