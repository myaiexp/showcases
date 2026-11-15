// facet axes: 'outer' shares axes and needs matching scales; 'cell' gives each cell its own scale
import { defineChart, facet, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { regionRows } from '../../shared/marks2-regions.ts';
import { createStage } from '../../shared/stage.ts';

type Axes = 'outer' | 'cell';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (axes: Axes) =>
    defineChart({
      marks: [
        facet(regionRows, {
          by: 'region',
          columns: 2,
          axes,
          chart: (rows) => ({
            marks: [lineY(rows, { x: 'month', y: 'value', stroke: '#4ade80' })],
            scales: {
              x: { scale: scaleLinear().domain([0, 11]) },
              // 'cell' lets every region pick its own y domain; 'outer' needs one shared domain.
              y: axes === 'cell' ? { scale: scaleLinear, nice: true, grid: true } : { scale: scaleLinear().domain([0, 120]), grid: true },
            },
          }),
        }),
      ],
      scales: { x: null, y: null },
      margin: 0,
    });

  const options = (axes: Axes) => ({ definition: build(axes), height: stage.height, ariaLabel: 'Small multiples with shared or per-cell axes' });
  const host = stage.own(mountChart(stage.box, options('outer')));
  const modes = [['outer', "'outer': one shared y scale"], ['cell', "'cell': a y scale per region"]] as const;
  const show = (axes: Axes): void => {
    host.update(options(axes));
    stage.say(axes === 'outer' ? 'Cells are comparable: the same 0 to 120 range, ticks only on the outside.' : 'Each cell has its own axes, so East and West fill their cells.');
  };
  if (stage.bar) select(stage.bar, 'axes', modes, show);
  else stage.cycle(modes.map((m) => m[0]), 2200, show);
  return () => stage.dispose();
};

export default mount;
