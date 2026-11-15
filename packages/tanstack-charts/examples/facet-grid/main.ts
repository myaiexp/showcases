// facet: one child chart per region in a responsive grid with shared outer axes
import { defineChart, facet, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { regionRows } from '../../shared/marks2-regions.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { columns: 2, gap: 16, labels: 'default' as 'default' | 'custom' | 'off' };

  const build = () =>
    defineChart({
      marks: [
        facet(regionRows, {
          by: 'region',
          columns: v.columns,
          gap: v.gap,
          label: v.labels === 'off' ? false : v.labels === 'custom' ? (region) => `Region: ${region}` : true,
          chart: (rows) => ({
            marks: [lineY(rows, { x: 'month', y: 'value', stroke: '#60a5fa' })],
            // Equal domains in every cell so the shared outer axes mean the same thing everywhere.
            scales: {
              x: { scale: scaleLinear().domain([0, 11]), axis: { label: 'Month' } },
              y: { scale: scaleLinear().domain([0, 120]), grid: true, axis: { label: 'Value' } },
            },
          }),
        }),
      ],
      scales: { x: null, y: null },
      margin: 0,
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Small multiples by region' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`columns ${v.columns}, gap ${v.gap}px, labels ${v.labels}`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'columns', 1, 4, 1, v.columns, (x) => { v.columns = x; refresh(); });
    slider(stage.bar, 'gap', 0, 40, 2, v.gap, (x) => { v.gap = x; refresh(); }, (x) => `${x}px`);
    select(stage.bar, 'labels', [['default', 'default'], ['custom', 'formatted'], ['off', 'off']] as const, (l) => { v.labels = l; refresh(); });
  } else {
    stage.cycle([[2, 12], [4, 6], [1, 16], [3, 20]] as const, 1800, ([c, g]) => { v.columns = c; v.gap = g; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
