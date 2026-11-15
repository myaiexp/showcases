// densityContour bandwidth and cellSize: kernel width and grid resolution, both in CSS pixels
import { defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { densityContour } from '@tanstack/charts/spatial/density';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { penguins } from '../../shared/marks2-points.ts';
import { createStage } from '../../shared/stage.ts';

const rows = penguins(70);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { bandwidth: 14, cell: 4 };

  const build = () =>
    defineChart({
      marks: [densityContour(rows, { x: 'billLength', y: 'billDepth', bandwidth: v.bandwidth, cellSize: v.cell, thresholds: 8, fill: '#a78bfa', fillOpacity: 0.12, stroke: '#c4b5fd' })],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Density bandwidth' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`bandwidth ${v.bandwidth}px, cellSize ${v.cell}px`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'bandwidth', 4, 50, 1, v.bandwidth, (x) => { v.bandwidth = x; refresh(); }, (x) => `${x}px`);
    slider(stage.bar, 'cellSize', 1, 16, 1, v.cell, (x) => { v.cell = x; refresh(); }, (x) => `${x}px`);
  } else {
    stage.cycle([[14, 4], [6, 4], [30, 4], [14, 12]] as const, 1700, ([b, c]) => { v.bandwidth = b; v.cell = c; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
