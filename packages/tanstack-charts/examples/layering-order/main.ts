// Marks paint in array order: reversing the same three marks hides the line and dots under the area
import { areaY, defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const build = (reversed: boolean) => {
    const marks = [
      areaY(signups, { id: 'area', x: 'month', y: 'value', fill: '#93c5fd', fillOpacity: 1 }),
      lineY(signups, { id: 'line', x: 'month', y: 'value', stroke: '#1d4ed8', strokeWidth: 3 }),
      dot(signups, { id: 'dots', x: 'month', y: 'value', r: 5, fill: '#facc15' }),
    ] as const;
    return defineChart({
      marks: reversed ? ([marks[2], marks[1], marks[0]] as const) : marks,
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });
  };
  const orders: readonly (readonly [boolean, string])[] = [[false, 'area, line, dots (context first)'], [true, 'dots, line, area (area on top)']];
  const options = (reversed: boolean) => ({ definition: build(reversed), height: stage.height, ariaLabel: 'Layer order' });
  const host = stage.own(mountChart(stage.box, options(false)));
  const show = (reversed: boolean, label: string): void => {
    host.update(options(reversed));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'array order', orders, (r) => show(r, ''));
  else stage.cycle(orders, 1800, ([r, label]) => show(r, label));
  return () => stage.dispose();
};

export default mount;
