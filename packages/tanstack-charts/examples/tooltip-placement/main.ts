// A single fixed placement, chosen with a select, and an offset slider
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { scatter } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(18, 9);
type Place = 'auto' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left';
const places: readonly Place[] = ['auto', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot and change the placement or offset.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  let placement: Place = 'top';
  let offset = 10;
  const options = () => ({
    definition: defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', key: 'id', r: 5 })],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      tooltip: { use: tooltip, placement, offset },
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Scatter of 18 points',
  });
  const host = stage.own(mountChart(stage.box, options()));

  if (stage.bar) {
    select(stage.bar, 'placement', places.map((p) => [p, p] as const), (p) => {
      placement = p;
      host.update(options());
    }, 'top');
    slider(stage.bar, 'offset', 0, 40, 2, offset, (v) => {
      offset = v;
      host.update(options());
    }, (v) => `${v}px`);
  } else {
    stage.cycle(places.slice(1), 1800, (p) => {
      placement = p;
      host.update(options());
      stage.say(`placement: '${p}'`);
    });
    stage.ghost((t) => [0.3 + 0.4 * t, 0.5]);
  }
  return () => stage.dispose();
};

export default mount;
